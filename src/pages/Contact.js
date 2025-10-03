import React from 'react';
import Section from '../components/Section';
import ContactCard from '../components/ContactCard';

const contactOptions = [
  {
    title: 'Visit the chapter house',
    description: '700 W. 9th Street, Lawrence, KS 66044. Schedule a tour or stop by during open house hours.',
    actions: [{ label: 'Open in Maps', href: 'https://maps.app.goo.gl/7kuQaNpRApzMa7MJ9', target: '_blank' }],
  },
  {
    title: 'General inquiries',
    description: 'Have questions about programming, partnerships, or alumni news? Our officers are here to help.',
    actions: [{ label: 'hello@khkdelta.org', href: 'mailto:hello@khkdelta.org' }],
  },
  {
    title: 'Corporate partnerships',
    description: 'Connect with our professional development chair to host tech talks, site visits, or sponsor events.',
    actions: [{ label: 'partners@khkdelta.org', href: 'mailto:partners@khkdelta.org' }],
  },
];

const Contact = () => (
  <>
    <Section
      eyebrow="Contact"
      title="Let’s build something together"
      intro="We are always excited to collaborate with students, alumni, faculty, and industry partners."
    >
      <div className="contact-grid">
        {contactOptions.map((option) => (
          <ContactCard key={option.title} {...option} />
        ))}
      </div>
    </Section>

    <Section background="muted" title="Stay connected">
      <div className="cta-panel">
        <p>Subscribe to our monthly newsletter for event invites, project spotlights, and alumni highlights.</p>
        <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input id="newsletter-email" type="email" name="email" placeholder="Email address" required />
          <button type="submit" className="btn btn--primary">
            Join the list
          </button>
        </form>
      </div>
    </Section>
  </>
);

export default Contact;
