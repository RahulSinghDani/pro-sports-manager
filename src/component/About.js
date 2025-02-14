import React from 'react';
import './Style.css'; // Create a CSS file for styling if needed
import ytimg from "./Images/ytpng.png";
import instapng from "./Images/instapng.png";
import fbpng from "./Images/fbpng.png";
import { Link } from 'react-router-dom';
import logo from './Images/logo.png';

const About = () => {
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
    return (
        <footer className="about-section">
            <div className='footer-part'>


                <div className="about-content" >
                    {/* <img src={logo} alt="ProSportsManager"/> */}
                    <h2>About ProSportsManager (PSM)</h2>
                    <p>
                        Welcome to <strong>ProSportsManager</strong> (PSM), your one-stop solution for managing venues, grounds, and players efficiently. We are dedicated to helping sports enthusiasts and professionals streamline their operations and focus on what truly matters—excelling in sports!
                    </p>
                    <p>
                        Whether you're managing football grounds, organizing tournaments, or tracking player performance, PSM provides the tools you need to succeed. Join us in shaping the future of sports management!
                    </p>
                </div>

                <div className="social-media-icons">
                <img src={logo} alt="ProSportsManager" className='psm-icon-about'/>
                    <h3>Follow Us</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh', width: '100%' }}>
                        <div className="icons" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '18px' }}>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <img src={instapng} alt="Instagram" className="social-logo" />
                            </a>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <img src={fbpng} alt="Facebook" className="social-logo" />
                            </a>
                            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                                <img src={ytimg} alt="YouTube" className="social-logo" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className='about-footer-part'>
                <p>&copy; 2024 Pro Sports Academy Management. All rights reserved.</p>
                <div className="footer-links">

                    <a href="/#" style={{ color: 'white', margin: '0 10px' }}
                        onClick={(e) => {
                            e.preventDefault();
                            showPrivacyPolicy();
                        }}>Privacy Policy</a>



                    <Link to="/About" >Terms of Service</Link>
                    <Link to="/About" >Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default About;
