import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import About from '../components/About';
import Events from '../components/Events';
import LottieCursor from '../components/LottieCursor';

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
    <div className="min-h-screen bg-white" >
      
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="pt-16">
        {renderSection()}
      </main> 
      
      
    </div>
  );
}

export default App;