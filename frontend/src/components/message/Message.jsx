import './Message.css'
import moment from 'moment';

export default function Message({message, currentUser, partnerImg}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const own = (currentUser._id === message.sender)? true: false;
      
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img 
              className='messageImg'
              src={own ? PF+currentUser.profilePicture: PF+partnerImg} 
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
