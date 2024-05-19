import React, {useState, useEffect} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip} from 'recharts';
import CustomTooltip from './CustomTooltip';
import { getUserActivity } from '../services/apiService';

// Composant pour afficher l'activité quotidienne de l'utilisateur
// 'userId' est passé en prop au composant pour récupérer les données spécifiques à cet utilisateur
const DailyActivityChart = ({ userId }) => {
  // État pour stocker les données d'activité
  const [activityData, setActivityData] = useState([]);

  // Récupération des données d'activité à chaque changement de userId
  useEffect(() => {
      const fetchActivityData = async () => {
          try {
              // Passer userId à getUserActivity
              const { data } = await getUserActivity(userId);
              if (data.sessions) {
                  setActivityData(data.sessions);
              }
          } catch (error) {
              console.error("Erreur lors de la récupération des données d'activité", error);
          }
      };

      fetchActivityData();
  }, [userId]); // Ajouter userId comme dépendance de useEffect pour relancer la requête si userId change

  // Formatage des données pour l'affichage
  const formattedData = activityData.map(session => ({
      ...session,
      day: `${new Date(session.day).getDate()}`,
  }));
  
    return (
      <div className="daily-activity-chart">
        <div className="chart-header">
          <h2 className='daily-chart-title'>Activité quotidienne</h2>
          {/* Légende pour les indicateurs graphiques */}
          <div className="chart-legend">
            <div className="legend-weight">
              {/* Indicateur visuel pour le poids */}
              <span className="legend-color-weight"></span>
              <span className='text-legend'>Poids (kg)</span>
            </div>
            <div className="legend-cal">
              {/* Indicateur visuel pour les calories brûlées */}
              <span className="legend-color-cal"></span>
              <span className='text-legend'>Calories brûlées (kCal)</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer className='recharts-activity-daily' width="88%">
          <BarChart className='barchart-activity-daily' data={formattedData}>
            {/* Grille de fond pour améliorer la lisibilité */}
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            {/* Axe X affichant les jours */}
            <XAxis dataKey="day" tick={{ fill: '#9B9EAC', fontSize: 14 }} tickMargin={16} tickLine={false}/>
            {/* Axe Y gauche pour le poids, caché pour simplifier le graphique */}
            <YAxis yAxisId="left" orientation="left" hide={true} />
            {/* Axe Y droit pour les calories, avec ajustement de l'échelle */}
            <YAxis yAxisId="right" orientation="right" tick={{ fill: '#9B9EAC', fontSize: 14 }} tickMargin={35} tickLine={false} axisLine={false} domain={['dataMin - 50', 'dataMax + 50']} />
            {/* Barre pour le poids */}
            <Bar yAxisId="left" dataKey="kilogram" fill="#282D30" barSize={10} radius={[3, 3, 0, 0]} name="Poids (kg)" />
            {/* Barre pour les calories */}
            <Bar yAxisId="right" dataKey="calories" fill="#E60000" barSize={10} radius={[3, 3, 0, 0]} name="Calories brûlées (kCal)" />
            {/* Infobulle pour plus de détails au survol */}
            <Tooltip content={<CustomTooltip type="dailyActivity"/>} className="daily-tooltip" cursor={{fill: 'grey', opacity: 0.3}} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default DailyActivityChart;