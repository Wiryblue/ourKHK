import React from 'react';
import Section from '../components/Section';
import CardGrid from '../components/CardGrid';
import values from '../data/values';
import { officers } from '../data/leadership';

const About = () => (
  <>
    <Section
      eyebrow="Who we are"
      title="Brothers, mentors, and makers"
      intro="Kappa Eta Kappa Delta Chapter is a close-knit community of engineers who champion curiosity and collaboration."
    >
      <p>
        We balance rigorous coursework with meaningful friendships and professional experiences. Our members represent
        electrical, mechanical, aerospace, computer, and chemical engineering programs. Together we design service projects,
        share internship opportunities, and connect with alumni mentors who are eager to invest in the next generation of
        Jayhawk engineers.
      </p>
      <p>
        Through workshops, company tours, and hands-on projects in our house lab, brothers cultivate technical skills while
        exploring the many pathways an engineering degree can offer.
      </p>
    </Section>

    <Section
      background="muted"
      eyebrow="Guiding principles"
      title="Values that drive every decision"
    >
      <CardGrid items={values} />
    </Section>

    <Section
      eyebrow="2024&ndash;2025 officers"
      title="Leadership team"
      intro="Elected each spring, our officers steward chapter operations and create opportunities for brothers to lead."
    >
      <div className="leadership-grid">
        {officers.map((officer) => (
          <article key={officer.title} className="leadership-card">
            <h3>{officer.title}</h3>
            <p className="leadership-card__name">{officer.name}</p>
            <p>{officer.description}</p>
          </article>
        ))}
      </div>
    </Section>
  </>
);

export default About;
