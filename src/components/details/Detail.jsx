import { auth } from '../../lib/firebase';
import './Detail.css';

const Detail = () => {
  return (
    <div className='detail'>
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Mongoose</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy-Policy</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photoes</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photo-item">
              <div className="photo-detail">
                <img src="./avatar.png" alt="" />
                <span>pic_2024_05</span>
              </div>
              <img src="download.png" alt="" className='icon' />
            </div>
            <div className="photo-item">
              <div className="photo-detail">
                <img src="./avatar.png" alt="" />
                <span>pic_2024_05</span>
              </div>
              <img src="download.png" alt="" className='icon' />
            </div>
            <div className="photo-item">
              <div className="photo-detail">
                <img src="./avatar.png" alt="" />
                <span>pic_2024_05</span>
              </div>
              <img src="download.png" alt="" className='icon' />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button>Block User</button>
        <button className='logout' onClick={()=>auth.signOut()}>Log Out</button>
      </div>
    </div>
  )
}

export default Detail