import { useEffect, useState } from 'react';
import './ChatOnline.css'
import axios from 'axios';

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const BL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await axios.get(`${BL}/users/friends/` + currentId);
                setFriends(res.data);
            } catch (err) {
                console.log(err)
            }
        };

        getFriends();
    }, [currentId]);

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.find(u => u.userId === f._id)));
    }, [friends, onlineUsers]);

    const handleClick = async (user) => {
        try {
            const res = await axios.get(`${BL}/conversations/find/${currentId}/${user._id}`);
            setCurrentChat(res.data);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='chatOnline'>
            {
                onlineFriends.map((f, index) => (
                    <div className="chatOnlineFriend" key={index} onClick={() => handleClick(f) }>
                        <div className="chatOnlineImgContainer">
                            <img
                                className='chatOnlineImg'
                                src={ PF+f.profilePicture }
                                alt=""
                            />
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineName">{f.username}</span>
                    </div>
                ))
            }
        </div>
    )
}
