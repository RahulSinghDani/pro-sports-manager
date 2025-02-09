import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";


// import { RoleProvider } from "./component/RoleContext"; // Import the RoleProvider


import Home from "./component/Home";
import Login from './component/Login';
import Dashboard from "./component/Dashboard";
import AcademyDetails from "./component/AcademyDetails";
import Coach from "./component/Coach";
import Courses from "./component/Courses";
import Asset from "./component/Asset";
import Player from "./component/Player";
import AddAcademy from "./component/AddAcademy";
import DeleteAcademy from "./component/DeleteAcademy";
import EditAcademy from "./component/EditAcademy";
import EditCoach from "./component/EditCoach";
import EditCourse from "./component/EditCourse";
import AddCourse from "./component/AddCourse";
import DeleteCourse from "./component/DeleteCourse";
import AddCoach from "./component/AddCoach";
import AddPlayer from "./component/AddPlayer";
import DeletePlayer from "./component/DeletePlayer";
import EditPlayer from "./component/EditPlayer";
import AddAsset from "./component/AddAsset";
import EditAsset from "./component/EditAsset";
import DeleteAsset from "./component/DeleteAsset";
import DeleteCoach from "./component/DeleteCoach";
import PlayerDetails from "./component/PlayerDetails";
// import PlayerDashboard from "./component/LoginPlayerDashboard";
import PlayerRegistration from "./component/PlayerRegistration";
import AllPlayers from "./component/AllPlayers";
import LoginPlayerDashboard from "./component/LoginPlayerDashboard";
import LoginAcademyDashboard from "./component/LoginAcademyDashboard";
import LoginCoachDashboard from "./component/LoginCoachDashboard";

import UserRegistration from "./component/UserRegistration";
import AcademyRegistration from "./component/AcademyRegistration";
import ManagePayment from "./component/ManagePayment";
import Bookings from "./component/Bookings";
import EditBooking from "./component/EditBooking";
import NewBooking from "./component/NewBooking";


