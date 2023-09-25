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
        <div key={index} className="flex">
          <div className="mr-2">{message.author}:</div>
          <div>{message.message}</div>
        </div>
      ))}
    </>
  )
}
