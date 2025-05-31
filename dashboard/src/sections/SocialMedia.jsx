import './SocialMedia.css'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import EmailIcon from '@mui/icons-material/Email'

function SocialMedia() {
  return (
    <section className="social-section" id="social">
      <h2>Follow Sizzle</h2>
      <p>Stay connected with us on social media!</p>
      <div className="social-icons">
        <a
          href="https://www.facebook.com/people/Sizzle-Nueva-Vizcaya/61561362369689/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FacebookIcon fontSize="large" />
        </a>
        <a
          href="https://www.instagram.com/explore/locations/339728299229727/sizzle-nueva-vizcaya/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <InstagramIcon fontSize="large" />
        </a>
        <a
          href="mailto:sizzle.bayombong@gmail.com"
          aria-label="Email"
        >
          <EmailIcon fontSize="large" />
        </a>
      </div>
    </section>
  )
}

export default SocialMedia