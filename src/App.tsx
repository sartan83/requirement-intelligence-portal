import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import Intake from './pages/Intake';
import AgentAnalysis from './pages/AgentAnalysis';
import RequirementPack from './pages/RequirementPack';
import HandoffNew from './pages/HandoffNew';

function AppLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) {
    return <Landing />;
  }

  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/intake" element={<Intake />} />
          <Route path="/analysis" element={<AgentAnalysis />} />
          <Route path="/requirement-pack" element={<RequirementPack />} />
          <Route path="/handoff" element={<HandoffNew />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppProvider>
        <Routes>
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </AppProvider>
    </HashRouter>
  );
}
