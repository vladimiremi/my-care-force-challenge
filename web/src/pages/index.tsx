import Messages from '@/components/Messages'
import MessagesInput from '@/components/MessagesInput'

import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'

interface MessageObject {
  id?: string
  author: string
  message: string
}

export default function Home() {
  const [socket, setSocket] = useState<Socket>()
  const [messages, setMessages] = useState<MessageObject[]>([])

  const sendMessage = (value: MessageObject) => {
    socket?.emit('message', {
      id: socket.id,
      author: value.author,
      message: value.message,
    })
  }
  useEffect(() => {
    const newSocket = io('http://localhost:8001')
    setSocket(newSocket)
  }, [setSocket])

  const messageListener = (message: MessageObject) => {
    setMessages([...messages, message])
  }

  useEffect(() => {
    socket?.on('message', messageListener)
    return () => {
      socket?.off('message', messageListener)
    }
  }, [messageListener])

  return (
    <>
      <Messages messages={messages} />

      <MessagesInput send={sendMessage} />
    </>
  )
}
