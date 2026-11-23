
/*
 * Platform Hub
 * Backstage Backend Configuration
 */

import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();

// Application backend
backend.add(import('@backstage/plugin-app-backend'));

// Proxy backend
backend.add(import('@backstage/plugin-proxy-backend'));

// Scaffolder plugin
backend.add(import('@backstage/plugin-scaffolder-backend'));
backend.add(import('@backstage/plugin-scaffolder-backend-module-github'));
backend.add(
  import('@backstage/plugin-scaffolder-backend-module-notifications'),
);

// TechDocs plugin
backend.add(import('@backstage/plugin-techdocs-backend'));

// Authentication backend
backend.add(import('@backstage/plugin-auth-backend'));

// GitHub OAuth authentication provider
backend.add(
  import('@backstage/plugin-auth-backend-module-github-provider'),
);

// Software catalog
backend.add(import('@backstage/plugin-catalog-backend'));
backend.add(
  import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),
);

// Catalog logging
backend.add(import('@backstage/plugin-catalog-backend-module-logs'));

// Permissions
backend.add(import('@backstage/plugin-permission-backend'));
backend.add(
  import('@backstage/plugin-permission-backend-module-allow-all-policy'),
);

// Search backend
backend.add(import('@backstage/plugin-search-backend'));

// PostgreSQL search engine
backend.add(import('@backstage/plugin-search-backend-module-pg'));

// Search indexing
backend.add(import('@backstage/plugin-search-backend-module-catalog'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs'));

// Kubernetes plugin
backend.add(import('@backstage/plugin-kubernetes-backend'));

// User settings
backend.add(import('@backstage/plugin-user-settings-backend'));

// Notifications and signals
backend.add(import('@backstage/plugin-notifications-backend'));
backend.add(import('@backstage/plugin-signals-backend'));

// MCP actions for future AI integration
backend.add(import('@backstage/plugin-mcp-actions-backend'));

// Start the Backstage backend
backend.start();
