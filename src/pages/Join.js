import React from 'react';
import Section from '../components/Section';
import CardGrid from '../components/CardGrid';
import { joinSteps, faqs } from '../data/join';

const Join = () => (
  <>
    <Section
      eyebrow="Membership"
      title="Become part of KHK Delta"
      intro="We recruit curious, driven students who want to invest in their peers and the engineering community."
    >
      <p>
        Recruitment happens every fall and spring semester. Whether you are a first-year student or looking to join later in
        your academic journey, we are excited to meet you. Our process is intentionally personal so you can get to know the
        people who make KHK special.
      </p>
    </Section>

    <Section background="muted" eyebrow="The process" title="Four steps to joining">
      <CardGrid items={joinSteps} />
    </Section>

    <Section title="Frequently asked questions">
      <div className="faq-grid">
        {faqs.map((faq) => (
          <article key={faq.question} className="faq-card">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </Section>

    <Section
      background="muted"
      eyebrow="Let’s talk"
      title="Connect with the rush team"
      intro="We are happy to answer any questions about dues, housing, or what a typical week looks like."
    >
      <div className="cta-panel">
        <p>Email <a href="mailto:rush@khkdelta.org">rush@khkdelta.org</a> to get in touch with our rush chairs.</p>
        <p>Follow <a href="https://instagram.com/khkdelta" target="_blank" rel="noreferrer">@khkdelta</a> on Instagram for the latest event announcements.</p>
      </div>
    </Section>
  </>
);

export default Join;
