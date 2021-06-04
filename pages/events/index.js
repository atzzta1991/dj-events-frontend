import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";
import React from "react";
import Layout from "../../components/Layout";

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>

      {events.length === 0 && <h3>No event to show</h3>}

      {events.map((evt) => {
        return <EventItem key={evt.id} evt={evt} />;
      })}

      <Pagination page={page} total={total} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const totalRes = await fetch(`${API_URL}/events/count`);

  const total = await totalRes.json();
  const res = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await res.json();

  return {
    props: { events, page: +page, total },
  };
}
