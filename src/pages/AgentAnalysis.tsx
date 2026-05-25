import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, GitBranch, Code, Shield, ClipboardList, Truck, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/useApp';
import { demoAgentStatuses } from '../data/businessMockData';

const iconMap: Record<string, typeof Target> = {
  Target, GitBranch, Code, Shield, ClipboardList, Truck, ShieldCheck,
};

export default function AgentAnalysis() {
  const navigate = useNavigate();
  const { isAgentAnalyzing, agentAnalysisStep, analysisComplete, startAgentAnalysis, intakeData } = useApp();

  useEffect(() => {
    if (!isAgentAnalyzing && !analysisComplete) {
      startAgentAnalysis();
    }
  }, [isAgentAnalyzing, analysisComplete, startAgentAnalysis]);

  useEffect(() => {
    if (analysisComplete) {
      const timer = setTimeout(() => navigate('/requirement-pack'), 1500);
      return () => clearTimeout(timer);
    }
  }, [analysisComplete, navigate]);

  return (
    <div className="py-8 px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900 mb-2">Analyzing your input</h1>
        <p className="text-surface-500 text-sm">
          Multiple agents are reviewing your input from business, process, technical, risk and delivery perspectives.
        </p>
      </div>

      {/* Input Summary */}
      {intakeData && (
        <div className="bg-surface-50 rounded-xl border border-surface-200 p-5 mb-8">
          <div className="text-xs font-medium text-surface-500 mb-2">Your input</div>
          <p className="text-sm text-surface-700 line-clamp-3">{intakeData.textInput}</p>
          {intakeData.uploadedFiles.length > 0 && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {intakeData.uploadedFiles.map((f, i) => (
                <span key={i} className="inline-flex items-center gap-1 bg-white border border-surface-200 rounded-md px-2 py-0.5 text-[11px] text-surface-600">
                  {f.name}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Agent Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {demoAgentStatuses.map((agent, agentIndex) => {
          const Icon = iconMap[agent.icon] ?? Target;
          const isActive = agentAnalysisStep === agentIndex + 1;
          const isDone = agentAnalysisStep > agentIndex + 1 || analysisComplete;

          const currentStepIndex = isActive
            ? Math.min(agentAnalysisStep - agentIndex - 1, agent.steps.length - 2)
            : isDone ? agent.steps.length - 1 : -1;

          return (
            <div
              key={agent.id}
              className={`rounded-xl border p-5 transition-all ${
                isActive ? 'border-surface-300 bg-white shadow-sm' : isDone ? 'border-surface-200 bg-white' : 'border-surface-200 bg-surface-50 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  isDone ? 'bg-emerald-50 text-emerald-600' : isActive ? 'bg-surface-100 text-surface-700' : 'bg-surface-100 text-surface-400'
                }`}>
                  {isDone ? <CheckCircle2 className="w-4.5 h-4.5" /> : isActive ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : <Icon className="w-4.5 h-4.5" />}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-surface-900">{agent.name}</h3>
                  <p className="text-[11px] text-surface-500">{agent.role}</p>
                </div>
              </div>
              <div className="space-y-1.5 ml-12">
                {agent.steps.map((step, stepIdx) => {
                  const stepDone = isDone || (isActive && stepIdx < currentStepIndex);
                  const stepActive = isActive && stepIdx === currentStepIndex;
                  return (
                    <div key={stepIdx} className={`flex items-center gap-2 text-xs ${
                      stepDone ? 'text-surface-600' : stepActive ? 'text-surface-900 font-medium' : 'text-surface-300'
                    }`}>
                      {stepDone ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      ) : stepActive ? (
                        <Loader2 className="w-3 h-3 text-surface-500 animate-spin shrink-0" />
                      ) : (
                        <span className="w-3 h-3 rounded-full border border-surface-300 shrink-0" />
                      )}
                      {step}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-8">
        <div className="flex items-center justify-between text-xs text-surface-500 mb-2">
          <span>{analysisComplete ? 'Analysis complete' : `Agent ${Math.min(agentAnalysisStep, 6)} of 6`}</span>
          <span>{analysisComplete ? '100%' : `${Math.round((agentAnalysisStep / 7) * 100)}%`}</span>
        </div>
        <div className="w-full h-1.5 bg-surface-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-surface-900 rounded-full transition-all duration-700"
            style={{ width: `${analysisComplete ? 100 : (agentAnalysisStep / 7) * 100}%` }}
          />
        </div>
      </div>

      {analysisComplete && (
        <div className="mt-6 text-center">
          <p className="text-sm text-surface-600 mb-3">Your requirement pack is ready for business validation and IT execution.</p>
          <button
            onClick={() => navigate('/requirement-pack')}
            className="bg-surface-900 hover:bg-surface-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            View Requirement Pack
          </button>
        </div>
      )}
    </div>
  );
}
