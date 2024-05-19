import React from 'react';
import bikeIcon from '../assets/icons/bike-icon.png';
import fitnessIcon from '../assets/icons/fitness-icon.png';
import meditIcon from '../assets/icons/medit-icon.png';
import swimIcon from '../assets/icons/swim-icon.png';

// Composant Sidebar qui fournit une navigation latérale avec des icônes pour différentes activités.
const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className='nav-sidebar'>
        <a href="#" className="sidebar-link">
          <img src={meditIcon} alt="Méditation" className="sidebar-icon" />
        </a>
        <a href="#" className="sidebar-link">
          <img src={swimIcon} alt="Natation" className="sidebar-icon" />
        </a>
        <a href="#" className="sidebar-link">
          <img src={bikeIcon} alt="Vélo" className="sidebar-icon" />
        </a>
        <a href="#" className="sidebar-link">
          <img src={fitnessIcon} alt="Fitness" className="sidebar-icon" />
        </a>
      </nav>
      {/* Section de copyright en bas de la barre latérale */}
      <div className='side-copyright'>
        <p className='text-copyright'>Copyright SportSee 2020</p>
      </div>
    </div>
  );
};

export default Sidebar;
