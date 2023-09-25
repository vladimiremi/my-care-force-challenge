import { useEffect, useRef, useState } from 'react'
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

const URL_SOCKET = 'https://599e-170-84-93-214.ngrok.io'

export default function Chat() {
  const socketIORef = useRef<Socket>()
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
    const newMessage = {
      id: socketIORef.current?.id,
      author: value.author || 'Anônimo',
      message: value.message,
    }
    socketIORef.current?.emit('message', newMessage)

    setMessages([...messages, newMessage])
  }

  useEffect(() => {
    socketIORef.current = io(URL_SOCKET)
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
        scrollsToTop
        style={{
          flex: 1,
        }}
      >
        <View style={{ bottom: 0 }}>
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
