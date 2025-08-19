
// import React, { useRef, useEffect, useState } from 'react';
// import lottie from 'lottie-web';
// import animationData from '../assets/BADMINTON_BIRDIE.json';

// const LottieCursor = () => {
//   const lottieContainerRef = useRef(null); 
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   // Use opacity instead of a boolean for smooth transitions
//   const [opacity, setOpacity] = useState(0);
//   const animationDataCopy = JSON.parse(JSON.stringify(animationData));

//   useEffect(() => {
//     let anim = null; 

//     if (lottieContainerRef.current) {
//       anim = lottie.loadAnimation({
//         container: lottieContainerRef.current,
//         renderer: 'svg', 
//         loop: true,
//         autoplay: true,
//         animationData: animationDataCopy,
//         rendererSettings: {
//           // Try different values here
//           // The default is 'xMidYMid slice'
//           // Try: 'xMidYMid meet' or 'none'
//           preserveAspectRatio: 'xMidYMid slice'
//         }
//       });
//     }

//     // This single handler manages both position and visibility
//     const handleMouseMove = (e) => {
//       // Set opacity to 1 (visible) when the mouse is moving
//       setOpacity(1);
//       setPosition({ x: e.clientX, y: e.clientY });
//     };

//     // This handler will hide the cursor when the mouse stops moving
//     const handleMouseLeave = () => {
//       setOpacity(0);
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseleave', handleMouseLeave);
    
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseleave', handleMouseLeave);
//       if (anim) {
//         anim.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div
//       ref={lottieContainerRef}
//       style={{
//         position: 'fixed',
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//         transform: 'translate(-50%, -50%)', 
//         pointerEvents: 'none', 
//         zIndex: 9999, 
//         width: '60px',
//         height: '60px',
//         // New: Control visibility with opacity and a transition
//         opacity: opacity,
//         transition: 'opacity 0.2s ease-in-out'
//       }}
//     />
//   );
// };

// export default LottieCursor;


import React, { useRef, useEffect, useState } from 'react';
import lottie from 'lottie-web';
import animationData from '../assets/BADMINTON_BIRDIE.json';

const LottieCursor = () => {
  const lottieContainerRef = useRef(null); 
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  // Add a state to track if it's a mobile screen
  const [isMobile, setIsMobile] = useState(false);
  const animationDataCopy = JSON.parse(JSON.stringify(animationData));

  useEffect(() => {
    let anim = null; 

    // Define the media query outside the change handler for easier access
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    // Handler to update isMobile state
    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };

    // Set initial state and add listener
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    setIsMobile(mediaQuery.matches);

    // If it's a mobile device, we don't need to proceed with cursor logic
    if (isMobile) {
      // Clean up the media query listener on unmount
      return () => {
        mediaQuery.removeEventListener('change', handleMediaQueryChange);
      };
    }

    // Now, run the cursor logic only if it's not a mobile device
    if (lottieContainerRef.current) {
      anim = lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: 'svg', 
        loop: true,
        autoplay: true,
        animationData: animationDataCopy,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      });
    }

    const handleMouseMove = (e) => {
      setOpacity(1);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (anim) {
        anim.destroy();
      }
      // Also clean up the media query listener here
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, [isMobile]); // Dependency on `isMobile` ensures the effect re-runs on resize

  // Conditionally render the component based on screen size
  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={lottieContainerRef}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)', 
        pointerEvents: 'none', 
        zIndex: 9999, 
        width: '60px',
        height: '60px',
        opacity: opacity,
        transition: 'opacity 0.2s ease-in-out'
      }}
    />
  );
};

export default LottieCursor;