import React from 'react';
import Section from '../components/Section';
import Timeline from '../components/Timeline';
import historyTimeline from '../data/history';

const History = () => (
  <>
    <Section
      eyebrow="Our journey"
      title="A tradition of engineering leadership"
      intro="From the early days of analog circuits to modern robotics, KHK Delta has evolved alongside the needs of Jayhawk engineers."
    >
      <p>
        The Delta Chapter of Kappa Eta Kappa has been home to innovators, faculty members, and student leaders who shaped the
        School of Engineering. Our alumni work in aerospace, energy, software, and research laboratories around the world. Each
        generation passes on lessons, tools, and friendships that support the next class of engineers.
      </p>
    </Section>

    <Section background="muted" title="Timeline">
      <Timeline items={historyTimeline} />
    </Section>

    <Section
      eyebrow="Alumni network"
      title="Stay connected"
      intro="More than 900 Delta alumni continue to mentor students, host site visits, and celebrate milestones alongside actives."
    >
      <p>
        If you are an alum looking to reconnect, we would love to hear from you. Share career updates, volunteer to host a tech
        talk, or join us for an upcoming Alumni Weekend. Your experience keeps our brotherhood strong.
      </p>
      <p>
        Email <a href="mailto:alumni@khkdelta.org">alumni@khkdelta.org</a> to join the newsletter and get involved.
      </p>
    </Section>
  </>
);

export default History;
