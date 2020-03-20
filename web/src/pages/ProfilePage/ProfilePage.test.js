import { render, cleanup } from '@testing-library/react'

import ProfilePage from './ProfilePage'

describe('ProfilePage', () => {
  afterEach(() => {
    cleanup()
  })
  it('renders successfully', () => {
    expect(() => {
      render(<ProfilePage />)
    }).not.toThrow()
  })
})
