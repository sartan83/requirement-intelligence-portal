import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Copy, Download, ArrowLeft, PackageCheck, FileText, ClipboardList,
  Truck, Code, Users, ExternalLink, Terminal, ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/useApp';
import { demoAnalysisResult, demoRequirementPack } from '../data/businessMockData';

const exportActions = [
  { icon: FileText, label: 'Export as Markdown', desc: 'Download complete pack as .md file', disabled: false },
  { icon: Download, label: 'Export as PDF', desc: 'Download formatted PDF report', disabled: true },
  { icon: ClipboardList, label: 'Export to Jira', desc: 'Create epics and stories in Jira', disabled: true },
  { icon: Truck, label: 'Export to Azure DevOps', desc: 'Create work items in Azure DevOps', disabled: true },
  { icon: Code, label: 'Generate Copilot brief', desc: 'Create implementation brief for Copilot', disabled: false },
  { icon: Users, label: 'Generate BA workshop agenda', desc: 'Create business analyst workshop materials', disabled: false },
  { icon: ExternalLink, label: 'Generate stakeholder validation pack', desc: 'Create review package for stakeholders', disabled: false },
];

export default function HandoffNew() {
  const navigate = useNavigate();
  const { analysisResult, requirementPack, loadDemoScenario } = useApp();
  const [copiedAction, setCopiedAction] = useState<string | null>(null);

  const result = analysisResult ?? demoAnalysisResult;
  const pack = requirementPack ?? demoRequirementPack;

  if (!result && !requirementPack) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-surface-700 mb-2">No Requirement Pack Available</h2>
          <p className="text-sm text-surface-500 mb-4">Complete the analysis first.</p>
          <button onClick={() => { loadDemoScenario(); }} className="bg-surface-900 text-white px-4 py-2 rounded-lg text-sm font-medium">Load Demo</button>
        </div>
      </div>
    );
  }

  const generateMarkdown = () => {
    const md = `# Requirement Intelligence Pack

## Executive Summary
- **Business Objective:** ${result.executiveSummary.businessObjective}
- **Current Problem:** ${result.executiveSummary.currentProblem}
- **Expected Outcome:** ${result.executiveSummary.expectedOutcome}
- **Urgency:** ${result.executiveSummary.urgency}
- **Confidence Score:** ${result.executiveSummary.confidenceScore}%

## Business Requirements
### Capabilities
${result.businessRequirements.capabilities.map(c => `- ${c}`).join('\n')}

### Process Changes
${result.businessRequirements.processChanges.map(p => `- ${p}`).join('\n')}

### Success Metrics
${result.businessRequirements.successMetrics.map(m => `- ${m}`).join('\n')}

## Functional Requirements
${pack.functionalRequirements.map(r => `### ${r.id}: ${r.description}
- **User Role:** ${r.userRole}
- **Priority:** ${r.priority}
- **Rationale:** ${r.rationale}
- **Acceptance Criteria:**
${r.acceptanceCriteria.map(ac => `  - ${ac}`).join('\n')}`).join('\n\n')}

## Technical Requirements
### Systems Impacted
${pack.technicalRequirements.systemsImpacted.map(s => `- ${s}`).join('\n')}

### API Integrations
${pack.technicalRequirements.apiIntegrations.map(a => `- ${a}`).join('\n')}

### Security Constraints
${pack.technicalRequirements.securityConstraints.map(s => `- ${s}`).join('\n')}

## User Stories
${pack.userStories.map(s => `### ${s.id}
> ${s.story}
- **Priority:** ${s.priority}
- **Acceptance Criteria:**
${s.acceptanceCriteria.map(ac => `  - ${ac}`).join('\n')}`).join('\n\n')}

## Delivery Plan
- **Recommended Path:** ${pack.deliveryPlan.recommendedPath}
- **Estimated Complexity:** ${pack.deliveryPlan.estimatedComplexity}

### MVP Scope
${pack.deliveryPlan.mvpScope.map(m => `- ${m}`).join('\n')}

### Phases
${pack.deliveryPlan.phases.map(p => `#### ${p.name}\n${p.items.map(i => `- ${i}`).join('\n')}`).join('\n\n')}

### Rollback Considerations
${pack.deliveryPlan.rollbackConsiderations.map(r => `- ${r}`).join('\n')}
`;
    return md;
  };

  const generateDevinInitScript = () => {
    return `# Agent_Init_Script.md — Compiled by Requirement Intelligence Portal

## Context & Goal
${pack.compiledDevinPrompt.contextAndGoal}

## Strict Boundaries (Injected from Compliance)
${pack.compiledDevinPrompt.strictBoundaries.map((b, i) => `${i + 1}. ${b}`).join('\n')}

## Acceptance Criteria as Executable Tests
${pack.compiledDevinPrompt.acceptanceCriteriaAsTests.map(t => `- ${t}`).join('\n')}

## Enterprise Guardrails
${pack.enterpriseGuardrails.map(g => `- [${g.severity.toUpperCase()}] ${g.trigger} → ${g.enforcement} (${g.standard})`).join('\n')}

## Functional Requirements
${pack.functionalRequirements.map(r => `- ${r.id}: ${r.description} (Priority: ${r.priority})`).join('\n')}

## Technical Requirements
- Systems: ${pack.technicalRequirements.systemsImpacted.join(', ')}
- APIs needed:
${pack.technicalRequirements.apiIntegrations.map(a => `  - ${a}`).join('\n')}

## Security Constraints
${pack.technicalRequirements.securityConstraints.map(s => `- ${s}`).join('\n')}

## Test Plan
${pack.deliveryPlan.testStrategy.map(t => `- ${t}`).join('\n')}

## Rollback
${pack.deliveryPlan.rollbackConsiderations.map(r => `- ${r}`).join('\n')}
`;
  };

  const handleExport = (label: string) => {
    if (label === 'Export as Markdown') {
      const md = generateMarkdown();
      const blob = new Blob([md], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'requirement-intelligence-pack.md';
      a.click();
      URL.revokeObjectURL(url);
      setCopiedAction(label);
    } else if (label === 'Generate Copilot brief') {
      navigator.clipboard.writeText(generateDevinInitScript()).catch(() => {}); 
      setCopiedAction(label);
    } else if (label === 'Generate BA workshop agenda' || label === 'Generate stakeholder validation pack') {
      const md = generateMarkdown();
      navigator.clipboard.writeText(md).catch(() => {});
      setCopiedAction(label);
    }
    setTimeout(() => setCopiedAction(null), 2000);
  };

  return (
    <div className="py-8 px-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <button onClick={() => navigate('/requirement-pack')} className="text-surface-500 hover:text-surface-700 text-sm font-medium flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Requirement Pack
          </button>
          <h1 className="text-2xl font-bold text-surface-900 mb-1 flex items-center gap-2">
            <PackageCheck className="w-6 h-6" />
            Delivery Handoff
          </h1>
          <p className="text-surface-500 text-sm">Move from ambiguity to compliant, agent-ready execution scripts.</p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-xl border border-surface-200 p-6">
        <h2 className="font-semibold text-surface-900 mb-3">Pack Summary</h2>
        <div className="grid grid-cols-4 gap-4">
          <Stat label="Functional Reqs" value={String(pack.functionalRequirements.length)} />
          <Stat label="User Stories" value={String(pack.userStories.length)} />
          <Stat label="Systems Impacted" value={String(pack.technicalRequirements.systemsImpacted.length)} />
          <Stat label="Delivery Phases" value={String(pack.deliveryPlan.phases.length)} />
        </div>
      </div>

      {/* Primary CTA: Devin Init Script */}
      <div className="bg-surface-900 text-white rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">Generate Devin-Ready Initialization Script</h2>
            <p className="text-sm text-white/70">Compiled <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">Agent_Init_Script.md</code> with compliance guardrails injected</p>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-3">
          {pack.enterpriseGuardrails.slice(0, 3).map((g, i) => (
            <span key={i} className="inline-flex items-center gap-1 bg-red-500/20 text-red-200 rounded-md px-2 py-0.5 text-[11px] font-medium">
              <ShieldCheck className="w-3 h-3" />
              {g.trigger.split(' \u2014 ')[0]}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              navigator.clipboard.writeText(generateDevinInitScript()).catch(() => {});
              setCopiedAction('devin-init');
              setTimeout(() => setCopiedAction(null), 2000);
            }}
            className="flex items-center justify-center gap-2 bg-white text-surface-900 hover:bg-white/90 py-3 rounded-lg text-sm font-semibold transition-colors"
          >
            <Terminal className="w-4 h-4" />
            {copiedAction === 'devin-init' ? 'Copied!' : 'Copy Devin Init Script'}
          </button>
          <button
            onClick={() => {
              const script = generateDevinInitScript();
              const blob = new Blob([script], { type: 'text/markdown' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'Agent_Init_Script.md';
              a.click();
              URL.revokeObjectURL(url);
              setCopiedAction('devin-dl');
              setTimeout(() => setCopiedAction(null), 2000);
            }}
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            {copiedAction === 'devin-dl' ? 'Downloaded!' : 'Download Agent_Init_Script.md'}
          </button>
        </div>
      </div>

      {/* Quick Copy */}
      <div className="bg-white rounded-xl border border-surface-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-surface-900">Quick Export</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <CopyButton
            label="Copy Full Package (Markdown)"
            onClick={() => {
              navigator.clipboard.writeText(generateMarkdown()).catch(() => {});
              setCopiedAction('full-md');
              setTimeout(() => setCopiedAction(null), 2000);
            }}
            copied={copiedAction === 'full-md'}
          />
          <CopyButton
            label="Copy Devin Init Script"
            onClick={() => {
              navigator.clipboard.writeText(generateDevinInitScript()).catch(() => {});
              setCopiedAction('devin');
              setTimeout(() => setCopiedAction(null), 2000);
            }}
            copied={copiedAction === 'devin'}
          />
        </div>
      </div>

      {/* Export Actions Grid */}
      <div>
        <h2 className="font-semibold text-surface-900 mb-4">Export & Handoff</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {exportActions.map((action, i) => {
            const Icon = action.icon;
            const isCopied = copiedAction === action.label;
            return (
              <button
                key={i}
                onClick={() => !action.disabled && handleExport(action.label)}
                disabled={action.disabled}
                className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-colors ${
                  action.disabled
                    ? 'border-surface-200 opacity-50 cursor-not-allowed'
                    : 'border-surface-200 hover:border-surface-300 hover:bg-surface-50 cursor-pointer'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-surface-100 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-surface-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-surface-900">{isCopied ? 'Done!' : action.label}</div>
                  <div className="text-xs text-surface-500">{action.desc}</div>
                </div>
                {action.disabled && <span className="text-[10px] bg-surface-100 text-surface-500 rounded-full px-2 py-0.5">Coming soon</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-surface-900">{value}</div>
      <div className="text-xs text-surface-500">{label}</div>
    </div>
  );
}

function CopyButton({ label, onClick, copied }: { label: string; onClick: () => void; copied: boolean }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-surface-900 hover:bg-surface-800 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
    >
      <Copy className="w-4 h-4" />
      {copied ? 'Copied!' : label}
    </button>
  );
}
