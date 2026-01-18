# Technical Debt

## Client

- **Component Directory Nesting**:
  - **Issue**: Components are currently sub-categorized within `src/components/common` and `src/components/features`.
  - **Impact**: Violates the "Flat Structure" standard, increases path depth, and complicates the `@components` alias resolution.
  - **Remediation**: Flatten the architecture by moving all nested component folders directly into `src/components/` and updating imports to the explicit folder-per-component pattern.

- **Asset Placement Mismatch**:
  - **Issue**: The `assets/` folder is currently located at `client/assets/` instead of `client/src/assets/`.
  - **Impact**: Prevents Vite module bundling, breaks the `@assets` path alias, and forces the use of relative paths in components.
  - **Remediation**: Move `client/assets/` into `client/src/assets/` and update all internal references to use the `@assets` alias.

- **Incorrect File Extensions in Constants**:
  - **Issue**: Logic-only files in `src/constants/` (e.g., `dataConstants.jsx`, `routesConstants.jsx`) incorrectly use the `.jsx` extension.
  - **Impact**: Inconsistent naming convention and misleading file metadata for build tools and IDEs.
  - **Remediation**: Rename all logic-only files in the `constants/` directory to use the `.js` extension.

- **Stale Time Snapshots and File Naming**:
  - **Issue**: Time-based values in `src/constants/` are stored as module-load snapshots and resided in a file with a typo (`dateContants.jsx`).
  - **Impact**: Risk of stale data in long-running sessions and inconsistent naming conventions that violate the `.js` extension rule for logic-only files.
  - **Remediation**: Rename file to `timeConstants.js`, update variables to use the `SESSION_START_` prefix to clarify their snapshot nature, and audit usage to ensure they are excluded from real-time business logic.

## Server
