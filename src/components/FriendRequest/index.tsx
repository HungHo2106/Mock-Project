import avt2 from "../../assets/images/avt2.jpg";
import avt1 from "../../assets/images/avt1.jpg";
import avt3 from "../../assets/images/avt3.jpg";
import avt4 from "../../assets/images/avt4.jpg";
import "./style.css";
import { ModalFriendAcceptRequest } from "../Modal/index2";
import { ModalFriendDeleteRequest } from "../Modal/index3";

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
          <h3>Hồ Hiệp</h3>
          <p>19 bạn chung</p>
          <div className="friend-request-btn">
            <ModalFriendAcceptRequest />
            <ModalFriendDeleteRequest />
          </div>
        </div>
      </div>
      <div className="friend-request-container">
        <div>
          <img src={avt1} className="friend-request-avatar" alt="" />
        </div>

        <div className="friend-request-info">
          <h3>Hoàng Anh</h3>
          <p>55 bạn chung</p>
          <div className="friend-request-btn">
            <ModalFriendAcceptRequest />
            <ModalFriendDeleteRequest />
          </div>
        </div>
      </div>
      <div className="friend-request-container">
        <div>
          <img src={avt3} className="friend-request-avatar" alt="" />
        </div>

        <div className="friend-request-info">
          <h3>Hải Nam</h3>
          <p>100 bạn chung</p>
          <div className="friend-request-btn">
            <ModalFriendAcceptRequest />
            <ModalFriendDeleteRequest />
          </div>
        </div>
      </div>
      <div className="friend-request-container">
        <div>
          <img src={avt4} className="friend-request-avatar" alt="" />
        </div>

        <div className="friend-request-info">
          <h3>Đình Long</h3>
          <p>6 bạn chung</p>
          <div className="friend-request-btn">
            <ModalFriendAcceptRequest />
            <ModalFriendDeleteRequest />
          </div>
        </div>
      </div>
      <div className="friend-request-container">
        <div>
          <img src={avt2} className="friend-request-avatar" alt="" />
        </div>

        <div className="friend-request-info">
          <h3>Mạnh Dũng</h3>
          <p>36 bạn chung</p>
          <div className="friend-request-btn">
            <ModalFriendAcceptRequest />
            <ModalFriendDeleteRequest />
          </div>
        </div>
      </div>
      <div className="friend-request-container">
        <div>
          <img src={avt3} className="friend-request-avatar" alt="" />
        </div>

        <div className="friend-request-info">
          <h3>Mạnh Hải</h3>
          <p>46 bạn chung</p>
          <div className="friend-request-btn">
            <ModalFriendAcceptRequest />
            <ModalFriendDeleteRequest />
          </div>
        </div>
      </div>
    </div>
  );
};
