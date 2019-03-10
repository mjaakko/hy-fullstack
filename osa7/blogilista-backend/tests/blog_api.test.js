const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
    }
  ]

beforeEach(async () => {
    await Blog.remove({})
  
    let blogObject = new Blog(blogs[0])
    await blogObject.save()
  
    blogObject = new Blog(blogs[1])
    await blogObject.save()
})

const api = supertest(app)

describe('GET', () => {
    test('GET /api/blogs returns correct amount of blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(blogs.length)
      })

    test('returned blogs have field id', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })
})

describe('POST', () => {
    test('new blog can be added', async () => {
        const newBlog = {
            title: "Test blog",
            author: "test",
            url: "example.com"
        }

        await api.post('/api/blogs').send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(blogs.length + 1)
      })

    test('new blog without likes will have value of 0', async () => {
        const newBlog = {
            title: "Test blog",
            author: "test",
            url: "example.com"
        }

        const response = await api.post('/api/blogs').send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
    })

    test('new blog without title and url returnd HTTP 400', async () => {
        const newBlog = {
            author: "test"
        }

        await api.post('/api/blogs').send(newBlog)
            .expect(400)
    })
})

afterAll(() => {
  mongoose.connection.close()
})