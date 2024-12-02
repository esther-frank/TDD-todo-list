import { useEffect, useState } from 'react'
import { Task } from '../../types'
import TodoList from '../../components/TodoList/TodoList'
import * as Styled from './HomeStyles'
import InputForm from '../../components/InputForm/InputForm'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

function Home() {
  const getInitialTasks = () => {
    const currentTasks = window.localStorage.getItem('tasks')
    return currentTasks ? JSON.parse(currentTasks) : []
  }

  const getIntialTheme = () => {
    const currentTheme = window.localStorage.getItem('theme')
    return currentTheme ? JSON.parse(currentTheme) : 'light'
  }

  const getInitialDelete = () => {
    const currentDelete = window.localStorage.getItem('deleteCompleted')
    return currentDelete ? JSON.parse(currentDelete) : false
  }

  const [tasks, setTasks] = useState<Task[]>(getInitialTasks)
  const [theme, setTheme] = useState<'light' | 'dark'>(getIntialTheme)
  const [deleteCompleted, setDeleteCompleted] =
    useState<boolean>(getInitialDelete)

  useEffect(() => {
    window.localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    window.localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])

  useEffect(() => {
    window.localStorage.setItem(
      'deleteCompleted',
      JSON.stringify(deleteCompleted)
    )
  }, [deleteCompleted])

  const toggleTheme = () => {
    setTheme(prevTheme => {
      switch (prevTheme) {
        case 'light':
          return 'dark'
        case 'dark':
          return 'light'
      }
    })
  }

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      complete: false
    }
    setTasks(prevtasks => [...prevtasks, newTask])
    // setTasks(prevTasks => sortList(prevTasks))
  }

  const setComplete = (id: number, status: boolean) => {
    setTasks(prevtasks =>
      prevtasks.map(t => (t.id === id ? { ...t, complete: status } : t))
    )
    if (status && deleteCompleted) {
      deleteTask(id)
    }
    // setTasks(prevTasks => sortList(prevTasks))
  }

  const deleteTask = (id: number) => {
    setTasks(
      tasks.filter(item => {
        return item.id !== id
      })
    )
  }

  const sortList = (tasks: Task[]) => {
    const incomplete: Task[] = []
    const complete: Task[] = []
    for (let i = 0; i < tasks.length; i++) {
      const currentItem = tasks[i]
      if (currentItem.complete) {
        complete.push(currentItem)
      } else {
        incomplete.push(currentItem)
      }
    }
    const sortedList: Task[] = incomplete.concat(complete)
    return sortedList
  }

  const toggleDeleteCompleted = () => {
    if (!deleteCompleted) {
      deleteAllCompleteTasks()
    }
    setDeleteCompleted(prevDeleteCompleted => !prevDeleteCompleted)
  }

  const deleteAllCompleteTasks = () => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].complete) {
        deleteTask(tasks[i].id)
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setTasks(tasks => {
        const oldIndex = tasks.findIndex(task => task.id === active.id)
        const newIndex = tasks.findIndex(task => task.id === over.id)
        return arrayMove(tasks, oldIndex, newIndex)
      })
    }
  }

  const handleSortCompleted = () => {
    setTasks(prevTasks => sortList(prevTasks))
  }

  return (
    <Styled.Home data-testid="styled-home" $theme={theme}>
      <input
        type="checkbox"
        checked={theme === 'light' ? false : true}
        onChange={toggleTheme}
      />
      <InputForm addTask={addTask} />
      <TodoList
        data-testid="todo-list"
        tasks={tasks}
        setComplete={setComplete}
        deleteTask={deleteTask}
        theme={theme}
        handleDragEnd={handleDragEnd}
      />
      <label htmlFor="toggleDeleteCompleted">
        Automatically delete completed tasks:{' '}
      </label>
      <input
        id="toggleDeleteCompleted"
        type="checkbox"
        checked={deleteCompleted}
        onChange={toggleDeleteCompleted}
      />
      <button onClick={handleSortCompleted}>
        Group completed tasks at the bottom
      </button>
    </Styled.Home>
  )
}
export default Home
