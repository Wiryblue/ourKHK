import React from 'react';

const Section = ({ title, eyebrow, intro, children, background = 'light' }) => (
  <section className={`section section--${background}`}>
    <div className="container section__inner">
      <header className="section__header">
        {eyebrow && <p className="section__eyebrow">{eyebrow}</p>}
        {title && <h2>{title}</h2>}
        {intro && <p className="section__intro">{intro}</p>}
      </header>
      <div className="section__content">{children}</div>
    </div>
  </section>
);

export default Section;
