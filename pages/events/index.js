import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import Link from "next/link";
import React from "react";
import Layout from "../../components/Layout";

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>

      {events.length === 0 && <h3>No event to show</h3>}

      {events.map((evt) => {
        return <EventItem key={evt.id} evt={evt} />;
      })}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1,
  };
}
