import React, { useState } from 'react'
import blogService from '../services/blogs'
import propTypes from 'prop-types'

const Blog = ({ blog, user, updateBlogs, showNotification }) => {
  const [ expanded, setExpanded ] = useState(false)

  const style = { margin: '10px' }

  
  return (
    <>
      <div className="blog_expanded" style={{...style, display: expanded ? '' : 'none'}}>
        <span className="title" onClick={() => setExpanded(false)}>{blog.title}</span>
        <br />
        <span className="author">{blog.author}</span>
        <br />
        <span className="url">{blog.url}</span>
        <br />
        <span className="likes">{blog.likes} likes</span>
        <button onClick={() => {
          const updatedBlog = {
            user: blog.user.id,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url
          }

          blogService.update(updatedBlog, blog.id)
          updateBlogs()
        }}>like</button>
        <br/>
        {blog.user && <span className="user">{ `Added by ${blog.user.name}` }</span>}
        <br/>
        { user && blog.user && blog.user.username === user.username && <button onClick={async () => {
          await blogService.remove(blog.id)
          showNotification(`removed ${blog.title}`)
          updateBlogs()
        }}>remove</button> }
      </div>
      <div className="blog_unexpanded" style={{...style, display: expanded ? 'none' : ''}} onClick={() => setExpanded(true)}>
        {blog.title}
      </div>
    </>)
}

Blog.propTypes = {
  blog: propTypes.object,
  user: propTypes.object,
  updateBlogs: propTypes.func,
  showNotification: propTypes.func
}

export default Blog