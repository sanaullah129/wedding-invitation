import { RevealGroup, SectionHeading } from '../motion';
import { events } from '../../data/invitation';
import EventCard from './EventCard';
import './Events.css';

export default function Events() {
  return (
    <section id="events" className="section events" aria-labelledby="events-title">
      <div className="section-inner">
        <SectionHeading
          id="events-title"
          eyebrow="Save the dates"
          title="Wedding Celebrations"
          intro="Your gracious presence will make these occasions even more memorable."
        />
        <RevealGroup className="event-grid" interval={0.25} amount={0.15}>
          {events.map((event) => <EventCard key={event.id} event={event} />)}
        </RevealGroup>
      </div>
    </section>
  );
}
