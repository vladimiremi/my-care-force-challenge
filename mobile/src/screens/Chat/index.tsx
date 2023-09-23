import { useEffect, useState } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import io, { Socket } from 'socket.io-client'
import { styles } from './styles'

interface MessageObject {
  id?: string
  author: string
  message: string
}

const URL_SOCKET = 'https://f547-170-84-93-214.ngrok.io'

export default function Chat() {
  const [socket, setSocket] = useState<Socket>()
  const [messages, setMessages] = useState<MessageObject[]>([])

  const validMessage = (message: string) => {
    if (message.length > 0) {
      return false
    }

    return true
  }

  const sendMessage = (value: MessageObject) => {
    if (validMessage(value.message)) {
      return console.warn('Digite uma mensagem válida')
    }
    socket?.emit('message', {
      id: socket.id,
      author: value.author || 'Anônimo',
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
  }, [messageListener, socket])

  const [values, setValues] = useState<MessageObject>({
    author: '',
    message: '',
  })

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={values.author}
        placeholder="Digite seu nome"
        onChangeText={(e) => setValues({ ...values, author: e })}
      />

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'red',
        }}
      >
        <View
          style={{
            backgroundColor: 'blue',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            height: '100%',
            alignSelf: 'flex-end',
          }}
        >
          {messages.map((message, index) => (
            <Text key={index}>
              {message.author}: {message.message}
            </Text>
          ))}
        </View>
      </ScrollView>

      <View style={styles.containerSendMessage}>
        <TextInput
          style={styles.input}
          value={values.message}
          placeholder="Digite sua mensagem"
          onChangeText={(e) => setValues({ ...values, message: e })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            sendMessage(values)
            setValues({ ...values, message: '' })
          }}
        >
          <Text style={styles.text}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
