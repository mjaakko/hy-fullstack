import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import { Container, Table, Menu, Message, Form } from 'semantic-ui-react'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { displayNotification } from './reducers/notification'
import { initializeBlogs, addBlog, voteBlog, removeBlog } from './reducers/blog'
import { initializeUser, login, logout } from './reducers/user'
import UserList from './components/UserList';
import User from './components/User';

const Notification = ({ message }) => (
  <Message>{ message }</Message>
)

const BlogForm = ({ addBlog, showNotification }) => {
  const title = useField('title')
  const author = useField('author')
  const url = useField('url')

  const createBlog = (event) => {
    event.preventDefault()
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    addBlog(blog)
    showNotification(`new blog '${blog.title}' was created`)
  }

  return (
    <div>
      <h3>Create new</h3>
      <Form onSubmit={createBlog}>
        <Form.Field>
          <label>Title</label>
          <input
            type="text"
            value={title.value}
            name="Title"
            onChange={title.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <input
            type="text"
            value={author.value}
            name="Author"
            onChange={author.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>URL</label>
          <input
            type="text"
            value={url.value}
            name="url"
            onChange={url.onChange}
          />
        </Form.Field>
        <button type="submit">create</button>
      </Form>
    </div>
  )
}

const Navigation = withRouter(({ history, user, logout }) => (
  <Menu>
    <Menu.Item
      onClick={() => {
        history.push('/')
      }}>
      Blogs
    </Menu.Item>
    <Menu.Item
      onClick={() => {
        history.push('/users')}
      }>
      Users
    </Menu.Item>
    <Menu.Item
      onClick={() => logout()}>
      Logout ({ user.name })
    </Menu.Item>
  </Menu>
))

const App = (props) => {
  const username = useField('username')
  const password = useField('password')

  useEffect(() => props.initializeBlogs(), [])

  useEffect(() => props.initializeUser(), [])

  const showNotification = message => {
    props.displayNotification(message, 2500)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    props.login(username.value, password.value)
    username.reset()
    password.reset()
  }

  if (props.user === null) {
    return (<Container>
      { props.notification && <Notification message={props.notification}/>}

      <h2>Log in</h2>
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>Username</label>
          <input
            type="text"
            value={username.value}
            name="Username"
            onChange={username.onChange}
          />
        </Form.Field>
        <Form.Field>
          password
          <input
            type="password"
            value={password.value}
            name="Password"
            onChange={password.onChange}
          />
        </Form.Field>
        <button type="submit">log in</button>
      </Form>
    </Container>)
  }

  return (
    <Router>
      <Container>
        { props.notification && <Notification message={props.notification}/>}

        <Navigation user={props.user} logout={props.logout}/>
        <Route exact path="/" render={() => (
          <>
            <BlogForm addBlog={props.addBlog} showNotification={showNotification}/>
            <h2>Blogs</h2>
            <Table striped celled>
              <Table.Body>
              { props.blogs.map(blog =>
                      <Table.Row key={blog.id}>
                        <Table.Cell>
                          <Link to={`/blogs/${blog.id}`}>{ blog.title }</Link>
                        </Table.Cell>
                        <Table.Cell>
                          { blog.user && blog.user.name }
                        </Table.Cell>
                      </Table.Row>
                    )}
              </Table.Body>
            </Table>
          </>)} />
        <Route exact path="/blogs/:id" render={({ match }) => {
          const blog = props.blogs.find(blog => blog.id === match.params.id)
          return <Blog voteBlog={props.voteBlog} removeBlog={props.removeBlog} showNotification={showNotification} blog={blog} user={props.user} />
        }} />
        <Route exact path="/users" render={() => <UserList />}/>
        <Route exact path="/users/:id" render={({ match }) => <User id={match.params.id} />}/>
      </Container>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(mapStateToProps, { 
  displayNotification, 
  initializeBlogs, 
  addBlog, 
  voteBlog, 
  removeBlog,
  initializeUser,
  login,
  logout })(App)