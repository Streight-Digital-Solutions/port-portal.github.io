function BusinessProfile({ business, onBack }) {
  if (!business) {
    return null;
  }

  return (
    <section className="business-profile">

      <button
        className="scene-back"
        onClick={onBack}
        aria-label="Return to businesses"
      >
        ← BUSINESSES
      </button>

      <div className="business-profile-inner">

        <header className="business-profile-heading">

          <span className="business-label">
            {business.category}
          </span>

          <h1>
            {business.name}
          </h1>

          <p>
            {business.description}
          </p>

        </header>

        <div className="business-profile-layout">

          <div className="business-profile-art">
            <span>
              {business.category}
            </span>
          </div>

          <div className="business-profile-details">

            <section className="business-detail-section">
              <h2>Contact</h2>

              <p>
                {business.address}
              </p>

              {business.phone && (
                <p>
                  <a href={`tel:${business.phone}`}>
                    {business.phone}
                  </a>
                </p>
              )}

              {business.email && (
                <p>
                  <a href={`mailto:${business.email}`}>
                    {business.email}
                  </a>
                </p>
              )}

              {business.website && (
                <p>
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website ↗
                  </a>
                </p>
              )}
            </section>

            <section className="business-detail-section">
              <h2>Hours</h2>

              {business.hours && (
                <div className="business-hours">

                  {Object.entries(business.hours).map(
                    ([day, hours]) => (
                      <div
                        className="business-hours-row"
                        key={day}
                      >
                        <span>
                          {day.charAt(0).toUpperCase() +
                            day.slice(1)}
                        </span>

                        <span>
                          {hours}
                        </span>
                      </div>
                    )
                  )}

                </div>
              )}
            </section>

          </div>

        </div>

      </div>

    </section>
  );
}

export default BusinessProfile;