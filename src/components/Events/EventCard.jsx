import { RevealItem } from '../motion';
import EventIcon from './EventIcon';

export default function EventCard({ event }) {
  return (
    <RevealItem
      as="article"
      className="event-card"
      aria-labelledby={`${event.id}-title`}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <EventIcon type={event.icon} />
      <span className="eyebrow">{event.eyebrow}</span>
      <h3 id={`${event.id}-title`} className="event-title">{event.title}</h3>
      <p className="event-intro">{event.intro}</p>
      <dl className="event-details">
        <div><dt>Date</dt><dd>{event.day}, {event.date}</dd></div>
        <div><dt>Time</dt><dd>{event.time}</dd></div>
        <div>
          <dt>Venue</dt>
          <dd>{event.venue}{event.address && <small>{event.address}</small>}</dd>
        </div>
      </dl>
      <a className="event-map" href={event.mapUrl} target="_blank" rel="noopener noreferrer">
        View location <span aria-hidden="true">↗</span>
      </a>
    </RevealItem>
  );
}
