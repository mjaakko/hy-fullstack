import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'

export default id => {
    const [ user, setUser ] = useState(null)
    useEffect(() => {
        userService.getAll().then(users => setUser(users.find(user => user.id === id.id)))
    }, [])

    if (!user) {
        return null
    }

    return (
    <>
        <h2>{ user.name }</h2>
        <ul>{ user.blogs.map(blog => <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{ blog.title }</Link></li>) }</ul>
    </>
    )
}