import React, { useState, useEffect} from 'react';
import {Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer} from 'recharts';
import { getUserPerformance } from '../services/apiService';

// Traduction des labels de performance en français
const labelsFrench = {
  cardio: 'Cardio',
  energy: 'Énergie',
  endurance: 'Endurance',
  strength: 'Force',
  speed: 'Vitesse',
  intensity: 'Intensité'
};

// Composant graphique de type radar affichant les performances de l'utilisateur
const PerformanceChart = ({ userId }) => {
  const [performanceData, setPerformanceData] = useState([]);

  // Chargement des données de performance lors du montage ou de la mise à jour de userId
  useEffect(() => {
    const fetchPerformanceData = async () => {
      // Récupération des données de performance depuis le serveur
      const { data, kind } = await getUserPerformance(userId);
      if (data && kind) {
        // Mise en forme des données pour le graphique radar
        const formattedData = data.map(item => ({
          // Conversion des labels en français
          subject: labelsFrench[kind[item.kind]],
          // Valeur de la performance
          A: item.value,
          // Valeur maximale pour chaque axe du radar
          fullMark: 200
        }));
        // Mise à jour de l'état avec les données formatées
        setPerformanceData(formattedData);
      }
    };

    fetchPerformanceData();
  }, [userId]);

  // Calculez le maximum des valeurs de performance
  const maxPerformanceValue = Math.max(...performanceData.map(item => item.A));

  // Structure du composant RadarChart
  return (
    <div className='performance-chart-bloc'>
      <ResponsiveContainer className={'performance-charts-container'} width="100%" height="100%">
        {/* Composant principal qui dessine un graphique radar. cx="50%" et cy="50%" centrent le graphique, outerRadius="70%" définit le rayon extérieur.*/}
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={performanceData}>
          {/* Grille polaire pour améliorer la lisibilité du radar */}
          <PolarGrid />
          {/* Configure les axes angulaires du graphique radar*/}
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#FFFFFF', fontSize: "0.60vw"}} />
          {/* Définit les axes radiaux et leurs domaines*/}
          <PolarRadiusAxis angle={30} domain={[0, maxPerformanceValue]} tick={false} />
          {/* Représente les données sous forme de radar */}
          <Radar name="Performance" dataKey="A" stroke="#E60000" fill="#E60000" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
