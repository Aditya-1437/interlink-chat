import { useState } from 'react';
import './Login.css';
import { toast } from 'react-toastify';

const Login = () => {

    const [avatar, setAvatar] = useState({
        file:null,
        url:""
    })

    const handelAvatar = e => {
        if(e.target.files[0]){
            setAvatar({
                file:e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handelRegister = e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const {username,email,password} = Object.fromEntries(formData);
        console.log(username)
    }

    const handelLogin = e => {
        e.preventDefault();
    }

  return (
    <div className='login'>
        <div className="item">
            <h2>Welcome back,</h2>
            <form onSubmit={handelLogin}>
                <input type="text" placeholder='Enter Email...' name='email' />
                <input type="password" placeholder='Enter Password...' name='password' />
                <button>Log-In</button>
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
                <button>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Login