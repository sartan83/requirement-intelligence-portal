import { createContext } from 'react';
import type { Repository, ApplicationSummary, UIScreen, Requirement, ExecutionPackage, ChangeProposal, AppMode, TechStack, FileCategory } from '../types';
import type { IntakeMode, IntakeData, AnalysisResult, RequirementPack } from '../types/business';

export interface AppState {
  // Legacy IT-led state
  repository: Repository | null;
  techStack: TechStack | null;
  fileCategories: FileCategory[];
  summary: ApplicationSummary | null;
  screens: UIScreen[];
  requirements: Requirement[];
  executionPackage: ExecutionPackage | null;
  changeProposals: ChangeProposal[];
  appMode: AppMode | null;
  analysisStep: number;
  isAnalyzing: boolean;

  // New business-first state
  intakeMode: IntakeMode | null;
  intakeData: IntakeData | null;
  analysisResult: AnalysisResult | null;
  requirementPack: RequirementPack | null;
  agentAnalysisStep: number;
  isAgentAnalyzing: boolean;
  analysisComplete: boolean;
}

export interface AppContextValue extends AppState {
  connectRepository: (url: string, branch: string) => void;
  addRequirement: (req: Requirement) => void;
  updateRequirement: (id: string, req: Partial<Requirement>) => void;
  removeRequirement: (id: string) => void;
  addChangeProposal: (proposal: ChangeProposal) => void;
  generateExecutionPackage: () => void;
  resetAnalysis: () => void;

  // New business-first actions
  setIntakeMode: (mode: IntakeMode) => void;
  submitIntake: (data: IntakeData) => void;
  startAgentAnalysis: () => void;
  loadDemoScenario: () => void;
  resetAll: () => void;
}

export const AppContext = createContext<AppContextValue | null>(null);
