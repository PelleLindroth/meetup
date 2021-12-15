import { render } from '@testing-library/react'
import { ReactElement } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router'

export const renderWithRouter = (ui: ReactElement, options?: any) =>
  render(ui, { wrapper: MemoryRouter, ...options })

export const renderWithPath = (ui: ReactElement, entry: string, path: string) =>
  render(
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>
  )
