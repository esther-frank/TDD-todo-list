import userEvent from '@testing-library/user-event'
import TodoList from './TodoList'
import { render, screen } from '@testing-library/react'
import { Task } from '../../types'

interface DefaultProps {
  tasks: Task[]
  setComplete: () => void
  deleteTask: () => void
  theme: 'light' | 'dark'
  handleDragEnd: () => void
}

describe('TodoList component', () => {
  const defaultProps: DefaultProps = {
    tasks: [
      { id: 1, title: 'task 1', complete: false },
      { id: 2, title: 'task 2', complete: false }
    ],
    setComplete: () => {
      jest.fn()
    },
    deleteTask: () => {
      jest.fn()
    },
    theme: 'light',
    handleDragEnd: () => {
      jest.fn()
    }
  }

  it('renders correctly', () => {
    render(<TodoList {...defaultProps} />)
    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getAllByText(/task/)).toHaveLength(2)
  })

  it('has TaskCard children that can call the setComplete function', async () => {
    const mockSetComplete = jest.fn()
    render(<TodoList {...defaultProps} setComplete={mockSetComplete} />)
    const user = userEvent.setup()
    await user.click(screen.getAllByRole('checkbox')[0])
    expect(mockSetComplete).toHaveBeenCalledWith(1, true)
  })

  it('has TaskCard children that can call the deleteTask function', async () => {
    const mockDeleteTask = jest.fn()
    render(<TodoList {...defaultProps} deleteTask={mockDeleteTask} />)
    const user = userEvent.setup()
    await user.click(screen.getAllByRole('button')[0])
    expect(mockDeleteTask).toHaveBeenCalledWith(1)
  })
})
