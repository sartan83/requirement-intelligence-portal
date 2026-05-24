import type {
  TechStack,
  FileCategory,
  ApplicationSummary,
  UIScreen,
  Requirement,
  ExecutionPackage,
} from '../types';

export const mockTechStack: TechStack = {
  languages: [
    { name: 'TypeScript', percentage: 52 },
    { name: 'Java', percentage: 28 },
    { name: 'SQL', percentage: 10 },
    { name: 'HTML/CSS', percentage: 7 },
    { name: 'Shell', percentage: 3 },
  ],
  frameworks: ['React 18', 'Spring Boot 3.3', 'Spring Security 6', 'TanStack Query', 'Vite'],
  databases: ['PostgreSQL 16', 'Redis'],
  buildTools: ['Maven', 'npm', 'Docker', 'Vite'],
  testing: ['Jest', 'React Testing Library', 'JUnit 5', 'Cypress'],
  deployment: ['Docker Compose', 'GitHub Actions', 'AWS ECS'],
};

export const mockFileCategories: FileCategory[] = [
  { category: 'Frontend', count: 47, files: ['src/pages/', 'src/components/', 'src/hooks/', 'src/styles/'] },
  { category: 'Backend API', count: 32, files: ['backend/src/main/java/com/devilsvault/api/', 'backend/src/main/java/com/devilsvault/service/'] },
  { category: 'Database', count: 12, files: ['backend/src/main/resources/db/migration/', 'infra/docker/init.sql'] },
  { category: 'Configuration', count: 18, files: ['docker-compose.yml', 'vite.config.ts', 'application.yml', 'tsconfig.json'] },
  { category: 'Tests', count: 24, files: ['src/__tests__/', 'backend/src/test/', 'cypress/e2e/'] },
  { category: 'Deployment', count: 8, files: ['.github/workflows/', 'infra/docker/', 'Dockerfile'] },
  { category: 'Documentation', count: 6, files: ['README.md', 'docs/', 'API.md'] },
];

