import { useState } from 'react';
import './Login.css';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import upload from '../../lib/upload';

const Login = () => {

    const [avatar, setAvatar] = useState({
        file:null,
        url:""
    })

    const [loading, setLoading] = useState(false);

    const handelAvatar = e => {
        if(e.target.files[0]){
            setAvatar({
                file:e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handelRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const {username,email,password} = Object.fromEntries(formData);
        
        try {
            const res = await createUserWithEmailAndPassword(auth,email,password);
            const imgUrl = await upload(avatar.file);

            await setDoc(doc(db,"users",res.user.uid),{
                username,
                email,
                avatar : imgUrl,
                id : res.user.uid,
                blocked : []

            });

            await setDoc(doc(db,"userchats",res.user.uid),{
                chats : []
            });

            toast.success("Account created successfully. Do LogIn.")
            
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        } finally{
            setLoading(false);
        }

    }

    const handelLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const {email,password} = Object.fromEntries(formData);

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            toast.error(error.message);
        } finally{
            setLoading(false);
        }
    }

  return (
    <div className='login'>
        <div className="item">
            <h2>Welcome back,</h2>
            <form onSubmit={handelLogin}>
                <input type="text" placeholder='Enter Email...' name='email' />
                <input type="password" placeholder='Enter Password...' name='password' />
                <button disabled={loading}>{loading ? "Connecting..." : "Log-In"}</button>
            </form>
        </div>
        <div className="separator"></div>
        <div className="item">
            <h2>New to Inter-Link?</h2>
            <form onSubmit={handelRegister}>
                <label htmlFor="file">
                    <img src={avatar.url || "./avatar.png"} alt="" />
                    Upload profile pic</label>
                <input type="file" id='file' style={{display:"none"}} onChange={handelAvatar} />
                <input type="text" placeholder='Enter User-name...' name='username' />
                <input type="text" placeholder='Enter Email...' name='email' />
                <input type="password" placeholder='Enter Password...' name='password' />
                <button disabled={loading}>{loading ? "Creating..." : "Register"}</button>
            </form>
        </div>
    </div>
  )
}

export default Login