import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import {
  PackageCheck,
  Copy,
  Download,
  GitBranch,
  FileText,
  Target,
  TestTube2,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  Layers,
  ArrowLeft,
  ClipboardList,
  RotateCcw,
} from 'lucide-react';
import { useState } from 'react';

export default function Handoff() {
  const navigate = useNavigate();
  const { executionPackage, generateExecutionPackage } = useApp();
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!executionPackage) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <PackageCheck className="w-12 h-12 text-surface-300 mx-auto mb-3" />
          <h2 className="text-lg font-semibold text-surface-700 mb-2">No Execution Package Generated</h2>
          <p className="text-sm text-surface-500 mb-4">Approve requirements first, then generate the execution package.</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => navigate('/requirements')} className="text-primary-600 text-sm font-medium flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Go to Requirements
            </button>
            <button
              onClick={() => generateExecutionPackage()}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Generate Package (Demo)
            </button>
          </div>
        </div>
      </div>
    );
  }

  const pkg = executionPackage;

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const fullPrompt = `# Implementation Task: ${pkg.title}

## Context
${pkg.context}

## Affected Components
${pkg.affectedComponents.map(c => `- ${c}`).join('\n')}

## Implementation Plan
${pkg.implementationPlan.map((s, i) => `${i + 1}. ${s}`).join('\n')}

## Acceptance Criteria
${pkg.acceptanceCriteria.map(c => `- [ ] ${c}`).join('\n')}

## Test Plan
${pkg.testPlan.map(t => `- ${t}`).join('\n')}

## Branch
\`${pkg.suggestedBranch}\`

## PR Description
${pkg.prDescription}

## Rollback Considerations
${pkg.rollbackConsiderations.map(r => `- ${r}`).join('\n')}

## Open Questions
${pkg.openQuestions.map(q => `- ${q}`).join('\n')}`;

  return (
    <div className="py-8 px-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 mb-1 flex items-center gap-2">
            <PackageCheck className="w-6 h-6 text-primary-600" />
            Devin-Ready Execution Package
          </h1>
          <p className="text-surface-500 text-sm">Implementation-ready package for AI engineering agents.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => copyToClipboard(fullPrompt, 'full')}
            className="bg-surface-900 hover:bg-surface-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            {copiedSection === 'full' ? 'Copied!' : 'Copy Full Package'}
          </button>
          <button
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            onClick={() => {
              const blob = new Blob([fullPrompt], { type: 'text/markdown' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `execution-package-${pkg.suggestedBranch}.md`;
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="w-4 h-4" />
            Download .md
          </button>
        </div>
      </div>

      {/* Task Summary */}
      <div className="bg-gradient-to-r from-surface-900 to-surface-800 rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-2">{pkg.title}</h2>
        <p className="text-sm text-surface-300 leading-relaxed">{pkg.context}</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-surface-300">
            <GitBranch className="w-4 h-4" />
            <code className="font-mono text-primary-300">{pkg.suggestedBranch}</code>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-surface-300">
            <ClipboardList className="w-4 h-4" />
            {pkg.requirements.length} requirements
          </div>
        </div>
      </div>

      {/* Affected Components */}
      <PackageSection icon={Layers} title="Affected Components">
        <div className="space-y-1.5">
          {pkg.affectedComponents.map((comp, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-surface-700">
              <span className="text-primary-500 mt-1 shrink-0">&#8226;</span>
              {comp}
            </div>
          ))}
        </div>
      </PackageSection>

      {/* Implementation Plan */}
      <PackageSection icon={Target} title="Step-by-Step Implementation Plan">
        <div className="space-y-2">
          {pkg.implementationPlan.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs flex items-center justify-center shrink-0 mt-0.5 font-semibold">
                {i + 1}
              </span>
              <span className="text-sm text-surface-700">{step.replace(/^Step \d+: /, '')}</span>
            </div>
          ))}
        </div>
      </PackageSection>

      {/* Acceptance Criteria */}
      <PackageSection icon={CheckCircle2} title="Acceptance Criteria">
        <div className="space-y-1.5">
          {pkg.acceptanceCriteria.map((c, i) => (
            <div key={i} className="flex items-start gap-2">
              <input type="checkbox" disabled className="mt-1 shrink-0 accent-primary-600" />
              <span className="text-sm text-surface-700">{c}</span>
            </div>
          ))}
        </div>
      </PackageSection>

      {/* Test Plan */}
      <PackageSection icon={TestTube2} title="Test Plan">
        <div className="grid md:grid-cols-2 gap-2">
          {pkg.testPlan.map((t, i) => (
            <div key={i} className="bg-surface-50 rounded-lg p-3 text-xs text-surface-700">
              {t}
            </div>
          ))}
        </div>
      </PackageSection>

      {/* PR Description */}
      <PackageSection icon={FileText} title="Suggested PR Description">
        <div className="relative">
          <button
            onClick={() => copyToClipboard(pkg.prDescription, 'pr')}
            className="absolute top-2 right-2 text-surface-400 hover:text-surface-600"
          >
            <Copy className="w-4 h-4" />
          </button>
          <pre className="bg-surface-50 rounded-lg p-4 text-xs text-surface-700 whitespace-pre-wrap font-mono leading-relaxed overflow-auto max-h-64">
            {pkg.prDescription}
          </pre>
        </div>
      </PackageSection>

      {/* Rollback */}
      <PackageSection icon={RotateCcw} title="Rollback Considerations">
        <div className="space-y-1.5">
          {pkg.rollbackConsiderations.map((r, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-surface-700">
              <AlertTriangle className="w-4 h-4 text-warning-500 mt-0.5 shrink-0" />
              {r}
            </div>
          ))}
        </div>
      </PackageSection>

      {/* Open Questions */}
      {pkg.openQuestions.length > 0 && (
        <PackageSection icon={HelpCircle} title="Open Questions (Clarify Before Execution)">
          <div className="space-y-2">
            {pkg.openQuestions.map((q, i) => (
              <div key={i} className="bg-warning-500/5 border border-warning-500/20 rounded-lg p-3 text-sm text-warning-700 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 mt-0.5 shrink-0" />
                {q}
              </div>
            ))}
          </div>
        </PackageSection>
      )}

      {/* Footer CTA */}
      <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 text-center">
        <h3 className="font-semibold text-primary-900 mb-2">Ready to Execute</h3>
        <p className="text-sm text-primary-700 mb-4">
          Copy this package and hand it to Devin or any AI engineering agent for implementation.
        </p>
        <button
          onClick={() => copyToClipboard(fullPrompt, 'full-bottom')}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors inline-flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          {copiedSection === 'full-bottom' ? 'Copied to Clipboard!' : 'Copy Full Execution Package'}
        </button>
      </div>
    </div>
  );
}

function PackageSection({ icon: Icon, title, children }: { icon: typeof Target; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-surface-200 p-6">
      <h2 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
        <Icon className="w-4.5 h-4.5 text-primary-600" />
        {title}
      </h2>
      {children}
    </div>
  );
}
