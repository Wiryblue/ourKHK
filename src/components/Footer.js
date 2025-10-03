import React from 'react';

const Footer = ({ pages, onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <h2>Kappa Eta Kappa &mdash; Delta Chapter</h2>
          <p>
            An interdisciplinary professional engineering fraternity committed to
            scholarship, community, and lifelong brotherhood at the University of
            Kansas.
          </p>
        </div>
        <div className="footer__links">
          <h3>Explore</h3>
          <ul>
            {pages.map((page) => (
              <li key={page.path}>
                <button type="button" onClick={() => onNavigate(page.path)}>
                  {page.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer__contact">
          <h3>Visit</h3>
          <p>700 W. 9th Street<br />Lawrence, KS 66044</p>
          <p>
            <a href="mailto:hello@khkdelta.org">hello@khkdelta.org</a>
          </p>
        </div>
      </div>
      <div className="footer__legal">&copy; {currentYear} Kappa Eta Kappa &middot; Delta Chapter</div>
    </footer>
  );
};

export default Footer;
