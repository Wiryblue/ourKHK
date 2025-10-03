import React from 'react';

const Timeline = ({ items }) => (
  <ol className="timeline">
    {items.map((item) => (
      <li key={item.year} className="timeline__item">
        <div className="timeline__year">{item.year}</div>
        <div className="timeline__body">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      </li>
    ))}
  </ol>
);

export default Timeline;
