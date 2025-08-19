import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Events from './components/Events';
import LottieCursor from './components/LottieCursor';
import { Toaster } from "react-hot-toast";

import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import OAuthCallback from "./components/OAuthCallback.tsx";
//import DashboardPage from "./pages/DashboardPage.tsx";
//import PageNotFound from "./pages/PageNotFound.tsx";
import Admindashboard from "./pages/Admindashboard.tsx";

function App() {
  const [activeSection, setActiveSection] = useState('home');


  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'events':
        return <Events />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Conditionally render the LottieCursor component */}
      <LottieCursor/>
      {/* <main className="pt-16">
        {renderSection()}
      </main> */}
      <Routes>
        <Route
          path="/Admin/*"
          element={
            <ProtectedRoute>
              <Admindashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="/Login" element={<AuthPage />} />
        <Route path="/auth/callback" element={<OAuthCallback />} />
        {/* <Route path="/*" element={<PageNotFound />} /> */}
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
    // Semi-transparent black background for visibility on a light theme
    background: "rgba(0, 0, 0, 0.8)", 
    // White text for high contrast on the dark background
    color: "#fff", 
    backdropFilter: "blur(10px)",
    // Darker border for definition
    border: "1px solid rgba(0, 0, 0, 0.1)", 
  },
        }}
      />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-full px-4 sm:px-6 lg:px-24">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Smashrix</h3>
              <p className="text-gray-300 leading-relaxed">
                Where champions are made, one smash at a time. Join our community of passionate badminton players.
              </p>
            </div>
            
            {/* <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => setActiveSection('home')} className="hover:text-orange-400 transition-colors">Home</button></li>
                <li><button onClick={() => setActiveSection('about')} className="hover:text-orange-400 transition-colors">About</button></li>
                <li><button onClick={() => setActiveSection('events')} className="hover:text-orange-400 transition-colors">Events</button></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Membership</a></li>
              </ul>
            </div> */}
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-300">
                <a href={`tel:6900300469`}><li>Phone 1: 6900300469</li></a>
                <a href={`tel:7896911752`}><li>Phone 2: 7896911752</li></a>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Join Us</h4>
              <div className="flex space-x-4">
                <a href="https://chat.whatsapp.com/L6cGVIZO5p09Xa76PAMT0K?mode=ac_t" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-orange-400 transition-colors">Whatsapp</a>
                {/* <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Instagram</a>
                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">Twitter</a> */}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            {/* <p>&copy; 2025 Smashrix Badminton Club. All rights reserved.</p> */}
            <p>Designed and developed with ❤️ by Chinmoy Sharma</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;


// import { Toaster } from "react-hot-toast";

// import { Route, Routes } from "react-router-dom";
// import ProtectedRoute from "./components/ProtectedRoute.tsx";
// import LandingPage from "./pages/LandingPage.tsx";
// import AuthPage from "./pages/AuthPage.tsx";
// import OAuthCallback from "./components/OAuthCallback.tsx";
// import DashboardPage from "./pages/DashboardPage.tsx";
// import PageNotFound from "./pages/PageNotFound.tsx";

// function App() {
//   return (
//     <div className="min-h-screen">
//       <Routes>
//         <Route
//           path="/Dashboard/*"
//           element={
//             <ProtectedRoute>
//               <DashboardPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/Login" element={<AuthPage />} />
//         <Route path="/auth/callback" element={<OAuthCallback />} />
//         <Route path="/*" element={<PageNotFound />} />
//       </Routes>
//       <Toaster
//         position="top-right"
//         toastOptions={{
//           style: {
//             background: "rgba(255, 255, 255, 0.1)",
//             color: "#fff",
//             backdropFilter: "blur(10px)",
//             border: "1px solid rgba(255, 255, 255, 0.2)",
//           },
//         }}
//       />
//     </div>
//   );
// }

// export default App;
