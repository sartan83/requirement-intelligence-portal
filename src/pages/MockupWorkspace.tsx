import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import {
  MousePointer2,
  Move,
  Trash2,
  Plus,
  ArrowRight,
  MonitorSmartphone,
  ChevronDown,
  Pencil,
  Eye,
} from 'lucide-react';
import type { UIScreen, UIElement } from '../types';

const elementColors: Record<string, string> = {
  header: 'bg-surface-800 text-white',
  nav: 'bg-surface-700 text-white',
  sidebar: 'bg-surface-800 text-white',
  form: 'bg-white border-2 border-surface-300',
  table: 'bg-white border border-surface-300',
  button: 'bg-primary-600 text-white',
  input: 'bg-white border border-surface-300',
  card: 'bg-white border border-surface-200 shadow-sm',
  list: 'bg-white border border-surface-200',
  text: 'text-surface-600',
  modal: 'bg-white border-2 border-primary-300 shadow-xl',
};

interface ChangeCapture {
  elementId: string;
  screenId: string;
  changeType: string;
  description: string;
  timestamp: string;
}

export default function MockupWorkspace() {
  const navigate = useNavigate();
  const { screens, addRequirement } = useApp();
  const [activeScreenId, setActiveScreenId] = useState(screens[0]?.id ?? '');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [mode, setMode] = useState<'select' | 'move' | 'edit'>('select');
  const [changes, setChanges] = useState<ChangeCapture[]>([]);
  const [editingLabel, setEditingLabel] = useState('');
  const [localScreens, setLocalScreens] = useState<UIScreen[]>(screens);
  const [showNewElementPanel, setShowNewElementPanel] = useState(false);
  const idCounter = useRef(0);

  const activeScreen = localScreens.find(s => s.id === activeScreenId);

  if (!screens.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-surface-700 mb-2">No UI Screens Available</h2>
          <button onClick={() => navigate('/connect')} className="text-primary-600 text-sm font-medium">Connect Repository</button>
        </div>
      </div>
    );
  }

  const captureChange = (elementId: string, changeType: string, description: string) => {
    setChanges(prev => [...prev, {
      elementId,
      screenId: activeScreenId,
      changeType,
      description,
      timestamp: new Date().toLocaleTimeString(),
    }]);
  };

  const handleElementClick = (el: UIElement) => {
    if (mode === 'select' || mode === 'edit') {
      setSelectedElement(el.id);
      setEditingLabel(el.label);
    }
  };

  const handleLabelSave = () => {
    if (!selectedElement || !activeScreen) return;
    const el = activeScreen.elements.find(e => e.id === selectedElement);
    if (!el || el.label === editingLabel) return;

    setLocalScreens(prev => prev.map(s =>
      s.id === activeScreenId
        ? { ...s, elements: s.elements.map(e => e.id === selectedElement ? { ...e, label: editingLabel } : e) }
        : s
    ));
    captureChange(selectedElement, 'rename', `Renamed "${el.label}" to "${editingLabel}"`);
  };

  const handleDeleteElement = () => {
    if (!selectedElement || !activeScreen) return;
    const el = activeScreen.elements.find(e => e.id === selectedElement);
    if (!el) return;

    setLocalScreens(prev => prev.map(s =>
      s.id === activeScreenId
        ? { ...s, elements: s.elements.filter(e => e.id !== selectedElement) }
        : s
    ));
    captureChange(selectedElement, 'remove', `Removed element "${el.label}"`);
    setSelectedElement(null);
  };

  const handleAddElement = (type: UIElement['type']) => {
    if (!activeScreen) return;
    idCounter.current += 1;
    const id = `el-new-${idCounter.current}`;
    const newEl: UIElement = {
      id,
      type,
      label: `New ${type}`,
      x: 280,
      y: 300,
      width: 200,
      height: 40,
      properties: {},
    };
    setLocalScreens(prev => prev.map(s =>
      s.id === activeScreenId
        ? { ...s, elements: [...s.elements, newEl] }
        : s
    ));
    captureChange(id, 'add', `Added new ${type} element`);
    setShowNewElementPanel(false);
    setSelectedElement(id);
  };

  const generateRequirementsFromChanges = () => {
    if (changes.length === 0) return;
    const changeDescriptions = changes.map(c => c.description);
    addRequirement({
      id: `req-ui-${Date.now()}`,
      type: 'functional',
      title: `UI Changes: ${activeScreen?.name ?? 'Screen'} Modifications`,
      businessObjective: 'Improve user experience based on visual design changes captured in the mockup workspace.',
      currentState: `Current ${activeScreen?.name ?? 'screen'} layout with original element positioning and labels.`,
      futureState: `Updated screen with the following changes: ${changeDescriptions.join('; ')}`,
      userStory: `As a user, I want the ${activeScreen?.name ?? 'screen'} to be updated so that the interface better supports my workflow.`,
      functionalRequirements: changeDescriptions,
      technicalRequirements: [
        `Update React components for ${activeScreen?.name ?? 'screen'}`,
        'Ensure responsive layout is maintained after changes',
        'Update any related component tests',
      ],
      nonFunctionalRequirements: ['Changes must not degrade page load performance', 'Maintain accessibility compliance'],
      acceptanceCriteria: changeDescriptions.map(d => `Verify: ${d}`),
      testScenarios: [`Visual regression test for ${activeScreen?.name ?? 'screen'}`, 'Cross-browser compatibility check'],
      impactedFiles: activeScreen ? [`src/pages${activeScreen.route}/index.tsx`] : [],
      apiImpact: 'None expected for UI-only changes.',
      securityImpact: 'None.',
      risks: ['Layout changes may affect other responsive breakpoints'],
      dependencies: [],
      openQuestions: [],
      complexity: changes.length > 5 ? 'high' : changes.length > 2 ? 'medium' : 'low',
      status: 'draft',
    });
    navigate('/requirements');
  };

  const selectedEl = activeScreen?.elements.find(e => e.id === selectedElement);

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b border-surface-200 px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <MonitorSmartphone className="w-4.5 h-4.5 text-primary-600 mr-2" />
            <h1 className="text-sm font-semibold text-surface-900">UI Mockup Workspace</h1>
          </div>
          <div className="h-5 w-px bg-surface-200" />
          {/* Screen Selector */}
          <div className="relative">
            <select
              value={activeScreenId}
              onChange={e => { setActiveScreenId(e.target.value); setSelectedElement(null); }}
              className="text-sm border border-surface-200 rounded-lg px-3 py-1.5 pr-8 appearance-none bg-white"
            >
              {localScreens.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.route})</option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-surface-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <div className="h-5 w-px bg-surface-200" />
          {/* Mode Toggle */}
          <div className="flex items-center gap-1 bg-surface-100 rounded-lg p-0.5">
            {[
              { m: 'select' as const, icon: MousePointer2, label: 'Select' },
              { m: 'move' as const, icon: Move, label: 'Move' },
              { m: 'edit' as const, icon: Pencil, label: 'Edit' },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.m}
                  onClick={() => setMode(item.m)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                    mode === item.m ? 'bg-white text-primary-600 shadow-sm' : 'text-surface-500 hover:text-surface-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNewElementPanel(!showNewElementPanel)}
            className="flex items-center gap-1.5 bg-surface-100 hover:bg-surface-200 text-surface-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Element
          </button>
          {changes.length > 0 && (
            <button
              onClick={generateRequirementsFromChanges}
              className="flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            >
              Generate Requirements ({changes.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Add Element Dropdown */}
      {showNewElementPanel && (
        <div className="bg-white border-b border-surface-200 px-4 py-2 flex items-center gap-2 shrink-0">
          <span className="text-xs text-surface-500 mr-2">Add:</span>
          {(['button', 'input', 'card', 'text', 'table', 'form', 'header', 'list'] as const).map(type => (
            <button
              key={type}
              onClick={() => handleAddElement(type)}
              className="bg-surface-100 hover:bg-surface-200 text-surface-700 px-3 py-1 rounded text-xs capitalize transition-colors"
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {/* Main Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas */}
        <div className="flex-1 bg-surface-100 overflow-auto p-6">
          <div className="relative bg-white rounded-lg shadow-md mx-auto" style={{ width: 1000, height: 620 }}>
            {/* Screen label */}
            <div className="absolute -top-6 left-0 text-xs text-surface-500 font-medium">
              {activeScreen?.name} &mdash; {activeScreen?.route}
            </div>
            {activeScreen?.elements.map(el => {
              const isSelected = selectedElement === el.id;
              return (
                <div
                  key={el.id}
                  onClick={() => handleElementClick(el)}
                  className={`absolute rounded cursor-pointer transition-shadow flex items-center justify-center text-xs font-medium ${elementColors[el.type] ?? 'bg-surface-100 border border-surface-300'} ${
                    isSelected ? 'ring-2 ring-primary-500 ring-offset-1 z-10' : 'hover:ring-1 hover:ring-primary-300'
                  }`}
                  style={{ left: el.x, top: el.y, width: el.width, height: el.height }}
                >
                  <span className="px-2 truncate">{el.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-80 bg-white border-l border-surface-200 flex flex-col shrink-0 overflow-y-auto">
          {selectedEl ? (
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-surface-900 mb-3">Element Properties</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-surface-500 block mb-1">Type</label>
                    <div className="text-sm text-surface-700 capitalize bg-surface-50 px-3 py-1.5 rounded">{selectedEl.type}</div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-surface-500 block mb-1">Label</label>
                    <div className="flex gap-2">
                      <input
                        value={editingLabel}
                        onChange={e => setEditingLabel(e.target.value)}
                        className="flex-1 border border-surface-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <button
                        onClick={handleLabelSave}
                        className="bg-primary-600 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-primary-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium text-surface-500 block mb-1">X</label>
                      <div className="text-sm text-surface-700 bg-surface-50 px-3 py-1.5 rounded">{selectedEl.x}</div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-surface-500 block mb-1">Y</label>
                      <div className="text-sm text-surface-700 bg-surface-50 px-3 py-1.5 rounded">{selectedEl.y}</div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-surface-500 block mb-1">Width</label>
                      <div className="text-sm text-surface-700 bg-surface-50 px-3 py-1.5 rounded">{selectedEl.width}</div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-surface-500 block mb-1">Height</label>
                      <div className="text-sm text-surface-700 bg-surface-50 px-3 py-1.5 rounded">{selectedEl.height}</div>
                    </div>
                  </div>
                  {Object.keys(selectedEl.properties).length > 0 && (
                    <div>
                      <label className="text-xs font-medium text-surface-500 block mb-1">Properties</label>
                      {Object.entries(selectedEl.properties).map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between text-xs py-1">
                          <span className="text-surface-500">{k}</span>
                          <span className="text-surface-700 font-mono">{v}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={handleDeleteElement}
                    className="flex items-center gap-1.5 text-danger-600 hover:text-danger-700 text-xs font-medium mt-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove Element
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-center gap-2 text-surface-400 mb-2">
                <Eye className="w-4 h-4" />
                <span className="text-sm">Select an element to edit</span>
              </div>
              <p className="text-xs text-surface-400">Click on any element in the canvas to view and modify its properties.</p>
            </div>
          )}

          {/* Change Log */}
          <div className="border-t border-surface-200 p-4 mt-auto">
            <h3 className="text-sm font-semibold text-surface-900 mb-2">Change Log ({changes.length})</h3>
            {changes.length === 0 ? (
              <p className="text-xs text-surface-400">No changes captured yet. Modify elements to capture requirement intents.</p>
            ) : (
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {changes.map((c, i) => (
                  <div key={i} className="text-xs bg-surface-50 rounded p-2">
                    <span className="text-surface-400">{c.timestamp}</span>
                    <span className="text-surface-700 ml-2">{c.description}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
