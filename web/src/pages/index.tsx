import Messages from '@/components/Messages'
import MessagesInput from '@/components/MessagesInput'

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

  const sendMessage = (value: MessageObject) => {
    const newMessage = {
      id: socketIORef.current?.id,
      author: value.author,
      message: value.message,
    }
    socketIORef.current?.emit('message', newMessage)

    setMessages([...messages, newMessage])
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

  const messageListener = (message: MessageObject) => {
    setMessages((prev) => {
      return [...prev, message]
    })
  }

  useEffect(() => {
    socketIORef.current?.on('receivedMessage', messageListener)

    return () => {
      socketIORef.current?.off('receivedMessage', messageListener)
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

  return (
    <>
      <Messages messages={messages} />

      <MessagesInput send={sendMessage} />
    </>
  )
}
