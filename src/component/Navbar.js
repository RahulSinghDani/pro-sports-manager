import React from 'react';
import { Link } from 'react-router-dom';
// import { styles } from './Style';
import "./Style.css";

const Navbar = () => {
  // const {role} = useParams();
  // console.log(role);
  return (
    <div>
      <nav className='nav' >
        <h1 className="logo">Pro Sports Manager</h1>
        <ul className="navLinks">
          {/* <li><Link to={`/HomeAllPlayerDashboard`}><button id="playerDashboard">Players</button></Link></li> */}
          {/* <li><Link to="/Dashboard"><button>Dashboard</button></Link></li> */}
          <li><Link to="/"><button>LogOut</button></Link></li>
        </ul>

      </nav>
    </div>
  );
};

export default Navbar;
