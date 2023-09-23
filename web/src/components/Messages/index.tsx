interface MessagesProps {
  messages: {
    author: string
    message: string
  }[]
}

export default function Messages({ messages }: MessagesProps) {
  return (
    <>
      {messages.map((message, index) => (
        <div key={index}>
          <div>{message.author}</div>
          <div>{message.message}</div>
        </div>
      ))}
    </>
  )
}
