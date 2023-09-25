import Messages from '@/components/Messages'

import { useEffect, useRef, useState } from 'react'
import io, { Socket } from 'socket.io-client'

interface MessageObject {
  id?: string
  author: string
  message: string
}

export default function Home() {
  const socketIORef = useRef<Socket>()
  const [messages, setMessages] = useState<MessageObject[]>([])
  const [value, setValue] = useState({
    message: '',
    author: '',
  })

  const sendMessage = (value: MessageObject) => {
    const newMessage = {
      id: socketIORef.current?.id,
      author: value.author,
      message: value.message,
    }
    socketIORef.current?.emit('message', newMessage)

    setMessages([...messages, newMessage])

    setValue((prev) => {
      return { ...prev, message: '' }
    })
  }

  const messageListener = (message: MessageObject) => {
    setMessages((prev) => {
      return [...prev, message]
    })
  }

  useEffect(() => {
    socketIORef.current = io('http://localhost:8001')
    socketIORef.current.on('connect', () => {
      console.log('Connected')
    })
    socketIORef.current.on('connect_error', (error) => {
      console.log('Erro na conexão WebSocket:', error)
    })

    return () => {
      socketIORef.current?.disconnect()
    }
  }, [])

  useEffect(() => {
    socketIORef.current?.on('previousMessages', (message) => {
      setMessages(message)
    })

    return () => {
      socketIORef.current?.off('previousMessages', (message) => {
        setMessages(message)
      })
    }
  }, [])

  useEffect(() => {
    socketIORef.current?.on('receivedMessage', messageListener)

    return () => {
      socketIORef.current?.off('receivedMessage', messageListener)
    }
  }, [])

  return (
    <div className="flex flex-col justify-center align-middle bg">
      <div>
        <input
          className="bg-secondary"
          placeholder="Digite seu nome"
          value={value.author}
          onChange={(e) => {
            setValue((prev) => {
              return { ...prev, author: e.target.value }
            })
          }}
        />
      </div>

      <h3>Mensagens:</h3>
      <Messages messages={messages} />

      <div>
        <input
          className="bg-secondary"
          placeholder="Digite sua mensagem"
          value={value.message}
          onChange={(e) => {
            setValue((prev) => {
              return { ...prev, message: e.target.value }
            })
          }}
        />
        <button
          className="bg-primary text-white w-16 rounded-sm"
          onClick={() => sendMessage(value)}
        >
          Enviar
        </button>
      </div>
    </div>
  )
}
