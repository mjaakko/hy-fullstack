import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

const blog = {
    user: {
      id: '9nfiosdaufnsa',
      name: 'test_user'
    },
    title: 'test_title',
    author: 'test_author',
    likes: 5,
    url: 'test_url'
  }

test('renders by default with only title visible', () => {
  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'test_title'
  )
})

test('clicking title expands component', () => {
  const component = render(
    <Blog blog={blog} />
  )

  fireEvent.click(component.container)

  expect(component.container.querySelector('.title')).toHaveTextContent(
    'test_title'
  )

  expect(component.container.querySelector('.author')).toHaveTextContent(
    'test_author'
  )

  expect(component.container.querySelector('.url')).toHaveTextContent(
    'test_url'
  )

  expect(component.container.querySelector('.likes')).toHaveTextContent(
    '5 likes'
  )

  expect(component.container.querySelector('.user')).toHaveTextContent(
    'Added by test_user'
  )
})