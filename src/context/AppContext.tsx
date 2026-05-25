import { useState, useCallback, type ReactNode } from 'react';
import type { Requirement, ChangeProposal } from '../types';
import type { IntakeMode, IntakeData } from '../types/business';
import { mockApplicationSummary, mockUIScreens, mockRequirements, mockExecutionPackage, mockTechStack, mockFileCategories } from '../data/mockData';
import { demoIntakeData, demoAnalysisResult, demoRequirementPack } from '../data/businessMockData';
import { AppContext } from './AppContextValue';
import type { AppState } from './AppContextValue';

const initialState: AppState = {
  repository: null,
  techStack: null,
  fileCategories: [],
  summary: null,
  screens: [],
  requirements: [],
  executionPackage: null,
  changeProposals: [],
  appMode: null,
  analysisStep: 0,
  isAnalyzing: false,
  intakeMode: null,
  intakeData: null,
  analysisResult: null,
  requirementPack: null,
  agentAnalysisStep: 0,
  isAgentAnalyzing: false,
  analysisComplete: false,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const connectRepository = useCallback((url: string, branch: string) => {
    const repoName = url.split('/').pop()?.replace('.git', '') ?? 'repository';
    setState(prev => ({
      ...prev,
      repository: { id: 'repo-1', name: repoName, url, branch, status: 'analyzing' },
      isAnalyzing: true,
      analysisStep: 1,
    }));

    const steps = [
      { step: 2, delay: 800 },
      { step: 3, delay: 1600 },
      { step: 4, delay: 2400 },
      { step: 5, delay: 3200 },
    ];

    for (const { step, delay } of steps) {
      setTimeout(() => {
        setState(prev => ({ ...prev, analysisStep: step }));
      }, delay);
    }

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        repository: prev.repository ? { ...prev.repository, status: 'completed' } : null,
        techStack: mockTechStack,
        fileCategories: mockFileCategories,
        summary: mockApplicationSummary,
        screens: mockUIScreens,
        requirements: [...mockRequirements],
        appMode: mockApplicationSummary.hasUI ? 'ui' : 'non-ui',
        isAnalyzing: false,
        analysisStep: 6,
      }));
    }, 4000);
  }, []);

  const addRequirement = useCallback((req: Requirement) => {
    setState(prev => ({ ...prev, requirements: [...prev.requirements, req] }));
  }, []);

  const updateRequirement = useCallback((id: string, updates: Partial<Requirement>) => {
    setState(prev => ({
      ...prev,
      requirements: prev.requirements.map(r => r.id === id ? { ...r, ...updates } : r),
    }));
  }, []);

  const removeRequirement = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      requirements: prev.requirements.filter(r => r.id !== id),
    }));
  }, []);

  const addChangeProposal = useCallback((proposal: ChangeProposal) => {
    setState(prev => ({ ...prev, changeProposals: [...prev.changeProposals, proposal] }));
  }, []);

  const generateExecutionPackage = useCallback(() => {
    setState(prev => ({ ...prev, executionPackage: mockExecutionPackage }));
  }, []);

  const resetAnalysis = useCallback(() => {
    setState(initialState);
  }, []);

  const setIntakeMode = useCallback((mode: IntakeMode) => {
    setState(prev => ({ ...prev, intakeMode: mode }));
  }, []);

  const submitIntake = useCallback((data: IntakeData) => {
    setState(prev => ({ ...prev, intakeData: data }));
  }, []);

  const startAgentAnalysis = useCallback(() => {
    setState(prev => ({ ...prev, isAgentAnalyzing: true, agentAnalysisStep: 0 }));

    const totalSteps = 6;
    for (let i = 1; i <= totalSteps; i++) {
      setTimeout(() => {
        setState(prev => ({ ...prev, agentAnalysisStep: i }));
      }, i * 1800);
    }

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        isAgentAnalyzing: false,
        analysisComplete: true,
        analysisResult: demoAnalysisResult,
        requirementPack: demoRequirementPack,
      }));
    }, (totalSteps + 1) * 1800);
  }, []);

  const loadDemoScenario = useCallback(() => {
    setState(prev => ({
      ...prev,
      intakeMode: 'business',
      intakeData: demoIntakeData,
      analysisResult: demoAnalysisResult,
      requirementPack: demoRequirementPack,
      analysisComplete: true,
      agentAnalysisStep: 6,
    }));
  }, []);

  const resetAll = useCallback(() => {
    setState(initialState);
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        connectRepository,
        addRequirement,
        updateRequirement,
        removeRequirement,
        addChangeProposal,
        generateExecutionPackage,
        resetAnalysis,
        setIntakeMode,
        submitIntake,
        startAgentAnalysis,
        loadDemoScenario,
        resetAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
