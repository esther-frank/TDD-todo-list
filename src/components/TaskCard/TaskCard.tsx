import * as Styled from './TaskCardStyles'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { MdDragIndicator } from 'react-icons/md'

interface TaskCardProps {
  id: number
  title: string
  complete: boolean
  setComplete: (id: number, status: boolean) => void
  deleteTask: (id: number) => void
  theme: 'light' | 'dark'
}

export default function TaskCard({
  id,
  title,
  complete,
  setComplete,
  deleteTask,
  theme
}: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <Styled.TaskCard ref={setNodeRef} style={{ ...style }} $theme={theme}>
      <div>
        <input
          id={`checkbox-${id}`}
          type="checkbox"
          checked={complete}
          onChange={() => setComplete(id, !complete)}
        />
        <label htmlFor={`checkbox-${id}`}>{title}</label>
      </div>
      <div>
        <button style={{ cursor: 'pointer' }} onClick={() => deleteTask(id)}>
          X
        </button>
        <MdDragIndicator
          data-testid={`drag-button`}
          {...attributes}
          {...listeners}
          style={{ cursor: 'grab' }}
        />
      </div>
    </Styled.TaskCard>
  )
}
