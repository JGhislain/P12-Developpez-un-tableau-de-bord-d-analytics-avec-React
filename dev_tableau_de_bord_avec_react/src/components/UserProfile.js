import React, { useState, useEffect } from 'react';
import { getUserData } from '../services/apiService';

// Composant UserProfile qui affiche les informations de profil d'un utilisateur.
const UserProfile = ({ userId }) => {
  // État local pour stocker les données de l'utilisateur.
  const [userData, setUserData] = useState(null);

  // Récupère les données de l'utilisateur à partir de l'API lors du montage du composant ou du changement d'ID.
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserData(userId);
      // Mise à jour de l'état avec les données reçues.
      setUserData(data);
    };

    fetchData();
    // Dépendance sur userId pour déclencher la mise à jour.
  }, [userId]);

  // Affichage pendant le chargement des données.
  if (!userData) return <div>Le fichier n'est pas chargé</div>;

  // Gestion des erreurs ou des données manquantes.
  if (!userData.data || !userData.data.userInfos) return <div>Données utilisateur non disponibles</div>;

  // Rendu des informations utilisateur.
  return (
    <div>
      <div className='user-details'>
        {/* Accès à la propriété 'firstName' */}
          <p className='hello-text'>Bonjour <span className='user-name'>{userData.data.userInfos.firstName}</span></p>
          <p className='congratulation-text'>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
    </div>
  );
};

export default UserProfile;