export const mockApplicationSummary: ApplicationSummary = {
  purpose: 'DevilsVault is a secure online banking application serving both internal bank employees and external customers. It manages account lifecycles, financial transactions, fund transfers, and administrative approval workflows with enterprise-grade security.',
  hasUI: true,
  modules: [
    {
      id: 'mod-1',
      name: 'Account Management',
      description: 'Handles account creation, closure, and lifecycle management including KYC verification and account type configuration.',
      status: 'healthy',
      files: ['backend/src/main/java/com/devilsvault/api/account/', 'src/pages/accounts/'],
    },
    {
      id: 'mod-2',
      name: 'Transaction Processing',
      description: 'Core financial transaction engine supporting deposits, withdrawals, and inter-account transfers with pessimistic locking.',
      status: 'healthy',
      files: ['backend/src/main/java/com/devilsvault/service/TransactionService.java', 'src/pages/transactions/'],
    },
    {
      id: 'mod-3',
      name: 'Fund Transfers',
      description: 'Internal and external fund transfer system with hold management, approval workflows for high-value transfers ($1,000+).',
      status: 'warning',
      files: ['backend/src/main/java/com/devilsvault/api/transfer/', 'src/pages/transfers/'],
    },
    {
      id: 'mod-4',
      name: 'User Authentication & Authorization',
      description: 'JWT-based authentication with role-based access control, MFA/TOTP for admin users, and session management.',
      status: 'healthy',
      files: ['backend/src/main/java/com/devilsvault/security/', 'src/context/AuthContext.tsx'],
    },
    {
      id: 'mod-5',
      name: 'Admin Dashboard',
      description: 'Internal employee interface for managing customer accounts, approving transactions, and system monitoring.',
      status: 'warning',
      files: ['src/pages/admin/', 'backend/src/main/java/com/devilsvault/api/admin/'],
    },
    {
      id: 'mod-6',
      name: 'Audit & Compliance',
      description: 'Comprehensive logging of all user and system actions with separate internal and external audit trails.',
      status: 'critical',
      files: ['backend/src/main/java/com/devilsvault/service/AuditService.java', 'src/pages/audit/'],
    },
  ],
  technicalComponents: [
    { id: 'tc-1', name: 'React SPA', type: 'frontend', description: 'Single-page application with TanStack Query for data fetching', technology: 'React 18 + TypeScript + Vite' },
    { id: 'tc-2', name: 'Spring Boot API', type: 'backend', description: 'RESTful API layer with Spring Security and JWT', technology: 'Spring Boot 3.3 + Java 21' },
    { id: 'tc-3', name: 'PostgreSQL Database', type: 'database', description: 'Primary data store with Flyway migrations', technology: 'PostgreSQL 16' },
    { id: 'tc-4', name: 'Redis Cache', type: 'database', description: 'Session caching and OTP storage', technology: 'Redis 7' },
    { id: 'tc-5', name: 'Docker Infrastructure', type: 'infrastructure', description: 'Containerized deployment with Docker Compose', technology: 'Docker + Docker Compose' },
    { id: 'tc-6', name: 'Legacy JSP Layer', type: 'frontend', description: 'Legacy Spring MVC with JSP views (being migrated)', technology: 'JSP + JSTL' },
  ],
  userJourneys: [
    { id: 'uj-1', name: 'Customer Registration', steps: ['Visit landing page', 'Click Register', 'Fill personal details', 'Upload KYC documents', 'Email verification', 'Account pending approval'], screens: ['Landing', 'Registration Form', 'KYC Upload', 'Verification', 'Pending Status'] },
    { id: 'uj-2', name: 'Fund Transfer', steps: ['Login', 'Navigate to Transfers', 'Select source account', 'Enter recipient details', 'Enter amount', 'Confirm transfer', 'OTP verification (if >$1000)', 'View confirmation'], screens: ['Login', 'Dashboard', 'Transfer Form', 'OTP Modal', 'Confirmation'] },
    { id: 'uj-3', name: 'Admin Approval', steps: ['Login as admin', 'View pending actions', 'Review transaction details', 'Approve or reject', 'Add notes', 'Confirm decision'], screens: ['Admin Login', 'Admin Dashboard', 'Pending Queue', 'Review Detail', 'Decision Confirmation'] },
    { id: 'uj-4', name: 'Account Statement', steps: ['Login', 'Navigate to Accounts', 'Select account', 'Choose date range', 'View transactions', 'Download PDF statement'], screens: ['Dashboard', 'Account List', 'Account Detail', 'Statement View'] },
  ],
  apiEndpoints: [
    { method: 'POST', path: '/api/auth/login', description: 'User authentication with JWT token generation', module: 'Authentication' },
    { method: 'POST', path: '/api/auth/register', description: 'New user registration', module: 'Authentication' },
    { method: 'POST', path: '/api/auth/mfa/verify', description: 'TOTP MFA verification', module: 'Authentication' },
    { method: 'GET', path: '/api/accounts', description: 'List user accounts', module: 'Account Management' },
    { method: 'POST', path: '/api/accounts', description: 'Create new account', module: 'Account Management' },
    { method: 'GET', path: '/api/accounts/:id/transactions', description: 'Get account transaction history', module: 'Transaction Processing' },
    { method: 'POST', path: '/api/transactions', description: 'Create new transaction', module: 'Transaction Processing' },
    { method: 'POST', path: '/api/transfers', description: 'Initiate fund transfer', module: 'Fund Transfers' },
    { method: 'GET', path: '/api/transfers/:id/status', description: 'Check transfer status', module: 'Fund Transfers' },
    { method: 'GET', path: '/api/admin/pending', description: 'List pending approval items', module: 'Admin Dashboard' },
    { method: 'POST', path: '/api/admin/approve/:id', description: 'Approve pending action', module: 'Admin Dashboard' },
    { method: 'GET', path: '/api/audit/logs', description: 'Query audit trail', module: 'Audit & Compliance' },
  ],
  dataEntities: [
    { name: 'User', fields: [{ name: 'id', type: 'UUID', nullable: false }, { name: 'email', type: 'VARCHAR(255)', nullable: false }, { name: 'password_hash', type: 'VARCHAR(255)', nullable: false }, { name: 'role', type: 'ENUM', nullable: false }, { name: 'mfa_enabled', type: 'BOOLEAN', nullable: false }, { name: 'created_at', type: 'TIMESTAMP', nullable: false }], relationships: ['Has many Accounts', 'Has many AuditLogs'] },
    { name: 'Account', fields: [{ name: 'id', type: 'UUID', nullable: false }, { name: 'user_id', type: 'UUID', nullable: false }, { name: 'account_number', type: 'VARCHAR(20)', nullable: false }, { name: 'type', type: 'ENUM', nullable: false }, { name: 'balance', type: 'DECIMAL(15,2)', nullable: false }, { name: 'status', type: 'ENUM', nullable: false }], relationships: ['Belongs to User', 'Has many Transactions'] },
    { name: 'Transaction', fields: [{ name: 'id', type: 'UUID', nullable: false }, { name: 'account_id', type: 'UUID', nullable: false }, { name: 'type', type: 'ENUM', nullable: false }, { name: 'amount', type: 'DECIMAL(15,2)', nullable: false }, { name: 'status', type: 'ENUM', nullable: false }, { name: 'created_at', type: 'TIMESTAMP', nullable: false }], relationships: ['Belongs to Account'] },
    { name: 'Transfer', fields: [{ name: 'id', type: 'UUID', nullable: false }, { name: 'source_account_id', type: 'UUID', nullable: false }, { name: 'target_account_id', type: 'UUID', nullable: false }, { name: 'amount', type: 'DECIMAL(15,2)', nullable: false }, { name: 'status', type: 'ENUM', nullable: false }, { name: 'requires_approval', type: 'BOOLEAN', nullable: false }], relationships: ['References Account (source)', 'References Account (target)'] },
    { name: 'AuditLog', fields: [{ name: 'id', type: 'UUID', nullable: false }, { name: 'user_id', type: 'UUID', nullable: true }, { name: 'action', type: 'VARCHAR(100)', nullable: false }, { name: 'entity_type', type: 'VARCHAR(50)', nullable: false }, { name: 'details', type: 'JSONB', nullable: true }, { name: 'created_at', type: 'TIMESTAMP', nullable: false }], relationships: ['References User'] },
  ],
  externalDependencies: [
    { name: 'react', type: 'npm', version: '18.2.0', purpose: 'UI framework' },
    { name: 'spring-boot-starter-web', type: 'maven', version: '3.3.0', purpose: 'REST API framework' },
    { name: 'spring-boot-starter-security', type: 'maven', version: '3.3.0', purpose: 'Authentication/Authorization' },
    { name: 'jjwt', type: 'maven', version: '0.12.5', purpose: 'JWT token management' },
    { name: 'flyway-core', type: 'maven', version: '10.8.1', purpose: 'Database migration management' },
    { name: 'tanstack/react-query', type: 'npm', version: '5.17.0', purpose: 'Server state management' },
    { name: 'pgcrypto', type: 'service', version: 'built-in', purpose: 'Column-level encryption for PII' },
  ],
  authMechanism: {
    type: 'JWT + MFA',
    provider: 'Spring Security 6',
    features: ['JWT bearer tokens', 'TOTP-based MFA for admins', 'Role-based access (CUSTOMER, EMPLOYEE, ADMIN)', 'CSRF protection', 'OTP for critical transactions', 'Recovery codes'],
  },
  testCoverage: {
    unit: 62,
    integration: 38,
    e2e: 15,
    missingAreas: ['Transfer approval workflow E2E', 'MFA enrollment flow', 'Concurrent transaction handling', 'Session expiration scenarios', 'PDF statement generation', 'Admin bulk operations'],
  },
  technicalDebt: [
    { id: 'td-1', title: 'Legacy JSP Views Still Active', severity: 'high', description: 'Several customer-facing pages still served via legacy JSP/Spring MVC instead of the React SPA.', recommendation: 'Complete migration to React SPA for all remaining JSP pages.' },
    { id: 'td-2', title: 'Inconsistent Error Handling', severity: 'medium', description: 'Backend API returns inconsistent error response formats across different modules.', recommendation: 'Implement a global exception handler with standardized error response DTOs.' },
    { id: 'td-3', title: 'Missing Database Indexes', severity: 'high', description: 'Transaction queries on date ranges lack composite indexes, causing slow queries under load.', recommendation: 'Add composite indexes on (account_id, created_at) for the transactions table.' },
    { id: 'td-4', title: 'Hardcoded Configuration Values', severity: 'medium', description: 'Several service classes contain hardcoded timeout values and feature flags.', recommendation: 'Externalize to application.yml with Spring @ConfigurationProperties.' },
    { id: 'td-5', title: 'No Rate Limiting', severity: 'critical', description: 'API endpoints lack rate limiting, exposing the system to abuse and DoS attacks.', recommendation: 'Implement rate limiting using Spring Cloud Gateway or Bucket4j.' },
    { id: 'td-6', title: 'Audit Log Performance', severity: 'medium', description: 'Synchronous audit logging impacts API response times.', recommendation: 'Move audit logging to asynchronous processing with a message queue.' },
  ],
};

