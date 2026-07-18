import EventCard from './EventCard';

const EventList = ({ events }) => {
  return (
    <div className="event-list">
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};

export default EventList;
