import React from 'react';
import Hero from '../components/Hero';
import Section from '../components/Section';
import CardGrid from '../components/CardGrid';
import { recurringEvents, signatureEvents } from '../data/events';
import values from '../data/values';

const Home = ({ onNavigate }) => (
  <>
    <Hero
      eyebrow="Since 1956"
      title="Engineers building community in Lawrence"
      subtitle="Kappa Eta Kappa connects Jayhawks across disciplines through professional development, service, and lifelong brotherhood."
      primaryAction={{ label: 'Join an upcoming event', onClick: () => onNavigate('/join') }}
      secondaryAction={{ label: 'Learn our story', onClick: () => onNavigate('/history') }}
    />

    <Section
      eyebrow="What we stand for"
      title="A modern fraternity experience rooted in engineering excellence"
      intro="We are a professional engineering fraternity that blends mentorship, technical curiosity, and a vibrant social calendar."
    >
      <CardGrid items={values} />
    </Section>

    <Section
      background="muted"
      eyebrow="Weekly rhythm"
      title="Recurring chapter events"
      intro="Our schedule keeps brothers connected while leaving space to balance demanding course loads."
    >
      <CardGrid items={recurringEvents} variant="compact" />
    </Section>

    <Section
      eyebrow="Campus highlights"
      title="Signature programs that define Delta Chapter"
      intro="Each semester we invest our talents into the KU community and the city of Lawrence."
    >
      <CardGrid items={signatureEvents} />
    </Section>

    <Section
      background="muted"
      title="Ready to meet us?"
      intro="Stop by the chapter house, join a service project, or set up a one-on-one coffee with an active member."
    >
      <div className="cta-panel">
        <p>
          We know choosing the right organization matters. Reach out and we will pair you with a brother who shares your
          academic interests and goals.
        </p>
        <div className="cta-panel__actions">
          <button type="button" className="btn btn--primary" onClick={() => onNavigate('/contact')}>
            Contact the chapter
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => onNavigate('/join')}>
            Explore membership
          </button>
        </div>
      </div>
    </Section>
  </>
);

export default Home;
