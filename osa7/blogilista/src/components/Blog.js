import React from 'react'
import propTypes from 'prop-types'
import { Card } from 'semantic-ui-react' 

const Blog = ({ blog, user, voteBlog, removeBlog, showNotification }) => {
  return (
      <Card>
        <Card.Content header={blog.title} />
        <Card.Content description={`Read from ${blog.url}`}/>
        <Card.Content extra>
          <>
          {blog.likes} likes
          <button onClick={() => {
            voteBlog(blog)
          }}>like</button>
          </>
        </Card.Content>
        { blog.user && <Card.Content extra>{ `Added by ${blog.user.name}` }
        { user && blog.user && blog.user.username === user.username && <button onClick={async () => {
          removeBlog(blog.id)
          showNotification(`removed ${blog.title}`)
        }}>remove</button> }</Card.Content> }
      </Card>)
}

Blog.propTypes = {
  blog: propTypes.object,
  user: propTypes.object,
  voteBlog: propTypes.func,
  removeBlog: propTypes.func,
  showNotification: propTypes.func
}

export default Blog