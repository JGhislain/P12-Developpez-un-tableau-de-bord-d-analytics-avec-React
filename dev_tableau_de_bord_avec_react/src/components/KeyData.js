import React, { useState, useEffect } from 'react';
import { getUserData } from '../services/apiService';
// Import des icônes
import caloriesIcon from '../assets/icons/calories-icon.png';
import proteinIcon from '../assets/icons/protein-icon.png';
import carbsIcon from '../assets/icons/carbs-icon.png';
import fatIcon from '../assets/icons/fat-icon.png';

/**
 * Composant qui affiche les données clés de l'utilisateur comme les calories, protéines, glucides et lipides.
 * @param {number} userId - Identifiant de l'utilisateur pour lequel charger les données clés.
 */
const KeyData = ({ userId }) => {
  const [keyData, setKeyData] = useState(null);

  // Charge les données clés de l'utilisateur lorsque le composant est monté ou que l'identifiant utilisateur change.
  useEffect(() => {
    const fetchData = async () => {
        const response = await getUserData(userId);
        if (response && response.data && response.data.keyData) {
            setKeyData(response.data.keyData);
        }
    };

    fetchData();
}, [userId]);


  // Affiche un message de chargement si les données ne sont pas encore disponibles.
  if (!keyData) return <div>Chargement des données clés...</div>;

  // Destructurer les données clés pour un accès facile
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = keyData;

  return (
    <div className="key-data-container">
      <div className="key-data-item">
        <img className='img-data-key img-calories' src={caloriesIcon} alt="Calories" />
        <div className='text-contain'>
          <p className='val-data-key'>{calorieCount}kCal</p>
          <p className='text-data-key'>Calories</p>
        </div>
      </div>
      <div className="key-data-item">
        <img className='img-data-key img-proteins' src={proteinIcon} alt="Proteins" />
        <div className='text-contain'>
          <p className='val-data-key'>{proteinCount}g</p>
          <p className='text-data-key'>Proteines</p>
        </div>
      </div>
      <div className="key-data-item">
        <img className='img-data-key img-glucides' src={carbsIcon} alt="Carbs" />
        <div className='text-contain'>
          <p className='val-data-key'>{carbohydrateCount}g</p>
          <p className='text-data-key'>Glucides</p>
        </div>
      </div>
      <div className="key-data-item">
        <img className='img-data-key img-lipides' src={fatIcon} alt="Fat" />
        <div className='text-contain'>
          <p className='val-data-key'>{lipidCount}g</p>
          <p className='text-data-key'>Lipides</p>
        </div>
      </div>
    </div>
  );
};

export default KeyData;
