import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  GitBranch,
  BarChart3,
  Map,
  MonitorSmartphone,
  Layers,
  ClipboardList,
  PackageCheck,
  Brain,
} from 'lucide-react';
import { useApp } from '../context/useApp';

const allNavItems = [
  { to: '/', icon: LayoutDashboard, label: 'Home', always: true },
  { to: '/connect', icon: GitBranch, label: 'Repository', always: true },
  { to: '/analysis', icon: BarChart3, label: 'Analysis', needsRepo: true },
  { to: '/map', icon: Map, label: 'App Map', needsRepo: true },
  { to: '/mockup', icon: MonitorSmartphone, label: 'UI Workspace', needsRepo: true, uiOnly: true },
  { to: '/components', icon: Layers, label: 'Components', needsRepo: true },
  { to: '/requirements', icon: ClipboardList, label: 'Requirements', needsRepo: true },
  { to: '/handoff', icon: PackageCheck, label: 'Handoff', needsRepo: true },
];

export default function Sidebar() {
  const { repository, appMode } = useApp();
  const location = useLocation();
  const hasRepo = repository?.status === 'completed';

  const visibleItems = allNavItems.filter(item => {
    if (item.needsRepo && !hasRepo) return false;
    if (item.uiOnly && appMode !== 'ui') return false;
    return true;
  });

  return (
    <aside className="w-60 bg-surface-900 text-white flex flex-col shrink-0 h-full">
      <div className="p-5 border-b border-surface-700">
        <div className="flex items-center gap-2.5">
          <Brain className="w-7 h-7 text-primary-400" />
          <div>
            <h1 className="text-sm font-semibold tracking-tight">Requirement</h1>
            <h1 className="text-sm font-semibold tracking-tight text-primary-400">Intelligence Portal</h1>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        {visibleItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-primary-600/20 text-primary-300 border-r-2 border-primary-400'
                  : 'text-surface-300 hover:bg-surface-800 hover:text-white'
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {hasRepo && (
        <div className="p-4 border-t border-surface-700">
          <div className="text-xs text-surface-400 mb-1">Connected Repository</div>
          <div className="text-sm font-medium truncate">{repository.name}</div>
          <div className="text-xs text-surface-500 truncate">{repository.branch}</div>
        </div>
      )}
    </aside>
  );
}
