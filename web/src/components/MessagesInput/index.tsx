import { useState } from 'react'

export default function Messages({
  send,
}: {
  send: (val: { message: string; author: string }) => void
}) {
  const [value, setValue] = useState({
    message: '',
    author: '',
  })

  return (
    <>
      <input
        placeholder="Digite seu nome"
        value={value.author}
        onChange={(e) => {
          setValue((prev) => {
            return { ...prev, author: e.target.value }
          })
        }}
      />
      <input
        placeholder="Digite sua mensagem"
        value={value.message}
        onChange={(e) => {
          setValue((prev) => {
            return { ...prev, message: e.target.value }
          })
        }}
      />
      <button
        onClick={() => {
          send(value)
          setValue((prev) => {
            return { ...prev, message: '' }
          })
        }}
      >
        Enviar
      </button>
    </>
  )
}
