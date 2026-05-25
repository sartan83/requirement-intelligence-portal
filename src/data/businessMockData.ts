import type { IntakeData, AnalysisResult, RequirementPack, AgentStatus } from '../types/business';

export const demoIntakeData: IntakeData = {
  mode: 'business',
  textInput: 'Our customer onboarding journey has high drop-off during document upload and manual approval. We want to reduce abandonment, accelerate approval time and improve compliance controls.',
  guidedAnswers: {
    businessOutcome: 'Reduce customer onboarding drop-off rate from 35% to under 10%, cut average approval time from 3 days to under 4 hours.',
    impactedUsers: 'Retail customers, operations team, compliance officers, customer success managers.',
    currentProblem: 'Document upload fails silently on mobile, customers cannot resume incomplete onboarding, approval queue has no SLA visibility, compliance checks are manual and slow.',
    successCriteria: 'Onboarding completion rate above 90%, average approval time under 4 hours, zero compliance gaps in audit, real-time status visibility for all stakeholders.',
    constraints: 'Must comply with KYC/AML regulations. Go-live target: Q3 2026. Cannot disrupt existing customer accounts.',
  },
  uploadedFiles: [
    { name: 'onboarding-call-recording.mp3', type: 'audio', size: '4.2 MB' },
    { name: 'current-flow-screenshot.png', type: 'image', size: '890 KB' },
    { name: 'process-diagram.png', type: 'image', size: '1.2 MB' },
    { name: 'onboarding-requirements-v2.pdf', type: 'document', size: '2.1 MB' },
  ],
  repositoryUrl: 'https://github.com/sartan83/online-banking-application',
  repositoryBranch: 'main',
};

export const demoAgentStatuses: AgentStatus[] = [
  {
    id: 'agent-1',
    name: 'Business Intent Agent',
    role: 'Extracts objectives, stakeholders, pain points, value drivers and success metrics.',
    icon: 'Target',
    steps: [
      'Extracting key business objectives...',
      'Identifying stakeholders and impacted users...',
      'Mapping pain points and value drivers...',
      'Defining success metrics...',
      'Business intent analysis complete.',
    ],
  },
  {
    id: 'agent-2',
    name: 'Process Analysis Agent',
    role: 'Identifies impacted business processes, user journeys and operational gaps.',
    icon: 'GitBranch',
    steps: [
      'Mapping current onboarding journey...',
      'Identifying process bottlenecks...',
      'Analyzing user journey drop-off points...',
      'Detecting operational gaps...',
      'Process analysis complete.',
    ],
  },
  {
    id: 'agent-3',
    name: 'Technical Impact Agent',
    role: 'Analyzes repositories, application structure, APIs, dependencies and system constraints.',
    icon: 'Code',
    steps: [
      'Scanning repository structure...',
      'Analyzing document upload service...',
      'Mapping API dependencies...',
      'Identifying impacted components...',
      'Technical impact assessment complete.',
    ],
  },
  {
    id: 'agent-4',
    name: 'Risk & Compliance Agent',
    role: 'Maps regulatory, security, privacy, resilience and operational risks.',
    icon: 'Shield',
    steps: [
      'Evaluating KYC/AML compliance requirements...',
      'Assessing data privacy implications...',
      'Analyzing security constraints...',
      'Mapping operational risks...',
      'Risk and compliance analysis complete.',
    ],
  },
  {
    id: 'agent-5',
    name: 'Requirement Generation Agent',
    role: 'Creates functional requirements, technical requirements, user stories and acceptance criteria.',
    icon: 'ClipboardList',
    steps: [
      'Generating functional requirements...',
      'Creating technical requirements...',
      'Writing user stories with acceptance criteria...',
      'Cross-referencing with evidence...',
      'Requirement generation complete.',
    ],
  },
  {
    id: 'agent-6',
    name: 'Delivery Planning Agent',
    role: 'Produces implementation options, effort estimate, dependencies, test strategy and handoff package.',
    icon: 'Truck',
    steps: [
      'Defining MVP scope and phases...',
      'Estimating implementation complexity...',
      'Planning test strategy...',
      'Building delivery timeline...',
      'Delivery plan complete.',
    ],
  },
];

