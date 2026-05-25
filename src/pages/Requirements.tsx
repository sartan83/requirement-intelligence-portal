import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import StatusBadge from '../components/StatusBadge';
import {
  ClipboardList,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Target,
  CheckCircle2,
  TestTube2,
  AlertTriangle,
  HelpCircle,
  BarChart3,
  Shield,
  Globe,
  Layers,
} from 'lucide-react';
import type { Requirement } from '../types';

export default function Requirements() {
  const navigate = useNavigate();
  const { requirements, updateRequirement, generateExecutionPackage } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = filterType === 'all' ? requirements : requirements.filter(r => r.type === filterType);

  const handleApprove = (id: string) => {
    updateRequirement(id, { status: 'approved' });
  };

  const handleMarkReady = (id: string) => {
    updateRequirement(id, { status: 'ready' });
  };

  const handleGenerateHandoff = () => {
    generateExecutionPackage();
    navigate('/handoff');
  };

  const approvedCount = requirements.filter(r => r.status === 'approved' || r.status === 'ready').length;

  return (
    <div className="py-8 px-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 mb-1 flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-primary-600" />
            Requirement Builder
          </h1>
          <p className="text-surface-500 text-sm">
            {requirements.length} requirements &middot; {approvedCount} approved
          </p>
        </div>
        <button
          onClick={handleGenerateHandoff}
          disabled={approvedCount === 0}
          className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          Generate Execution Package <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {['all', 'business', 'functional', 'technical', 'non-functional'].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
              filterType === type ? 'bg-primary-600 text-white' : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Requirements List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-10 h-10 text-surface-300 mx-auto mb-3" />
          <p className="text-surface-500 text-sm">No requirements yet. Use the UI Mockup or Component workspace to generate requirements.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(req => (
            <RequirementCard
              key={req.id}
              requirement={req}
              expanded={expandedId === req.id}
              onToggle={() => setExpandedId(expandedId === req.id ? null : req.id)}
              onApprove={() => handleApprove(req.id)}
              onMarkReady={() => handleMarkReady(req.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function RequirementCard({
  requirement: req,
  expanded,
  onToggle,
  onApprove,
  onMarkReady,
}: {
  requirement: Requirement;
  expanded: boolean;
  onToggle: () => void;
  onApprove: () => void;
  onMarkReady: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-50 transition-colors"
      >
        <div className="flex-1 mr-4">
          <div className="flex items-center gap-2 mb-1">
            <StatusBadge status={req.type} />
            <StatusBadge status={req.status} />
            <StatusBadge status={req.complexity} />
          </div>
          <h3 className="text-sm font-semibold text-surface-900">{req.title}</h3>
          <p className="text-xs text-surface-500 mt-1 line-clamp-1">{req.businessObjective}</p>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-surface-400" /> : <ChevronDown className="w-4 h-4 text-surface-400" />}
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-surface-200 p-5 space-y-5">
          {/* Business Context */}
          <Section icon={Target} title="Business Context">
            <Field label="Business Objective" value={req.businessObjective} />
            <Field label="Current State" value={req.currentState} />
            <Field label="Desired Future State" value={req.futureState} />
            {req.userStory && <Field label="User Story" value={req.userStory} highlight />}
          </Section>

          {/* Requirements */}
          <Section icon={ClipboardList} title="Requirements">
            <ListField label="Functional Requirements" items={req.functionalRequirements} />
            <ListField label="Technical Requirements" items={req.technicalRequirements} />
            <ListField label="Non-Functional Requirements" items={req.nonFunctionalRequirements} />
          </Section>

          {/* Acceptance & Testing */}
          <Section icon={CheckCircle2} title="Acceptance & Testing">
            <ListField label="Acceptance Criteria" items={req.acceptanceCriteria} />
            <ListField label="Test Scenarios" items={req.testScenarios} icon={TestTube2} />
          </Section>

          {/* Impact Analysis */}
          <Section icon={BarChart3} title="Impact Analysis">
            <ListField label="Impacted Files" items={req.impactedFiles} mono />
            <Field label="API Impact" value={req.apiImpact} icon={Globe} />
            <Field label="Security Impact" value={req.securityImpact} icon={Shield} />
          </Section>

          {/* Risks & Dependencies */}
          <Section icon={AlertTriangle} title="Risks & Dependencies">
            <ListField label="Risks" items={req.risks} variant="warning" />
            <ListField label="Dependencies" items={req.dependencies} icon={Layers} />
          </Section>

          {/* Open Questions */}
          {req.openQuestions.length > 0 && (
            <Section icon={HelpCircle} title="Open Questions">
              <ListField label="" items={req.openQuestions} variant="info" />
            </Section>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-3 border-t border-surface-200">
            {req.status === 'draft' && (
              <button
                onClick={onApprove}
                className="bg-success-600 hover:bg-success-500 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors"
              >
                Approve Requirement
              </button>
            )}
            {req.status === 'approved' && (
              <button
                onClick={onMarkReady}
                className="bg-accent-600 hover:bg-accent-500 text-white px-4 py-2 rounded-lg text-xs font-medium transition-colors"
              >
                Mark Ready for Execution
              </button>
            )}
            {req.status === 'ready' && (
              <span className="text-xs font-medium text-accent-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Ready for execution package
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: typeof Target; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-surface-900 mb-3 flex items-center gap-2">
        <Icon className="w-4 h-4 text-primary-600" />
        {title}
      </h4>
      <div className="space-y-3 pl-6">{children}</div>
    </div>
  );
}

function Field({ label, value, highlight, icon: Icon }: { label: string; value: string; highlight?: boolean; icon?: typeof Target }) {
  return (
    <div className={highlight ? 'bg-primary-50 border border-primary-200 rounded-lg p-3' : ''}>
      {label && <div className="text-xs font-medium text-surface-500 mb-0.5 flex items-center gap-1">
        {Icon && <Icon className="w-3 h-3" />}
        {label}
      </div>}
      <p className={`text-sm ${highlight ? 'text-primary-800 italic' : 'text-surface-700'}`}>{value}</p>
    </div>
  );
}

function ListField({ label, items, mono, variant, icon: Icon }: { label: string; items: string[]; mono?: boolean; variant?: 'warning' | 'info'; icon?: typeof Target }) {
  if (items.length === 0) return null;
  const variantColors = { warning: 'text-warning-600', info: 'text-primary-600' };
  return (
    <div>
      {label && <div className="text-xs font-medium text-surface-500 mb-1 flex items-center gap-1">
        {Icon && <Icon className="w-3 h-3" />}
        {label}
      </div>}
      <ul className="space-y-0.5">
        {items.map((item, i) => (
          <li key={i} className={`text-xs flex items-start gap-1.5 ${variant ? variantColors[variant] : 'text-surface-600'} ${mono ? 'font-mono' : ''}`}>
            <span className="mt-1 shrink-0">&#8226;</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
