import { useNavigate } from 'react-router-dom';
import { Brain, GitBranch, BarChart3, ClipboardList, PackageCheck, ArrowRight, Layers, MonitorSmartphone } from 'lucide-react';

const steps = [
  { icon: GitBranch, title: 'Connect Repository', desc: 'Ingest and analyze any codebase to understand its structure, stack, and architecture.' },
  { icon: BarChart3, title: 'Deep Analysis', desc: 'Discover modules, APIs, data entities, user journeys, technical debt, and test gaps.' },
  { icon: MonitorSmartphone, title: 'Interactive Workspace', desc: 'Explore UI mockups or system maps. Propose changes visually or structurally.' },
  { icon: ClipboardList, title: 'Generate Requirements', desc: 'Produce structured business, functional, and technical requirements automatically.' },
  { icon: PackageCheck, title: 'Devin-Ready Handoff', desc: 'Export implementation-ready execution packages for AI engineering agents.' },
];

const features = [
  { icon: Layers, title: 'Full Stack Understanding', desc: 'Frontend, backend, APIs, databases, auth, deployment — analyzed holistically.' },
  { icon: Brain, title: 'Intelligence Layer', desc: 'Not just documentation. Smart analysis of risks, debt, and change impact.' },
  { icon: PackageCheck, title: 'Agent-Ready Output', desc: 'Structured packages designed for AI agents like Devin to execute immediately.' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-900 via-surface-800 to-primary-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary-800)_0%,_transparent_60%)] opacity-40" />
        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-600/20 border border-primary-500/30 text-primary-300 rounded-full px-4 py-1.5 text-sm mb-6">
            <Brain className="w-4 h-4" />
            Requirements Intelligence for Software Delivery
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            From Business Intent to<br />
            <span className="text-primary-400">Implementation-Ready Requirements</span>
          </h1>
          <p className="text-lg text-surface-300 max-w-2xl mx-auto mb-10">
            Analyze your codebase. Understand your application. Generate structured, validated requirements.
            Make AI engineering agents like Devin dramatically more effective.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate('/connect')}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/analysis')}
              className="inline-flex items-center gap-2 bg-surface-700 hover:bg-surface-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View Demo Analysis
            </button>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-2xl font-bold text-surface-900 mb-3">The Missing Layer in AI-Powered Development</h2>
          <p className="text-surface-500 max-w-xl mx-auto">
            AI agents optimize execution. This portal optimizes the requirements that drive execution.
          </p>
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative text-center group">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-primary-600 mb-1">Step {i + 1}</div>
                <h3 className="text-sm font-semibold text-surface-900 mb-1">{step.title}</h3>
                <p className="text-xs text-surface-500 leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-6 -right-3 w-4 h-4 text-surface-300" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="bg-surface-50 border-y border-surface-200">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-white rounded-xl border border-surface-200 p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-surface-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-surface-500 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-surface-900 mb-3">Ready to Transform Your Requirements Process?</h2>
        <p className="text-surface-500 mb-8 max-w-lg mx-auto">
          Connect a repository and see how structured requirements intelligence bridges the gap between business intent and engineering execution.
        </p>
        <button
          onClick={() => navigate('/connect')}
          className="inline-flex items-center gap-2 bg-surface-900 hover:bg-surface-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Connect Your Repository <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
}