export const mockUIScreens: UIScreen[] = [
  {
    id: 'screen-1',
    name: 'Login Page',
    route: '/login',
    elements: [
      { id: 'el-1', type: 'header', label: 'DevilsVault', x: 160, y: 30, width: 280, height: 48, properties: { variant: 'h1' } },
      { id: 'el-2', type: 'text', label: 'Secure Online Banking', x: 160, y: 80, width: 280, height: 24, properties: { variant: 'subtitle' } },
      { id: 'el-3', type: 'card', label: 'Login Form', x: 120, y: 120, width: 360, height: 320, properties: { variant: 'elevated' } },
      { id: 'el-4', type: 'input', label: 'Email Address', x: 150, y: 160, width: 300, height: 44, properties: { type: 'email', required: 'true' } },
      { id: 'el-5', type: 'input', label: 'Password', x: 150, y: 220, width: 300, height: 44, properties: { type: 'password', required: 'true' } },
      { id: 'el-6', type: 'button', label: 'Sign In', x: 150, y: 290, width: 300, height: 44, properties: { variant: 'primary' } },
      { id: 'el-7', type: 'button', label: 'Register', x: 150, y: 350, width: 300, height: 44, properties: { variant: 'secondary' } },
    ],
  },
  {
    id: 'screen-2',
    name: 'Dashboard',
    route: '/dashboard',
    elements: [
      { id: 'el-8', type: 'sidebar', label: 'Navigation', x: 0, y: 0, width: 240, height: 600, properties: { variant: 'dark' } },
      { id: 'el-9', type: 'header', label: 'Account Overview', x: 260, y: 20, width: 500, height: 36, properties: { variant: 'h2' } },
      { id: 'el-10', type: 'card', label: 'Checking Account - $12,450.00', x: 260, y: 70, width: 340, height: 120, properties: { variant: 'metric' } },
      { id: 'el-11', type: 'card', label: 'Savings Account - $45,200.00', x: 620, y: 70, width: 340, height: 120, properties: { variant: 'metric' } },
      { id: 'el-12', type: 'card', label: 'Total Balance - $57,650.00', x: 260, y: 200, width: 700, height: 80, properties: { variant: 'highlight' } },
      { id: 'el-13', type: 'table', label: 'Recent Transactions', x: 260, y: 300, width: 700, height: 280, properties: { columns: 'Date, Description, Amount, Status' } },
    ],
  },
  {
    id: 'screen-3',
    name: 'Transfer Funds',
    route: '/transfers/new',
    elements: [
      { id: 'el-14', type: 'sidebar', label: 'Navigation', x: 0, y: 0, width: 240, height: 600, properties: { variant: 'dark' } },
      { id: 'el-15', type: 'header', label: 'Transfer Funds', x: 260, y: 20, width: 500, height: 36, properties: { variant: 'h2' } },
      { id: 'el-16', type: 'card', label: 'Transfer Form', x: 260, y: 70, width: 500, height: 440, properties: { variant: 'elevated' } },
      { id: 'el-17', type: 'input', label: 'From Account', x: 290, y: 110, width: 440, height: 44, properties: { type: 'select', required: 'true' } },
      { id: 'el-18', type: 'input', label: 'To Account / Recipient', x: 290, y: 170, width: 440, height: 44, properties: { type: 'text', required: 'true' } },
      { id: 'el-19', type: 'input', label: 'Amount ($)', x: 290, y: 230, width: 440, height: 44, properties: { type: 'number', required: 'true' } },
      { id: 'el-20', type: 'input', label: 'Description', x: 290, y: 290, width: 440, height: 44, properties: { type: 'text', required: 'false' } },
      { id: 'el-21', type: 'button', label: 'Review Transfer', x: 290, y: 370, width: 440, height: 44, properties: { variant: 'primary' } },
      { id: 'el-22', type: 'text', label: 'Transfers above $1,000 require OTP verification', x: 290, y: 430, width: 440, height: 20, properties: { variant: 'hint' } },
    ],
  },
  {
    id: 'screen-4',
    name: 'Admin Panel',
    route: '/admin',
    elements: [
      { id: 'el-23', type: 'sidebar', label: 'Admin Navigation', x: 0, y: 0, width: 240, height: 600, properties: { variant: 'dark' } },
      { id: 'el-24', type: 'header', label: 'Admin Dashboard', x: 260, y: 20, width: 500, height: 36, properties: { variant: 'h2' } },
      { id: 'el-25', type: 'card', label: 'Pending Approvals: 12', x: 260, y: 70, width: 220, height: 100, properties: { variant: 'warning' } },
      { id: 'el-26', type: 'card', label: 'Active Users: 1,247', x: 500, y: 70, width: 220, height: 100, properties: { variant: 'metric' } },
      { id: 'el-27', type: 'card', label: 'Today\'s Volume: $2.3M', x: 740, y: 70, width: 220, height: 100, properties: { variant: 'metric' } },
      { id: 'el-28', type: 'table', label: 'Pending Approval Queue', x: 260, y: 190, width: 700, height: 200, properties: { columns: 'ID, Type, User, Amount, Submitted, Action' } },
      { id: 'el-29', type: 'table', label: 'Recent Audit Log', x: 260, y: 410, width: 700, height: 180, properties: { columns: 'Timestamp, User, Action, Entity, Details' } },
    ],
  },
];

