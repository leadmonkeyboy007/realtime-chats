import React, { useState, useEffect, useRef } from 'react';
import './Conversations.css'
import axios from 'axios';

export const Conversations = React.forwardRef((props, ref) => {
  const {conversation, currentUser} = props;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      const friendId = conversation.members.find((m) => m !== currentUser._id);

      const getUserInfo = async () => {
        try {
          const res = await axios(`/users?userId=${friendId}`).then((res) => {
            setUser(res.data[0]);
          });
        } catch (error) {
          console.log(error);
        }
      }
      getUserInfo();
    }
  }, [conversation, currentUser._id]);

  return (
    <div className='conversation'>
      <img ref={ref} src={PF + user?.profilePicture} alt="" className="conversationImg" />
      <span className='conversationName'>{user?.username}</span>
    </div>
  )
})
