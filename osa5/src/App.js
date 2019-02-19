import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import  { useField } from './hooks'

const Notification = ({ message }) => (
  <div style={{ padding: '5px', margin: '10px', border: '5px', borderColor: 'black', borderStyle: 'solid' }}>{ message }</div>
)

const BlogForm = ({ updateBlogs, showNotification }) => {
  const title = useField('title')
  const author = useField('author')
  const url = useField('url')

  const createBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    const newBlog = await blogService.create(blog)
    showNotification(`new blog '${newBlog.title}' was created`)
    updateBlogs()
  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={createBlog}>
        <div>
          title
          <input
            type="text"
            value={title.value}
            name="Title"
            onChange={title.onChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author.value}
            name="Author"
            onChange={author.onChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url.value}
            name="url"
            onChange={url.onChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const username = useField('username')
  const password = useField('password')
  const [ notification, setNotification ] = useState('')

  const updateBlogs = () => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => {
        if (a.likes > b.likes) {
          return -1
        }
        if (b.likes > a.likes) {
          return 1
        }
        return 0
      })
      setBlogs( blogs )
    })
  }

  useEffect(updateBlogs, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = message => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 2500)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value,
      })

      window.localStorage.setItem('user', JSON.stringify(user))

      setUser(user)
      showNotification(`logged in as ${user.name}`)
      blogService.setToken(user.token)
      username.reset()
      password.reset()
    } catch (exception) {
      showNotification('invalid username or password')
    }
  }

  if (user === null) {
    return (<div>
      { notification && <Notification message={notification}/>}

      <h2>Log in</h2>

      <Togglable buttonLabel="login">
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username.value}
              name="Username"
              onChange={username.onChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password.value}
              name="Password"
              onChange={password.onChange}
            />
          </div>
          <button type="submit">log in</button>
        </form>
      </Togglable>
    </div>)
  }

  return (
    <div>
      { notification && <Notification message={notification}/>}

      <h2>blogs</h2>
      <p>{ user.name } logged in</p>
      <button onClick={() => {
        window.localStorage.removeItem('user')
        setUser(null)
        blogService.setToken(null)
      }}>log out</button>
      <BlogForm updateBlogs={updateBlogs} showNotification={showNotification}/>
      {blogs.map(blog =>
        <Blog key={blog.id} updateBlogs={updateBlogs} showNotification={showNotification} blog={blog} user={user} />
      )}
    </div>
  )
}

export default App