import { useState } from "react";

const eventCategories = [
  "All",
  "Community",
  "Music",
  "Arts",
  "Sports",
  "Family",
  "Markets",
  "Outdoors",
];

const events = [
  {
    id: 1,
    title: "Port Alberni Community Market",
    date: "2026-09-05",
    time: "10:00 AM – 3:00 PM",
    location: "Harbour Quay",
    category: "Markets",
    description:
      "Local vendors, food, crafts and community throughout the day.",
  },
  {
    id: 2,
    title: "Live Music in the Valley",
    date: "2026-09-06",
    time: "7:00 PM – 9:30 PM",
    location: "Community Venue",
    category: "Music",
    description:
      "An evening of live local music and entertainment.",
  },
  {
    id: 3,
    title: "Family Community Day",
    date: "2026-09-12",
    time: "11:00 AM – 4:00 PM",
    location: "Port Alberni",
    category: "Family",
    description:
      "Activities, food and entertainment for the whole family.",
  },
  {
    id: 4,
    title: "Alberni Valley Trail Walk",
    date: "2026-09-13",
    time: "9:00 AM – 12:00 PM",
    location: "Alberni Valley",
    category: "Outdoors",
    description:
      "Explore the trails and natural beauty surrounding the valley.",
  },
  {
    id: 5,
    title: "Local Art Exhibition",
    date: "2026-09-18",
    time: "6:00 PM – 9:00 PM",
    location: "Local Gallery",
    category: "Arts",
    description:
      "Featuring work from artists connected to the Alberni Valley.",
  },
  {
    id: 6,
    title: "Community Sports Day",
    date: "2026-09-20",
    time: "10:00 AM – 2:00 PM",
    location: "Sports Field",
    category: "Sports",
    description:
      "A community day featuring local sports and activities.",
  },
];

function formatDate(dateString) {
  const date = new Date(`${dateString}T12:00:00`);

  return {
    month: date.toLocaleDateString("en-CA", {
      month: "short",
    }).toUpperCase(),

    day: date.toLocaleDateString("en-CA", {
      day: "numeric",
    }),

    weekday: date.toLocaleDateString("en-CA", {
      weekday: "short",
    }).toUpperCase(),
  };
}

function EventsScene({ onBack }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      activeCategory === "All" ||
      event.category === activeCategory;

    const searchText = search.toLowerCase();

    const matchesSearch =
      event.title.toLowerCase().includes(searchText) ||
      event.location.toLowerCase().includes(searchText) ||
      event.category.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="events-scene">

      <button
        className="scene-back"
        onClick={onBack}
        aria-label="Return to PortPortal"
      >
        ← PORTAL
      </button>

      <div className="events-scene-inner">

        {/* HEADER */}

        <header className="events-heading">

          <span className="events-kicker">
            PORT ALBERNI
          </span>

          <h1>
            What's Happening
          </h1>

          <p>
            Discover events, activities and things happening
            throughout the Alberni Valley.
          </p>

        </header>

        {/* SEARCH */}

        <div className="events-toolbar">

          <div className="events-search">

            <input
              type="search"
              placeholder="Search events..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

        </div>

        {/* CATEGORIES */}

        <nav
          className="events-categories"
          aria-label="Event categories"
        >

          {eventCategories.map((category) => (

            <button
              key={category}
              className={
                activeCategory === category
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveCategory(category)
              }
            >
              {category}
            </button>

          ))}

        </nav>

        {/* CALENDAR */}

        <section className="events-calendar">

          <div className="events-calendar-header">

            <div>
              <span className="events-label">
                COMMUNITY CALENDAR
              </span>

              <h2>
                September 2026
              </h2>
            </div>

            <div className="calendar-controls">

              <button aria-label="Previous month">
                ←
              </button>

              <button aria-label="Next month">
                →
              </button>

            </div>

          </div>

          <div className="events-list">

            {filteredEvents.map((event) => {

              const date = formatDate(event.date);

              return (
                <article
                  className="event-card"
                  key={event.id}
                  onClick={() =>
                    setSelectedEvent(event)
                  }
                >

                  <div className="event-date">

                    <span>
                      {date.month}
                    </span>

                    <strong>
                      {date.day}
                    </strong>

                    <small>
                      {date.weekday}
                    </small>

                  </div>

                  <div className="event-art">
                    <span>
                      {event.category}
                    </span>
                  </div>

                  <div className="event-information">

                    <h3>
                      {event.title}
                    </h3>

                    <p className="event-location">
                      {event.location}
                    </p>

                    <p className="event-time">
                      {event.time}
                    </p>

                    <p className="event-description">
                      {event.description}
                    </p>

                  </div>

                  <div className="event-arrow">
                    →
                  </div>

                </article>
              );

            })}

          </div>

          {filteredEvents.length === 0 && (

            <div className="events-empty">

              <h3>
                No events found
              </h3>

              <p>
                Try another search or category.
              </p>

            </div>

          )}

        </section>

        {/* SUBMIT EVENT */}

        <section className="event-submit">

          <div>

            <span className="events-label">
              HAVE SOMETHING HAPPENING?
            </span>

            <h2>
              Add a community event.
            </h2>

            <p>
              Give local residents another way to discover
              what's happening in Port Alberni.
            </p>

          </div>

          <button>
            Submit an Event
          </button>

        </section>

      </div>

      {/* EVENT DETAIL */}

      {selectedEvent && (

        <div
          className="event-detail-overlay"
          onClick={() => setSelectedEvent(null)}
        >

          <div
            className="event-detail"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="event-detail-close"
              onClick={() =>
                setSelectedEvent(null)
              }
              aria-label="Close event"
            >
              ×
            </button>

            <span className="events-label">
              {selectedEvent.category}
            </span>

            <h2>
              {selectedEvent.title}
            </h2>

            <p className="event-detail-date">
              {selectedEvent.date}
            </p>

            <p>
              <strong>Time:</strong>{" "}
              {selectedEvent.time}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {selectedEvent.location}
            </p>

            <p>
              {selectedEvent.description}
            </p>

            <button className="event-detail-action">
              View Event Details
            </button>

          </div>

        </div>

      )}

    </section>
  );
}

export default EventsScene;