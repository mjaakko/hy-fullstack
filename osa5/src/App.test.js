import React from 'react'
import { 
  render, waitForElement 
} from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('log in')
    ) 

    expect(component.getByText('log in')).toBeDefined()

    const blogs = component.container.querySelectorAll('blog')
    expect(blogs.length).toBe(0)
  })

  it('when user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '95843289',
      name: 'Tester'
    }
    
    localStorage.setItem('user', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blog_expanded')
    ) 

    const blogs = component.container.querySelectorAll('.blog_unexpanded')
    expect(blogs.length).toBe(1)
  })
})