export type IntakeMode = 'business' | 'it';

export interface UploadedFile {
  name: string;
  type: 'audio' | 'video' | 'image' | 'document';
  size: string;
}

export interface GuidedAnswers {
  businessOutcome: string;
  impactedUsers: string;
  currentProblem: string;
  successCriteria: string;
  constraints: string;
}

export interface IntakeData {
  mode: IntakeMode;
  textInput: string;
  guidedAnswers: GuidedAnswers;
  uploadedFiles: UploadedFile[];
  repositoryUrl?: string;
  repositoryBranch?: string;
}

export interface AgentStatus {
  id: string;
  name: string;
  role: string;
  icon: string;
  steps: string[];
}

export interface ExecutiveSummary {
  businessObjective: string;
  currentProblem: string;
  expectedOutcome: string;
  impactedStakeholders: string[];
  valueHypothesis: string;
  urgency: string;
  confidenceScore: number;
}

export interface UserGroupImpact {
  group: string;
  impact: string;
}

export interface BusinessRequirements {
  capabilities: string[];
  processChanges: string[];
  userGroups: UserGroupImpact[];
  successMetrics: string[];
  businessRules: string[];
  openQuestions: string[];
}

export interface FunctionalReq {
  id: string;
  description: string;
  userRole: string;
  priority: 'high' | 'medium' | 'low';
  rationale: string;
  acceptanceCriteria: string[];
}

export interface TechnicalReqs {
  systemsImpacted: string[];
  apiIntegrations: string[];
  dataImplications: string[];
  architectureConsiderations: string[];
  nfRequirements: string[];
  securityConstraints: string[];
}

export interface UserStory {
  id: string;
  story: string;
  priority: 'high' | 'medium' | 'low';
  acceptanceCriteria: string[];
  dependencies: string[];
  risks: string[];
  testCases: string[];
}

export interface RiskDependencyMap {
  technicalDeps: string[];
  businessDeps: string[];
  complianceRisks: string[];
  deliveryRisks: string[];
  dataRisks: string[];
  operationalRisks: string[];
}

export interface DeliveryPhase {
  name: string;
  items: string[];
}

export interface DeliveryPlan {
  recommendedPath: string;
  mvpScope: string[];
  outOfScope: string[];
  estimatedComplexity: string;
  phases: DeliveryPhase[];
  testStrategy: string[];
  rollbackConsiderations: string[];
}

export interface RequirementPack {
  functionalRequirements: FunctionalReq[];
  technicalRequirements: TechnicalReqs;
  userStories: UserStory[];
  riskDependencyMap: RiskDependencyMap;
  deliveryPlan: DeliveryPlan;
}

export interface AnalysisResult {
  executiveSummary: ExecutiveSummary;
  businessRequirements: BusinessRequirements;
}
