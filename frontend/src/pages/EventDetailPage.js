import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function EventDetailPage() {
  const params = useParams();
  const [event, setEvent] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:8080/events/${params.id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }

        const data = await response.json();
        setEvent(data.event);
        setIsLoading(false);
      } catch (error) {
        throw new Error("Failed to fetch event");
      }
    }

    fetchEvent();
  }, [params.id]);

  return (
    <>
      <h1>EventDetailPage</h1>
      {isLoading && <p>Loading...</p>}
      {!isLoading && event && (
        <div>
          <h2>{event.title}</h2>
          <p>Event ID: {event.id}</p>
          <p>{event.description}</p>
          <p>{event.date}</p>
          <img height="250" src={event.image} alt={event.title} />
          <p>
            <Link to="..">Back</Link>
          </p>
        </div>
      )}
    </>
  );
}
