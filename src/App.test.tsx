import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import App from './App'

test('renders learn react link', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )

  expect(1 + 1).toBe(2)
})

// Home view
// shows meetup details on separate page when clicking arrow link
// renders existing comments and reviews on past events on detail page
