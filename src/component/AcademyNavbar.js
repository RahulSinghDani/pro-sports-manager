import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { styles } from './Style';
// import LogoIcon from './Images/favicon.ico';
import LogoIcon from './Images/PSM-logo1.ico';
import LogOutPng from './Images/log-out_1.png';
import axios from 'axios';


const AcademyNavbar = ({ role, academyId }) => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const location = useLocation(); // Get the current location (path)
  // const { role } = useParams();
  const isLoginAcademyDashboard = location.pathname.includes('/LoginAcademyDashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [academy, setAcademy] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/academicy/${academyId}`, { withCredentials: true })
      .then(response => {
        setAcademy(response.data); // Save the academy object
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Failed to load academy details.');
      });
  }, [API_BASE_URL, academyId]);

  // Extract first letter from academy name
  const firstLetter = academy?.name ? academy.name.charAt(0).toUpperCase() : '?';

  // Redirect function
  const handleClick = () => {
    navigate(`/update-academy-profile/${role}/${academyId}`); // Redirect to update profile page
  };

  // Check screen width on load and resize
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

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/logout`, {}, { withCredentials: true });
      navigate('/Login'); // Redirect after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  return (
    <nav className='nav'>
      <div className='logo-container'>
        <Link to={`/AcademyDetails/${role}/${academyId}`}><img style={{ width: '50px', borderRadius: '50%' }} src={LogoIcon} alt='logo' /></Link>
        <Link to={`/AcademyDetails/${role}/${academyId}`} className="logo" >Pro Sports Manager</Link>
      </div>
      {/* For Mobile View (Dropdown on small screens) */}
      {isMobile ? (
        <div className="navbar-dropdown">
          <button className="navbar-toggle" onClick={toggleDropdown}>
            &#9776; {/* Hamburger icon */}
          </button>
          {isDropdownOpen && (
            <ul className="navLinks">
              <div className="profile-avatar" onClick={handleClick}>
                {firstLetter}
              </div>
              {role === 'admin' && !isLoginAcademyDashboard && (
                <li><Link to={`/Dashboard/${role}`}>All Academy</Link></li>
              )}
              <li> <Link to={`/AcademyDetails/${role}/${academyId}/ManagePayment`}>
                Payments </Link>
              </li>
              {/* <li>
                <Link to={`/AcademyDetails/${role}/${academyId}`}>
                  AcademyDetails </Link>
              </li> */}
              <li>
                <Link to={`/AcademyDetails/${role}/${academyId}/Coach`}>
                  Employee </Link>
              </li>
              <li>
                <Link to={`/AcademyDetails/${role}/${academyId}/Courses`}>
                  Courses </Link> </li>
              <li>
                <Link to={`/AcademyDetails/${role}/${academyId}/Asset`}>
                  Assets </Link> </li>
              <li>
                <Link to={`/AcademyDetails/${role}/${academyId}/Player`}>
                  Player  </Link> </li>
              <li>
                <a onClick={handleLogout} className='logout-btn-png'>
                  <img src={LogOutPng} alt='logout' />
                </a>
              </li>
              {/* <Link to={`/AcademyDetails/AttendanceCalendar/${role}/${academyId}`} ><button style={styles.btn}>Attendance</button></Link> */}

            </ul>
          )}
        </div>
      ) : (
        // For Desktop View (Always visible on larger screens)
        <ul className='navLinks' >
          {/* <li><Link to={`/Dashboard`}><button>Dashboard</button></Link></li> */}

          {role === 'admin' && !isLoginAcademyDashboard && (
            <Link to={`/Dashboard/${role}`}><button style={styles.btn}>All Academy</button></Link>

          )}
          <Link to={`/AcademyDetails/${role}/${academyId}/ManagePayment`} ><button style={styles.btn}>Payments</button></Link>
          <Link to={`/AcademyDetails/${role}/${academyId}/Coach`} ><button style={styles.btn}>Employee</button></Link>
          <Link to={`/AcademyDetails/${role}/${academyId}/Courses`} ><button style={styles.btn}>Courses</button></Link>
          <Link to={`/AcademyDetails/${role}/${academyId}/Asset`} ><button style={styles.btn}>Assets</button></Link>
          <Link to={`/AcademyDetails/${role}/${academyId}/Player`} ><button style={styles.btn}>Player</button></Link>
          {/* <Link to={`/AcademyDetails/AttendanceCalendar/${role}/${academyId}`} ><button style={styles.btn}>Attendance</button></Link> */}
          <div className="profile-avatar" onClick={handleClick}>
            {firstLetter}
          </div>
          <a onClick={handleLogout} className='logout-btn-png'>
            <img src={LogOutPng} alt='logout' />
          </a>
        </ul>
      )}
    </nav>
  );
};



export default AcademyNavbar;