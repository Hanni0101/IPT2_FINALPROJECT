import './LandingPage.css'
import bgImage from '../assets/bg2.jpg'

function LandingPage() {
  return (
    <section 
      className="landing-page" 
      id="home"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.85)), url(${bgImage})`
      }}
    >
      <div className="landing-content">
        <h1>Where Every Meal Tells a Story</h1>
        <p className="description">
          Experience the perfect blend of flavors and ambiance.<br />
          Join us for an unforgettable experience.
        </p>
        <div className="cta-buttons">
          <a href="#menu" className="landing-btn primary">View Menu</a>
          <a href="#about" className="landing-btn secondary">About Us</a>
        </div>
      </div>
    </section>
  )
}

export default LandingPage