import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, FileText, Mic, Video, Image, Link2, GitBranch, Upload,
  ChevronDown, ChevronUp, HelpCircle, X, Briefcase, Server,
} from 'lucide-react';
import { useApp } from '../context/useApp';
import type { UploadedFile } from '../types/business';

const businessQuestions = [
  { key: 'businessOutcome', label: 'What business outcome are you trying to achieve?' },
  { key: 'impactedUsers', label: 'Who is impacted by this change?' },
  { key: 'currentProblem', label: 'What is not working today?' },
  { key: 'successCriteria', label: 'What would success look like?' },
  { key: 'constraints', label: 'Is there any deadline, regulation, risk or dependency we should consider?' },
];

const itQuestions = [
  { key: 'businessOutcome', label: 'Which application, service or repository should be assessed?' },
  { key: 'impactedUsers', label: 'What change, issue or modernization goal should be considered?' },
  { key: 'currentProblem', label: 'Are there known dependencies or constraints?' },
  { key: 'successCriteria', label: 'Are there security, compliance or architectural standards to respect?' },
  { key: 'constraints', label: 'What output do you need: requirements, user stories, technical analysis, effort estimate or delivery plan?' },
];

const uploadTypes = [
  { key: 'audio', icon: Mic, label: 'Audio note or meeting recording', accept: '.mp3,.wav,.m4a', type: 'audio' as const },
  { key: 'video', icon: Video, label: 'Meeting recording, demo or walkthrough', accept: '.mp4,.mov,.webm', type: 'video' as const },
  { key: 'image', icon: Image, label: 'Screenshots, whiteboards, process diagrams', accept: '.png,.jpg,.jpeg,.webp', type: 'image' as const },
  { key: 'document', icon: FileText, label: 'Business documents, policies, specs', accept: '.pdf,.docx,.txt,.md', type: 'document' as const },
];

