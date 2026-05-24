import { createContext } from 'react';
import type { Repository, ApplicationSummary, UIScreen, Requirement, ExecutionPackage, ChangeProposal, AppMode, TechStack, FileCategory } from '../types';

export interface AppState {
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
}

export interface AppContextValue extends AppState {
  connectRepository: (url: string, branch: string) => void;
  addRequirement: (req: Requirement) => void;
  updateRequirement: (id: string, req: Partial<Requirement>) => void;
  removeRequirement: (id: string) => void;
  addChangeProposal: (proposal: ChangeProposal) => void;
  generateExecutionPackage: () => void;
  resetAnalysis: () => void;
}

export const AppContext = createContext<AppContextValue | null>(null);
