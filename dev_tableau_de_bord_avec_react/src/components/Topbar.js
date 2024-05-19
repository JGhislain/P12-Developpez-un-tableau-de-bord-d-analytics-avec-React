import React from 'react';
import logo from '../assets/icons/logo.png';

// Composant Topbar affiche la barre de navigation supérieure avec le logo et les liens de navigation.
const Topbar = () => {
  return (
    <div className="topbar">
      <img src={logo} alt="SportSee" className="logo-title" />
      <nav className='top-nav-link'>
        <a className='nav-link nav-accueil' href="#">Accueil</a>
        <a className='nav-link nav-profil' href="#">Profil</a>
        <a className='nav-link nav-reglage' href="#">Réglage</a>
        <a className='nav-link nav-communaute' href="#">Communauté</a>
      </nav>
    </div>
  );
};

export default Topbar;
