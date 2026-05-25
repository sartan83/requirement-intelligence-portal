import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Target, Briefcase, ClipboardList, Server, Users, AlertTriangle,
  Truck, ChevronDown, ChevronUp, ArrowRight, CheckCircle2,
  BarChart3, Shield, Database, FileText, BookOpen, ShieldCheck, Terminal,
} from 'lucide-react';
import { useApp } from '../context/useApp';
import { demoAnalysisResult, demoRequirementPack, demoMediaAnalysis } from '../data/businessMockData';

type TabKey = 'summary' | 'business' | 'functional' | 'guardrails' | 'technical' | 'stories' | 'risks' | 'delivery' | 'devin-script' | 'evidence';

const tabs: { key: TabKey; label: string; icon: typeof Target }[] = [
  { key: 'summary', label: 'Executive Summary', icon: Target },
  { key: 'business', label: 'Business Requirements', icon: Briefcase },
  { key: 'functional', label: 'Functional Requirements', icon: ClipboardList },
  { key: 'guardrails', label: 'Enterprise Guardrails', icon: ShieldCheck },
  { key: 'technical', label: 'Technical Requirements', icon: Server },
  { key: 'stories', label: 'User Stories', icon: Users },
  { key: 'risks', label: 'Risk & Dependencies', icon: AlertTriangle },
  { key: 'delivery', label: 'Delivery Plan', icon: Truck },
  { key: 'devin-script', label: 'Devin Init Script', icon: Terminal },
  { key: 'evidence', label: 'Evidence Analysis', icon: BookOpen },
];

export default function RequirementPack() {
  const navigate = useNavigate();
  const { analysisResult, requirementPack, loadDemoScenario } = useApp();
  const [activeTab, setActiveTab] = useState<TabKey>('summary');

  const result = analysisResult ?? demoAnalysisResult;
  const pack = requirementPack ?? demoRequirementPack;

  if (!result && !requirementPack) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-surface-700 mb-2">No Requirement Pack Available</h2>
          <p className="text-sm text-surface-500 mb-4">Submit an intake or load the demo scenario first.</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={() => navigate('/intake')} className="text-surface-600 hover:text-surface-900 text-sm font-medium">New Intake</button>
            <button onClick={() => { loadDemoScenario(); }} className="bg-surface-900 text-white px-4 py-2 rounded-lg text-sm font-medium">Load Demo</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 mb-1">Requirement Intelligence Pack</h1>
          <p className="text-surface-500 text-sm">Your requirement pack is ready for business validation and IT execution.</p>
        </div>
        <button
          onClick={() => navigate('/handoff')}
          className="bg-surface-900 hover:bg-surface-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          Handoff <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-surface-200 mb-6 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-surface-900 text-surface-900'
                  : 'border-transparent text-surface-500 hover:text-surface-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'summary' && <SummaryTab data={result.executiveSummary} />}
        {activeTab === 'business' && <BusinessTab data={result.businessRequirements} />}
        {activeTab === 'functional' && <FunctionalTab data={pack.functionalRequirements} />}
        {activeTab === 'guardrails' && <GuardrailsTab data={pack.enterpriseGuardrails} />}
        {activeTab === 'technical' && <TechnicalTab data={pack.technicalRequirements} />}
        {activeTab === 'stories' && <StoriesTab data={pack.userStories} />}
        {activeTab === 'risks' && <RisksTab data={pack.riskDependencyMap} />}
        {activeTab === 'delivery' && <DeliveryTab data={pack.deliveryPlan} />}
        {activeTab === 'devin-script' && <DevinScriptTab data={pack.compiledDevinPrompt} />}
        {activeTab === 'evidence' && <EvidenceTab />}
      </div>
    </div>
  );
}

