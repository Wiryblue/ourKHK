import React from 'react';

const Hero = ({ eyebrow, title, subtitle, primaryAction, secondaryAction }) => {
  return (
    <section className="hero">
      <div className="container hero__content">
        {eyebrow && <p className="hero__eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        <p className="hero__subtitle">{subtitle}</p>
        <div className="hero__actions">
          {primaryAction && (
            <button type="button" className="btn btn--primary" onClick={primaryAction.onClick}>
              {primaryAction.label}
            </button>
          )}
          {secondaryAction && (
            <button type="button" className="btn btn--ghost" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
