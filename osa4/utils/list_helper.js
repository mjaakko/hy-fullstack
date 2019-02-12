const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes ? blog.likes : 0).reduce((acc, current) => acc + current, 0);
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, current) => max && max.likes > current.likes ? max : current, null)
}

const mostBlogs = (blogs) => {
    const blogsByAuthor = _.countBy(blogs, blog => blog.author)

    const authorWithMost = Object.keys(blogsByAuthor).reduce((a, b) => blogsByAuthor[a] > blogsByAuthor[b] ? a : b);
    return {
        author: authorWithMost,
        blogs: blogsByAuthor[authorWithMost]
    }
}

const mostLikes = (blogs) => {
    return _(blogs).groupBy('author').map((objs, key) => ({
        author: key,
        likes: _.sumBy(objs, 'likes')
    }))
    .maxBy('likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
} 