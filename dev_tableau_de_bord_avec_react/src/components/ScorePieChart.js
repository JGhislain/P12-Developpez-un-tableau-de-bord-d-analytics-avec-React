import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';
import { getUserData } from '../services/apiService';

// Composant qui affiche le score de l'utilisateur sous forme de graphique en camembert
const ScorePieChart = ({ userId }) => {
  // useState pour maintenir le score de l'utilisateur. Initialement, il est à 'null' en attendant le chargement des données.
  const [userScore, setUserScore] = useState(null);

  // Le hook useEffect récupère le score de l'utilisateur dès que le userId change.
  useEffect(() => {
    // Fonction asynchrone pour récupérer les données utilisateur
    const fetchData = async () => {
      try {
        const { data } = await getUserData(userId);
        // Extraction de 'todayScore' ou 'score' de l'objet 'data'
        const score = data.todayScore || data.score;
        // Mise à jour de l'état avec le score récupéré
        setUserScore(score);
      } catch (error) {
        console.error("Erreur lors de la récupération du score de l'utilisateur", error);
      }
    };

    fetchData();
    // Le hook se déclenche à chaque changement de userId
  }, [userId]);

  if (userScore === null) {
    return <div>Chargement du score...</div>;
  }

  // Calcul du pourcentage de score pour le diagramme
  const scorePercentage = userScore * 100;
  const chartData = [
    { name: 'Score', value: scorePercentage, fill: '#FF0000' },
    { name: 'Rest', value: 100 - scorePercentage, fill: 'transparent' },
  ];

  // Afficher un message de chargement tant que les données ne sont pas chargées
  if (userScore === null) {
    return <div>Chargement du score...</div>;
  }

  return (
    <div className='score-pie-container'>
      <ResponsiveContainer className={'score-pie-contain'} width="100%">
        <h2 className='score-pie-title'>
          Score
        </h2>
        <PieChart>
          <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              // Angle de démarage
              startAngle={90}
              // Inverser le sens de remplissage
              endAngle={270}
              // Rayon intérieur du cercle (effet de donut)
              innerRadius="60%"
              // Rayon extérieur du cercle
              outerRadius="80%"
              // Espacement entre les segments
              paddingAngle={5}
              // Clé utilisée pour lire les données
              dataKey="value"
              // Arrondir les angles des segments
              cornerRadius={10}
              // Mélanger les traits des segments pour un rendu plus esthétique
              blendStroke
          >
          {/* Itère sur chaque élément de 'chartData' pour créer un segment dans le diagramme. */}
          {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
          </Pie>
              {/* Texte centré pour afficher le pourcentage de réalisation de l'objectif */}
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="chart-number">
                  {`${scorePercentage}%`}
              </text>
              <text x="50%" y="61%" textAnchor="middle" dominantBaseline="central" className="chart-label">
                  de votre
              </text>
              <text x="50%" y="70%" textAnchor="middle" dominantBaseline="central" className="chart-label">
                  objectif
              </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScorePieChart;
