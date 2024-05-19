import React from 'react';

/**
 * Composant pour afficher des infobulles personnalisées dans les graphiques.
 * Selon le type de graphique, l'infobulle s'adapte pour montrer les données pertinentes.
 * @param {boolean} active - Indique si l'infobulle doit être affichée.
 * @param {array} payload - Contient les données à afficher dans l'infobulle.
 * @param {string} label - Utilisé pour afficher une étiquette spécifique dans l'infobulle.
 * @param {string} type - Type de graphique pour lequel l'infobulle est configurée.
 * @returns {JSX.Element|null} - Un élément JSX représentant l'infobulle ou null si inactif.
 */
const CustomTooltip = ({ active, payload, label, type }) => {
  // Vérifie si l'infobulle doit être active et que les données sont disponibles
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        {/* Infobulle pour l'activité quotidienne montrant le poids et les calories brûlées */}
        {type === 'dailyActivity' && (
          <>
            <div className="label-daily" style={{ backgroundColor: '#E60000', color:'#FFF', fontSize:'14px', padding: '15px', margin:'25px'}}>
              <p className='label-weight' style={{paddingBottom: '25px'}}>{`${payload[0].value}kg`}</p>
              <p>{`${payload[1].value}Kcal`}</p>
            </div>
          </>
        )}
        {/* Infobulle pour les sessions moyennes montrant la durée des sessions en minutes */}
        {type === 'averageSessions' && (
          <>
            <div className="label-average" style={{ backgroundColor: '#FFF', color:'#000', fontSize:'10px', margin:'0 10px', width: '50px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <p>{`${payload[0].value} min`}</p>
            </div>
          </>
        )}
      </div>
    );
  }
  // Retourne null si l'infobulle n'est pas active ou si les données ne sont pas disponibles
  return null;
};

export default CustomTooltip;
