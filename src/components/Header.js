import React, { useState } from 'react';

const Header = ({ pages, activePath, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (path) => {
    setIsOpen(false);
    onNavigate(path);
  };

  return (
    <header className="site-header">
      <div className="container header__inner">
        <button
          type="button"
          className="brand"
          onClick={() => handleNavigate('/')}
        >
          <span className="brand__eyebrow">Kappa Eta Kappa</span>
          <span className="brand__title">Delta Chapter</span>
        </button>

        <nav className={`site-nav ${isOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {pages.map((page) => (
            <button
              key={page.path}
              type="button"
              className={`nav-link ${activePath === page.path ? 'is-active' : ''}`}
              onClick={() => handleNavigate(page.path)}
            >
              {page.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className={`nav-toggle ${isOpen ? 'is-open' : ''}`}
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export default Header;
