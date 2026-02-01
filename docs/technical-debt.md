# Technical Debt

## Client

- **Component Directory Nesting**:
  - **Issue**: Components are currently sub-categorized within `src/components/common` and `src/components/features`.
  - **Impact**: Violates the "Flat Structure" standard, increases path depth, and complicates the `@components` alias resolution.
  - **Remediation**: Flatten the architecture by moving all nested component folders directly into `src/components/` and updating imports to the explicit folder-per-component pattern.

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
