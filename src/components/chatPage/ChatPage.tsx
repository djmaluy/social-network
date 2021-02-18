import { Button } from 'antd'
import React, { useEffect, useState, useRef} from 'react'
import { useDispatch} from 'react-redux'
import { sendMessage, startMessagesListerning, stopMessagesListerning } from '../../redux/chat-reducer'
import { getChatMessages, getChatStatus } from '../../redux/chat-selectors'
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
  const status = useSelector(getChatStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(startMessagesListerning());
    return () => {
      dispatch(stopMessagesListerning());
    }
  }, [])

  return(
    <div>
      { status === 'error' && <div>Some error occured. Please refresh the page</div>}
        <>
          <ChatMessages  />
          <ChatAddMessageForm />
        </> 
    </div>
  )
}

const ChatMessages: React.FC<{}> = () => {
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const messages = useSelector(getChatMessages)
  const [isAutoscroll, setIsAutoscroll] = useState(true)

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent> ) => {
    const element = e.currentTarget;
    if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
      !isAutoscroll && setIsAutoscroll(true)      
    } else {
      isAutoscroll && setIsAutoscroll(false)
    }
  }

  useEffect(() => {
    if (isAutoscroll) {
      messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})  
    }
   }, [messages]);

  return (
      <>
        <div style={{ height: '400px', overflowY: "auto"}} onScroll={scrollHandler} >
          {messages.map( (m, index) => <Message key={index} message={m} />)}
          <div ref={messagesAnchorRef}></div>
        </div>  
        
      </>
    )
}

const Message: React.FC<{message: ChatMessageType}> = ({message}) => {
  console.log('>>>>>>>Message');
  
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

  const status = useSelector(getChatStatus)
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
        <Button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</Button>
      </div>
    </div>
  )
}

export default ChatPage;