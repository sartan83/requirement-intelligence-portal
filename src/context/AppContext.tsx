import { useState, useCallback, type ReactNode } from 'react';
import type { Requirement, ChangeProposal } from '../types';
import { mockApplicationSummary, mockUIScreens, mockRequirements, mockExecutionPackage, mockTechStack, mockFileCategories } from '../data/mockData';
import { AppContext } from './AppContextValue';
import type { AppState } from './AppContextValue';

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
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
  });

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
    setState({
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
    });
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
