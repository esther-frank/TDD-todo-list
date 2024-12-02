import Home from './Home'
import { screen, render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Home', () => {
  beforeEach(async () => {
    window.localStorage.clear()
    render(<Home />)
    const input = screen.getByLabelText('What do you need to get done?')
    const btn = screen.getByRole('button', { name: 'Add Task' })
    await userEvent.type(input, 'task 1')
    await userEvent.click(btn)
    await userEvent.type(input, 'task 2')
    await userEvent.click(btn)
  })

  it('has a checkbox that toggles between themes when clicked', async () => {
    const user = userEvent.setup()
    expect(screen.getByTestId('styled-home')).toHaveStyle({
      backgroundColor: 'white'
    })
    await user.click(screen.getAllByRole('checkbox')[0])
    expect(screen.getByTestId('styled-home')).toHaveStyle({
      backgroundColor: 'darkgreen'
    })
  })

  it('adds a new task to the list when addTask is called', async () => {
    const user = userEvent.setup()
    await user.type(
      screen.getByLabelText('What do you need to get done?'),
      'task 3'
    )
    await user.click(screen.getByRole('button', { name: 'Add Task' }))
    expect(screen.getByText('task 3')).toBeInTheDocument()
  })

  it('deletes the relevant task when the delete button is clicked', async () => {
    const user = userEvent.setup()
    expect(screen.getByText('task 1')).toBeInTheDocument()
    await user.click(screen.getAllByRole('button', { name: 'X' })[0])
    expect(screen.queryByText('task 1')).not.toBeInTheDocument()
  })

  describe('deleteCompleted flag', () => {
    it('deletes the relevant task when it is marked as complete and deleteCompleted flag is set to true', async () => {
      const user = userEvent.setup()
      await user.click(
        screen.getByRole('checkbox', {
          name: 'Automatically delete completed tasks:'
        })
      )
      expect(screen.getByText('task 1')).toBeInTheDocument()
      await user.click(screen.getByRole('checkbox', { name: 'task 1' }))
      expect(screen.queryByText('task 1')).not.toBeInTheDocument()
    })

    it("doesn't delete the task when it is marked as complete and deleteCompleted flag is set to false", async () => {
      const user = userEvent.setup()
      expect(screen.getByText('task 1')).toBeInTheDocument()
      await user.click(screen.getByRole('checkbox', { name: 'task 1' }))
      expect(screen.getByText('task 1')).toBeInTheDocument()
    })

    it('deletes all completed tasks when deleteCompleted flag is set to true', async () => {
      const user = userEvent.setup()
      await user.click(screen.getByRole('checkbox', { name: 'task 1' }))
      expect(screen.getByText('task 1')).toBeInTheDocument()
      await user.click(
        screen.getByRole('checkbox', {
          name: 'Automatically delete completed tasks:'
        })
      )
      expect(screen.queryByText('task 1')).not.toBeInTheDocument()
    })
  })

  describe('manual sorting', () => {
    it('reorders the tasks when dragged and dropped', async () => {
      const user = userEvent.setup()

      const input = screen.getByLabelText('What do you need to get done?')
      const btn = screen.getByRole('button', { name: 'Add Task' })
      await user.type(input, 'task 3')
      await user.click(btn)

      const [task1, task2, task3] = screen.getAllByTestId('drag-button')
      expect(task1).toBeInTheDocument()
      expect(task2).toBeInTheDocument()
      expect(task3).toBeInTheDocument()

      fireEvent.dragStart(task1)
      fireEvent.dragEnter(task3)
      fireEvent.dragOver(task3)
      fireEvent.drop(task3)
      fireEvent.dragEnd(task1)

      expect(screen.getAllByTestId('drag-button')[0]).toStrictEqual(task2)
      expect(screen.getAllByTestId('drag-button')[1]).toStrictEqual(task3)
      expect(screen.getAllByTestId('drag-button')[2]).toStrictEqual(task1)
    })
  })
})
