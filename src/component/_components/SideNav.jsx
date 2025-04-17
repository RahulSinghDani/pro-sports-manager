import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Education from '../Images/Education.jpg';

const SideNav = () => {
    const menuList = [
        { id: 1, name: 'Dashboard', icon: Education, path: '/dashboard' },
        { id: 2, name: 'Students', icon: Education, path: '/students' },
        { id: 3, name: 'Attendance', icon: Education, path: '/players' },
        { id: 4, name: 'Settings', icon: Education, path: '/settings' },
    ];

    const location = useLocation(); // Correct way to get the current path
    const currentPath = location.pathname;

    useEffect(() => {
        console.log(currentPath); // Logs the current route path
    }, [currentPath]);

    return (
        <div className="sidenav">
            {menuList.map((menu) => (
                <Link 
                    to={menu.path} 
                    key={menu.id} 
                    className={`menu-item ${currentPath === menu.path ? 'active' : ''}`}
                >
                    <div className="menu-item">
                        <div className="menu-content">
                            {menu.icon && (
                                <img
                                    src={menu.icon}
                                    alt={menu.name}
                                    className="menu-icon-sidenav"
                                />
                            )}
                            <p>{menu.name}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SideNav;