function SummaryTab({ data }: { data: typeof demoAnalysisResult.executiveSummary }) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-surface-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-surface-900">Executive Summary</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-surface-500">Confidence</span>
            <span className="text-sm font-bold text-surface-900">{data.confidenceScore}%</span>
            <div className="w-16 h-1.5 bg-surface-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${data.confidenceScore}%` }} />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Business Objective" value={data.businessObjective} />
          <Field label="Current Problem" value={data.currentProblem} />
          <Field label="Expected Outcome" value={data.expectedOutcome} />
          <Field label="Value Hypothesis" value={data.valueHypothesis} />
          <Field label="Urgency / Deadline" value={data.urgency} />
          <div>
            <div className="text-xs font-medium text-surface-500 mb-1">Impacted Stakeholders</div>
            <div className="flex flex-wrap gap-1">
              {data.impactedStakeholders.map((s, i) => (
                <span key={i} className="bg-surface-100 text-surface-700 rounded-md px-2 py-0.5 text-xs">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BusinessTab({ data }: { data: typeof demoAnalysisResult.businessRequirements }) {
  return (
    <div className="space-y-4">
      <Card title="Business Capabilities Impacted" icon={Briefcase}>
        <BulletList items={data.capabilities} />
      </Card>
      <Card title="Process Changes Needed" icon={BarChart3}>
        <BulletList items={data.processChanges} />
      </Card>
      <Card title="User Groups Affected" icon={Users}>
        <div className="space-y-2">
          {data.userGroups.map((g, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-sm font-medium text-surface-900 w-40 shrink-0">{g.group}</span>
              <span className="text-sm text-surface-600">{g.impact}</span>
            </div>
          ))}
        </div>
      </Card>
      <Card title="Success Metrics" icon={Target}>
        <BulletList items={data.successMetrics} />
      </Card>
      <Card title="Business Rules" icon={FileText}>
        <BulletList items={data.businessRules} />
      </Card>
      {data.openQuestions.length > 0 && (
        <Card title="Open Questions" icon={AlertTriangle}>
          <BulletList items={data.openQuestions} variant="warning" />
        </Card>
      )}
    </div>
  );
}

function FunctionalTab({ data }: { data: typeof demoRequirementPack.functionalRequirements }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      {data.map(req => (
        <div key={req.id} className="bg-white rounded-xl border border-surface-200 overflow-hidden">
          <button
            onClick={() => setExpanded(expanded === req.id ? null : req.id)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-surface-50 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              <span className="text-xs font-mono text-surface-400 w-14 shrink-0">{req.id}</span>
              <span className="text-sm font-medium text-surface-900 flex-1">{req.description}</span>
              <PriorityBadge priority={req.priority} />
            </div>
            {expanded === req.id ? <ChevronUp className="w-4 h-4 text-surface-400" /> : <ChevronDown className="w-4 h-4 text-surface-400" />}
          </button>
          {expanded === req.id && (
            <div className="border-t border-surface-200 p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="User Role" value={req.userRole} />
                <Field label="Rationale" value={req.rationale} />
              </div>
              <div>
                <div className="text-xs font-medium text-surface-500 mb-1">Acceptance Criteria</div>
                <div className="space-y-1">
                  {req.acceptanceCriteria.map((ac, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-surface-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      {ac}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function GuardrailsTab({ data }: { data: typeof demoRequirementPack.enterpriseGuardrails }) {
  const severityStyles: Record<string, { bg: string; text: string; ring: string; icon: string }> = {
    critical: { bg: 'bg-red-50', text: 'text-red-700', ring: 'ring-red-200', icon: '🔴' },
    high: { bg: 'bg-amber-50', text: 'text-amber-700', ring: 'ring-amber-200', icon: '🟠' },
    medium: { bg: 'bg-yellow-50', text: 'text-yellow-700', ring: 'ring-yellow-200', icon: '🟡' },
  };
  return (
    <div className="space-y-4">
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-2">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-red-600" />
          <h2 className="font-semibold text-red-800">Enterprise Compliance Guardrails</h2>
        </div>
        <p className="text-sm text-red-700">
          These non-negotiable constraints have been automatically injected based on analysis of business intent against GDPR, DORA, and internal security policies. They override any conflicting implementation decisions.
        </p>
      </div>
      {data.map(g => {
        const style = severityStyles[g.severity] ?? severityStyles.medium;
        return (
          <div key={g.id} className={`rounded-xl border p-5 ${style.bg} ring-1 ring-inset ${style.ring}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-surface-500">{g.id}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold uppercase ${style.text} ${style.bg} ring-1 ring-inset ${style.ring}`}>
                  {style.icon} {g.severity}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-xs font-medium text-surface-500 mb-0.5">Trigger</div>
                <p className={`text-sm font-medium ${style.text}`}>{g.trigger}</p>
              </div>
              <div>
                <div className="text-xs font-medium text-surface-500 mb-0.5">Enforcement</div>
                <p className="text-sm text-surface-800 font-medium">{g.enforcement}</p>
              </div>
              <div>
                <div className="text-xs font-medium text-surface-500 mb-0.5">Standard</div>
                <p className="text-sm text-surface-600 italic">{g.standard}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DevinScriptTab({ data }: { data: typeof demoRequirementPack.compiledDevinPrompt }) {
  const [copied, setCopied] = useState(false);

  const fullScript = `# Agent_Init_Script.md — Compiled by Requirement Intelligence Portal

## Context & Goal
${data.contextAndGoal}

## Strict Boundaries (Injected from Compliance)
${data.strictBoundaries.map((b, i) => `${i + 1}. ${b}`).join('\n')}

## Acceptance Criteria as Executable Tests
${data.acceptanceCriteriaAsTests.map(t => `- ${t}`).join('\n')}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullScript).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-surface-900 text-white rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            <h2 className="font-semibold">Compiled Devin Execution Prompt</h2>
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          >
            {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy Full Script'}
          </button>
        </div>
        <p className="text-sm text-white/70">
          This is the compiled <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">Agent_Init_Script.md</code> — a secure, execution-ready initialization script for autonomous AI coding agents.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-surface-200 p-5">
        <h3 className="font-semibold text-surface-900 mb-3 flex items-center gap-2 text-sm">
          <Target className="w-4 h-4 text-surface-500" />
          Context & Goal
        </h3>
        <div className="bg-surface-50 rounded-lg p-4 text-sm text-surface-700 whitespace-pre-line font-mono leading-relaxed">
          {data.contextAndGoal}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-red-200 p-5">
        <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2 text-sm">
          <ShieldCheck className="w-4 h-4 text-red-600" />
          Strict Boundaries (Injected from Compliance)
        </h3>
        <div className="space-y-2">
          {data.strictBoundaries.map((boundary, i) => (
            <div key={i} className="flex items-start gap-3 bg-red-50 rounded-lg p-3">
              <span className="text-xs font-mono text-red-400 mt-0.5 shrink-0">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-sm text-red-800">{boundary}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-emerald-200 p-5">
        <h3 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2 text-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Acceptance Criteria as Executable Tests
        </h3>
        <div className="space-y-2">
          {data.acceptanceCriteriaAsTests.map((test, i) => (
            <div key={i} className="flex items-start gap-3 bg-emerald-50 rounded-lg p-3">
              <span className="text-xs font-mono text-emerald-400 mt-0.5 shrink-0">T{String(i + 1).padStart(2, '0')}</span>
              <p className="text-sm text-emerald-800 font-mono">{test}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TechnicalTab({ data }: { data: typeof demoRequirementPack.technicalRequirements }) {
  return (
    <div className="space-y-4">
      <Card title="Systems Impacted" icon={Server}>
        <div className="flex flex-wrap gap-2">
          {data.systemsImpacted.map((s, i) => (
            <span key={i} className="bg-surface-100 text-surface-700 rounded-md px-2.5 py-1 text-xs font-medium">{s}</span>
          ))}
        </div>
      </Card>
      <Card title="API / Integrations" icon={Database}>
        <div className="space-y-1.5">
          {data.apiIntegrations.map((api, i) => (
            <div key={i} className="text-sm text-surface-700 font-mono bg-surface-50 rounded-lg px-3 py-2">{api}</div>
          ))}
        </div>
      </Card>
      <Card title="Data Implications" icon={Database}>
        <BulletList items={data.dataImplications} />
      </Card>
      <Card title="Architecture Considerations" icon={Server}>
        <BulletList items={data.architectureConsiderations} />
      </Card>
      <Card title="Non-Functional Requirements" icon={BarChart3}>
        <BulletList items={data.nfRequirements} />
      </Card>
      <Card title="Security & Compliance Constraints" icon={Shield}>
        <BulletList items={data.securityConstraints} />
      </Card>
    </div>
  );
}

function StoriesTab({ data }: { data: typeof demoRequirementPack.userStories }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      {data.map(story => (
        <div key={story.id} className="bg-white rounded-xl border border-surface-200 overflow-hidden">
          <button
            onClick={() => setExpanded(expanded === story.id ? null : story.id)}
            className="w-full flex items-start justify-between p-4 text-left hover:bg-surface-50 transition-colors"
          >
            <div className="flex items-start gap-3 flex-1">
              <span className="text-xs font-mono text-surface-400 w-14 shrink-0 pt-0.5">{story.id}</span>
              <p className="text-sm text-surface-900 italic flex-1">&ldquo;{story.story}&rdquo;</p>
              <PriorityBadge priority={story.priority} />
            </div>
            {expanded === story.id ? <ChevronUp className="w-4 h-4 text-surface-400 mt-1" /> : <ChevronDown className="w-4 h-4 text-surface-400 mt-1" />}
          </button>
          {expanded === story.id && (
            <div className="border-t border-surface-200 p-4 space-y-3">
              <div>
                <div className="text-xs font-medium text-surface-500 mb-1">Acceptance Criteria</div>
                {story.acceptanceCriteria.map((ac, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-surface-600 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />{ac}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-xs font-medium text-surface-500 mb-1">Dependencies</div>
                  {story.dependencies.map((d, i) => <div key={i} className="text-xs text-surface-600">{d}</div>)}
                </div>
                <div>
                  <div className="text-xs font-medium text-surface-500 mb-1">Risks</div>
                  {story.risks.map((r, i) => <div key={i} className="text-xs text-surface-600">{r}</div>)}
                </div>
                <div>
                  <div className="text-xs font-medium text-surface-500 mb-1">Test Cases</div>
                  {story.testCases.map((t, i) => <div key={i} className="text-xs text-surface-600">{t}</div>)}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function RisksTab({ data }: { data: typeof demoRequirementPack.riskDependencyMap }) {
  const sections = [
    { title: 'Technical Dependencies', items: data.technicalDeps, color: 'bg-blue-50 text-blue-700' },
    { title: 'Business Dependencies', items: data.businessDeps, color: 'bg-indigo-50 text-indigo-700' },
    { title: 'Compliance Risks', items: data.complianceRisks, color: 'bg-red-50 text-red-700' },
    { title: 'Delivery Risks', items: data.deliveryRisks, color: 'bg-amber-50 text-amber-700' },
    { title: 'Data Risks', items: data.dataRisks, color: 'bg-purple-50 text-purple-700' },
    { title: 'Operational Risks', items: data.operationalRisks, color: 'bg-orange-50 text-orange-700' },
  ];
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {sections.map((s, i) => (
        <div key={i} className="bg-white rounded-xl border border-surface-200 p-5">
          <h3 className="text-sm font-semibold text-surface-900 mb-3">{s.title}</h3>
          <div className="space-y-2">
            {s.items.map((item, j) => (
              <div key={j} className={`text-xs rounded-lg px-3 py-2 ${s.color}`}>{item}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DeliveryTab({ data }: { data: typeof demoRequirementPack.deliveryPlan }) {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-surface-200 p-6">
        <h2 className="font-semibold text-surface-900 mb-3">Recommended Implementation Path</h2>
        <p className="text-sm text-surface-600 mb-4">{data.recommendedPath}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-surface-500">Estimated Complexity:</span>
          <span className="bg-amber-50 text-amber-700 rounded-md px-2 py-0.5 text-xs font-medium">{data.estimatedComplexity}</span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card title="MVP Scope" icon={Target}>
          <BulletList items={data.mvpScope} />
        </Card>
        <Card title="Out of Scope" icon={AlertTriangle}>
          <BulletList items={data.outOfScope} variant="muted" />
        </Card>
      </div>
      <Card title="Delivery Phases" icon={Truck}>
        <div className="space-y-4">
          {data.phases.map((phase, i) => (
            <div key={i}>
              <div className="text-sm font-semibold text-surface-900 mb-2">{phase.name}</div>
              <BulletList items={phase.items} />
            </div>
          ))}
        </div>
      </Card>
      <Card title="Test Strategy" icon={Shield}>
        <BulletList items={data.testStrategy} />
      </Card>
      <Card title="Rollback Considerations" icon={AlertTriangle}>
        <BulletList items={data.rollbackConsiderations} />
      </Card>
    </div>
  );
}

function EvidenceTab() {
  const media = demoMediaAnalysis;
  return (
    <div className="space-y-4">
      {/* Audio Analysis */}
      <Card title={`Audio: ${media.audio.title}`} icon={FileText}>
        <Field label="Transcript Summary" value={media.audio.transcriptSummary} />
        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div>
            <div className="text-xs font-medium text-surface-500 mb-1">Extracted Objectives</div>
            <BulletList items={media.audio.extractedObjectives} />
          </div>
          <div>
            <div className="text-xs font-medium text-surface-500 mb-1">Decisions Captured</div>
            <BulletList items={media.audio.decisionsCaputred} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-3">
          <div>
            <div className="text-xs font-medium text-surface-500 mb-1">Pain Points</div>
            <BulletList items={media.audio.painPoints} variant="warning" />
          </div>
          <div>
            <div className="text-xs font-medium text-surface-500 mb-1">Unresolved Questions</div>
            <BulletList items={media.audio.unresolvedQuestions} variant="warning" />
          </div>
        </div>
      </Card>

      {/* Image Analysis */}
      {media.images.map((img, i) => (
        <Card key={i} title={`Image: ${img.title}`} icon={FileText}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-surface-500">Detected Type:</span>
            <span className="bg-surface-100 text-surface-700 rounded-md px-2 py-0.5 text-xs font-medium">{img.detectedType}</span>
          </div>
          <Field label="Possible Impact" value={img.possibleImpact} />
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div>
              <div className="text-xs font-medium text-surface-500 mb-1">Extracted Elements</div>
              <BulletList items={img.extractedElements} />
            </div>
            <div>
              <div className="text-xs font-medium text-surface-500 mb-1">Candidate Requirements</div>
              <BulletList items={img.requirements} />
            </div>
          </div>
        </Card>
      ))}

      {/* Document Analysis */}
      {media.documents.map((doc, i) => (
        <Card key={i} title={`Document: ${doc.title}`} icon={FileText}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-medium text-surface-500 mb-1">Key Sections Analyzed</div>
              <BulletList items={doc.keySections} />
            </div>
            <div>
              <div className="text-xs font-medium text-surface-500 mb-1">Extracted Requirements</div>
              <BulletList items={doc.extractedRequirements} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-3">
            <div>
              <div className="text-xs font-medium text-surface-500 mb-1">Risks & Constraints</div>
              <BulletList items={doc.risksAndConstraints} variant="warning" />
            </div>
            <div>
              <div className="text-xs font-medium text-surface-500 mb-1">Missing Information</div>
              <BulletList items={doc.missingInformation} variant="warning" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// -- Shared components --

function Card({ title, icon: Icon, children }: { title: string; icon: typeof Target; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-surface-200 p-5">
      <h3 className="font-semibold text-surface-900 mb-3 flex items-center gap-2 text-sm">
        <Icon className="w-4 h-4 text-surface-500" />
        {title}
      </h3>
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-medium text-surface-500 mb-0.5">{label}</div>
      <p className="text-sm text-surface-700">{value}</p>
    </div>
  );
}

function BulletList({ items, variant }: { items: string[]; variant?: 'warning' | 'muted' }) {
  return (
    <div className="space-y-1.5">
      {items.map((item, i) => (
        <div key={i} className={`flex items-start gap-2 text-sm ${
          variant === 'warning' ? 'text-amber-700' : variant === 'muted' ? 'text-surface-400' : 'text-surface-600'
        }`}>
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-current opacity-40" />
          {item}
        </div>
      ))}
    </div>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    high: 'bg-red-50 text-red-700 ring-red-200',
    medium: 'bg-amber-50 text-amber-700 ring-amber-200',
    low: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium capitalize ring-1 ring-inset ${colors[priority] ?? 'bg-surface-100 text-surface-600 ring-surface-200'}`}>
      {priority}
    </span>
  );
}
