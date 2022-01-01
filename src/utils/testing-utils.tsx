import { mount } from 'enzyme'
import { render } from '@testing-library/react'
import { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { DateContext, DateContextInterface } from '../contexts/DateContext'
import { Routes, Route } from 'react-router'

const mockDateContext: DateContextInterface = {
  customDate: new Date(1640354400000),
  realDate: new Date(1640354400000),
  setCustomDate: jest.fn(),
}

export const renderWithRouter = (ui: ReactElement) =>
  render(
    <DateContext.Provider value={mockDateContext}>
      <MemoryRouter>{ui}</MemoryRouter>
    </DateContext.Provider>
  )

export const renderWithPath = (ui: ReactElement, entry: string, path: string) =>
  render(
    <DateContext.Provider value={mockDateContext}>
      <MemoryRouter initialEntries={[entry]}>
        <Routes>
          <Route path={path} element={ui} />
        </Routes>
      </MemoryRouter>
    </DateContext.Provider>
  )

export const mountWithRouter = (ui: ReactElement) =>
  mount(
    <DateContext.Provider value={mockDateContext}>
      <MemoryRouter>{ui}</MemoryRouter>
    </DateContext.Provider>
  )

export const mountWithPath = (ui: ReactElement, entry: string, path: string) =>
  mount(
    <DateContext.Provider value={mockDateContext}>
      <MemoryRouter initialEntries={[entry]}>
        <Routes>
          <Route path={path} element={ui} />
        </Routes>
      </MemoryRouter>
    </DateContext.Provider>
  )
