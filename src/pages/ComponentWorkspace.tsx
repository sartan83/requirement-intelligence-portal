import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import StatusBadge from '../components/StatusBadge';
import {
  ArrowRight,
  Layers,
  Plus,
  Server,
  Globe,
  Database,
  Workflow,
  Settings,
  RefreshCw,
  Trash2,
  ChevronRight,
} from 'lucide-react';
import type { ChangeProposal, FunctionalModule, ApiEndpoint, DataEntity, TechnicalDebtItem } from '../types';

type ViewTab = 'modules' | 'apis' | 'data' | 'debt';

export default function ComponentWorkspace() {
  const navigate = useNavigate();
  const { summary, addRequirement, changeProposals, addChangeProposal } = useApp();
  const [activeTab, setActiveTab] = useState<ViewTab>('modules');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalDesc, setProposalDesc] = useState('');
  const [proposalType, setProposalType] = useState<ChangeProposal['changeType']>('modify');
  const idCounter = useRef(0);

  if (!summary) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-surface-700 mb-2">No Analysis Available</h2>
          <button onClick={() => navigate('/connect')} className="text-primary-600 text-sm font-medium">Connect Repository</button>
        </div>
      </div>
    );
  }

  const tabs: { key: ViewTab; label: string; icon: typeof Server }[] = [
    { key: 'modules', label: 'Modules', icon: Layers },
    { key: 'apis', label: 'APIs', icon: Globe },
    { key: 'data', label: 'Data Entities', icon: Database },
    { key: 'debt', label: 'Tech Debt', icon: Settings },
  ];

  const handleCreateProposal = () => {
    if (!selectedItem || !proposalDesc) return;

    const proposal: ChangeProposal = {
      id: `cp-${++idCounter.current}`,
      componentId: selectedItem,
      componentName: getSelectedName(),
      description: proposalDesc,
      changeType: proposalType,
    };
    addChangeProposal(proposal);
    setShowProposalForm(false);
    setProposalDesc('');
  };

  const getSelectedName = (): string => {
    if (activeTab === 'modules') return summary.modules.find(m => m.id === selectedItem)?.name ?? '';
    if (activeTab === 'apis') return summary.apiEndpoints.find((_, i) => `api-${i}` === selectedItem)?.path ?? '';
    if (activeTab === 'data') return summary.dataEntities.find((_, i) => `de-${i}` === selectedItem)?.name ?? '';
    if (activeTab === 'debt') return summary.technicalDebt.find(t => t.id === selectedItem)?.title ?? '';
    return '';
  };

  const generateRequirementsFromProposals = () => {
    if (changeProposals.length === 0) return;

    for (const proposal of changeProposals) {
      addRequirement({
        id: `req-comp-${Date.now()}-${proposal.id}`,
        type: 'technical',
        title: `${proposal.changeType === 'add' ? 'Add' : proposal.changeType === 'remove' ? 'Remove' : proposal.changeType === 'refactor' ? 'Refactor' : 'Modify'}: ${proposal.componentName}`,
        businessObjective: `Improve system capability by ${proposal.changeType === 'add' ? 'adding' : proposal.changeType === 'remove' ? 'removing' : 'modifying'} ${proposal.componentName}.`,
        currentState: `Current state of ${proposal.componentName} in the system.`,
        futureState: proposal.description,
        userStory: `As a developer, I want to ${proposal.changeType} ${proposal.componentName} so that ${proposal.description.toLowerCase()}.`,
        functionalRequirements: [proposal.description],
        technicalRequirements: [`Implement changes to ${proposal.componentName}`],
        nonFunctionalRequirements: ['Maintain existing performance characteristics', 'Ensure backward compatibility where applicable'],
        acceptanceCriteria: [`Verify ${proposal.description}`],
        testScenarios: [`Test ${proposal.componentName} after changes`, 'Regression test impacted modules'],
        impactedFiles: [],
        apiImpact: activeTab === 'apis' ? 'Directly impacts API endpoint' : 'May impact API contracts',
        securityImpact: 'Review required for security implications.',
        risks: ['Potential regression in dependent modules'],
        dependencies: [],
        openQuestions: [],
        complexity: proposal.changeType === 'refactor' ? 'high' : 'medium',
        status: 'draft',
      });
    }
    navigate('/requirements');
  };

  const changeTypeIcons: Record<string, typeof Plus> = {
    add: Plus,
    modify: Settings,
    remove: Trash2,
    refactor: RefreshCw,
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-surface-200 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Workflow className="w-4.5 h-4.5 text-primary-600" />
          <h1 className="text-sm font-semibold text-surface-900">Component Workspace</h1>
        </div>
        {changeProposals.length > 0 && (
          <button
            onClick={generateRequirementsFromProposals}
            className="flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          >
            Generate Requirements ({changeProposals.length}) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Component Browser */}
        <div className="w-96 bg-white border-r border-surface-200 flex flex-col shrink-0">
          {/* Tabs */}
          <div className="flex border-b border-surface-200 shrink-0">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => { setActiveTab(tab.key); setSelectedItem(null); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-surface-500 hover:text-surface-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {activeTab === 'modules' && summary.modules.map((mod: FunctionalModule) => (
              <button
                key={mod.id}
                onClick={() => setSelectedItem(mod.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedItem === mod.id ? 'bg-primary-50 border border-primary-200' : 'hover:bg-surface-50 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-surface-900">{mod.name}</span>
                  <StatusBadge status={mod.status} variant="dot" />
                </div>
                <p className="text-xs text-surface-500 line-clamp-2">{mod.description}</p>
              </button>
            ))}

            {activeTab === 'apis' && summary.apiEndpoints.map((ep: ApiEndpoint, i: number) => {
              const id = `api-${i}`;
              const methodColors: Record<string, string> = {
                GET: 'text-success-600', POST: 'text-primary-600', PUT: 'text-warning-600', DELETE: 'text-danger-600',
              };
              return (
                <button
                  key={id}
                  onClick={() => setSelectedItem(id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedItem === id ? 'bg-primary-50 border border-primary-200' : 'hover:bg-surface-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold ${methodColors[ep.method] ?? ''}`}>{ep.method}</span>
                    <span className="text-xs font-mono text-surface-700">{ep.path}</span>
                  </div>
                  <p className="text-xs text-surface-500">{ep.description}</p>
                </button>
              );
            })}

            {activeTab === 'data' && summary.dataEntities.map((entity: DataEntity, i: number) => {
              const id = `de-${i}`;
              return (
                <button
                  key={id}
                  onClick={() => setSelectedItem(id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedItem === id ? 'bg-primary-50 border border-primary-200' : 'hover:bg-surface-50 border border-transparent'
                  }`}
                >
                  <div className="text-sm font-medium text-surface-900 mb-1">{entity.name}</div>
                  <div className="text-xs text-surface-500">{entity.fields.length} fields &middot; {entity.relationships.length} relationships</div>
                </button>
              );
            })}

            {activeTab === 'debt' && summary.technicalDebt.map((td: TechnicalDebtItem) => (
              <button
                key={td.id}
                onClick={() => setSelectedItem(td.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedItem === td.id ? 'bg-primary-50 border border-primary-200' : 'hover:bg-surface-50 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-surface-900">{td.title}</span>
                  <StatusBadge status={td.severity} />
                </div>
                <p className="text-xs text-surface-500 line-clamp-2">{td.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Detail & Proposal */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedItem ? (
            <div className="max-w-2xl space-y-6">
              {/* Detail Card */}
              <div className="bg-white rounded-xl border border-surface-200 p-6">
                <h2 className="text-lg font-semibold text-surface-900 mb-4">{getSelectedName()}</h2>

                {activeTab === 'modules' && (() => {
                  const mod = summary.modules.find(m => m.id === selectedItem);
                  if (!mod) return null;
                  return (
                    <div className="space-y-3">
                      <p className="text-sm text-surface-600">{mod.description}</p>
                      <div>
                        <span className="text-xs font-medium text-surface-500">Status:</span>{' '}
                        <StatusBadge status={mod.status} />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-surface-500 block mb-1">Files:</span>
                        {mod.files.map(f => (
                          <div key={f} className="text-xs font-mono text-surface-600">{f}</div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {activeTab === 'data' && (() => {
                  const idx = parseInt(selectedItem.replace('de-', ''));
                  const entity = summary.dataEntities[idx];
                  if (!entity) return null;
                  return (
                    <div className="space-y-3">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-surface-200">
                            <th className="text-left py-1.5 font-medium text-surface-500">Field</th>
                            <th className="text-left py-1.5 font-medium text-surface-500">Type</th>
                            <th className="text-left py-1.5 font-medium text-surface-500">Nullable</th>
                          </tr>
                        </thead>
                        <tbody>
                          {entity.fields.map(f => (
                            <tr key={f.name} className="border-b border-surface-100">
                              <td className="py-1.5 font-mono text-surface-700">{f.name}</td>
                              <td className="py-1.5 font-mono text-surface-500">{f.type}</td>
                              <td className="py-1.5 text-surface-500">{f.nullable ? 'Yes' : 'No'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div>
                        <span className="text-xs font-medium text-surface-500 block mb-1">Relationships:</span>
                        {entity.relationships.map((r, i) => (
                          <div key={i} className="text-xs text-primary-600">{r}</div>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {activeTab === 'debt' && (() => {
                  const td = summary.technicalDebt.find(t => t.id === selectedItem);
                  if (!td) return null;
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-surface-500">Severity:</span>
                        <StatusBadge status={td.severity} />
                      </div>
                      <p className="text-sm text-surface-600">{td.description}</p>
                      <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
                        <span className="text-xs font-medium text-primary-700 block mb-1">Recommendation:</span>
                        <p className="text-sm text-primary-800">{td.recommendation}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Propose Change */}
              {!showProposalForm ? (
                <button
                  onClick={() => setShowProposalForm(true)}
                  className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-surface-300 hover:border-primary-400 text-surface-500 hover:text-primary-600 rounded-xl py-4 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Propose Change for {getSelectedName()}</span>
                </button>
              ) : (
                <div className="bg-white rounded-xl border border-surface-200 p-6">
                  <h3 className="text-sm font-semibold text-surface-900 mb-4">Propose Change</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-surface-500 block mb-1">Change Type</label>
                      <div className="flex gap-2">
                        {(['add', 'modify', 'remove', 'refactor'] as const).map(type => {
                          const Icon = changeTypeIcons[type];
                          return (
                            <button
                              key={type}
                              onClick={() => setProposalType(type)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                proposalType === type ? 'bg-primary-600 text-white' : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                              <span className="capitalize">{type}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-surface-500 block mb-1">Description of Change</label>
                      <textarea
                        value={proposalDesc}
                        onChange={e => setProposalDesc(e.target.value)}
                        placeholder="Describe the desired change..."
                        rows={4}
                        className="w-full border border-surface-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCreateProposal}
                        disabled={!proposalDesc}
                        className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Create Proposal
                      </button>
                      <button
                        onClick={() => { setShowProposalForm(false); setProposalDesc(''); }}
                        className="bg-surface-100 hover:bg-surface-200 text-surface-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Existing Proposals */}
              {changeProposals.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-surface-900 mb-3">Change Proposals ({changeProposals.length})</h3>
                  <div className="space-y-2">
                    {changeProposals.map(p => {
                      const Icon = changeTypeIcons[p.changeType];
                      return (
                        <div key={p.id} className="bg-surface-50 border border-surface-200 rounded-lg p-3 flex items-start gap-3">
                          <Icon className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-surface-800">{p.componentName}</div>
                            <div className="text-xs text-surface-500">{p.description}</div>
                            <span className="text-xs text-primary-600 capitalize">{p.changeType}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <ChevronRight className="w-8 h-8 text-surface-300 mx-auto mb-2" />
                <p className="text-sm text-surface-500">Select a component from the left panel to view details and propose changes.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
