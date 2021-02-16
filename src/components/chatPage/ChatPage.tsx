import { Button } from 'antd'
import React, { useEffect, useState} from 'react'
import { useDispatch} from 'react-redux'
import { sendMessage, startMessagesListerning, stopMessagesListerning } from '../../redux/chat-reducer'
import { getChatMessages } from '../../redux/chat-selectors'
import { useSelector } from 'react-redux'

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

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startMessagesListerning());
    return () => {
      dispatch(stopMessagesListerning());
    }
  }, [])

  return(
    <>
      <ChatMessages  />
      <ChatAddMessageForm />
    </>
  )
}

const ChatMessages: React.FC<{}> = () => {

  const messages = useSelector(getChatMessages)

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

const ChatAddMessageForm:  React.FC<{}> = () => {
  
  const [message, setMessage] = useState('')
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
  const dispatch = useDispatch()

  const sendMessageHandler = () => {
    if (!message) {
      return
    }
    dispatch(sendMessage(message))
    setMessage('')
  }

  return (
    <div>
      <div>
        <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} ></textarea>
      </div>
      <div>
        <Button disabled={false} onClick={sendMessageHandler}>Send</Button>
      </div>
    </div>
  )
}

export default ChatPage;