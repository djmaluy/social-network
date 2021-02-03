import { Button } from 'antd'
import React, { useEffect, useState} from 'react'

const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
  message: string
  photo: string
  userName: string
  userId: number
}

const ChatPage: React.FC = () => {
  return (
    <>
      < Chat />
    </>
  )
}

const Chat: React.FC = () => {
  return(
    <>
      <ChatMessages />
      <ChatAddMessageForm />
    </>
  )
}

const ChatMessages: React.FC = () => {

const [messages, setMessages] = useState<ChatMessageType[]>([])

  useEffect( () => {
    wsChannel.addEventListener('message', (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data)
      setMessages((prevMessages) => ([...prevMessages, ...newMessages]));
    })
  }, []) 
  return (
    <div style={{ height: '400px', overflowY: "auto"}}>
      {messages.map( (m, index) => <Message key={index} message={m} />)}
    </div>  
  )
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {

    return(
    <div>
      <img src={message.photo} alt = "" style={{width:"30px"}} /> <b>{message.userName}</b>
      <br />
      <p>{message.message}</p>
      <hr />
    </div>
  )   
}

const ChatAddMessageForm: React.FC = () => {

const [message, setMessage] = useState('')

const sendMessage = () => {
    if (!message) {
    return
  }
  wsChannel.send(message)
  setMessage('')
}

  return (
    <div>
      <div>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} ></textarea>
      </div>
      <div>
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  )
}

export default ChatPage;