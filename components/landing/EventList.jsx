import { getAllEvents } from "@/connectDb/queries";
import EventCard from "./EventCard";

export const generateStaticParams = async (query) => {
  const allEvents = await getAllEvents(query);
  return allEvents.map((event) => ({
    id: event.id,
  }));
};
const EventList = async ({ query }) => {
  const allEvents = await getAllEvents(query);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
      {allEvents.map((event) => {
        return <EventCard key={event.id} event={event} />;
      })}
    </div>
  );
};

export default EventList;