export const mockRequirements: Requirement[] = [
  {
    id: 'req-1',
    type: 'functional',
    title: 'Add Real-Time Transaction Notifications',
    businessObjective: 'Improve customer awareness of account activity and reduce fraud response time by delivering instant notifications for all transactions.',
    currentState: 'Customers can only view transactions by manually checking their account dashboard or statement. There is no push notification or real-time alerting mechanism.',
    futureState: 'Customers receive real-time notifications via WebSocket for all account transactions, with configurable notification preferences and threshold alerts.',
    userStory: 'As a banking customer, I want to receive instant notifications when transactions occur on my account, so that I can quickly detect unauthorized activity.',
    functionalRequirements: [
      'Implement WebSocket connection for authenticated users',
      'Send notification on deposit, withdrawal, and transfer events',
      'Allow users to configure notification preferences (all, above threshold, specific types)',
      'Display notification bell icon with unread count in the header',
      'Show notification panel with transaction details and timestamps',
      'Mark notifications as read individually or all at once',
      'Persist notification history for 90 days',
    ],
    technicalRequirements: [
      'Add Spring WebSocket dependency and configure STOMP broker',
      'Create NotificationService with event-driven publishing',
      'Implement WebSocket authentication using JWT tokens',
      'Add notification_preferences table to store user settings',
      'Create notifications table for persistence',
      'Add Redis pub/sub for multi-instance notification broadcasting',
      'Create React NotificationProvider context and useNotifications hook',
    ],
    nonFunctionalRequirements: [
      'Notification delivery latency < 2 seconds from transaction completion',
      'WebSocket reconnection with exponential backoff on disconnection',
      'Support minimum 5,000 concurrent WebSocket connections',
      'Notification data encrypted in transit',
    ],
    acceptanceCriteria: [
      'User receives browser notification within 2 seconds of a transaction',
      'Notification bell shows accurate unread count',
      'User can set minimum amount threshold for notifications',
      'Notifications persist across browser sessions',
      'System degrades gracefully if WebSocket is unavailable',
    ],
    testScenarios: [
      'Verify notification received on successful deposit',
      'Verify notification received on outgoing transfer',
      'Verify notification filtered when below user threshold',
      'Verify WebSocket reconnects after network interruption',
      'Load test with 5,000 concurrent WebSocket connections',
      'Verify notification persistence after page refresh',
    ],
    impactedFiles: [
      'backend/src/main/java/com/devilsvault/service/NotificationService.java (new)',
      'backend/src/main/java/com/devilsvault/config/WebSocketConfig.java (new)',
      'backend/src/main/java/com/devilsvault/service/TransactionService.java (modify)',
      'src/context/NotificationContext.tsx (new)',
      'src/components/NotificationBell.tsx (new)',
      'src/components/NotificationPanel.tsx (new)',
      'backend/src/main/resources/db/migration/V015__notifications.sql (new)',
    ],
    apiImpact: 'New WebSocket endpoint /ws/notifications. New REST endpoints: GET /api/notifications, PUT /api/notifications/:id/read, PUT /api/notifications/preferences.',
    securityImpact: 'WebSocket connections must be authenticated via JWT. Notification content must not leak to unauthorized users. Rate limiting on notification preference updates.',
    risks: ['WebSocket connection scalability under high load', 'Browser notification permission denial by users', 'Message ordering in distributed setup'],
    dependencies: ['Redis pub/sub infrastructure', 'Browser Notification API permissions'],
    openQuestions: ['Should email/SMS notifications also be included in this phase?', 'What is the retention policy for notification history?', 'Should admin users receive notifications for pending approvals?'],
    complexity: 'high',
    status: 'approved',
  },
  {
    id: 'req-2',
    type: 'technical',
    title: 'Implement API Rate Limiting',
    businessObjective: 'Protect the banking platform from abuse, brute force attacks, and denial of service by implementing intelligent rate limiting on all API endpoints.',
    currentState: 'No rate limiting exists on any API endpoint. The system is vulnerable to brute force login attempts and API abuse.',
    futureState: 'All API endpoints have configurable rate limits with different tiers for authenticated and unauthenticated requests, with proper 429 responses and retry headers.',
    userStory: 'As a security engineer, I want API rate limiting in place so that the system is protected from abuse and denial of service attacks.',
    functionalRequirements: [
      'Implement sliding window rate limiting per IP for unauthenticated endpoints',
      'Implement token bucket rate limiting per user for authenticated endpoints',
      'Return 429 Too Many Requests with Retry-After header when limit exceeded',
      'Different rate limits per endpoint category (auth: strict, read: moderate, write: conservative)',
      'Admin API to view and manage rate limit configurations',
      'Whitelist capability for internal services',
    ],
    technicalRequirements: [
      'Add Bucket4j library with Redis backend for distributed rate limiting',
      'Create RateLimitFilter as Spring Security filter',
      'Store rate limit counters in Redis with TTL',
      'Create rate_limit_config table for dynamic configuration',
      'Implement RateLimitService for centralized limit management',
      'Add rate limit headers to all responses (X-RateLimit-Remaining, X-RateLimit-Reset)',
    ],
    nonFunctionalRequirements: [
      'Rate limit check latency < 5ms per request',
      'Rate limiting must work correctly across multiple application instances',
      'Configuration changes must take effect within 30 seconds',
    ],
    acceptanceCriteria: [
      'Login endpoint limited to 5 attempts per minute per IP',
      'Authenticated API limited to 100 requests per minute per user',
      'Rate limit response includes proper 429 status and Retry-After header',
      'Rate limits enforced consistently across all application instances',
      'Admin can modify rate limits without redeployment',
    ],
    testScenarios: [
      'Verify 429 response after exceeding login rate limit',
      'Verify rate limit resets after the configured window',
      'Verify distributed rate limiting across two application instances',
      'Verify whitelisted IP bypasses rate limits',
      'Load test rate limit filter performance overhead',
    ],
    impactedFiles: [
      'backend/src/main/java/com/devilsvault/security/RateLimitFilter.java (new)',
      'backend/src/main/java/com/devilsvault/service/RateLimitService.java (new)',
      'backend/src/main/java/com/devilsvault/config/SecurityConfig.java (modify)',
      'backend/src/main/resources/db/migration/V016__rate_limits.sql (new)',
      'backend/pom.xml (modify - add Bucket4j)',
    ],
    apiImpact: 'All existing endpoints will include rate limit headers. New admin endpoints: GET /api/admin/rate-limits, PUT /api/admin/rate-limits/:endpoint.',
    securityImpact: 'Directly addresses critical security vulnerability. Must ensure rate limiting cannot be bypassed via header manipulation.',
    risks: ['False positives for legitimate high-volume users', 'Redis failure impacting all API requests'],
    dependencies: ['Redis infrastructure availability', 'Spring Security filter chain configuration'],
    openQuestions: ['Should rate limits differ for premium vs standard customers?', 'What alerting should trigger when rate limits are frequently hit?'],
    complexity: 'medium',
    status: 'ready',
  },
];

