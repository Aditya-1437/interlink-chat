import { useEffect, useRef, useState } from 'react';
import './Chat.css';
import EmojiPicker from 'emoji-picker-react';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';
import { useUserStore } from '../../lib/userStore';

const Chat = () => {

  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState();
  const [text, setText] = useState("");
  const {currentUser} = useUserStore();
  const {chatId,user} = useChatStore();


  const endRef = useRef(null)
  useEffect(()=>{
    endRef.current?.scrollIntoView({behaviour:"smooth"})
  });

  useEffect(()=>{
    const unSub = onSnapshot(doc(db,"chats", chatId), (res)=>{
      setChat(res.data())
    });

    return () => {
      unSub();
    }
  }, [chatId]);

  console.log(chat)

  const handelEmoji = e =>{
    setText((prev)=>prev+e.emoji);
    setOpen(false);
  }

  const handelSend = async() =>{
    if(text==="") return;
      
    try {
      await updateDoc(doc(db,"chats",chatId),{
        messages:arrayUnion({
          senderId : currentUser.id,
          text,
          createdAt: new Date(),
        })
      });

      const userIDs = [currentUser.id, user.id]
      userIDs.forEach(async (id)=>{

        const userChatRef = doc(db,"userchats",id)
        const userChatsSnapshot = await getDoc(userChatRef)

        if(userChatsSnapshot.exists()){
          const userChatsData = userChatsSnapshot.data()

          const chatIndex = userChatsData.chats.findIndex(c=> c.chatId === chatId)

          userChatsData.chats[chatIndex].lastMessage=text
          userChatsData.chats[chatIndex].isSeen=id === currentUser.id ? true : false
          userChatsData.chats[chatIndex].updatedAt=Date.now()

          await updateDoc(userChatRef,{
            chats:userChatsData.chats,
          })
        }
    });

    } catch (error) {
      console.log(error);
    }
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
        {/* <div className="message">
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
        </div> */}
        { chat?.messages?.map(message=>(
          <div className="message own" key={message.createAt}>
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              <span>1 min ago</span>
            </div>
          </div>
        ))}
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
        <button className="sendButton" onClick={handelSend}>Send</button>
        
      </div>
    </div>
  )
}

export default Chat