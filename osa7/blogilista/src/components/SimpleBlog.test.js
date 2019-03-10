import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent  } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

const blog = {
    title: 'test_title',
    author: 'test_author',
    likes: 5
  }

test('renders correct title and author', () => {
  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container.querySelector('.title')).toHaveTextContent(
    'test_title test_author'
  )
})

test('renders correct amount of likes', () => {
  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container.querySelector('.likes')).toHaveTextContent(
    'blog has 5 likes'
  )
})

test('callback function is called 2 times when button is clicked 2 times', () => {
  const callback = jest.fn()

  const component = render(
    <SimpleBlog blog={blog} onClick={callback} />
  )

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(callback.mock.calls.length).toBe(2)
})