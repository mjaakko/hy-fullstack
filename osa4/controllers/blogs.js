const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .populate('user')
    .then(blogs => {
        response.json(blogs)
    })
    .catch(error => next(error))
})
  
blogsRouter.post('/', async (request, response, next) => {
    try {
        const token = request.token
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            ...request.body,
            user: user.id
        })

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog.toJSON())
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const token = request.token
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const blog = await Blog.findById(request.params.id)
        if (!blog.user || blog.user.toString() !== decodedToken.id.toString()) {
            return response.status(403).json({ error: 'cannot delete blogs made by other users'})
        }

        await blog.delete()

        response.status(204).end()
    } catch (error) {
        next(error)
    }
})


blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updatedBlog.toJSON())
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter
  