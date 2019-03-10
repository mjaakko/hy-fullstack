import blogService from '../services/blogs'

const sort = blogs => [...blogs].sort((a, b) => {
    if (a.likes > b.likes) {
      return -1
    }
    if (b.likes > a.likes) {
      return 1
    }
    return 0
})

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIALIZE_BLOGS':
            return sort(action.data)
        case 'ADD_BLOG':
            return sort(state.concat(action.data))
        case 'UPDATE_BLOG':
            return sort(state.map(blog => blog.id === action.data.id ? action.data : blog))
        case 'REMOVE_BLOG':
            return sort(state.filter(blog => blog.id !== action.data))
        default:
            return state
    }
}

export default blogReducer

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INITIALIZE_BLOGS',
            data: blogs
        })
    }
}

export const addBlog = blog => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch({
            type: 'ADD_BLOG',
            data: newBlog
        })
    }
}

export const voteBlog = blog => {
    return async dispatch => {
        const votedBlog = {
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }
    
        const updatedBlog = await blogService.update(votedBlog, blog.id)

        dispatch({
            type: 'UPDATE_BLOG',
            data: updatedBlog
        })
    }
}

export const removeBlog = id => {
    return async dispatch => {
        await blogService.remove(id)
        
        dispatch({
            type: 'REMOVE_BLOG',
            data: id
        })
    }
}