import { useEffect, useState } from 'react';
import './Message.css'
import moment from 'moment';
import axios from 'axios';

export default function Message({message, currentUser}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const BL = process.env.REACT_APP_API_URL;
  const own = (currentUser._id === message.sender)? true: false;
  const [partner, setPartner] = useState({});
  const isCalled = false;
  
    
  // useEffect(()=> {
  //   getSenderInfo();
  // }, [])
  
  // const getSenderInfo = async ()=>{
  //   try {
  //     const response = await axios.get(`${BL}/users?userId=` + message.sender).then((res) => {
  //       setPartner(res.data[0]);
  //       isCalled = true;
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  

  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img 
              className='messageImg'
              // src={own ? PF+currentUser.profilePicture: PF+sender.profilePicture} 
              alt="" 
            />
            <p className='messageText'>
                {message.text}
            </p>
        </div>
        <div className="messageBottom">
            {moment(message.createdAt).fromNow()}
        </div>
    </div>
  )
}
