import { useDroppable } from '@dnd-kit/core'
import { ReactElement } from 'react'

export default function Droppable(children: ReactElement) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable'
  })
  const style = {
    color: isOver ? 'green' : undefined
  }

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  )
}
