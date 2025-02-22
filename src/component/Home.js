import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import HomeImage from './Images/homeimage.jpg';
import { styles } from './Style';
//-------------------
import FootaballImg from './Images/footballImage.jpg';
import BasketballImg from './Images/basketballImage.jpg';
import CricketImg from './Images/cricketImage.jpg';
import TennisImg from './Images/tennisImage.jpg';
import SwimmingImg from './Images/swimmingImg.jpg';
import YogaImg from "./Images/yogaImage.jpg"; // Replace with the actual path
import FitnessTrainerImg from "./Images/fitnessimg.jpg";
import homeCricket from "./Images/home-cricket-icon.png";
import { motion } from "framer-motion";
import ContactForm from './ContactForm';

const Home = () => {
  const { role } = useParams();


  const ScrollToHashElement = () => {
    const location = useLocation();

    useEffect(() => {
      if (location.hash) {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, [location]);

    return null;
  };

  const showPrivacyPolicy = () => {
    const policy = `
      Privacy Policy for Pro Sports Manager
      \n\nEffective Date: 12/12/2024
      \n\n1. Information We Collect
         - Personal details: Name, email, phone number, etc.
         - Platform usage: Pages visited, actions performed, and timestamps.
         - Player and coach data entered by users.
      \n\n2. How We Use Your Data
         - Manage and improve the Sports Academy Management System.
         - Communicate updates or schedules.
         - Ensure platform security.
      \n\n3. Data Sharing
         - No selling or renting of data to third parties.
         - Shared only with service providers or legal authorities when necessary.
      \n\n4. Data Security
         - We implement encryption and access controls to safeguard your data.
      \n\n5. Your Rights
         - Access, update, or delete your personal information.
         - Opt-out of promotional messages.
      \n\n6. Cookies
         - Cookies are used to enhance your experience and track platform usage.
      \n\n7. Third-Party Links
         - We are not responsible for the privacy practices of external websites.
      \n\n8. Policy Updates
         - Changes will be posted on this page with an updated effective date.
      \n\nContact Us
         - Email: [Insert Email Address]
         - Address: [Insert Office Address]
      \n\nLast Updated: [Insert Date]
    `;
    alert(policy);
  };

  const features = [
    {
      title: "Manage Players",
      description: "Add, edit, and view player details seamlessly.",
    },
    {
      title: "Coaches",
      description: "Assign coaches to players and manage coaching schedules.",
    },
    {
      title: "Batches",
      description: "Create and manage different training batches.",
    },
    {
      title: "Top Players",
      description: "Track and highlight the top-performing players in the academy.",
    },
  ];
  //--------------------------------------------
  // sports training boxes 
  //sports data here shadow boxes 
  const sportsData = [
    {
      name: "Football",
      image: FootaballImg,
      description: "A popular team sport played with a round ball.",
      link: "/sports/football", // Destination link
    },
    {
      name: "Basketball",
      image: BasketballImg,
      description: "A high-energy game played on a court with hoops.",
      link: "/sports/basketball",
    },
    {
      name: "Cricket",
      image: CricketImg,
      description: "A bat-and-ball game loved worldwide.",
      link: "/sports/cricket",
    },
    {
      name: "Tennis",
      image: TennisImg,
      description: "A fast-paced racquet sport played on a court.",
      link: "/sports/tennis",
    },
    {
      name: "Swimming",
      image: SwimmingImg,
      description: "A great individual and team sport involving water-based competition.",
      link: "/sports/swimming",
    },
    {
      name: "Yoga",
      image: YogaImg,
      description: "A practice focusing on mental and physical well-being through poses and meditation.",
      link: "/sports/yoga",
    },
    {
      name: "Fitness Trainer",
      image: FitnessTrainerImg,
      description: "Personalized training to enhance strength, stamina, and overall fitness.",
      link: "/sports/fitness-trainer",
    },
  ];



  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1150);
    };

    // Initialize on mount
    handleResize();

    // Event listener for resizing
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    const navbarDropdown = document.querySelector('.navbar-dropdown');
    navbarDropdown.classList.toggle('open', isDropdownOpen);
  };

  return (
    // <div className='body1'>
    <div >

      <div className="fade-page">
        {role !== 'admin' && (
          <nav className='nav'>
            <h1 className='logo'>Pro Sports Manager</h1>

            {isMobile ? (
              <div className="navbar-dropdown">
                <button className="navbar-toggle" onClick={toggleDropdown}>
                  &#9776;
                </button>
                {isDropdownOpen && (
                  <ul className='navLinks'>
                    <li><Link to="/Login"><button style={styles.btnLogin}>Log In</button></Link></li>
                  </ul>
                )}
              </div>
            ) : (
              <ul className='navLinks'>

                <li>
                  <Link to="/Login"><button style={styles.btnLogin}>Log In</button></Link>
                </li>
              </ul>
            )}
          </nav>
        )}
      </div>

      <ScrollToHashElement />
      {/* Hero Section */}
      {/* Hero Section as About Section */}

      <div className='below-navbar-home'>

        <div className='home-top-content'>

          <div className="fade-page-img-home">
            <div style={{
              paddingTop: '50px',
              // width: '60%', // Makes the image responsive and fills the width of its container
              height: 'auto', // Maintains aspect ratio
              borderRadius: '10px', // Optional: Adds rounded corners to the image
              // boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Optional: Adds a subtle shadow
              objectFit: 'cover', // Optional: Ensures the image covers the container area without stretching
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img src={homeCricket} alt='home icon loading...' className='home-top-img' />
            </div>
          </div>
          <div className='mainHeadingHome'>
            <h1 className='h1StyleHome'>Pro Sports Manager</h1>
            <h3 className='h3StyleAcademyHome'>Your Sports Venue & Player <span style={styles.hubSpan}>Hub</span></h3>
            <a href='#contact'>
              <button
                style={{
                  backgroundColor: 'blue',
                  color: 'white',
                  padding: '12px 30px',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  marginTop: '20px',
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: '20px',

                }}
              >
                Get Started
              </button>
            </a>
          </div>
        </div>
        <div className="homeImgWithText" >
          <div className='homeImage' alt="Ground"
            style={{
              // width: '60%', // Makes the image responsive and fills the width of its container
              height: 'auto', // Maintains aspect ratio
              borderRadius: '10px', // Optional: Adds rounded corners to the image
              // boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Optional: Adds a subtle shadow
              objectFit: 'cover', // Optional: Ensures the image covers the container area without stretching
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <img src={HomeImage} alt='Loading img...' style={{ width: '650px' }}></img>
          </div>
          <section id='aboutHome'
            style={{
              // width: '40%',
              textAlign: 'center',
              padding: '30px 20px', // Increased padding for better visibility
              backgroundColor: '#f4f4f4',
              color: '#333', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'
            }}
          >

            <p style={{ fontSize: '1.2rem', width: '100%', textAlign: 'left' }}>
              Efficiently manage player details, coaches, batches, and more with our comprehensive Sports Academy Management System. Our platform provides a centralized space to streamline every aspect of your academy’s operations. From tracking player progress and performance to scheduling batches and managing coaches, we empower academies to optimize their workflow, improve training efficiency, and ensure smooth day-to-day management. Whether you're a coach, admin, or academy owner, our system simplifies and elevates your management experience, making it easier to focus on what matters most—developing athletes and achieving success.  </p>
            <a href='#contact'>
              <button
                style={{
                  backgroundColor: 'blue',
                  color: 'white',
                  padding: '12px 30px',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  marginTop: '20px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Get Started
              </button>
            </a>
          </section>





        </div>
        {/* Features Section */}
        <section className="features-section">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </section>

        {/* display sports training data boxes */}
        <div className="sports-container">
          {sportsData.map((sport, index) => (
            <a href={sport.link} key={index} className="sports-box">
              <img src={sport.image} alt={`${sport.name}`} className="sports-image" />
              <h3 className="sports-name">{sport.name}</h3>
              <p className="sports-description">{sport.description}</p>
            </a>
          ))}
        </div>


        {/* Call to Action Section */}
        <section style={{ backgroundColor: '#333', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
          <h2>Ready to get started?</h2>
          <p>Join now to manage your academy’s data efficiently.</p>
          {/* <Link to='/PlayerRegistration'><button style={{ backgroundColor: 'orange', color: 'white', padding: '10px 20px', borderRadius: '5px' }}>
            Sign Up Now
          </button></Link> */}
        </section>


        {/* Testimonials Section */}
        <section style={{ padding: '50px 20px', backgroundColor: '#f9f9f9', textAlign: 'center' }}>
          <h2>User Testimonials</h2>
          <p>"This platform has made managing our academy’s data so much easier!"</p>
          <p>- Coach John, XYZ Academy</p>
        </section>

        {/* Contact us*/}
        <section id="contact" style={{ backgroundColor: '#f0f8ff', padding: '20px 20px', textAlign: 'center' }}>
          <h2>Contact Us</h2>
          <p>We'd love to hear from you! Feel free to reach out for any inquiries or support.</p>

          <div className="contact-container">
            {/* Contact Form */}
            <div className='home-contactus'>
              <h3>Send us a message</h3>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="contact-info">
              <h3>Our Contact Information</h3>
              <p><strong>Email:</strong> support@prosportsmanager.in</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Academy Bangalore, Cityville, State, 12345</p>
            </div>
          </div>
        </section>


        {/* Footer */}
        <footer style={{ backgroundColor: '#333', color: 'white', padding: '20px 0', textAlign: 'center' }}>
          <p>&copy; 2024 Pro Sports Academy Management. All rights reserved.</p>
          <div>

            <a href="/#" style={{ color: 'white', margin: '0 10px' }}
              onClick={(e) => {
                e.preventDefault();
                showPrivacyPolicy();
              }}>Privacy Policy</a>



            <a href="/terms" style={{ color: 'white', margin: '0 10px' }}>Terms of Service</a>
            <a href="#contact" style={{ color: 'white', margin: '0 10px' }}>Contact</a>
          </div>
        </footer>
      </div>
    </div >

  )
}

export default Home