export default function Intake() {
  const navigate = useNavigate();
  const { intakeMode, submitIntake, setIntakeMode } = useApp();
  const [textInput, setTextInput] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [repoUrl, setRepoUrl] = useState('');
  const [repoBranch, setRepoBranch] = useState('main');
  const [urlInput, setUrlInput] = useState('');
  const [showGuided, setShowGuided] = useState(false);
  const [showRepo, setShowRepo] = useState(false);

  const mode = intakeMode ?? 'business';
  const questions = mode === 'business' ? businessQuestions : itQuestions;

  const handleFileUpload = (type: UploadedFile['type'], e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    const newFiles: UploadedFile[] = Array.from(fileList).map(f => ({
      name: f.name,
      type,
      size: f.size > 1048576 ? `${(f.size / 1048576).toFixed(1)} MB` : `${(f.size / 1024).toFixed(0)} KB`,
    }));
    setFiles(prev => [...prev, ...newFiles]);
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    submitIntake({
      mode,
      textInput,
      guidedAnswers: {
        businessOutcome: answers.businessOutcome ?? '',
        impactedUsers: answers.impactedUsers ?? '',
        currentProblem: answers.currentProblem ?? '',
        successCriteria: answers.successCriteria ?? '',
        constraints: answers.constraints ?? '',
      },
      uploadedFiles: files,
      repositoryUrl: repoUrl || undefined,
      repositoryBranch: repoBranch || undefined,
    });
    navigate('/analysis');
  };

  const canSubmit = textInput.trim().length > 0 || Object.values(answers).some(v => v.trim().length > 0);

  return (
    <div className="py-8 px-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-900 mb-1">New Intake</h1>
        <p className="text-surface-500 text-sm">
          {mode === 'business'
            ? 'Start with the outcome. The technical analysis comes later.'
            : 'Start from an application, repository or architecture source. The platform will translate technical impact into business-ready requirements.'}
        </p>
        {/* Mode toggle */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => setIntakeMode('business')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              mode === 'business' ? 'bg-surface-900 text-white' : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Business Mode
          </button>
          <button
            onClick={() => setIntakeMode('it')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              mode === 'it' ? 'bg-surface-900 text-white' : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" /> IT Mode
          </button>
        </div>
      </div>

      {/* Text Input */}
      <div className="bg-white rounded-xl border border-surface-200 p-6">
        <h2 className="font-semibold text-surface-900 mb-3">Describe the change</h2>
        <textarea
          value={textInput}
          onChange={e => setTextInput(e.target.value)}
          placeholder={mode === 'business'
            ? 'Describe the business outcome, process issue, regulation, user pain point or application change you want to address...'
            : 'Describe the application change, technical debt, modernization target, incident or change request...'}
          rows={5}
          className="w-full border border-surface-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none placeholder-surface-400"
        />
      </div>

      {/* Guided Questions */}
      <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
        <button
          onClick={() => setShowGuided(!showGuided)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-surface-500" />
            <span className="font-semibold text-surface-900 text-sm">Help the agent understand the change</span>
            <span className="text-xs text-surface-400">(optional)</span>
          </div>
          {showGuided ? <ChevronUp className="w-4 h-4 text-surface-400" /> : <ChevronDown className="w-4 h-4 text-surface-400" />}
        </button>
        {showGuided && (
          <div className="px-5 pb-5 space-y-4 border-t border-surface-100">
            {questions.map(q => (
              <div key={q.key}>
                <label className="block text-sm font-medium text-surface-700 mb-1.5 mt-4">{q.label}</label>
                <input
                  type="text"
                  value={answers[q.key] ?? ''}
                  onChange={e => setAnswers(prev => ({ ...prev, [q.key]: e.target.value }))}
                  className="w-full border border-surface-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Evidence Upload */}
      <div className="bg-white rounded-xl border border-surface-200 p-6">
        <h2 className="font-semibold text-surface-900 mb-1">Upload supporting evidence</h2>
        <p className="text-xs text-surface-400 mb-4">Audio, video, images, or documents that help contextualize the change.</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {uploadTypes.map(ut => {
            const Icon = ut.icon;
            return (
              <label key={ut.key} className="flex items-center gap-3 border border-dashed border-surface-300 rounded-xl p-3 cursor-pointer hover:border-surface-400 hover:bg-surface-50 transition-colors">
                <Icon className="w-4 h-4 text-surface-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-surface-700 block truncate">{ut.label}</span>
                </div>
                <Upload className="w-3.5 h-3.5 text-surface-400" />
                <input type="file" accept={ut.accept} multiple className="hidden" onChange={e => handleFileUpload(ut.type, e)} />
              </label>
            );
          })}
        </div>

        {/* URL Input */}
        <div className="flex items-center gap-2 mb-4">
          <Link2 className="w-4 h-4 text-surface-500 shrink-0" />
          <input
            type="url"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            placeholder="Add a URL to an application, documentation page or business reference..."
            className="flex-1 border border-surface-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Uploaded Files */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((f, i) => (
              <div key={i} className="flex items-center justify-between bg-surface-50 rounded-lg px-3 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  {f.type === 'audio' && <Mic className="w-3.5 h-3.5 text-surface-500" />}
                  {f.type === 'video' && <Video className="w-3.5 h-3.5 text-surface-500" />}
                  {f.type === 'image' && <Image className="w-3.5 h-3.5 text-surface-500" />}
                  {f.type === 'document' && <FileText className="w-3.5 h-3.5 text-surface-500" />}
                  <span className="text-sm text-surface-700 truncate">{f.name}</span>
                  <span className="text-xs text-surface-400">{f.size}</span>
                </div>
                <button onClick={() => removeFile(i)} className="text-surface-400 hover:text-surface-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Repository (collapsed by default) */}
      <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
        <button
          onClick={() => setShowRepo(!showRepo)}
          className="w-full flex items-center justify-between p-5 text-left hover:bg-surface-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-surface-500" />
            <span className="font-semibold text-surface-900 text-sm">Add technical evidence</span>
            <span className="text-xs text-surface-400">(optional)</span>
          </div>
          {showRepo ? <ChevronUp className="w-4 h-4 text-surface-400" /> : <ChevronDown className="w-4 h-4 text-surface-400" />}
        </button>
        {showRepo && (
          <div className="px-5 pb-5 space-y-3 border-t border-surface-100 pt-4">
            <div>
              <label className="block text-xs font-medium text-surface-600 mb-1">Repository URL</label>
              <input
                type="url"
                value={repoUrl}
                onChange={e => setRepoUrl(e.target.value)}
                placeholder="https://github.com/org/repo"
                className="w-full border border-surface-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-surface-600 mb-1">Branch</label>
              <input
                type="text"
                value={repoBranch}
                onChange={e => setRepoBranch(e.target.value)}
                placeholder="main"
                className="w-full border border-surface-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="inline-flex items-center gap-2 bg-surface-900 hover:bg-surface-800 disabled:opacity-40 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm"
        >
          Submit for Analysis <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
