import { BsSearch } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import "./style.css";
import avt1 from "../../assets/images/avt3.jpg";

export const ListFriendHomePage = () => {
  return (
    <div className="list-friend-container">
      <div className="list-friend-header">
        <h4>Người liên hệ</h4>
        <div className="list-friend-icons">
          <BsSearch className="mx-3 cursor-pointer" />
          <HiDotsHorizontal className="cursor-pointer" />
        </div>
      </div>
      <div className="list-friend-item">
        <div className="list-friend-avatar">
          <img src={avt1} alt="" />
          <div className="online-noti"></div>
        </div>
        Duy Anh
      </div>
      <div className="list-friend-item">
        <div className="list-friend-avatar">
          <img src={avt1} alt="" />
          <div className="online-noti"></div>
        </div>
        Anh Đức
      </div>
      <div className="list-friend-item">
        <div className="list-friend-avatar">
          <img src={avt1} alt="" />
          <div className="online-noti"></div>
        </div>
        Chí Thịnh
      </div>
      <div className="list-friend-item">
        <div className="list-friend-avatar">
          <img src={avt1} alt="" />
          <div className="online-noti"></div>
        </div>
        Ngọc Duy
      </div>
      <div className="list-friend-item">
        <div className="list-friend-avatar">
          <img src={avt1} alt="" />
          <div className="online-noti"></div>
        </div>
        Xuân Anh
      </div>
      <div className="list-friend-item">
        <div className="list-friend-avatar">
          <img src={avt1} alt="" />
          <div className="online-noti"></div>
        </div>
        Công Viễn
      </div>
      <div className="list-friend-item">
        <div className="list-friend-avatar">
          <img src={avt1} alt="" />
          <div className="online-noti"></div>
        </div>
        Trung Kiên
      </div>
      <div className="list-friend-item">
        <div className="list-friend-avatar">
          <img src={avt1} alt="" />
          <div className="online-noti"></div>
        </div>
        Văn Hải
      </div>
      <div className="list-friend-item">
        <div className="list-friend-avatar">
          <img src={avt1} alt="" />
          <div className="online-noti"></div>
        </div>
        Tuấn Vũ
      </div>
      <div className="list-friend-item">
        <div className="list-friend-avatar">
          <img src={avt1} alt="" />
          <div className="online-noti"></div>
        </div>
        Việt Hoàng
      </div>
    </div>
  );
};
