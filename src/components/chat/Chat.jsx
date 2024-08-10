import { useEffect, useRef, useState } from 'react';
import './Chat.css';
import EmojiPicker from 'emoji-picker-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';

const Chat = () => {

  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState();
  const [text, setText] = useState("");

  const endRef = useRef(null)
  useEffect(()=>{
    endRef.current?.scrollIntoView({behaviour:"smooth"})
  });

  useEffect(()=>{
    const unSub = onSnapshot(doc(db,"chats", "tGNq743O37LPKCqR9O4C"), (res)=>{
      setChat(res.data())
    });

    return () => {
      unSub();
    }
  }, []);

  console.log(chat)

  const handelEmoji = e =>{
    setText((prev)=>prev+e.emoji);
    setOpen(false);
  }

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Mongoose</span>
            <p>Lorem, ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="icon">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      {/* center place */}
      <div className="center">
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, est.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, est.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, est.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="./avatar.png" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, est.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>

      {/* bottom section */}

      <div className="bottom">
        <div className="icon">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder='Let them know...' value={text} onChange={e=>setText(e.target.value)} />
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={()=>setOpen(prev=>!prev)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handelEmoji}/>
          </div>
        </div>
        <button className="sendButton">Send</button>
        
      </div>
    </div>
  )
}

export default Chat