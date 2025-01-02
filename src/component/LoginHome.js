import React from 'react';
import { useParams } from 'react-router-dom';
import HomeImage from './Images/homeimage.jpg';
import { styles } from './Style';
import AcademyNavbar from './AcademyNavbar.js';
// import FootaballImg from 'C:/Users/rahul/OneDrive/Desktop/Project - Copy/frontend/src/component/Images/footballImage';
import FootaballImg from './Images/footballImage.jpg';
import BasketballImg from './Images/basketballImage.jpg';
import CricketImg from './Images/cricketImage.jpg';
import TennisImg from './Images/tennisImage.jpg';
import SwimmingImg from './Images/swimmingImg.jpg';
import YogaImg from "./Images/yogaImage.jpg"; // Replace with the actual path
import FitnessTrainerImg from "./Images/fitnessimg.jpg";


const LoginHome = () => {
  const { role, academyId } = useParams();

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

  return (
    <div>
      <AcademyNavbar role={role} academyId={academyId} />
      <div className='below-navbar'>

        {/* Hero Section */}
        {/* Hero Section as About Section */}
        <div className='mainHeading'>
          <h1 className='h1Style' >ProSportsManager</h1>
          <h3 className='h3StyleAcademy' style={styles.h3StyleAcademy}>Your Sports Venue & Player <span style={styles.hubSpan}>Hub</span></h3>

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
              padding: '12px 12px',
            }}>
            <img src={HomeImage} alt='Loading img...' style={{ width: '600px' }}></img>
          </div>
          <section id='aboutHome'
            style={{
              // width: '40%',
              textAlign: 'center',
              padding: '50px 20px', // Increased padding for better visibility
              backgroundColor: '#f4f4f4',
              color: '#333', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'
            }}
          >

            <p style={{ fontSize: '1.2rem', width: '90%', textAlign: 'left' }}>
              Efficiently manage player details, coaches, batches, and more with our comprehensive Sports Academy Management System. Our platform provides a centralized space to streamline every aspect of your academy’s operations. From tracking player progress and performance to scheduling batches and managing coaches, we empower academies to optimize their workflow, improve training efficiency, and ensure smooth day-to-day management. Whether you're a coach, admin, or academy owner, our system simplifies and elevates your management experience, making it easier to focus on what matters most—developing athletes and achieving success.  </p>

          </section>





        </div>
        {/* Features Section */}
        <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', gap: '20px', padding: '40px 20px' }}>
          <div style={{ textAlign: 'center', width: '200px' }}>
            <h3>Manage Players</h3>
            <p>Add, edit, and view player details seamlessly.</p>
          </div>
          <div style={{ textAlign: 'center', width: '200px' }}>
            <h3>Coaches</h3>
            <p>Assign coaches to players and manage coaching schedules.</p>
          </div>
          <div style={{ textAlign: 'center', width: '200px' }}>
            <h3>Batches</h3>
            <p>Create and manage different training batches.</p>
          </div>
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
          <a href='#contact'><button style={{ backgroundColor: 'orange', color: 'white', padding: '10px 20px', borderRadius: '5px' }}>
            Contact us
          </button></a>
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

          <div style={{ display: 'flex', justifyContent: 'center', gap: '35px', flexWrap: 'wrap' }}>
            {/* Contact Form */}
            <div className='home-contactus'>
              <h3>Send us a message</h3>
              <form>
                <div style={{ marginBottom: '12px' }}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
                    required
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <input
                    type="email"
                    placeholder="Your Email"
                    style={{ width: '100%', padding: '10px', borderRadius: '5px' }}
                    required
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <textarea
                    placeholder="Your Message"
                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', height: '100px' }}
                    required
                  />
                </div>
                <button
                  type="submit"
                  style={{ backgroundColor: '#007BFF', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div style={{ flex: '1', justifyContent: 'center', alignItems: 'center', maxWidth: '300px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <h3>Our Contact Information</h3>

              <p><strong>Email:</strong> support@sportsacademy.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Academy St, Cityville, State, 12345</p>
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
    </div>

  )
}

export default LoginHome;