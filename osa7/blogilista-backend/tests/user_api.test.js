const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('POST', () => {
    test('new user without password returnd HTTP 400', async () => {
        const newUser = {
            username: "test",
            name: "test",
        }

        const response = await api.post('/api/users').send(newUser)
            .expect(400)

        expect(response.body.error).toEqual('password must be atleast 3 characters')
    })

    test('new user with too short name returnd HTTP 400', async () => {
        const newUser = {
            username: "t",
            name: "test",
            password: "p"
        }

        await api.post('/api/users').send(newUser)
            .expect(400)
    })
})

afterAll(() => {
  mongoose.connection.close()
})