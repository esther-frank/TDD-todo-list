import userEvent from '@testing-library/user-event'
import InputForm from './InputForm'
import { render, screen } from '@testing-library/react'

const mockAddTask = jest.fn()

describe('input form', () => {
  it('has a text input field', () => {
    render(<InputForm addTask={mockAddTask} />)
    expect(
      screen.getByLabelText('What do you need to get done?')
    ).toBeInTheDocument()
  })

  it('has a submit button', () => {
    render(<InputForm addTask={mockAddTask} />)
    expect(screen.getByRole('button', { name: 'Add Task' })).toBeInTheDocument()
  })

  it('calls the addTask function with the input text as a parameter when the add button is clicked', async () => {
    const user = userEvent.setup()
    render(<InputForm addTask={mockAddTask} />)
    await user.type(
      screen.getByLabelText('What do you need to get done?'),
      'task 3'
    )
    await user.click(screen.getByRole('button', { name: 'Add Task' }))
    expect(mockAddTask).toBeCalledWith('task 3')
  })

  it('clears the input field when the add button is clicked', async () => {
    const user = userEvent.setup()
    render(<InputForm addTask={mockAddTask} />)
    await user.type(
      screen.getByLabelText('What do you need to get done?'),
      'task 3'
    )
    await user.click(screen.getByRole('button', { name: 'Add Task' }))
    expect(mockAddTask).toBeCalledWith('task 3')
    expect(screen.getByLabelText('What do you need to get done?')).toHaveValue(
      ''
    )
  })
})
