import React from 'react';

const CardGrid = ({ items, variant = 'default' }) => (
  <div className={`card-grid card-grid--${variant}`}>
    {items.map((item) => (
      <article key={item.title} className="card">
        {item.kicker && <p className="card__kicker">{item.kicker}</p>}
        <h3>{item.title}</h3>
        {item.meta && <p className="card__meta">{item.meta}</p>}
        <p>{item.description}</p>
        {item.links && (
          <div className="card__links">
            {item.links.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </article>
    ))}
  </div>
);

export default CardGrid;
