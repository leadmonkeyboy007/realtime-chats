import './Messenger.css'
import Conversations from '../../components/conversations/Conversations'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { useContext, useEffect, useState } from 'react'
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'

export default function Messenger() {

  const {user} = useContext( AuthContext );
  const BL = process.env.REACT_APP_API_URL;
  const [conversations, setConverations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const conversationList = await axios.get(`${BL}/conversations/${user._id}`);
        setConverations(conversationList.data);
      } catch (error) {
        console.log(error)
      }
    }
    getConversations();
  }, [user])


  return (
    <div className='messenger'>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder='Search for friends' className='chatMenuInput'/>
            {
              conversations.map((c) => (
                <Conversations key={c._id} conversation={c} currentUser={user} />
              ))
            }
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message />
              <Message own={true}/>
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
              <Message own={true}/>
              <Message />
              <Message />
              <Message />
            </div>
            <div className="chatBoxBottom">
              <textarea className='chatMessageInput' placeholder='Write Something ...'></textarea>
              <button className='chatSubmitButton'>Send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
             <ChatOnline />
          </div>
        </div>
    </div>
  )
}
