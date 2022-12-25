import avt2 from "../../assets/images/avt2.jpg";
import avt1 from "../../assets/images/avt1.jpg";
import avt3 from "../../assets/images/avt3.jpg";
import avt4 from "../../assets/images/avt4.jpg";

export const ModalFriendRequestComponent = () => {
  return (
    <div className="dropdown-content-tag">
      <h2 className="text-dark">Bạn bè</h2>
      <p className="text-dark">Lời mời kết bạn</p>
      <div className="friend-request-container">
        <div>
          <img src={avt2} className="friend-request-avatar" alt="" />
        </div>

        <div className="friend-request-info">
          <h3>Duy Mạnh</h3>
          <p>19 ban chung</p>
          <div className="friend-request-btn">
            <button className="accept-btn">Xac nhan</button>
            <button> Xoa</button>
          </div>
        </div>
      </div>
      <div className="friend-request-container">
        <div>
          <img src={avt1} className="friend-request-avatar" alt="" />
        </div>

        <div className="friend-request-info">
          <h3>Hoàng Anh</h3>
          <p>55 ban chung</p>
          <div className="friend-request-btn">
            <button className="accept-btn">Xac nhan</button>
            <button>Xoa</button>
          </div>
        </div>
      </div>
      <div className="friend-request-container">
        <div>
          <img src={avt3} className="friend-request-avatar" alt="" />
        </div>

        <div className="friend-request-info">
          <h3>Hải Nam</h3>
          <p>100 ban chung</p>
          <div className="friend-request-btn">
            <button className="accept-btn">Xac nhan</button>
            <button>Xoa</button>
          </div>
        </div>
      </div>
      <div className="friend-request-container">
        <div>
          <img src={avt4} className="friend-request-avatar" alt="" />
        </div>

        <div className="friend-request-info">
          <h3>Đình Long</h3>
          <p>6 ban chung</p>
          <div className="friend-request-btn">
            <button className="accept-btn">Xac nhan</button>
            <button>Xoa</button>
          </div>
        </div>
      </div>
      <div className="friend-request-container">
        <div>
          <img src={avt2} className="friend-request-avatar" alt="" />
        </div>

        <div className="friend-request-info">
          <h3>Mạnh Dũng</h3>
          <p>36 ban chung</p>
          <div className="friend-request-btn">
            <button className="accept-btn">Xac nhan</button>
            <button>Xoa</button>
          </div>
        </div>
      </div>
      <div className="friend-request-container">
        <div>
          <img src={avt3} className="friend-request-avatar" alt="" />
        </div>

        <div className="friend-request-info">
          <h3>Mạnh Hải</h3>
          <p>46 ban chung</p>
          <div className="friend-request-btn">
            <button className="accept-btn">Xac nhan</button>
            <button>Xoa</button>
          </div>
        </div>
      </div>
    </div>
  );
};
