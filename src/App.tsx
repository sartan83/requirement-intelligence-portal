import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import Connect from './pages/Connect';
import Analysis from './pages/Analysis';
import AppMap from './pages/AppMap';
import MockupWorkspace from './pages/MockupWorkspace';
import ComponentWorkspace from './pages/ComponentWorkspace';
import Requirements from './pages/Requirements';
import Handoff from './pages/Handoff';

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
          <Route path="/connect" element={<Connect />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/map" element={<AppMap />} />
          <Route path="/mockup" element={<MockupWorkspace />} />
          <Route path="/components" element={<ComponentWorkspace />} />
          <Route path="/requirements" element={<Requirements />} />
          <Route path="/handoff" element={<Handoff />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
