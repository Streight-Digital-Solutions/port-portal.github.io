import { useState } from "react";

const categories = [
  "All",
  "Food & Drink",
  "Retail",
  "Services",
  "Trades",
  "Professional",
  "Health & Wellness",
];

const businesses = [
  {
    name: "Featured Local Business",
    category: "Services",
    description:
      "A local business serving the Port Alberni community.",
    featured: true,
  },
  {
    name: "Example Business",
    category: "Food & Drink",
    description:
      "Local food, coffee, and community.",
  },
  {
    name: "Example Business",
    category: "Retail",
    description:
      "Locally owned shopping and services.",
  },
  {
    name: "Example Business",
    category: "Trades",
    description:
      "Skilled local trades serving the Alberni Valley.",
  },
  {
    name: "Example Business",
    category: "Professional",
    description:
      "Professional services from local businesses.",
  },
  {
    name: "Example Business",
    category: "Health & Wellness",
    description:
      "Health, wellness, and personal care in the community.",
  },
];

function BusinessScene({ onBack }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredBusinesses = businesses.filter((business) => {
    const matchesCategory =
      activeCategory === "All" ||
      business.category === activeCategory;

    const searchText = search.toLowerCase();

    const matchesSearch =
      business.name.toLowerCase().includes(searchText) ||
      business.category.toLowerCase().includes(searchText) ||
      business.description.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="business-scene">

      <button
        className="scene-back"
        onClick={onBack}
        aria-label="Return to PortPortal"
      >
        ← PORTAL
      </button>

      <div className="business-scene-inner">

        <header className="business-heading">
          <span className="business-kicker">
            PORT ALBERNI
          </span>

          <h1>
            Local Business
          </h1>

          <p>
            Discover the people, shops, services and businesses
            that make our community move.
          </p>
        </header>

        <div className="business-search">
          <input
            type="search"
            placeholder="Search local businesses..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        <nav
          className="business-categories"
          aria-label="Business categories"
        >
          {categories.map((category) => (
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

        <section className="featured-business">

          <div className="featured-business-art">
            <span>FEATURED</span>
          </div>

          <div className="featured-business-content">

            <span className="business-label">
              LOCAL SPOTLIGHT
            </span>

            <h2>
              Put your business in the spotlight.
            </h2>

            <p>
              Featured advertising gives local businesses
              a prominent place inside PortPortal.
            </p>

            <button className="business-action">
              Learn More
            </button>

          </div>

        </section>

        <section className="business-directory">

          <div className="directory-heading">

            <span className="business-label">
              EXPLORE
            </span>

            <h2>
              Businesses in Port Alberni
            </h2>

          </div>

          <div className="business-grid">

            {filteredBusinesses.map((business, index) => (

              <article
                className={
                  business.featured
                    ? "business-card business-card-featured"
                    : "business-card"
                }
                key={`${business.name}-${index}`}
              >

                <div className="business-card-art">
                  <span>
                    {business.category}
                  </span>
                </div>

                <div className="business-card-content">

                  <h3>
                    {business.name}
                  </h3>

                  <p>
                    {business.description}
                  </p>

                  <button className="business-card-button">
                    View Business
                  </button>

                </div>

              </article>

            ))}

          </div>

          {filteredBusinesses.length === 0 && (
            <div className="business-empty">
              <h3>No businesses found</h3>
              <p>
                Try another search or category.
              </p>
            </div>
          )}

        </section>

      </div>

    </section>
  );
}

export default BusinessScene;