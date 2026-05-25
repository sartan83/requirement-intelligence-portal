import { useNavigate } from 'react-router-dom';
import { GitBranch, BarChart3, ClipboardList, PackageCheck, ArrowRight, Layers, MonitorSmartphone, Sparkles, Zap } from 'lucide-react';

const steps = [
  { icon: GitBranch, title: 'Connect Repository', desc: 'Ingest and analyze any codebase to understand its structure, stack, and architecture.' },
  { icon: BarChart3, title: 'Deep Analysis', desc: 'Discover modules, APIs, data entities, user journeys, technical debt, and test gaps.' },
  { icon: MonitorSmartphone, title: 'Interactive Workspace', desc: 'Explore UI mockups or system maps. Propose changes visually or structurally.' },
  { icon: ClipboardList, title: 'Generate Requirements', desc: 'Produce structured business, functional, and technical requirements automatically.' },
  { icon: PackageCheck, title: 'Devin-Ready Handoff', desc: 'Export implementation-ready execution packages for AI engineering agents.' },
];

const features = [
  { icon: Layers, title: 'Full Stack Understanding', desc: 'Frontend, backend, APIs, databases, auth, deployment — analyzed holistically.' },
  { icon: Sparkles, title: 'Intelligence Layer', desc: 'Not just documentation. Smart analysis of risks, debt, and change impact.' },
  { icon: PackageCheck, title: 'Agent-Ready Output', desc: 'Structured packages designed for AI agents like Devin to execute immediately.' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-white">
      {/* Hero */}
      <section className="relative">
        <div className="max-w-4xl mx-auto px-6 pt-28 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-surface-100 text-surface-600 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
            <Zap className="w-3.5 h-3.5" />
            Requirements Intelligence for Software Delivery
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-surface-900 mb-6 leading-[1.1] tracking-tight">
            From business intent to<br />
            implementation-ready<br />
            requirements
          </h1>
          <p className="text-lg text-surface-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Analyze your codebase. Understand your application. Generate structured, validated requirements. Make AI engineering agents dramatically more effective.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => navigate('/connect')}
              className="inline-flex items-center gap-2 bg-surface-900 hover:bg-surface-800 text-white px-6 py-3 rounded-full font-medium transition-colors text-sm"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/analysis')}
              className="inline-flex items-center gap-2 bg-white hover:bg-surface-50 text-surface-700 border border-surface-200 px-6 py-3 rounded-full font-medium transition-colors text-sm"
            >
              View Demo Analysis
            </button>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-surface-900 mb-3 tracking-tight">The missing layer in AI-powered development</h2>
          <p className="text-surface-500 max-w-xl mx-auto">
            AI agents optimize execution. This portal optimizes the requirements that drive execution.
          </p>
        </div>
        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative text-center group">
                <div className="w-11 h-11 rounded-xl bg-surface-100 text-surface-700 flex items-center justify-center mx-auto mb-3 group-hover:bg-surface-900 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-xs font-medium text-surface-400 mb-1">Step {i + 1}</div>
                <h3 className="text-sm font-semibold text-surface-900 mb-1">{step.title}</h3>
                <p className="text-xs text-surface-500 leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-5 -right-4 w-4 h-4 text-surface-300" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-surface-200">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="rounded-2xl border border-surface-200 p-6 hover:border-surface-300 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-surface-100 text-surface-700 flex items-center justify-center mb-4">
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
      <section className="border-t border-surface-200">
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold text-surface-900 mb-3 tracking-tight">Ready to transform your requirements process?</h2>
          <p className="text-surface-500 mb-8 max-w-lg mx-auto">
            Connect a repository and see how structured requirements intelligence bridges the gap between business intent and engineering execution.
          </p>
          <button
            onClick={() => navigate('/connect')}
            className="inline-flex items-center gap-2 bg-surface-900 hover:bg-surface-800 text-white px-6 py-3 rounded-full font-medium transition-colors text-sm"
          >
            Connect Your Repository <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
