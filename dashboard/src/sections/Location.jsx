import './Location.css'

function Location() {
  return (
    <section className="location-section" id="location">
      <div className="location-container">
        <div className="location-content">
          <h2>Our Location</h2>
          <p className="location-address">
            <strong>Sizzle Nueva Vizcaya</strong><br />
            The Cornerstone Building, Capt. Dela Cruz Street<br />
            Bayombong, Nueva Vizcaya<br />
            Philippines
          </p>
          <p className="location-hours">
            <strong>Opening Hours:</strong><br />
            Monday - Sunday: 10:00 AM - 10:00 PM
          </p>

          <a 
            href="https://www.google.com/maps/dir/16.4888576,121.1571674/16.48487,121.14063/@16.4863867,121.138662,15z/data=!3m1!4b1!4m4!4m3!1m1!4e1!1m0?entry=ttu" 
            target="_blank"
            rel="noopener noreferrer"
            className="location-button"
          >
            Get Directions
          </a>
        </div>
        <div className="location-map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3799.043282925734!2d121.13814189999999!3d16.4848705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDI5JzA1LjUiTiAxMjHCsDA4JzI2LjMiRQ!5e0!3m2!1sen!2sus!4v1653183511417!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Location"
          />
        </div>
      </div>
    </section>
  )
}

export default Location