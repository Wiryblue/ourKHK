import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import History from './pages/History';
import Join from './pages/Join';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

const NAVIGATION = [
  { path: '/', label: 'Home', component: Home },
  { path: '/about', label: 'About', component: About },
  { path: '/history', label: 'History', component: History },
  { path: '/join', label: 'Join', component: Join },
  { path: '/contact', label: 'Contact', component: Contact },
];

const normalizePath = (path) => {
  if (!path) {
    return '/';
  }

  if (path !== '/' && path.endsWith('/')) {
    return path.replace(/\/+$/, '');
  }

  return path;
};

const getInitialPath = () => {
  if (typeof window === 'undefined') {
    return '/';
  }

  const { pathname } = window.location;
  return normalizePath(pathname && pathname !== '' ? pathname : '/');
};

function App() {
  const [activePath, setActivePath] = useState(getInitialPath);

  const activePage = useMemo(
    () => NAVIGATION.find((page) => page.path === activePath),
    [activePath]
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handlePopState = () => {
      setActivePath(getInitialPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const label = activePage ? activePage.label : 'Page not found';
      document.title = `${label} · Kappa Eta Kappa Delta Chapter`;
    }

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activePage, activePath]);

  const handleNavigate = (path) => {
    const targetPath = normalizePath(path);

    if (typeof window !== 'undefined' && targetPath !== activePath) {
      window.history.pushState({}, '', targetPath);
      setActivePath(targetPath);
    }
  };

  const PageComponent = activePage ? activePage.component : NotFound;

  return (
    <div className="app-shell">
      <Header pages={NAVIGATION} activePath={activePath} onNavigate={handleNavigate} />
      <main className="main-content">
        <PageComponent onNavigate={handleNavigate} />
      </main>
      <Footer pages={NAVIGATION} onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
