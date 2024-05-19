import React, {useState, useEffect} from 'react';
import UserProfile from './components/UserProfile';
import DailyActivityChart from './components/DailyActivityChart';
import AverageSessionsChart from './components/AverageSessionsChart';
import PerformanceChart from './components/PerformanceChart';
import ScorePieChart from './components/ScorePieChart';
import KeyData from './components/KeyData';
import './App.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { toggleMockDataUsage, getMockDataStatus } from './services/apiService';

// Composant principal de l'application qui orchestre tous les sous-composants.
const App = () => {
  // État pour l'identifiant de l'utilisateur, initialisé à 12
  const [userId, setUserId] = useState(12);
  // État pour contrôler si les données mockées sont utilisées
  const [isMocked, setIsMocked] = useState(getMockDataStatus());

  // Change l'identifiant de l'utilisateur entre deux valeurs pour simuler un changement d'utilisateur.
  const handleUserChange = () => {
    setUserId(userId === 12 ? 18 : 12);
  };

  // Bascule entre l'utilisation des données mockées et du backend et rafraîchit l'identifiant de l'utilisateur.
  const handleToggleData = () => {
    const newMockStatus = toggleMockDataUsage();
    // Met à jour l'état local en fonction du statut des données mockées
    setIsMocked(newMockStatus);
    // Force l'ID utilisateur à être rafraichit après un changement de source
    setUserId(userId => userId === 12 ? 18 : 12);
  };

  // Utilise useEffect pour surveiller les changements d'état de `isMocked` et affiche un log correspondant.
  useEffect(() => {
    console.log('Utilisation des données mockées:', isMocked);
  }, [isMocked]);

  return (
    <div className="App">
      <Topbar />
      <Sidebar />
      <button className='switch-id-button toogle-button' onClick={handleUserChange}>Changer d'utilisateur</button>
      <button className='switch-source-button toogle-button' onClick={handleToggleData}>{isMocked ? 'Utiliser données du backend' : 'Utiliser données mockées'}</button>
      <div className='user-profil-contain'>
        <UserProfile userId={userId} />
      </div>
      <div className='main-tool'>
        <div className='main-graph'>
          <DailyActivityChart userId={userId} />
          <div className='litle-graph'>
            <AverageSessionsChart userId={userId} />
            <PerformanceChart userId={userId} />
            <ScorePieChart userId={userId} />
          </div>
        </div>
        <div className='main-data'>
          <KeyData userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default App;