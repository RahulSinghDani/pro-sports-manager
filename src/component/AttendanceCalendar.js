import React ,{useEffect} from 'react';
import SideNav from './_components/SideNav';
import { useParams, Outlet } from 'react-router-dom';  // Import Outlet
import AcademyNavbar from './AcademyNavbar';
import Education from './Images/Education.jpg';
import { Link,useLocation } from 'react-router-dom';


const AttendanceCalendar = () => {
    const { academyId, role } = useParams();

    const menuList = [
        { id: 1, name: 'Dashboard', icon: Education, path: '/Dashboard' },
        { id: 2, name: 'Students', icon: Education, path: `Student` },
        { id: 3, name: 'Attendance', icon: Education, path: 'Attendance' },
        { id: 4, name: 'Settings', icon: Education, path: '/settings' },
    ];
        const location = useLocation(); // Correct way to get the current path
        const currentPath = location.pathname;
    
        useEffect(() => {
            console.log(currentPath); // Logs the current route path
        }, [currentPath]);

    return (
        <div>
            <AcademyNavbar role={role} academyId={academyId} />
            <div className='side-nav-below-navbar'>
                <div className='attendance-sidebar'>
                    <div className="sidenav">
                    {menuList.map((menu) => {
                            const isActive = currentPath.includes(menu.path); // Check active path

                            return (
                                <Link to={menu.path} key={menu.id} className={`menu-item ${isActive ? 'active-menu-item-side-nav' : ''}`}>
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
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className='attendance-calendar'>
                    {/* This will render the child component (Student) without replacing the page */}
                    <Outlet />
                </div>
            </div>
            {/* <About /> */}
        </div>
    );
};

export default AttendanceCalendar;
