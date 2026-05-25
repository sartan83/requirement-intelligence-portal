export interface Repository {
  id: string;
  name: string;
  url: string;
  branch: string;
  status: 'pending' | 'analyzing' | 'completed' | 'error';
}

export interface TechStack {
  languages: { name: string; percentage: number }[];
  frameworks: string[];
  databases: string[];
  buildTools: string[];
  testing: string[];
  deployment: string[];
}

export interface FileCategory {
  category: string;
  count: number;
  files: string[];
}

export interface ApplicationSummary {
  purpose: string;
  modules: FunctionalModule[];
  technicalComponents: TechnicalComponent[];
  userJourneys: UserJourney[];
  apiEndpoints: ApiEndpoint[];
  dataEntities: DataEntity[];
  externalDependencies: ExternalDependency[];
  authMechanism: AuthMechanism | null;
  testCoverage: TestCoverage;
  technicalDebt: TechnicalDebtItem[];
  hasUI: boolean;
}

export interface FunctionalModule {
  id: string;
  name: string;
  description: string;
  status: 'healthy' | 'warning' | 'critical';
  files: string[];
}

export interface TechnicalComponent {
  id: string;
  name: string;
  type: 'frontend' | 'backend' | 'database' | 'integration' | 'infrastructure';
  description: string;
  technology: string;
}

export interface UserJourney {
  id: string;
  name: string;
  steps: string[];
  screens: string[];
}

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  module: string;
}

export interface DataEntity {
  name: string;
  fields: { name: string; type: string; nullable: boolean }[];
  relationships: string[];
}

export interface ExternalDependency {
  name: string;
  type: 'npm' | 'maven' | 'pip' | 'api' | 'service';
  version: string;
  purpose: string;
}

export interface AuthMechanism {
  type: string;
  provider: string;
  features: string[];
}

export interface TestCoverage {
  unit: number;
  integration: number;
  e2e: number;
  missingAreas: string[];
}

export interface TechnicalDebtItem {
  id: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendation: string;
}

export interface UIScreen {
  id: string;
  name: string;
  route: string;
  elements: UIElement[];
}

export interface UIElement {
  id: string;
  type: 'header' | 'nav' | 'form' | 'table' | 'button' | 'input' | 'card' | 'list' | 'text' | 'sidebar' | 'modal';
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  properties: Record<string, string>;
}

export interface Requirement {
  id: string;
  type: 'business' | 'functional' | 'technical' | 'non-functional';
  title: string;
  businessObjective: string;
  currentState: string;
  futureState: string;
  userStory: string;
  functionalRequirements: string[];
  technicalRequirements: string[];
  nonFunctionalRequirements: string[];
  acceptanceCriteria: string[];
  testScenarios: string[];
  impactedFiles: string[];
  apiImpact: string;
  securityImpact: string;
  risks: string[];
  dependencies: string[];
  openQuestions: string[];
  complexity: 'low' | 'medium' | 'high' | 'very-high';
  status: 'draft' | 'review' | 'approved' | 'ready';
}

export interface ExecutionPackage {
  id: string;
  title: string;
  context: string;
  affectedComponents: string[];
  implementationPlan: string[];
  acceptanceCriteria: string[];
  testPlan: string[];
  suggestedBranch: string;
  prDescription: string;
  rollbackConsiderations: string[];
  openQuestions: string[];
  requirements: Requirement[];
}

export interface ChangeProposal {
  id: string;
  componentId: string;
  componentName: string;
  description: string;
  changeType: 'add' | 'modify' | 'remove' | 'refactor';
}

export type AppMode = 'ui' | 'non-ui';
