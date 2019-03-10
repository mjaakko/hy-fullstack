import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'

export default () => {
    const [ users, setUsers ] = useState([])
    useEffect(() => {
        userService.getAll().then(users => setUsers(users))
    }, [])

    return (
    <>
        <h2>Users</h2>
        <ul>{ users.map(user => <li key={user.username}><Link to={`/users/${user.id}`}>{ user.name }</Link> - { user.blogs.length } blogs</li>) }</ul>
    </>
    )
}