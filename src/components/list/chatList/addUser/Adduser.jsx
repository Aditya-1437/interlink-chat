import './Adduser.css';
import {db} from '../../../../lib/firebase';
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { useState } from 'react';
import {useUserStore} from '../../../../lib/userStore';

const Adduser = () => {

  const [user,setUser] = useState(null);
  const {currentUser} = useUserStore()

  const handelSearch = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const username = formdata.get("username");

    try {
      const userRef = collection(db,"users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      if(!querySnapshot.empty){
        setUser(querySnapshot.docs[0].data());
      }
    } catch (error) {
      console.log(error.message);
    }

  }

  const handelAdd = async() =>{
    const chatRef = collection(db,"chats");
    const userChatsRef = collection(db,"userchats");
    try {

      const newChatRef = doc(chatRef)

      await setDoc(newChatRef,{
        cretedAt : serverTimestamp(),
        messages : []
      })
      // console.log(newChatRef.id)
      await updateDoc(doc(userChatsRef, user.id),{
        chats : arrayUnion({
          chatId : newChatRef.id,
          lastMessage : "",
          receiverId : currentUser.id,
          updatedAt : Date.now()
        }),
      });
      await updateDoc(doc(userChatsRef, currentUser.id),{
        chats : arrayUnion({
          chatId : newChatRef.id,
          lastMessage : "",
          receiverId : user.id,
          updatedAt : Date.now()
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='adduser'>
        <form onSubmit={handelSearch}>
            <input type="text" placeholder='Username...' name='username' />
            <button>Search</button>
        </form>
        {user && <div className="user">
            <div className="detail">
                <img src={user.avatar || "./avatar.png"} alt="" />
                <span>{user.username}</span>
            </div>
            <button onClick={handelAdd}>Add User</button>
        </div>}
    </div>
  )
}

export default Adduser