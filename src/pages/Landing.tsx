import { useNavigate } from 'react-router-dom';
import { ArrowRight, Briefcase, Shield, Sparkles, Lightbulb, Mic, Camera, FileText, Link2, GitBranch } from 'lucide-react';
import { useApp } from '../context/useApp';

const businessExamples = [
  'We need to improve customer onboarding',
  'We must comply with a new regulation',
  'The current approval process is too slow',
  'We want to launch a new digital service',
  'Customers are dropping off during document upload',
];

const itExamples = [
  'Define allowed repositories and access scopes',
  'Set mandatory architectural patterns (e.g., Event-driven, Microservices)',
  'Establish risk thresholds and CI/CD gates',
  'Inject enterprise tech-stack constraints',
];

const supportedInputs = [
  { icon: FileText, label: 'Documents & specs' },
  { icon: Mic, label: 'Audio & recordings' },
  { icon: Camera, label: 'Screenshots & diagrams' },
  { icon: Link2, label: 'URLs & references' },
  { icon: GitBranch, label: 'Repositories' },
];

export default function Landing() {
  const navigate = useNavigate();
  const { setIntakeMode, loadDemoScenario } = useApp();

  const handleBusinessMode = () => {
    setIntakeMode('business');
    navigate('/intake');
  };

  const handleITMode = () => {
    setIntakeMode('it');
    navigate('/intake');
  };

  const handleDemo = () => {
    loadDemoScenario();
    navigate('/requirement-pack');
  };

  return (
    <div className="min-h-full bg-white">
      {/* Hero */}
      <section className="relative">
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-surface-100 text-surface-600 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            AI Agent Prompt Compiler
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-surface-900 mb-6 leading-[1.1] tracking-tight">
            Turn business intent into<br />
            compliant, execution-ready<br />
            prompts for Autonomous AI Agents
          </h1>
          <p className="text-lg text-surface-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Describe what you want to change. Upload supporting material if you have it.
            The platform analyzes business context, technical impact, compliance guardrails and risks,
            then compiles a secure, execution-ready initialization script for AI coding agents.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleBusinessMode}
              className="inline-flex items-center gap-2 bg-surface-900 hover:bg-surface-800 text-white px-6 py-3 rounded-full font-medium transition-colors text-sm"
            >
              Start from a business need <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleITMode}
              className="inline-flex items-center gap-2 bg-white hover:bg-surface-50 text-surface-700 border border-surface-200 px-6 py-3 rounded-full font-medium transition-colors text-sm"
            >
              Start from an IT asset
            </button>
          </div>
        </div>
      </section>

      {/* Mode Cards */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Business Mode Card */}
          <div className="rounded-2xl border border-surface-200 p-8 hover:border-surface-300 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-surface-100 text-surface-700 flex items-center justify-center mb-5">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-surface-900 mb-2">Start from a business need</h3>
            <p className="text-sm text-surface-500 mb-5 leading-relaxed">
              For business stakeholders, product owners, transformation teams and CIO offices.
            </p>
            <div className="space-y-2 mb-6">
              {businessExamples.map((ex, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-surface-500">
                  <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0 text-surface-400" />
                  <span className="italic">&ldquo;{ex}&rdquo;</span>
                </div>
              ))}
            </div>
            <button
              onClick={handleBusinessMode}
              className="w-full bg-surface-900 hover:bg-surface-800 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Describe business change
            </button>
          </div>

          {/* IT Mode Card */}
          <div className="rounded-2xl border border-surface-200 p-8 hover:border-surface-300 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-surface-100 text-surface-700 flex items-center justify-center mb-5">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-surface-900 mb-2">Set execution boundaries</h3>
            <p className="text-sm text-surface-500 mb-5 leading-relaxed">
              For application owners, architects, engineering teams and IT demand managers. Define the guardrails AI agents must respect.
            </p>
            <div className="space-y-2 mb-6">
              {itExamples.map((ex, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-surface-500">
                  <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0 text-surface-400" />
                  <span className="italic">&ldquo;{ex}&rdquo;</span>
                </div>
              ))}
            </div>
            <button
              onClick={handleITMode}
              className="w-full bg-white hover:bg-surface-50 text-surface-700 border border-surface-200 py-2.5 rounded-lg text-sm font-medium transition-colors"
            >
              Define Execution Boundaries
            </button>
          </div>
        </div>
      </section>

      {/* Supported Inputs */}
      <section className="border-t border-surface-200">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-surface-900 mb-2 tracking-tight">Capture ideas, meetings, screenshots, documents or repositories</h2>
            <p className="text-surface-500 text-sm">The platform analyzes context, enforces compliance guardrails, and compiles agent-ready initialization scripts.</p>
          </div>
          <div className="flex items-center justify-center gap-8">
            {supportedInputs.map((input, i) => {
              const Icon = input.icon;
              return (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-surface-50 border border-surface-200 flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5 text-surface-500" />
                  </div>
                  <span className="text-xs text-surface-500">{input.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <section className="border-t border-surface-200">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-surface-900 mb-3 tracking-tight">See it in action</h2>
          <p className="text-surface-500 mb-6 max-w-lg mx-auto text-sm">
            Try the demo scenario: &ldquo;Improve digital customer onboarding&rdquo; — complete with sample inputs, agent analysis, enterprise guardrails, and a compiled Devin initialization script.
          </p>
          <button
            onClick={handleDemo}
            className="inline-flex items-center gap-2 bg-surface-900 hover:bg-surface-800 text-white px-6 py-3 rounded-full font-medium transition-colors text-sm"
          >
            Load Demo Scenario <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
