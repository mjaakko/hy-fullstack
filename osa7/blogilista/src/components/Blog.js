import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { Card, Form } from 'semantic-ui-react' 
import blogService from '../services/blogs'

const Blog = ({ blog, user, voteBlog, removeBlog, showNotification }) => {
  const [ comments, setComments ] = useState([])
  const [ comment, setComment ] = useState('')

  useEffect(() => blogService.getComments(blog.id).then(comments => setComments(comments)), [])

  return (
      <div>
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
        </Card>
        <h3>Comments</h3>
        <div style={{marginTop: 10}}>
          { comments && <ul>{ comments.map(comment => <li key={comment.id}>{ comment.comment }</li>) }</ul>}
          <Form onSubmit={async () => {
            const newComment = await blogService.postComment(blog.id, { comment })
            setComments(comments.concat(newComment))
          }}>
            <Form.Field>
              <label>Comment</label>
              <input
                type="text"
                value={comment}
                name="Comment"
                onChange={event => {
                  setComment(event.target.value)
                }}
              />
            </Form.Field>
            <button type="submit">Post comment</button>
          </Form>
        </div>
      </div>)
}

Blog.propTypes = {
  blog: propTypes.object,
  user: propTypes.object,
  voteBlog: propTypes.func,
  removeBlog: propTypes.func,
  showNotification: propTypes.func
}

export default Blog