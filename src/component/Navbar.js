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
         <Link to="/" className='logout-btn'>LogOut</Link>
      </nav>
    </div>
  );
};

export default Navbar;
