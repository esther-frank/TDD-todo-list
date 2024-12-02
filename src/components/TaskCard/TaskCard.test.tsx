import TaskCard from './TaskCard'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

interface DefaultProps {
  id: number
  title: string
  complete: boolean
  setComplete: () => void
  deleteTask: () => void
  theme: 'light' | 'dark'
}

const mockSetComplete = jest.fn()
const mockDeleteTask = jest.fn()

describe('TaskCard component', () => {
  const defaultProps: DefaultProps = {
    id: 1,
    title: 'A task',
    complete: false,
    setComplete: mockSetComplete,
    deleteTask: mockDeleteTask,
    theme: 'light'
  }

  it('renders a title', () => {
    render(<TaskCard {...defaultProps}></TaskCard>)
    expect(screen.getByText('A task')).toBeInTheDocument()
  })

  it('has an empty checkbox when incomplete', () => {
    render(<TaskCard {...defaultProps}></TaskCard>)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('calls setComplete function with correct parameters when checkbox is clicked', async () => {
    render(<TaskCard {...defaultProps} />)
    const user = userEvent.setup()
    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    expect(mockSetComplete).toHaveBeenCalledWith(1, true)
  })

  it('calls the delete function with the correct parameters when the delete button is clicked', async () => {
    render(<TaskCard {...defaultProps} />)
    const user = userEvent.setup()
    const deleteBtn = screen.getByRole('button', { name: 'X' })
    await user.click(deleteBtn)
    expect(mockDeleteTask).toHaveBeenCalledWith(1)
  })
})
