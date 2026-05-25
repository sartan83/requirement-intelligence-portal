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
  Sparkles,
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

      {hasRepo && (
        <div className="p-4 border-t border-surface-200">
          <div className="text-xs text-surface-400 mb-1">Connected Repository</div>
          <div className="text-sm font-medium text-surface-900 truncate">{repository.name}</div>
          <div className="text-xs text-surface-400 truncate">{repository.branch}</div>
        </div>
      )}
    </aside>
  );
}
