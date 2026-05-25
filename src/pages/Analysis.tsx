import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/useApp';
import StatusBadge from '../components/StatusBadge';
import {
  Layers,
  Globe,
  Shield,
  TestTube2,
  AlertTriangle,
  ArrowRight,
  FileCode,
  Server,
  Link2,
} from 'lucide-react';

export default function Analysis() {
  const navigate = useNavigate();
  const { summary, techStack, fileCategories, repository } = useApp();

  if (!summary || !techStack) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-surface-700 mb-2">No Analysis Available</h2>
          <p className="text-sm text-surface-500 mb-4">Connect a repository first to view the analysis.</p>
          <button onClick={() => navigate('/connect')} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Connect Repository
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 mb-1">Analysis Dashboard</h1>
          <p className="text-surface-500 text-sm">
            Repository: <span className="font-mono text-surface-700">{repository?.name}</span>
            {' '}&middot;{' '}
            <StatusBadge status={repository?.status ?? 'pending'} />
          </p>
        </div>
        <button
          onClick={() => navigate('/map')}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          View App Map <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Purpose */}
      <div className="bg-white rounded-xl border border-surface-200 p-6">
        <h2 className="font-semibold text-surface-900 mb-3">Application Purpose</h2>
        <p className="text-sm text-surface-600 leading-relaxed">{summary.purpose}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded font-medium">
            {summary.hasUI ? 'UI Application Detected' : 'Non-UI Application'}
          </span>
        </div>
      </div>

      {/* Tech Stack & File Categories */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-surface-200 p-6">
          <h2 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
            <FileCode className="w-4.5 h-4.5 text-primary-600" />
            Technology Stack
          </h2>
          <div className="space-y-4">
            <div>
              <div className="text-xs font-medium text-surface-500 uppercase mb-2">Languages</div>
              <div className="space-y-1.5">
                {techStack.languages.map(l => (
                  <div key={l.name} className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-surface-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-500 rounded-full" style={{ width: `${l.percentage}%` }} />
                    </div>
                    <span className="text-xs text-surface-600 w-28 text-right">{l.name} ({l.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-surface-500 uppercase mb-2">Frameworks</div>
              <div className="flex flex-wrap gap-1.5">
                {techStack.frameworks.map(f => (
                  <span key={f} className="bg-surface-100 text-surface-700 px-2 py-0.5 rounded text-xs">{f}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-surface-500 uppercase mb-2">Databases</div>
              <div className="flex flex-wrap gap-1.5">
                {techStack.databases.map(d => (
                  <span key={d} className="bg-surface-100 text-surface-700 px-2 py-0.5 rounded text-xs">{d}</span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-surface-500 uppercase mb-2">Testing</div>
              <div className="flex flex-wrap gap-1.5">
                {techStack.testing.map(t => (
                  <span key={t} className="bg-surface-100 text-surface-700 px-2 py-0.5 rounded text-xs">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-surface-200 p-6">
          <h2 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
            <Layers className="w-4.5 h-4.5 text-primary-600" />
            File Structure
          </h2>
          <div className="space-y-3">
            {fileCategories.map(cat => (
              <div key={cat.category} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-surface-800">{cat.category}</div>
                  <div className="text-xs text-surface-400">{cat.files.slice(0, 2).join(', ')}</div>
                </div>
                <span className="text-sm font-semibold text-surface-600">{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="bg-white rounded-xl border border-surface-200 p-6">
        <h2 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
          <Server className="w-4.5 h-4.5 text-primary-600" />
          Functional Modules
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {summary.modules.map(mod => (
            <div key={mod.id} className="border border-surface-200 rounded-lg p-4 hover:border-primary-200 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-surface-900">{mod.name}</h3>
                <StatusBadge status={mod.status} variant="dot" />
              </div>
              <p className="text-xs text-surface-500 leading-relaxed">{mod.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* API Endpoints */}
      <div className="bg-white rounded-xl border border-surface-200 p-6">
        <h2 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
          <Globe className="w-4.5 h-4.5 text-primary-600" />
          API Endpoints
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-200">
                <th className="text-left py-2 px-3 text-xs font-medium text-surface-500 uppercase">Method</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-surface-500 uppercase">Path</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-surface-500 uppercase">Description</th>
                <th className="text-left py-2 px-3 text-xs font-medium text-surface-500 uppercase">Module</th>
              </tr>
            </thead>
            <tbody>
              {summary.apiEndpoints.map((ep, i) => {
                const methodColors: Record<string, string> = {
                  GET: 'bg-success-500/10 text-success-600',
                  POST: 'bg-primary-100 text-primary-700',
                  PUT: 'bg-warning-500/10 text-warning-600',
                  DELETE: 'bg-danger-500/10 text-danger-600',
                  PATCH: 'bg-accent-500/10 text-accent-600',
                };
                return (
                  <tr key={i} className="border-b border-surface-100 last:border-0">
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${methodColors[ep.method] ?? ''}`}>{ep.method}</span>
                    </td>
                    <td className="py-2 px-3 font-mono text-xs text-surface-700">{ep.path}</td>
                    <td className="py-2 px-3 text-surface-600">{ep.description}</td>
                    <td className="py-2 px-3 text-surface-500">{ep.module}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Auth, Tests, Dependencies */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Auth */}
        {summary.authMechanism && (
          <div className="bg-white rounded-xl border border-surface-200 p-6">
            <h2 className="font-semibold text-surface-900 mb-3 flex items-center gap-2">
              <Shield className="w-4.5 h-4.5 text-primary-600" />
              Authentication
            </h2>
            <div className="text-sm font-medium text-surface-700 mb-1">{summary.authMechanism.type}</div>
            <div className="text-xs text-surface-500 mb-3">{summary.authMechanism.provider}</div>
            <ul className="space-y-1">
              {summary.authMechanism.features.map((f, i) => (
                <li key={i} className="text-xs text-surface-600 flex items-start gap-1.5">
                  <span className="text-primary-500 mt-0.5">&#8226;</span>{f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Test Coverage */}
        <div className="bg-white rounded-xl border border-surface-200 p-6">
          <h2 className="font-semibold text-surface-900 mb-3 flex items-center gap-2">
            <TestTube2 className="w-4.5 h-4.5 text-primary-600" />
            Test Coverage
          </h2>
          <div className="space-y-2 mb-4">
            {[
              { label: 'Unit Tests', value: summary.testCoverage.unit },
              { label: 'Integration', value: summary.testCoverage.integration },
              { label: 'End-to-End', value: summary.testCoverage.e2e },
            ].map(t => (
              <div key={t.label}>
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-surface-600">{t.label}</span>
                  <span className="font-medium text-surface-700">{t.value}%</span>
                </div>
                <div className="h-1.5 bg-surface-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${t.value >= 60 ? 'bg-success-500' : t.value >= 30 ? 'bg-warning-500' : 'bg-danger-500'}`}
                    style={{ width: `${t.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="text-xs font-medium text-surface-500 uppercase mb-1">Missing Areas</div>
          <ul className="space-y-0.5">
            {summary.testCoverage.missingAreas.slice(0, 4).map((a, i) => (
              <li key={i} className="text-xs text-surface-600">&#8226; {a}</li>
            ))}
          </ul>
        </div>

        {/* External Dependencies */}
        <div className="bg-white rounded-xl border border-surface-200 p-6">
          <h2 className="font-semibold text-surface-900 mb-3 flex items-center gap-2">
            <Link2 className="w-4.5 h-4.5 text-primary-600" />
            Key Dependencies
          </h2>
          <div className="space-y-2">
            {summary.externalDependencies.map((dep, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-surface-800">{dep.name}</div>
                  <div className="text-xs text-surface-400">{dep.purpose}</div>
                </div>
                <span className="text-xs font-mono text-surface-500">{dep.version}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Debt */}
      <div className="bg-white rounded-xl border border-surface-200 p-6">
        <h2 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4.5 h-4.5 text-warning-600" />
          Technical Debt & Modernization Candidates
        </h2>
        <div className="space-y-3">
          {summary.technicalDebt.map(td => (
            <div key={td.id} className="border border-surface-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-semibold text-surface-900">{td.title}</h3>
                <StatusBadge status={td.severity} />
              </div>
              <p className="text-xs text-surface-500 mb-2">{td.description}</p>
              <p className="text-xs text-primary-600">
                <span className="font-medium">Recommendation:</span> {td.recommendation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