export const demoMediaAnalysis = {
  audio: {
    title: 'onboarding-call-recording.mp3',
    transcriptSummary: 'Product owner and operations lead discussing onboarding pain points. Key themes: mobile upload failures, lack of status visibility, manual approval bottleneck.',
    extractedObjectives: [
      'Reduce document upload failures on mobile devices',
      'Provide real-time onboarding status to customers',
      'Automate routing of standard applications',
    ],
    decisionsCaputred: [
      'Prioritize mobile upload fix for Q3',
      'Add push notifications for status changes',
      'Implement auto-approval for low-risk applications',
    ],
    painPoints: [
      '35% drop-off rate during document upload',
      'Average 3-day approval cycle',
      'No visibility into pending application status',
      'Manual compliance checks causing delays',
    ],
    unresolvedQuestions: [
      'Should we support biometric identity verification?',
      'What is the threshold for auto-approval eligibility?',
    ],
  },
  images: [
    {
      title: 'current-flow-screenshot.png',
      detectedType: 'Application Screenshot',
      extractedElements: ['Document upload form', 'File type restrictions', 'Error state handling', 'Progress indicator'],
      possibleImpact: 'Upload flow needs redesign for mobile responsiveness and error recovery',
      requirements: ['Improve error messaging', 'Add drag-and-drop support', 'Enable resume of partial uploads'],
    },
    {
      title: 'process-diagram.png',
      detectedType: 'Process Diagram',
      extractedElements: ['Application submission', 'Document verification', 'Manual review queue', 'Approval decision', 'Account activation'],
      possibleImpact: 'Manual review step is the primary bottleneck in the process',
      requirements: ['Add auto-routing logic', 'Implement SLA monitoring', 'Create escalation workflow'],
    },
  ],
  documents: [
    {
      title: 'onboarding-requirements-v2.pdf',
      keySections: ['Current state analysis', 'Regulatory requirements', 'Target state design', 'Acceptance criteria'],
      extractedRequirements: ['Support KYC document types: passport, ID card, utility bill', 'Retain documents for 7 years per regulation', 'Enable audit trail for all approval decisions'],
      risksAndConstraints: ['Must integrate with existing identity verification provider', 'Cannot change data retention policies without legal review'],
      missingInformation: ['Specific SLA targets for each approval stage', 'Budget constraints for implementation'],
    },
  ],
};

export const demoAnalysisResult: AnalysisResult = {
  executiveSummary: {
    businessObjective: 'Reduce customer onboarding drop-off and accelerate approval time while maintaining compliance standards.',
    currentProblem: 'High abandonment during document upload (35% drop-off), slow manual approval process (avg 3 days), no real-time status visibility for customers or operations.',
    expectedOutcome: 'Onboarding completion rate above 90%, approval time under 4 hours, zero compliance gaps, full audit trail and operational visibility.',
    impactedStakeholders: ['Retail customers', 'Operations team', 'Compliance officers', 'Customer success managers', 'IT engineering team'],
    valueHypothesis: 'Reducing onboarding friction directly increases customer acquisition, reduces operational cost per customer, and improves compliance posture.',
    urgency: 'Q3 2026 go-live target. Regulatory audit expected in Q4 2026.',
    confidenceScore: 87,
  },
  businessRequirements: {
    capabilities: [
      'Self-service document upload with mobile optimization',
      'Automated application routing and pre-screening',
      'Real-time status tracking for all stakeholders',
      'SLA monitoring and escalation management',
      'Compliance-ready audit trail',
    ],
    processChanges: [
      'Replace manual document review with automated validation for standard cases',
      'Introduce risk-based routing: auto-approve low-risk, escalate high-risk',
      'Add SLA-driven escalation workflow for pending approvals',
      'Enable customers to resume incomplete applications',
    ],
    userGroups: [
      { group: 'Retail Customers', impact: 'Faster, more reliable onboarding experience with status visibility' },
      { group: 'Operations Team', impact: 'Reduced manual workload, SLA-driven queue management' },
      { group: 'Compliance Officers', impact: 'Automated compliance checks, complete audit trail' },
      { group: 'Customer Success', impact: 'Proactive intervention for at-risk applications' },
    ],
    successMetrics: [
      'Onboarding completion rate > 90% (from 65%)',
      'Average approval time < 4 hours (from 3 days)',
      'Document upload success rate > 98% on mobile',
      'Zero compliance findings in next audit',
      'Operations team handles 3x volume with same headcount',
    ],
    businessRules: [
      'Applications with all documents validated auto-advance to approval',
      'High-value accounts ($50K+) always require manual review',
      'Incomplete applications expire after 30 days with reminder at 7, 14, 21 days',
      'All approval decisions must be logged with reason and timestamp',
    ],
    openQuestions: [
      'What is the maximum acceptable auto-approval threshold?',
      'Should biometric identity verification be included in MVP?',
      'Are there specific document types that must always require manual review?',
    ],
  },
};

