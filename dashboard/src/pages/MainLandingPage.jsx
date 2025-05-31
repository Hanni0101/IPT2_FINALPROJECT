import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import LandingPage from '../sections/LandingPage.jsx'
import About from '../sections/About.jsx'
import Location from '../sections/Location.jsx'
import Menu from '../sections/Menu.jsx'
import SocialMedia from '../sections/SocialMedia.jsx'
import '../pages/MainLandingPage.css'

function MainLandingPage({ user, setUser }) {
  return (
    <div className="main-landing-page">
      <Header user={user} setUser={setUser} />
      <main>
        <LandingPage />
        <About />
        <Location />
        <Menu user={user} />
        <SocialMedia />
      </main>
      <Footer />
    </div>
  )
}

export default MainLandingPage