export const mockExecutionPackage: ExecutionPackage = {
  id: 'exec-1',
  title: 'Implement Real-Time Transaction Notifications',
  context: 'DevilsVault banking application currently lacks real-time notification capabilities. Customers must manually check their dashboard to see transaction activity. This feature adds WebSocket-based real-time notifications with configurable preferences, improving security awareness and user experience.',
  affectedComponents: [
    'Backend: TransactionService (event publishing)',
    'Backend: New NotificationService and WebSocketConfig',
    'Frontend: New NotificationContext, NotificationBell, NotificationPanel',
    'Database: New notifications and notification_preferences tables',
    'Infrastructure: Redis pub/sub configuration',
  ],
  implementationPlan: [
    'Step 1: Create database migration V015__notifications.sql with notifications and notification_preferences tables',
    'Step 2: Add Spring WebSocket and STOMP dependencies to pom.xml',
    'Step 3: Create WebSocketConfig.java with STOMP broker configuration and JWT authentication',
    'Step 4: Create NotificationService.java with event publishing, persistence, and preference checking',
    'Step 5: Modify TransactionService.java to emit transaction events after successful completion',
    'Step 6: Create NotificationController.java for REST endpoints (list, mark read, preferences)',
    'Step 7: Create React NotificationContext.tsx with WebSocket connection management',
    'Step 8: Create NotificationBell.tsx component with unread count badge',
    'Step 9: Create NotificationPanel.tsx with notification list and actions',
    'Step 10: Add notification preferences to user settings page',
    'Step 11: Configure Redis pub/sub for multi-instance broadcasting',
    'Step 12: Write unit tests for NotificationService',
    'Step 13: Write integration tests for WebSocket flow',
    'Step 14: Write E2E test for full notification lifecycle',
  ],
  acceptanceCriteria: [
    'Notification appears within 2 seconds of transaction completion',
    'Unread count badge updates in real-time',
    'User can configure notification threshold amount',
    'Notifications persist in database and survive page refresh',
    'WebSocket reconnects automatically after disconnection',
    'System works correctly with multiple backend instances',
  ],
  testPlan: [
    'Unit: NotificationService.createNotification() persists correctly',
    'Unit: NotificationService.shouldNotify() respects user preferences',
    'Unit: WebSocket authentication rejects invalid JWT',
    'Integration: Transaction creation triggers WebSocket notification',
    'Integration: Notification preferences filter correctly',
    'E2E: User receives notification after peer-to-peer transfer',
    'E2E: User configures threshold and verifies filtering',
    'Performance: 5,000 concurrent WebSocket connections with 100 notifications/second',
  ],
  suggestedBranch: 'feature/real-time-notifications',
  prDescription: `## Real-Time Transaction Notifications

### Summary
Implements WebSocket-based real-time notifications for transaction events, enabling customers to receive instant alerts for account activity.

### Changes
- **Backend**: Added WebSocket/STOMP configuration, NotificationService, and REST endpoints
- **Frontend**: New NotificationContext, NotificationBell, and NotificationPanel components
- **Database**: Migration V015 adds notifications and notification_preferences tables
- **Infrastructure**: Redis pub/sub for multi-instance support

### Testing
- Unit tests for NotificationService and WebSocket auth
- Integration tests for transaction-to-notification flow
- E2E tests for full notification lifecycle
- Performance tested with 5,000 concurrent connections

### Security
- WebSocket connections authenticated via JWT
- Notification data scoped to authenticated user only
- Rate limiting on preference update endpoints`,
  rollbackConsiderations: [
    'WebSocket feature can be disabled via feature flag without data loss',
    'Database migration is additive (new tables only) - safe to keep even if feature is rolled back',
    'Frontend notification components isolated - can be hidden via feature flag',
    'Redis pub/sub configuration is independent - no impact on existing Redis usage',
  ],
  openQuestions: [
    'Should email/SMS notifications be included in this phase?',
    'What is the retention policy for notification history?',
    'Should admin users receive notifications for pending approvals?',
    'Is there a mobile app that needs push notification integration?',
  ],
  requirements: mockRequirements,
};
