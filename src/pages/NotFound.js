import React from 'react';
import Section from '../components/Section';

const NotFound = ({ onNavigate }) => (
  <Section title="Page not found" intro="The page you’re looking for has moved or no longer exists.">
    <div className="cta-panel">
      <p>Return to the homepage or explore one of our other sections.</p>
      <button type="button" className="btn btn--primary" onClick={() => onNavigate('/')}>Go home</button>
    </div>
  </Section>
);

export default NotFound;
