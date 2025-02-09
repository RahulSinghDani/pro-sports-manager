import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styles } from './Style';
import LogoIcon from './Images/favicon.ico';
import LogOutPng from './Images/log-out_1.png';


const AcademyNavbar = ({ role, academyId }) => {
  const location = useLocation(); // Get the current location (path)
  // const { role } = useParams();
  const isLoginAcademyDashboard = location.pathname.includes('/LoginAcademyDashboard');
  const [isMobile, setIsMobile] = useState(false);

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


  return (
    <nav className='nav'>
      <div className='logo-container'>
      <img style={{width:'50px' , borderRadius:'50%'}} src={LogoIcon} alt='logo' />
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
                  Coach </Link>
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
                <Link to="/" className='logout-btn-png'><img src={LogOutPng} /></Link>
              </li>
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

          {/* <Link to={`/AcademyDetails/${role}/${academyId}`} ><button style={styles.btn}>AcademyDetails</button></Link> */}
          <Link to={`/AcademyDetails/${role}/${academyId}/Coach`} ><button style={styles.btn}>Coach</button></Link>
          <Link to={`/AcademyDetails/${role}/${academyId}/Courses`} ><button style={styles.btn}>Courses</button></Link>
          <Link to={`/AcademyDetails/${role}/${academyId}/Asset`} ><button style={styles.btn}>Assets</button></Link>
          <Link to={`/AcademyDetails/${role}/${academyId}/Player`} ><button style={styles.btn}>Player</button></Link>
          <Link to="/"  className='logout-btn-png'><img src={LogOutPng} /></Link>
        </ul>
      )}
    </nav>
  );
};



export default AcademyNavbar;