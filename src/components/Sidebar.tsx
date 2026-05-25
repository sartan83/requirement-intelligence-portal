import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  PenLine,
  BarChart3,
  ClipboardList,
  PackageCheck,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/useApp';

const allNavItems = [
  { to: '/', icon: LayoutDashboard, label: 'Home', always: true },
  { to: '/intake', icon: PenLine, label: 'New Intake', always: true },
  { to: '/analysis', icon: BarChart3, label: 'Analysis', needsIntake: true },
  { to: '/requirement-pack', icon: ClipboardList, label: 'Requirement Pack', needsAnalysis: true },
  { to: '/handoff', icon: PackageCheck, label: 'Handoff', needsAnalysis: true },
];

export default function Sidebar() {
  const { intakeData, analysisComplete } = useApp();
  const location = useLocation();

  const visibleItems = allNavItems.filter(item => {
    if (item.needsIntake && !intakeData && !analysisComplete) return false;
    if (item.needsAnalysis && !analysisComplete) return false;
    return true;
  });

  return (
    <aside className="w-56 bg-white border-r border-surface-200 flex flex-col shrink-0 h-full">
      <div className="p-5 border-b border-surface-200">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-surface-900 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-surface-900">Requirement</h1>
            <h1 className="text-xs font-medium tracking-tight text-surface-500">Intelligence Portal</h1>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-2 overflow-y-auto">
        {visibleItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 mx-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                isActive
                  ? 'bg-surface-100 text-surface-900 font-medium'
                  : 'text-surface-500 hover:bg-surface-50 hover:text-surface-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Progress tracker */}
      <div className="p-4 border-t border-surface-200">
        <div className="text-xs font-medium text-surface-500 mb-3">Journey</div>
        <ProgressStep step={1} label="Intent" done={!!intakeData} active={location.pathname === '/intake'} />
        <ProgressStep step={2} label="Evidence" done={!!intakeData} active={false} />
        <ProgressStep step={3} label="Analysis" done={analysisComplete} active={location.pathname === '/analysis'} />
        <ProgressStep step={4} label="Requirements" done={analysisComplete} active={location.pathname === '/requirement-pack'} />
        <ProgressStep step={5} label="Handoff" done={false} active={location.pathname === '/handoff'} last />
      </div>
    </aside>
  );
}

function ProgressStep({ step, label, done, active, last }: { step: number; label: string; done: boolean; active: boolean; last?: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex flex-col items-center">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium ${
          done ? 'bg-surface-900 text-white' : active ? 'bg-surface-900 text-white' : 'bg-surface-100 text-surface-400'
        }`}>
          {step}
        </div>
        {!last && <div className="w-px h-4 bg-surface-200" />}
      </div>
      <span className={`text-xs pt-0.5 ${done || active ? 'text-surface-900 font-medium' : 'text-surface-400'}`}>{label}</span>
    </div>
  );
}
