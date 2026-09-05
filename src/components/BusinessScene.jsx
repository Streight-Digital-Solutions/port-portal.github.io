import { useEffect, useState } from "react";
import { businesses } from "../data/businesses";
import BusinessProfile from "./BusinessProfile";
import cedarForest from "../assets/images/PortPortal_Cedar_Forest_Background.png";

const categories = [
  "All",
  "Food & Drink",
  "Retail",
  "Services",
  "Trades",
  "Professional",
  "Health & Wellness",
];



function BusinessScene({ onBack }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const searchText = search.trim().toLowerCase();

  const filteredBusinesses = businesses.filter((business) => {
    const matchesCategory =
      activeCategory === "All" ||
      business.category === activeCategory;

    if (!searchText) {
      return matchesCategory;
    }

    const searchableText = [
      business.name,
      business.category,
      business.description,
      business.address,
      business.phone,
      business.email,
      business.website,
      ...(business.services || []),
      ...(business.tags || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(searchText);

    return matchesCategory && matchesSearch;
  });

  const featuredBusinesses = businesses
  .filter((business) => {
    const isFeatured = business.featured === true;

    const matchesCategory =
      activeCategory === "All" ||
      business.category === activeCategory;

    return isFeatured && matchesCategory;
  })
  .sort(
    (a, b) =>
      (a.featuredOrder ?? 999) -
      (b.featuredOrder ?? 999)
  );

  useEffect(() => {
    setFeaturedIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    if (featuredBusinesses.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setFeaturedIndex(
        (currentIndex) =>
          (currentIndex + 1) % featuredBusinesses.length
      );
    }, 9000);

    return () => clearInterval(timer);
  }, [featuredBusinesses.length, activeCategory]);

  if (selectedBusiness) {
    return (
      <BusinessProfile
        business={selectedBusiness}
        onBack={() => setSelectedBusiness(null)}
      />
    );
  }

  return (
    <section
      className="business-scene"
      style={{ "--business-bg": `url(${cedarForest})` }}
    >

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
            placeholder="Search businesses, services, places..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            aria-label="Search local businesses"
          />

          {search && (
            <button
              className="business-search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

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

          {featuredBusinesses.length > 0 ? (() => {
            const business = featuredBusinesses[featuredIndex];

            return (
              <>
                <div className="featured-business-art">
                  <span>{business.category}</span>
                </div>

                <div className="featured-business-content">

                  <span className="business-label">
                    FEATURED BUSINESS
                  </span>

                  <h2>
                    {business.name}
                  </h2>

                  <p>
                    {business.description}
                  </p>

                  <button
                    className="business-action"
                    onClick={() => setSelectedBusiness(business)}
                  >
                    View Business
                  </button>

                </div>
              </>
            );
          })() : (
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
          )}

        </section>

        <section className="business-directory">

          <div className="directory-heading">

            <span className="business-label">
              EXPLORE
            </span>

            <h2>
              Businesses in Port Alberni
            </h2>

            <p className="business-result-count">
              {filteredBusinesses.length}{" "}
              {filteredBusinesses.length === 1
                ? "business"
                : "businesses"}
              {searchText && (
                <>
                  {" "}matching "{search}"
                </>
              )}
            </p>

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

                  <button
                    className="business-card-button"
                    onClick={() => setSelectedBusiness(business)}
                  >
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