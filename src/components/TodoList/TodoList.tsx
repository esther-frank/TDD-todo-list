import { Task } from '../../types'
import TaskCard from '../TaskCard/TaskCard'
import * as Styled from './TodoListStyles'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'

interface TodoListTypes {
  tasks: Task[]
  setComplete: (id: number, status: boolean) => void
  deleteTask: (id: number) => void
  theme: 'light' | 'dark'
  handleDragEnd: (event: DragEndEvent) => void
}

export default function TodoList({
  tasks,
  setComplete,
  deleteTask,
  theme,
  handleDragEnd
}: TodoListTypes) {
  return (
    <>
      <h1>To Do</h1>
      <Styled.List $theme={theme}>
        <DndContext
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={tasks}>
            {tasks.map(item => (
              <TaskCard
                key={item.id}
                {...item}
                setComplete={setComplete}
                deleteTask={deleteTask}
                theme={theme}
              />
            ))}
          </SortableContext>
        </DndContext>
      </Styled.List>
    </>
  )
}
