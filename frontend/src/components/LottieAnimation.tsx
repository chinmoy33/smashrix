// import React from 'react';
// import Lottie from 'lottie-react';
// import animationData from '../assets/BADMINTON_BIRDIE.json'; // Update this path

// const LottieAnimation = () => {
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: 'xMidYMid slice'
//     }
//   };

//   return (
//     <div style={{ width: '80px', height: '80px' }}>
//       <Lottie 
//         animationData={animationData} 
//         loop={true} 
//         autoplay={true}
//       />
//     </div>
//   );
// };

// export default LottieAnimation;

// src/components/LottieAnimation.tsx

import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/BADMINTON_BIRDIE.json'; // The original import

const LottieAnimation = () => {
  // Create a fresh copy of the animation data
  const animationDataCopy = JSON.parse(JSON.stringify(animationData));

  // The defaultOptions object is not strictly necessary here since you're passing props directly
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: 'xMidYMid slice'
  //   }
  // };

  return (
    <div style={{ width: '80px', height: '80px' }}>
      <Lottie 
        animationData={animationDataCopy} // Pass the copy here
        loop={true} 
        autoplay={true}
      />
    </div>
  );
};

export default LottieAnimation;