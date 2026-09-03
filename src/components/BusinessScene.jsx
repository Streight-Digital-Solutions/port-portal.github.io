import { useState } from 'react'

const categories = [
  'Food & Drink',
  'Retail',
  'Services',
  'Trades',
  'Professional',
  'Health & Wellness',
]

const businesses = [
  {
    name: 'Featured Local Business',
    category: 'Services',
    description: 'A local business serving the Port Alberni community.',
  },
  {
    name: 'Example Business',
    category: 'Food & Drink',
    description: 'Local food, coffee, and community.',
  },
  {
    name: 'Example Business',
    category: 'Retail',
    description: 'Locally owned shopping and services.',
  },
]

export default function BusinessScene({ onBack }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filteredBusinesses = businesses.filter((business) => {
    const matchesCategory =
      activeCategory === 'All' ||
      business.category === activeCategory

    const matchesSearch =
      business.name.toLowerCase().includes(search.toLowerCase()) ||
      business.category.toLowerCase().includes(search.toLowerCase())

    return matchesCategory && matchesSearch
  })

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
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <nav
          className="business-categories"
          aria-label="Business categories"
        >
          <button
            className={activeCategory === 'All' ? 'active' : ''}
            onClick={() => setActiveCategory('All')}
          >
            All
          </button>

          {categories.map((category) => (
            <button
              key={category}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => setActiveCategory(category)}
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
            <span>LOCAL SPOTLIGHT</span>

            <h2>
              Advertise your business here
            </h2>

            <p>
              Put your business in front of people exploring
              Port Alberni.
            </p>

            <button>
              Learn More
            </button>
          </div>
        </section>

        <section className="business-directory">

          <div className="directory-heading">
            <span>EXPLORE</span>
            <h2>Businesses in Port Alberni</h2>
          </div>

          <div className="business-grid">
            {filteredBusinesses.map((business) => (
              <article
                className="business-card"
                key={business.name}
              >
                <div className="business-card-art">
                  <span>{business.category}</span>
                </div>

                <div className="business-card-content">
                  <h3>{business.name}</h3>

                  <p>
                    {business.description}
                  </p>

                  <button>
                    View Business
                  </button>
                </div>
              </article>
            ))}
          </div>

        </section>

      </div>
    </section>
  )
}