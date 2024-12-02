import { useState } from 'react'

interface InputFormProps {
  addTask: (task: string) => void
}

export default function InputForm({ addTask }: InputFormProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    addTask(inputValue)
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="text-input">
        What do you need to get done?
        <input
          type="text"
          id="text-input"
          value={inputValue}
          onChange={handleInput}
        />
      </label>
      <button type="submit">Add Task</button>
    </form>
  )
}
