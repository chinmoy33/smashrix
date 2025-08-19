import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import About from '../components/About';
import Events from '../components/Events';
import {useSelector} from 'react-redux';
// import { setActiveSection } from '../store/renderSlice.ts'; // Adjust the path if needed

function LandingPage() {
  const activeSection = useSelector((state) => state.render.activeSection);
  //const [activeSection, setActiveSection] = useState('home');


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
    <div className="min-h-screen bg-white" >
      
      <Navbar/>
      <main className="pt-16">
        {renderSection()}
      </main> 
      
      
    </div>
  );
}

export default LandingPage;