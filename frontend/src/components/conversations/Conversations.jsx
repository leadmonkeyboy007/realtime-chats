import { useState, useEffect } from 'react';
import './Conversations.css'
import axios from 'axios';

export default function Conversations({conversation, currentUser}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const BL = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState({});

  useEffect(()=>{
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    
    const getUserInfo = async () => {
      try {
        const res = await axios(`${BL}/users?userId=${friendId}`).then((res) => {
          console.log(res.data[0])
          setUser(res.data[0]);
      });
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, [conversation, currentUser]);
  
  console.log(user)

  return (
    <div className='conversation'>
        <img src={PF+user?.profilePicture} alt="" className="conversationImg" />
        <span className='conversationName'>{user?.username}</span>
    </div>
  )
}
