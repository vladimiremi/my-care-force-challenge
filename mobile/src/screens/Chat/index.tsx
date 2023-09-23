import { useEffect, useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import io, { Socket } from 'socket.io-client'
import { styles } from './styles'

interface MessageObject {
  id?: string
  author: string
  message: string
}

const URL_SOCKET = 'https://d6f3-170-84-93-214.ngrok.io'

export default function Chat() {
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
    const newSocket = io(URL_SOCKET)
    newSocket.on('connect_error', (error) => {
      console.error('Erro na conexão WebSocket:', error)
    })
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

  const [values, setValues] = useState<MessageObject>({
    author: '',
    message: '',
  })

  return (
    <View style={styles.container}>
      <Text>Mensagens</Text>
      {messages.map((message, index) => (
        <Text key={index}>{message.message}</Text>
      ))}

      <TextInput
        style={styles.input}
        value={values.message}
        onChangeText={(e) => setValues({ ...values, message: e })}
      />
      <Button
        title="Enviar"
        onPress={() => {
          sendMessage(values)
          setValues({ ...values, message: '' })
        }}
      />
    </View>
  )
}
