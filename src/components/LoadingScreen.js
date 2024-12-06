import React from 'react';
import '../styles/LoadingScreen.css';
import logoIcon from '../assets/images/LogoCopy.png';

// const LoadingScreen = () => {
//     return (
//         <div className="loading-screen">
//             <img src={logoIcon} alt="Loading..." className="loading-logo" />
//         </div>
//     );
// };

const LoadingScreen = () => {
    return (
        <div className="loading-bar-container">
            <div className="loading-bar"></div>
        </div>
    );
};

export default LoadingScreen;