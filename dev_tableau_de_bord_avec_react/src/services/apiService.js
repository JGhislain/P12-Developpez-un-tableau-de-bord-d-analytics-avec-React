import axios from 'axios';
import { USER_MAIN_DATA, USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE } from '../data.js';

const API_URL = 'http://localhost:3000/user/';

// Indicateur pour utiliser les données mockées au lieu de celles du serveur.
let useMockData = false;

/**
 * Bascule l'utilisation des données entre réelles et mockées et retourne l'état actuel du mode mock pour vérification.
 * @returns {boolean} L'état actuel du mode mock.
 */
export const toggleMockDataUsage = () => {
  useMockData = !useMockData;
  // Retourne l'état actuel pour l'utiliser dans l'interface utilisateur
  return useMockData;
};

/**
 * Obtient l'état actuel de l'utilisation des données mockées.
 * @returns {boolean} État de l'utilisation des données mockées.
 */
export const getMockDataStatus = () => {
  // Retourne l'état actuel des données mockées
  return useMockData; 
};

const handleApiError = (error, fallbackData) => {
  console.error("Erreur lors de la connexion au backend : ", error);
  useMockData = true;
  return { data: fallbackData || {} };
};

/**
 * Récupère les données d'un utilisateur spécifique.
 * @param {number} userId - L'identifiant de l'utilisateur.
 * @returns {Promise<Object>} Les données de l'utilisateur.
 */
export const getUserData = async (userId) => {
  // Si les données sont mockées
  if (useMockData) {
    const userData = USER_MAIN_DATA.find(user => user.id === userId);
    console.log('données mockées', { data: userData || {} })
    return { data: userData || {} };
  }
  try {
    // Tente de récupérer les données utilisateur depuis l'API en utilisant l'identifiant fourni.
    const response = await axios.get(`${API_URL}${userId}`);
    console.log("données du backend:", response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, USER_MAIN_DATA.find(user => user.id === userId));
  }
};

/**
 * Récupère les données d'activité d'un utilisateur et retourne un objet contenant un tableau des sessions.
 * @param {number} userId - L'identifiant de l'utilisateur pour récupérer ses données d'activité.
 * @returns {Promise<Object>} Les données d'activité de l'utilisateur.
 */
export const getUserActivity = async (userId) => {
  // Si les données sont mockées
  if (useMockData) {
    const activity = USER_ACTIVITY.find(activity => activity.userId === userId);
    console.log('données mockées', { data: { sessions: activity ? activity.sessions : [] } })
    return { data: { sessions: activity ? activity.sessions : [] } };
  }
  try {
    // Récupère les données d'activité de l'utilisateur depuis l'API et les affiche dans la console.
    const response = await axios.get(`${API_URL}${userId}/activity`);
    console.log("données du backend:", response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, USER_ACTIVITY.find(activity => activity.userId === userId)?.sessions);
  }
};

/**
 * Récupère les données des sessions moyennes d'un utilisateur.
 * @param {number} userId - L'identifiant de l'utilisateur.
 * @returns {Promise<Object>} Les sessions moyennes de l'utilisateur.
 */
export const getUserAverageSession = async (userId) => {
  // Si les données sont mockées
  if (useMockData) {
    const sessionData = USER_AVERAGE_SESSIONS.find(session => session.userId === userId);
    console.log('données mockées', { data: { sessions: sessionData ? sessionData.sessions : [] } })
    return { data: { sessions: sessionData ? sessionData.sessions : [] } };
  }
  try {
    // Fait une requête à l'API pour obtenir les sessions moyennes de l'utilisateur.
    const response = await axios.get(`${API_URL}${userId}/average-sessions`);
    console.log("données du backend:", response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, USER_AVERAGE_SESSIONS.find(session => session.userId === userId)?.sessions);
  }
};

/**
 * Récupère les données de performance d'un utilisateur.
 * @param {number} userId - L'identifiant de l'utilisateur pour récupérer ses données de performance.
 * @returns {Promise<Object>} Les données de performance de l'utilisateur.
 */
export const getUserPerformance = async (userId) => {
  // Si les données sont mockées
  if (useMockData) {
    const performance = USER_PERFORMANCE.find(perf => perf.userId === userId);
    console.log('données mockées', { data: performance ? performance.data : [], kind: performance ? performance.kind : {} })
    return { data: performance ? performance.data : [], kind: performance ? performance.kind : {} };
  }
  try {
    // Effectue une requête pour obtenir les performances.
    const response = await axios.get(`${API_URL}${userId}/performance`);
    console.log("données du backend:", response.data);
    return response.data.data;
  } catch (error) {
    return handleApiError(error, USER_PERFORMANCE.find(perf => perf.userId === userId)?.data);
  }
};