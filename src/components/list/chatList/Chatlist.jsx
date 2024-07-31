import { useState } from 'react';
import './Chatlist.css';

const Chatlist = () => {

  const [addMode, setAddMode] = useState(false);

  return (
    <div className='chatlist'>
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="text" placeholder='Search...' />
        </div>
        <img 
        src={addMode ? "./minus.png" : "/plus.png"} alt="" 
        className='add' 
        onClick={()=>setAddMode((prev)=>!prev)} 
        />
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Mongoose</span>
          <p>kill python</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Mongoose</span>
          <p>kill python</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Mongoose</span>
          <p>kill python</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Mongoose</span>
          <p>kill python</p>
        </div>
      </div>
      <div className="item">
        <img src="./avatar.png" alt="" />
        <div className="texts">
          <span>Mongoose</span>
          <p>kill python</p>
        </div>
      </div>
    </div>
  )
}

export default Chatlist