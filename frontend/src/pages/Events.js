import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import LoadingCircle from "../components/LoadingCircle";

export default function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<LoadingCircle />}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Failed to fetch events" }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader() {
  return {
    events: loadEvents(),
  };
}
