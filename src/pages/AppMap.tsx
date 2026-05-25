import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import StatusBadge from '../components/StatusBadge';
import { ArrowRight, Database, Globe, Monitor, Server, Shield, Workflow } from 'lucide-react';

const typeIcons: Record<string, typeof Monitor> = {
  frontend: Monitor,
  backend: Server,
  database: Database,
  integration: Globe,
  infrastructure: Shield,
};

const typeColors: Record<string, string> = {
  frontend: 'bg-blue-50 border-blue-200 text-blue-700',
  backend: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  database: 'bg-purple-50 border-purple-200 text-purple-700',
  integration: 'bg-orange-50 border-orange-200 text-orange-700',
  infrastructure: 'bg-slate-50 border-slate-200 text-slate-700',
};

export default function AppMap() {
  const navigate = useNavigate();
  const { summary } = useApp();

  if (!summary) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-surface-700 mb-2">No Analysis Available</h2>
          <button onClick={() => navigate('/connect')} className="text-surface-600 hover:text-surface-900 text-sm font-medium">
            Connect Repository
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 mb-1">Application Map</h1>
          <p className="text-surface-500 text-sm">Visual representation of system architecture and component relationships.</p>
        </div>
        <button
          onClick={() => navigate(summary.hasUI ? '/mockup' : '/components')}
          className="bg-surface-900 hover:bg-surface-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          {summary.hasUI ? 'UI Workspace' : 'Component Workspace'} <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-white rounded-xl border border-surface-200 p-6">
        <h2 className="font-semibold text-surface-900 mb-5 flex items-center gap-2">
          <Workflow className="w-4.5 h-4.5 text-surface-500" />
          System Architecture
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {/* Frontend Layer */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-surface-500 uppercase tracking-wide text-center pb-2 border-b border-surface-200">
              Frontend Layer
            </div>
            {summary.technicalComponents
              .filter(c => c.type === 'frontend')
              .map(comp => {
                const Icon = typeIcons[comp.type] ?? Monitor;
                return (
                  <div key={comp.id} className={`border rounded-lg p-4 ${typeColors[comp.type]}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-semibold">{comp.name}</span>
                    </div>
                    <p className="text-xs opacity-80">{comp.description}</p>
                    <div className="mt-2 text-xs font-mono opacity-60">{comp.technology}</div>
                  </div>
                );
              })}
          </div>

          {/* Backend Layer */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-surface-500 uppercase tracking-wide text-center pb-2 border-b border-surface-200">
              Backend Layer
            </div>
            {summary.technicalComponents
              .filter(c => c.type === 'backend' || c.type === 'integration')
              .map(comp => {
                const Icon = typeIcons[comp.type] ?? Server;
                return (
                  <div key={comp.id} className={`border rounded-lg p-4 ${typeColors[comp.type]}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-semibold">{comp.name}</span>
                    </div>
                    <p className="text-xs opacity-80">{comp.description}</p>
                    <div className="mt-2 text-xs font-mono opacity-60">{comp.technology}</div>
                  </div>
                );
              })}
            {/* Connection arrows */}
            <div className="flex items-center justify-center py-2">
              <div className="flex items-center gap-2 text-surface-400">
                <div className="h-px w-8 bg-surface-300" />
                <span className="text-xs">REST API / JWT</span>
                <div className="h-px w-8 bg-surface-300" />
              </div>
            </div>
          </div>

          {/* Data Layer */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-surface-500 uppercase tracking-wide text-center pb-2 border-b border-surface-200">
              Data & Infrastructure
            </div>
            {summary.technicalComponents
              .filter(c => c.type === 'database' || c.type === 'infrastructure')
              .map(comp => {
                const Icon = typeIcons[comp.type] ?? Database;
                return (
                  <div key={comp.id} className={`border rounded-lg p-4 ${typeColors[comp.type]}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-semibold">{comp.name}</span>
                    </div>
                    <p className="text-xs opacity-80">{comp.description}</p>
                    <div className="mt-2 text-xs font-mono opacity-60">{comp.technology}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* User Journeys */}
      {summary.userJourneys.length > 0 && (
        <div className="bg-white rounded-xl border border-surface-200 p-6">
          <h2 className="font-semibold text-surface-900 mb-4">User Journeys</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {summary.userJourneys.map(journey => (
              <div key={journey.id} className="border border-surface-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-surface-900 mb-3">{journey.name}</h3>
                <div className="space-y-1.5">
                  {journey.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-surface-100 text-surface-700 text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-xs text-surface-600">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {journey.screens.map(screen => (
                    <span key={screen} className="bg-surface-100 text-surface-600 px-1.5 py-0.5 rounded text-xs">{screen}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Entities */}
      <div className="bg-white rounded-xl border border-surface-200 p-6">
        <h2 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
          <Database className="w-4.5 h-4.5 text-surface-500" />
          Data Entities
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {summary.dataEntities.map(entity => (
            <div key={entity.name} className="border border-surface-200 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-surface-900 mb-2">{entity.name}</h3>
              <div className="space-y-1 mb-3">
                {entity.fields.map(field => (
                  <div key={field.name} className="flex items-center justify-between text-xs">
                    <span className="font-mono text-surface-700">{field.name}</span>
                    <span className="text-surface-400">{field.type}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-surface-100 pt-2">
                {entity.relationships.map((rel, i) => (
                  <div key={i} className="text-xs text-surface-500">{rel}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Module Health */}
      <div className="bg-white rounded-xl border border-surface-200 p-6">
        <h2 className="font-semibold text-surface-900 mb-4">Module Health Overview</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {summary.modules.map(mod => (
            <div key={mod.id} className="flex items-center justify-between border border-surface-200 rounded-lg p-3">
              <div>
                <div className="text-sm font-medium text-surface-800">{mod.name}</div>
                <div className="text-xs text-surface-400">{mod.files.length} paths</div>
              </div>
              <StatusBadge status={mod.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
