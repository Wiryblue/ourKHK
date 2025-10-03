import React from 'react';

const ContactCard = ({ title, description, actions }) => (
  <article className="contact-card">
    <h3>{title}</h3>
    <p>{description}</p>
    {actions && (
      <div className="contact-card__actions">
        {actions.map((action) =>
          action.href ? (
            <a key={action.label} href={action.href} target={action.target || '_self'} rel="noreferrer">
              {action.label}
            </a>
          ) : (
            <span key={action.label}>{action.label}</span>
          )
        )}
      </div>
    )}
  </article>
);

export default ContactCard;