import AllBookings from "./component/AllBookings";
import EditPlayerPaymentRecord from "./component/EditPlayerPaymentRecord";
import FinancialSummary from "./component/FinancialSummary";
import HomeAllPlayerDashboard from "./component/HomeAllPlayerDashboard";
import LoginHome from "./component/LoginHome";
import PublicBookings from "./component/PublicBookings";
import AcademyAssets from "./component/AcademyAssets";
import BookableDashboard from "./component/BookableDashboard";
import About from "./component/About";
import BookNow from "./component/BookNow";
import PlayerFinancialForm from "./component/PlayerFinancialForm";
import CricketData from "./component/CricketData";
import CricketGraph from "./component/CricketGraph";
import NewsForm from "./component/NewsForm";
import LoadingSpinner from "./component/LoadingSpinner";
import NotFound from "./component/NotFound";
import { useEffect } from "react";

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000); // Simulates loading
  }, []);
  const pageVariants = {
    initial: { opacity: 1, x: 0 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 1, x: 0 },
  };

  const pageTransition = {
    duration: 0.5,
    ease: "easeInOut",
  };
  const location = useLocation(); // Get current location


  return (
    <AnimatePresence mode="wait">

      <motion.div
        key={location.pathname} // Ensure unique animations per route
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        {isLoading ? <LoadingSpinner /> : (
          <Routes location={location} key={location.pathname} >
            <Route path="/" element={<Home />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Dashboard/:role" element={<Dashboard />} />
            <Route exact path="/AllPlayers/:role" element={<AllPlayers />} />
            <Route exact path="/HomeAllPlayerDashboard" element={<HomeAllPlayerDashboard />} />

            <Route exact path="/LoginPlayerDashboard/:role/:academy_id/:id" element={<LoginPlayerDashboard />} />
            <Route exact path="/LoginAcademyDashboard/:role/:id" element={<LoginAcademyDashboard />} />
            <Route exact path="/LoginCoachDashboard/:role/:academy_id/:coachId" element={<LoginCoachDashboard />} />


            <Route path="/LoginHome/:role/:academyId" element={<LoginHome />} />
            <Route path="/AcademyDetails/:role/:academyId" element={<AcademyDetails />} />
            <Route path="/AcademyDetails/:role/:academyId/:id/:name" element={<PlayerDetails />} />
            <Route path="/PublicBookings" element={<PublicBookings />} />
            <Route path="/About" element={<About />} />
            <Route path="/booking-book-now/:role/:academyId/:id" element={<BookNow />} />

            <Route path="/UserRegistration" element={<UserRegistration />} />
            <Route path="/playerRegistration" element={<PlayerRegistration />} />
            <Route path="/AcademyRegistration" element={<AcademyRegistration />} />
            <Route path="/AcademyDetails/:role/:academyId/ManagePayment" element={<ManagePayment />} />
            <Route path="/edit-player-record/:role/:academyId/:id" element={<EditPlayerPaymentRecord />} />
            <Route path="/ManagePayment/:role/:academyId/Bookings" element={<Bookings />} />
            <Route path="/edit-booking/:role/:academyId/:id" element={<EditBooking />} />
            <Route path="/new-booking/:role/:academyId" element={<NewBooking />} />
            <Route path="/financialsummary/:role/:academyId" element={<FinancialSummary />} />
            <Route path="/financialform/:role/:academyId/:id/:name/:fee" element={<PlayerFinancialForm />} />

            <Route path="/all-bookings/:role/:academyId/:id" element={<AllBookings />} />
            <Route path="/bookable-dashboard/:role/:academyId/:id" element={<BookableDashboard />} />





            <Route path="/AcademyDetails/:role/:academyId/Coach" element={<Coach />} />
            <Route path="/AcademyDetails/:role/:academyId/Courses" element={<Courses />} /> {/* Add Courses Route */}
            <Route path="/AcademyDetails/:role/:academyId/Asset" element={<Asset />} /> {/* Add Asset Route */}
            <Route path="/AcademyDetails/:role/:academyId/Player" element={<Player />} /> {/* Add Players Route */}


            <Route path="/add-academy/:role" element={<AddAcademy />} />
            <Route path="/delete-academy/:role" element={<DeleteAcademy />} />
            <Route path="/edit-academy/:role" element={<EditAcademy />} />
            <Route path="/edit-coach/:role/:academyId" element={<EditCoach />} />
            <Route path="/edit-course/:role/:academyId" element={<EditCourse />} />
            <Route path="/add-course/:role/:academyId" element={<AddCourse />} />
            <Route path="/delete-course/:role/:academyId" element={<DeleteCourse />} />
            <Route path="/add-coach/:role/:academyId" element={<AddCoach />} />
            <Route path="/delete-coach/:role/:academyId" element={<DeleteCoach />} />

            <Route path="/add-player/:role/:academyId" element={<AddPlayer />} />
            <Route path="/delete-player/:role/:academyId" element={<DeletePlayer />} />
            <Route path="/edit-player/:role/:academyId" element={<EditPlayer />} />
            <Route path="/add-asset/:role/:academyId" element={<AddAsset />} />
            <Route path="/edit-asset/:role/:academyId" element={<EditAsset />} />
            <Route path="/delete-asset/:role/:academyId" element={<DeleteAsset />} />
            <Route path="/academy-asset/:role/:academyId" element={<AcademyAssets />} />
            <Route path="/player-cricket-data/:role/:academyId/:id/:name" element={<CricketData />} />
            <Route path="/player-cricket-data/graph" element={<CricketGraph />} />
            <Route path="/academy-news/:academyId" element={<NewsForm />} />


            <Route path="*" element={<NotFound />} />


          </Routes>
        )}
      </motion.div>

    </AnimatePresence >
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}