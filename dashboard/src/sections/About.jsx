import './About.css'
import aboutImage from '../assets/about.jpg'

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-image">
          <img src={aboutImage} alt="Sizzle Nueva Vizcaya Restaurant" />
        </div>
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            Welcome to Sizzle Nueva Vizcaya, your ultimate destination for mouthwatering sizzling dishes, served hot and fresh every day! At Sizzle, we bring people together through the joy of good food, great vibes, and unforgettable flavors that satisfy every craving.
          </p>
          <p>
            From our signature sizzling sisig to our savory chicken wings, steaks, and loaded platters, every meal is prepared with care and cooked to perfection. Whether you're dining in, taking out, or ordering for delivery, we make sure that every bite delivers a burst of deliciousness.
          </p>
          <p>
            Proudly local and proudly sizzling, Sizzle is more than just a food stop, it's a place where friends gather, families bond, and good memories are made. Come taste the heat, feel the sizzle, and enjoy the comfort of amazing food right here in the heart of Nueva Vizcaya.
          </p>
          <p>
            <strong>Experience the sizzle. Taste the difference.</strong>
          </p>
        </div>
      </div>
    </section>
  )
}

export default About