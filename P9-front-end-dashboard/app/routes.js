// Ce fichier route.js configure les routes du serveur pour répondre aux demandes d'API concernant les données utilisateur.
// Il permet d'interagir avec la base de données et de renvoyer les données utilisateur nécessaires pour l'application front-end via apiService.js.
const express = require('express')
const idx = require('idx')

const router = express.Router()

const {
    getUserById,
    getUserActivityById,
    getUserAverageSession,
    getUserPerformance
} = require('./models')

const {
    handleNoUserData
} = require('./middleware')


router.get('/user/:id', (req, res) => {
    const userId = idx(req, _ => _.params.id)
    const userData = getUserById(Number(userId))

    return handleNoUserData(res, userData)
})


router.get('/user/:id/activity', (req, res) => {
    const userId = idx(req, _ => _.params.id)
    const userData = getUserActivityById(Number(userId))

    return handleNoUserData(res, userData)
})


router.get('/user/:id/average-sessions', (req, res) => {
    const userId = idx(req, _ => _.params.id)
    const userData = getUserAverageSession(Number(userId))

    return handleNoUserData(res, userData)
})


router.get('/user/:id/performance', (req, res) => {
    const userId = idx(req, _ => _.params.id)
    const userData = getUserPerformance(Number(userId))

    return handleNoUserData(res, userData)
})


module.exports = router
