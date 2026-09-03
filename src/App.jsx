import { useState } from "react";
import "./App.css";
import portAlberniReference from "./assets/images/port-alberni-reference.png";

const destinations = [
  {
    id: "businesses",
    label: "Businesses",
    position: "top",
  },
  {
    id: "places",
    label: "Places",
    position: "left",
  },
  {
    id: "events",
    label: "Events",
    position: "right",
  },
  {
    id: "community",
    label: "Community",
    position: "bottom",
  },
];

function App() {
  const [activeDestination, setActiveDestination] = useState(null);

  return (
    <main className="portal">

      <div
        className="portal-background"
        style={{ backgroundImage: `url(${portAlberniReference})` }}
      />

      <div className="portal-overlay" />

      <section className="portal-stage">

        <div className="portal-intro">
          <span>PORT ALBERNI</span>
        </div>

        <div className={`portal-wheel ${activeDestination ? "active" : ""}`}>

          <div className="growth-ring ring-outer" />
          <div className="growth-ring ring-middle" />
          <div className="growth-ring ring-inner" />

          <div className="portal-center">
            <span className="portal-title">PORT</span>
            <span className="portal-title">ALBERNI</span>

            <span className="portal-subtitle">
              COMMUNITY PORTAL
            </span>
          </div>

          {destinations.map((destination) => (
            <button
              key={destination.id}
              className={`portal-button ${destination.position}`}
              onClick={() => setActiveDestination(destination.id)}
            >
              <span>{destination.label}</span>
            </button>
          ))}

        </div>

        {activeDestination && (
          <div className="portal-message">
            <span>
              {destinations.find(
                (item) => item.id === activeDestination
              )?.label}
            </span>

            <button
              className="back-button"
              onClick={() => setActiveDestination(null)}
            >
              Return to Portal
            </button>
          </div>
        )}

      </section>
      <footer className="portal-footer">
        <p>
          © 2026 Streight Digital Solutions. All rights reserved.
        </p>
        <p>
          PortPortal is an independent community project created and operated by
          Streight Digital Solutions.
        </p>
      </footer>
    </main>
  );
}

export default App;