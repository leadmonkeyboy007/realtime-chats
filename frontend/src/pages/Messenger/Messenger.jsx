import './Messenger.css'
import { Conversations } from '../../components/conversations/Conversations'
import Message from '../../components/message/Message'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import { useContext, useEffect, useState, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Topbar from '../../components/topbar/Topbar'
import axios from 'axios'
import { io } from "socket.io-client";

export default function Messenger() {

  const { user } = useContext(AuthContext);
  const BL = process.env.REACT_APP_API_URL;
  const [conversations, setConverations] = useState([]);
  const [messages, setMessages] = useState([]);
  // get messages by Web socket
  const [arrivalmessage, setarrivalmessage] = useState(null);
  // get Online Users
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const messageInput = useRef();
  // this ref is for ref forward sample
  const imgRef = useRef([]); //I didn't use this. just reference
  const [currentChat, setCurrentChat] = useState(null);
  const [partnerImg, setPartnerImg] = useState(null);
  const scrollRef = useRef();
  // web socket
  

  useEffect(() => {
    socket.current = io('http://localhost:8000', {           
      "transports" : ["websocket"]
    });
    socket.current.on("getMessage", data => {
      console.log("data", data)
      setarrivalmessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, []);

  useEffect(() => {
    arrivalmessage && currentChat?.members.includes(arrivalmessage.sender) && setMessages((prev) => [...prev, arrivalmessage])
  }, [arrivalmessage, currentChat]);
  // socket.io
  useEffect(() => {
    // socket.current.on('connect', () => {
      console.log('connected!');
      socket.current.emit('AddUser', user._id);
      socket.current.on('getUsers', (users) => {
        setOnlineUsers(users);
      // })
    });
  }, [user]);
  
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

  const getImage = (userId) => {
    getPartnerInfo(userId)
  }
  const getPartnerInfo = async (userId) => {
    try {
      const res = await axios.get(`${BL}/users?userId=` + userId);
      setPartnerImg(res.data[0].profilePicture);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`${BL}/messages/` + currentChat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMessages()
  }, [currentChat]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const newMessage = {
      sender: user._id,
      text: messageInput.current.value,
      conversationId: currentChat._id
    }
    
    const receiverId = currentChat.members.find((m) => m !== user._id);

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: messageInput.current.value
    })

    try {
      const res = await axios.post(`${BL}/messages/`, newMessage);
      setMessages([...messages, res.data])
      messageInput.current.value = "";
    } catch (err) {
      console.log(err)
    }
  }
  // scroll bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <>
      <Topbar />
      <div className='messenger'>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input type="text" placeholder='Search for friends' className='chatMenuInput' />
            {
              conversations.map((c, index) => (
                <div key={index} onClick={(e) => { e.preventDefault(); setCurrentChat(c); setMessages([]); getImage(c.members.find((m) => m !== user._id)); }}>
                  <Conversations key={c._id} conversation={c} currentUser={user} ref={imgRef} />
                </div>
              ))
            }
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              currentChat ?
                <>
                  <div className="chatBoxTop">
                    {
                      messages.map((m) => (
                        <div ref={scrollRef}>
                          <Message message={m} currentUser={user} partnerImg={partnerImg} />
                        </div>
                      ))
                    }
                  </div>
                  <div className="chatBoxBottom">
                    <textarea className='chatMessageInput' placeholder='Write Something ...' ref={messageInput}></textarea>
                    <button className='chatSubmitButton' onClick={sendMessage}>Send</button>
                  </div>
                </> :
                <span className='noConversationText'>Open a conversation to start a chat</span>
            }
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
          </div>
        </div>
      </div>
    </>
  )
}
