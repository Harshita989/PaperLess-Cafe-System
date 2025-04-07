import React from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaUtensils, FaClipboardList, FaTruck, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <img src="/assets/images/logo.png" alt="Logo" />
        </div>
        <div className="nav-right">
          <button>Login</button>
          <FaShoppingCart size={24} />
          <FaUser size={24} />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Order Your Favorite Food, Fresh and Fast</h1>
        <p>Discover the best restaurants near you</p>
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search restaurants or dishes..."
          />
          <FaSearch className="search-icon" />
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="featured-restaurants">
        <h2 className="section-title">Popular Restaurants</h2>
        <div className="restaurant-grid">
          {[
            {
              name: 'The Gourmet Kitchen',
              image: '/assets/images/restaurant1.jpg',
              location: 'Downtown',
              type: 'Both',
              rating: 4.5
            },
            {
              name: 'Green Garden',
              image: '/assets/images/restaurant2.jpg',
              location: 'Westside',
              type: 'Veg',
              rating: 4.8
            },
            {
              name: 'Spice Route',
              image: '/assets/images/restaurant3.jpg',
              location: 'Eastside',
              type: 'Non-Veg',
              rating: 4.6
            }
          ].map((restaurant, index) => (
            <div key={index} className="restaurant-card">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="restaurant-image"
              />
              <div className="restaurant-info">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.location}</p>
                <p>{restaurant.type}</p>
                <div className="rating">⭐ {restaurant.rating}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <FaUtensils className="step-icon" />
            <h3>Browse Menu</h3>
            <p>Choose from a variety of restaurants</p>
          </div>
          <div className="step-card">
            <FaClipboardList className="step-icon" />
            <h3>Choose Food</h3>
            <p>Select your favorite dishes</p>
          </div>
          <div className="step-card">
            <FaTruck className="step-icon" />
            <h3>Get it Delivered</h3>
            <p>Enjoy fresh food at your doorstep</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories">
        <h2 className="section-title">Explore Categories</h2>
        <div className="categories-scroll">
          {['Starters', 'Main Course', 'Desserts', 'Beverages', 'Side Dishes'].map(
            (category, index) => (
              <div key={index} className="category-card">
                <img
                  src={`/assets/images/category${index + 1}.png`}
                  alt={category}
                  className="category-icon"
                />
                <h3>{category}</h3>
              </div>
            )
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="testimonials-grid">
          {[
            {
              name: 'John Doe',
              image: '/assets/images/user1.jpg',
              rating: 5,
              comment:
                'Amazing food quality and super fast delivery! Highly recommended!'
            },
            {
              name: 'Jane Smith',
              image: '/assets/images/user2.jpg',
              rating: 5,
              comment:
                'Great variety of restaurants and excellent customer service.'
            }
          ].map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-header">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-image"
                />
                <div>
                  <h3>{testimonial.name}</h3>
                  <div className="rating">{'⭐'.repeat(testimonial.rating)}</div>
                </div>
              </div>
              <p>{testimonial.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to Taste Happiness?</h2>
        <button className="cta-button">Get Started</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
