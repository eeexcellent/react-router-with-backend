import { useEffect, useState } from "react";

export default function EventsPage() {
  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:8080/events");
        
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEventsData(data.events);
        setIsLoading(false);
      } catch (error) {
        throw new Error("Failed to fetch events");
      }
    }

    fetchEvents();
  }, []);
  
  return (
    <>
      <h1>EventsPage</h1>
      {isLoading && <p>Loading...</p>}
      {!isLoading && <ul>
        {eventsData.map((event) => (
          <li key={event.id}>
            <a href={`/events/${event.id}`}>{event.title}</a>
          </li>
        ))}
      </ul>}
    </>
  );
}