export const demoRequirementPack: RequirementPack = {
  functionalRequirements: [
    { id: 'FR-001', description: 'Allow customers to resume incomplete onboarding applications', userRole: 'Retail Customer', priority: 'high', rationale: 'Reduces drop-off caused by session interruption', acceptanceCriteria: ['Customer can return to exact step where they left off', 'Partial data preserved for 30 days', 'Progress indicator shows completion status'] },
    { id: 'FR-002', description: 'Improve document upload with drag-and-drop, mobile camera capture, and real-time validation', userRole: 'Retail Customer', priority: 'high', rationale: '35% drop-off occurs during document upload', acceptanceCriteria: ['Upload works on iOS Safari and Android Chrome', 'File validation happens before upload completes', 'Clear error messages with corrective actions'] },
    { id: 'FR-003', description: 'Add real-time onboarding status visibility for customers', userRole: 'Retail Customer', priority: 'high', rationale: 'Customers cannot see progress of their application', acceptanceCriteria: ['Status page accessible without login', 'Push notifications for status changes', 'Estimated time to completion shown'] },
    { id: 'FR-004', description: 'Implement automated routing of applications based on risk score', userRole: 'System', priority: 'high', rationale: 'Manual routing causes 3-day bottleneck', acceptanceCriteria: ['Low-risk applications auto-advance within 1 hour', 'High-risk applications flagged for manual review', 'Routing rules configurable by compliance team'] },
    { id: 'FR-005', description: 'Add SLA monitoring dashboard for operations team', userRole: 'Operations Team', priority: 'medium', rationale: 'No visibility into approval queue health', acceptanceCriteria: ['Real-time queue depth and aging metrics', 'Automatic escalation when SLA threshold breached', 'Filterable by application type and risk level'] },
    { id: 'FR-006', description: 'Notify operations when SLA thresholds are breached', userRole: 'Operations Team', priority: 'medium', rationale: 'Breached SLAs go unnoticed until customer complaints', acceptanceCriteria: ['Email and in-app notification at 80% SLA threshold', 'Escalation to manager at 100% SLA threshold', 'Configurable thresholds per application type'] },
    { id: 'FR-007', description: 'Generate compliance audit trail for all onboarding decisions', userRole: 'Compliance Officer', priority: 'high', rationale: 'Regulatory audit expected Q4 2026', acceptanceCriteria: ['Every approval/rejection logged with reason, user, timestamp', 'Audit reports exportable in CSV and PDF', 'Immutable audit records that cannot be modified'] },
    { id: 'FR-008', description: 'Automate document validation for standard KYC document types', userRole: 'System', priority: 'medium', rationale: 'Manual document validation is the largest time cost', acceptanceCriteria: ['Auto-validate passport, ID card, utility bill formats', 'Flag unclear or expired documents for manual review', 'Validation results visible to operations team'] },
  ],
  technicalRequirements: {
    systemsImpacted: ['Document Upload Service', 'Application Processing Engine', 'Notification Service', 'Admin Dashboard', 'Audit Logging Service', 'Customer Portal'],
    apiIntegrations: [
      'POST /api/onboarding/resume — Resume incomplete application',
      'PUT /api/documents/upload — Enhanced multipart upload with validation',
      'GET /api/onboarding/{id}/status — Real-time application status',
      'POST /api/routing/evaluate — Risk-based application routing',
      'GET /api/operations/queue — SLA monitoring dashboard data',
      'POST /api/notifications/sla-breach — SLA breach notification trigger',
    ],
    dataImplications: [
      'New table: onboarding_sessions (tracks partial application state)',
      'New table: routing_rules (configurable risk-based routing)',
      'New columns on applications: risk_score, auto_approval_eligible, sla_deadline',
      'Audit log schema extension for compliance reporting',
    ],
    architectureConsiderations: [
      'Document upload service needs horizontal scaling for mobile traffic spikes',
      'Status polling should use WebSocket or SSE to reduce API load',
      'Routing engine should be a separate microservice for independent scaling',
      'Audit trail must use append-only storage (immutable)',
    ],
    nfRequirements: [
      'Document upload: max 10MB per file, response time < 3s on 3G',
      'Status API: 99.9% availability, response time < 200ms',
      'Audit trail: zero data loss guarantee, 7-year retention',
      'SLA monitoring: real-time updates within 30 seconds',
    ],
    securityConstraints: [
      'Documents encrypted at rest (AES-256) and in transit (TLS 1.3)',
      'PII data masked in logs and audit trails',
      'Role-based access to compliance reports',
      'GDPR: right to erasure support for customer data',
    ],
  },
  userStories: [
    { id: 'US-001', story: 'As a retail customer, I want to resume my incomplete onboarding application, so that I don\'t have to start over if I get interrupted.', priority: 'high', acceptanceCriteria: ['Application state saved automatically every 30 seconds', 'Resume link sent via email after 1 hour of inactivity', 'All previously entered data pre-populated on return'], dependencies: ['FR-001', 'Onboarding session storage'], risks: ['Data consistency if schema changes between sessions'], testCases: ['Start onboarding, close browser, return and verify data preserved', 'Resume after 29 days (within retention)', 'Attempt resume after 31 days (expired)'] },
    { id: 'US-002', story: 'As a retail customer, I want clear feedback when my document upload fails, so that I can fix the issue and complete onboarding.', priority: 'high', acceptanceCriteria: ['Specific error message for each failure type', 'Suggested corrective action shown', 'Option to try again without re-entering other data'], dependencies: ['FR-002', 'Document validation service'], risks: ['Mobile browser compatibility variations'], testCases: ['Upload corrupted file and verify error message', 'Upload oversized file and verify size limit message', 'Upload wrong format and verify format guidance'] },
    { id: 'US-003', story: 'As an operations team member, I want to see a dashboard of pending applications with SLA status, so that I can prioritize my review queue.', priority: 'medium', acceptanceCriteria: ['Queue sorted by SLA urgency by default', 'Filter by risk level, application type, age', 'Color coding: green (on track), yellow (at risk), red (breached)'], dependencies: ['FR-005', 'FR-006', 'Routing engine'], risks: ['Performance with large queue volumes'], testCases: ['Verify queue shows real-time updates', 'Verify SLA color coding matches thresholds', 'Verify escalation triggers at correct thresholds'] },
    { id: 'US-004', story: 'As a compliance officer, I want to generate audit reports for all onboarding decisions, so that I can demonstrate regulatory compliance.', priority: 'high', acceptanceCriteria: ['Reports filterable by date range, decision type, reviewer', 'Export to CSV and PDF', 'Includes decision reason, timestamp, and reviewer ID'], dependencies: ['FR-007', 'Audit logging service'], risks: ['Report generation performance for large date ranges'], testCases: ['Generate report for last 30 days', 'Verify all decision types included', 'Verify immutability of audit records'] },
    { id: 'US-005', story: 'As a retail customer, I want to see real-time status of my onboarding application, so that I know what to expect and when.', priority: 'high', acceptanceCriteria: ['Status page shows current step and estimated completion', 'Push notification sent on status changes', 'No login required to check status (magic link)'], dependencies: ['FR-003', 'Notification service'], risks: ['Security of magic links', 'Notification delivery reliability'], testCases: ['Submit application and verify status page updates', 'Verify push notification received on status change', 'Verify estimated time updates accurately'] },
  ],
  riskDependencyMap: {
    technicalDeps: ['Document upload service refactoring', 'Notification service integration', 'Identity verification provider API availability', 'Database migration for new tables'],
    businessDeps: ['Compliance team sign-off on auto-approval rules', 'Operations team training on new SLA dashboard', 'Customer communication about new onboarding flow'],
    complianceRisks: ['Auto-approval rules must be validated by legal', 'Document retention changes require DPO review', 'Audit trail design must pass pre-audit review'],
    deliveryRisks: ['Mobile upload compatibility across device ecosystem', 'Integration complexity with existing identity verification provider', 'Data migration for in-flight applications during cutover'],
    dataRisks: ['PII exposure during document processing', 'Data consistency during partial application resume', 'Audit log integrity under high concurrency'],
    operationalRisks: ['Operations team capacity during transition period', 'Fallback process if automated routing fails', 'Monitoring gaps during initial deployment'],
  },
  deliveryPlan: {
    recommendedPath: 'Phased implementation starting with document upload improvements and application resume, followed by automated routing and SLA monitoring.',
    mvpScope: [
      'Resumable onboarding applications',
      'Improved document upload (mobile-optimized, validation)',
      'Real-time status page for customers',
      'Basic audit trail for compliance',
    ],
    outOfScope: [
      'Biometric identity verification',
      'Multi-language support',
      'Integration with external credit scoring',
      'Legacy JSP layer modernization',
    ],
    estimatedComplexity: 'Medium-High',
    phases: [
      { name: 'Phase 1 — Foundation (4 weeks)', items: ['Document upload redesign', 'Application resume capability', 'Status tracking API', 'Basic audit logging'] },
      { name: 'Phase 2 — Automation (3 weeks)', items: ['Risk-based routing engine', 'Auto-approval for standard cases', 'SLA monitoring dashboard', 'Notification integration'] },
      { name: 'Phase 3 — Compliance & Polish (2 weeks)', items: ['Compliance reporting', 'Escalation workflows', 'Mobile optimization', 'Performance testing and hardening'] },
    ],
    testStrategy: [
      'Unit tests for routing logic and validation rules',
      'Integration tests for document upload pipeline',
      'E2E tests for complete onboarding journey',
      'Performance tests for mobile upload under 3G conditions',
      'Security penetration testing for document handling',
      'Compliance test: simulate regulatory audit scenario',
    ],
    rollbackConsiderations: [
      'Feature flags for all new capabilities',
      'Database migrations must be backward-compatible',
      'Maintain legacy upload endpoint during transition',
      'Runbook for reverting to manual approval process',
    ],
  },
};
