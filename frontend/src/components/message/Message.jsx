import './Message.css'

export default function Message({own}) {
  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img 
              className='messageImg'
              src="https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg" 
              alt="" 
            />
            <p className='messageText'>
                The Northrop Grumman B-21 Raider is an American strategic bomber under development for the United States Air Force by Northrop Grumman.
            </p>
        </div>
        <div className="messageBottom">
            1 hour ago
        </div>
    </div>
  )
}
