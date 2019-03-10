const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', (request, response, next) => {
  User
    .find({})
    .populate('blogs')
    .then(users => {
        response.json(users)
    })
    .catch(error => next(error))
})
  
usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body

        if (!body.password || body.password.length < 3) {
            return response.status(400).json({ error: 'password must be atleast 3 characters' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            name: body.name,
            username: body.username,
            passwordHash: passwordHash
        })

        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter
  