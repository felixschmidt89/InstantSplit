# Technical Debt

## Client

- **Incorrect File Extensions in Constants**:
  - **Issue**: Logic-only files in `src/constants/` (e.g., `dataConstants.jsx`, `routesConstants.jsx`) incorrectly use the `.jsx` extension.
  - **Impact**: Inconsistent naming convention and misleading file metadata for build tools and IDEs.
  - **Remediation**: Rename all logic-only files in the `constants/` directory to use the `.js` extension.

- **Stale Time Snapshots and File Naming**:
  - **Issue**: Time-based values in `src/constants/` are stored as module-load snapshots and resided in a file with a typo (`dateContants.jsx`).
  - **Impact**: Risk of stale data in long-running sessions and inconsistent naming conventions that violate the `.js` extension rule for logic-only files.
  - **Remediation**: Rename file to `timeConstants.js`, update variables to use the `SESSION_START_` prefix to clarify their snapshot nature, and audit usage to ensure they are excluded from real-time business logic.

- **Global-Configuration-Misplacement**:
  - **Issue**: System-wide configuration data, such as `currenciesContent`, is currently stored in `src/contents/`.
  - **Impact**: Creates semantic ambiguity; data used for logic and validation is treated as static prose, leading to module resolution confusion and Vite bundling failures.
  - **Remediation**: Relocate configuration arrays to `src/constants/currencyConstants.js` and update all consumer imports to use the `@constants` alias.

- **Component-Content-Decoupling**:
  - **Issue**: Static prose like `legalNoticeSections` and `authorInfo` reside in a global `contents/` directory instead of their respective component folders.
  - **Impact**: Decreased maintainability and higher risk of "dead code" accumulation; components are not self-contained, portable units.
  - **Remediation**: Relocate legal prose into `src/components/LegalNotice/LegalNoticeContent.js` and use local relative imports to ensure high component cohesion.

- **Client-Side-HTTP-Polling-Overhead**:
  - **Issue**: Real-time synchronization of state (e.g., group members) across devices currently relies HTTP polling interval.
  - **Impact**: Wastes client bandwidth, drains mobile device battery, causes unnecessary server load with redundant requests, and creates artificial latency for multi-device synchronization.
  - **Remediation**: Replace interval-based polling with WebSocket listeners (e.g., Socket.IO client) integrated into the `GroupContext` to reactively trigger data refetches only when the server pushes a mutation event.

- **Missing-Dedicated-UI-Context**:
  - **Issue**: Global UI preferences (e.g., language, view toggles) are currently managed via direct `localStorage` reads within individual components rather than through a centralized, reactive state manager.
  - **Impact**: Inconsistent UI reactivity. When a user updates a preference, sibling or parent components do not instantly re-render, forcing reliance on hard page reloads or redundant `localStorage` polling. It also violates the established "RAM vs. Disk" state pattern used by `GroupContext`.
  - **Remediation**: Implement a dedicated `UIContext` (and `UIProvider`) to serve as the reactive "RAM" for visual and localization preferences. Route all reads/writes for `LOCAL_STORAGE_KEYS.LANGUAGE` and `LOCAL_STORAGE_KEYS.VIEW` through this context to ensure bi-directional synchronization and instant UI updates.

- **Insecure-Group-Code-URL-Exposure**:
  - **Issue**: Client API requests (e.g., `fetchGroupMembers.js`) are improperly embedding the sensitive `groupCode` in the URL path, while the required `groupId` is resolving to `undefined`.
  - **Impact**: Exposes the secret `groupCode` in browser history, server logs, and network proxies. It also breaks API routing by generating 404 errors when the URL is malformed.
  - **Remediation**: Refactor all client API calls to strictly inject `groupId` into the URL path for resource identification. Transmit `groupCode` securely and exclusively via HTTP headers (using the established `axiosInstance` interceptor) or request payload.

## Server

### Technical Debt Management: Server-Side Architecture

- **Monolithic-Backend-Controllers**:
  - **Issue**: `server/controllers/groupController.js` handles HTTP orchestration, business logic, and database persistence within a single file.
  - **Impact**: Violates the Single Responsibility Principle; prevents independent testing of domain logic and complicates the transition to a standardized atomic architecture.
  - **Remediation**: Decompose `groupController.js` into atomic controllers (e.g., `createGroupController.js`) and services (e.g., `createGroupService.js`) following the **Atomic Utility Architecture**.

- **Server-Client-Naming-Collision**:
  - **Issue**: Lack of distinct suffixes (e.g., `Service`, `Controller`) for backend functions.
  - **Impact**: High risk of developer confusion and accidental circular imports in a monorepo workspace when searching for "createGroup".
  - **Remediation**: Apply explicit naming conventions (`createGroup` for Client API, `createGroupService` for Server Logic) during the server refactor phase.

- **Missing-Server-Service-Layer**:
  - **Issue**: Direct Mongoose model interaction occurring within the Express routing/controller layer.
  - **Impact**: Tight coupling between the Web Framework (Express) and the Data Layer (Mongoose), making it harder to swap database logic or reuse code in non-web contexts (e.g., CLI tools or cron jobs).
  - **Remediation**: Extract all database logic into a dedicated `server/services/` directory.

- **Lack-Of-Real-Time-Event-Broadcasting**:
  - **Issue**: The server handles HTTP mutation requests (POST/PUT/DELETE) but does not actively push state changes to connected clients viewing the same resource.
  - **Impact**: Forces client applications to rely on inefficient polling mechanisms, resulting in delayed state synchronization across multiple devices interacting with the same group.
  - **Remediation**: Integrate a WebSocket server (e.g., Socket.IO) alongside the Express app. Configure controllers/services to emit scoped broadcast events (e.g., `members_changed`) to specific "rooms" (`activeGroupCode`) whenever a relevant database mutation succeeds.

- **Path-Parameter-Secret-Exposure**:
  - **Issue**: Legacy backend routes (e.g., `userRouter.js`) may still be configured to expect `groupCode` as a URL parameter instead of relying exclusively on the global `extractGroupCodeMiddleware`.
  - **Impact**: Creates redundant validation paths, bypasses centralized context extraction, and forces the frontend to construct insecure URLs.
  - **Remediation**: Audit and update all backend routers to strictly use `/:groupId` for resource identification. Rely entirely on `req.groupCode` (extracted globally from headers/body) for authorization logic in controllers.
