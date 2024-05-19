import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import CustomTooltip from './CustomTooltip';
import { getUserAverageSession } from '../services/apiService';

// Tableau contenant les abréviations des jours de la semaine pour l'axe X du graphique.
const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

// Composant qui affiche un graphique linéaire de la durée moyenne des sessions d'entraînement de l'utilisateur.
const AverageSessionsChart = ({ userId }) => {
  const [averageSessionsData, setAverageSessionsData] = useState([]);

  // Utilise useEffect pour charger les données de sessions dès le chargement du composant ou lors du changement de userId.
  useEffect(() => {
     // Fonction asynchrone pour récupérer les données des sessions moyennes d'un utilisateur.
    const fetchAverageSessionsData = async () => {
      const response = await getUserAverageSession(userId);
      if (response && response.data && response.data.sessions) {
        // Formatte les données pour le graphique en utilisant les abréviations des jours.
        const formattedData = response.data.sessions.map(session => ({
          ...session,
          day: daysOfWeek[session.day - 1]
        }));
        setAverageSessionsData(formattedData);
      }
    };

    fetchAverageSessionsData();
    // Relance la requête lorsque l'userId change.
  }, [userId]);

  // Affiche un message de chargement si les données ne sont pas encore disponibles.
  if (!averageSessionsData || averageSessionsData.length === 0) {
    return <div>Chargement des données de sessions moyennes...</div>;
  }

  return (
    <div className="average-session-chart-wrapper">
      <ResponsiveContainer className='average-container' width='100%' height='75%'>
        <h2 className="average-session-title">
          Durée moyenne des sessions
        </h2>
        <LineChart data={averageSessionsData}>
          {/* Axe X avec les jours de la semaine comme catégories */}
          <XAxis dataKey="day" tick={{ fill: '#ff8080', fontSize: 14 }} tickLine={false} axisLine={false}/>
          {/* Ligne représentant la durée des sessions */}
          <Line type="monotone" dataKey="sessionLength" stroke="#ff8080" strokeWidth={2} dot={false} />
          {/* Tooltip personnalisé pour afficher des informations supplémentaires au survol */}
          <Tooltip content={<CustomTooltip type="averageSessions"/>} className='average-tooltip' cursor={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AverageSessionsChart;
