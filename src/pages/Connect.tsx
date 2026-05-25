import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitBranch, Upload, Loader2, CheckCircle2, FolderSearch, FileCode, Database, Shield, TestTube2 } from 'lucide-react';
import { useApp } from '../context/useApp';

const analysisSteps = [
  { label: 'Cloning repository...', icon: GitBranch },
  { label: 'Detecting technology stack...', icon: FileCode },
  { label: 'Analyzing file structure...', icon: FolderSearch },
  { label: 'Mapping modules & APIs...', icon: Database },
  { label: 'Evaluating security & tests...', icon: Shield },
  { label: 'Analysis complete', icon: CheckCircle2 },
];

const sampleRepos = [
  { name: 'DevilsVault Banking App', url: 'https://github.com/sartan83/online-banking-application', branch: 'main', desc: 'Full-stack banking: React + Spring Boot + PostgreSQL' },
  { name: 'Node Accounting System', url: 'https://github.com/sartan83/DevinTest', branch: 'main', desc: 'COBOL-to-Node.js accounting migration' },
  { name: 'CardDemo Mainframe', url: 'https://github.com/sartan83/aws-mainframe-modernization-carddemo', branch: 'main', desc: 'COBOL/CICS credit card management system' },
];

export default function Connect() {
  const navigate = useNavigate();
  const { connectRepository, isAnalyzing, analysisStep, repository } = useApp();
  const [url, setUrl] = useState('');
  const [branch, setBranch] = useState('main');

  const handleConnect = (repoUrl?: string, repoBranch?: string) => {
    const finalUrl = repoUrl ?? url;
    const finalBranch = repoBranch ?? branch;
    if (!finalUrl) return;
    if (repoUrl) {
      setUrl(finalUrl);
      setBranch(finalBranch);
    }
    connectRepository(finalUrl, finalBranch);
  };

  const isComplete = repository?.status === 'completed';

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-surface-900 mb-2">Connect Repository</h1>
        <p className="text-surface-500">Provide a repository URL to begin analysis, or select a sample repository.</p>
      </div>

      {/* Manual Input */}
      <div className="bg-white rounded-xl border border-surface-200 p-6 mb-6">
        <h2 className="font-semibold text-surface-900 mb-4 flex items-center gap-2">
          <GitBranch className="w-4.5 h-4.5 text-surface-500" />
          Repository URL
        </h2>
        <div className="space-y-3">
          <input
            type="url"
            placeholder="https://github.com/org/repo"
            value={url}
            onChange={e => setUrl(e.target.value)}
            disabled={isAnalyzing}
            className="w-full border border-surface-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
          />
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Branch (default: main)"
              value={branch}
              onChange={e => setBranch(e.target.value)}
              disabled={isAnalyzing}
              className="flex-1 border border-surface-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
            />
            <button
              onClick={() => handleConnect()}
              disabled={!url || isAnalyzing}
              className="bg-surface-900 hover:bg-surface-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              Analyze
            </button>
          </div>
        </div>
      </div>

      {/* Sample Repos */}
      {!isAnalyzing && !isComplete && (
        <div className="bg-white rounded-xl border border-surface-200 p-6 mb-6">
          <h2 className="font-semibold text-surface-900 mb-4">Sample Repositories</h2>
          <div className="space-y-3">
            {sampleRepos.map(repo => (
              <button
                key={repo.url}
                onClick={() => handleConnect(repo.url, repo.branch)}
                className="w-full text-left border border-surface-200 hover:border-surface-400 hover:bg-surface-50 rounded-xl p-4 transition-colors"
              >
                <div className="font-medium text-sm text-surface-900">{repo.name}</div>
                <div className="text-xs text-surface-500 mt-0.5">{repo.desc}</div>
                <div className="text-xs text-surface-400 mt-1 font-mono">{repo.url}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Progress */}
      {(isAnalyzing || isComplete) && (
        <div className="bg-white rounded-xl border border-surface-200 p-6">
          <h2 className="font-semibold text-surface-900 mb-5">Analysis Progress</h2>
          <div className="space-y-3">
            {analysisSteps.map((step, i) => {
              const Icon = step.icon;
              const stepNum = i + 1;
              const active = analysisStep === stepNum;
              const done = analysisStep > stepNum;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    active ? 'bg-surface-50 border border-surface-200' : done ? 'bg-surface-50' : 'opacity-40'
                  }`}
                >
                  {active && !done ? (
                    <Loader2 className="w-5 h-5 text-surface-600 animate-spin" />
                  ) : done ? (
                    <CheckCircle2 className="w-5 h-5 text-success-600" />
                  ) : (
                    <Icon className="w-5 h-5 text-surface-400" />
                  )}
                  <span className={`text-sm ${active ? 'text-surface-900 font-medium' : done ? 'text-surface-700' : 'text-surface-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {isComplete && (
            <div className="mt-6 pt-5 border-t border-surface-200 flex items-center justify-between">
              <div>
                <TestTube2 className="w-5 h-5 text-success-600 inline mr-2" />
                <span className="text-sm font-medium text-success-600">Repository analyzed successfully</span>
              </div>
              <button
                onClick={() => navigate('/analysis')}
                className="bg-surface-900 hover:bg-surface-800 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                View Analysis
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
