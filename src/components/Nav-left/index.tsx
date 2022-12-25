import { BsFillBookmarkHeartFill, BsPeopleFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { RiArticleFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.css";

export const NavLeftComponent = ({ setMode }: any) => {
  const currentUser = useSelector((store: any) => store.currentUser);

  return (
    <div className="nav-left-container">
      <Link
        to={`profile/${currentUser?.user?.user.username}`}
        className="text-decoration-none text-dark"
      >
        <div className="nav-left-item">
          <img
            src={currentUser?.user?.user.image}
            className="nav-left-avatar"
            alt=""
          />
          <h5 className="mx-2 mb-0">{currentUser?.user?.user.username}</h5>
        </div>
      </Link>
      <div className="nav-left-item" onClick={() => setMode("your-feed")}>
        <BsFillBookmarkHeartFill className="nav-left-icon" />
        Tường của bạn
      </div>
      <div className="nav-left-item" onClick={() => setMode("global-feed")}>
        <RiArticleFill className="nav-left-icon" /> Gần đây nhất
      </div>

      <div className="nav-left-item">
        <BsPeopleFill className="nav-left-icon" /> Bạn bè
      </div>
      <Link to="/settings" className="text-decoration-none text-dark">
        <div className="nav-left-item">
          <IoSettingsSharp className="nav-left-icon" /> Cài đặt chung
        </div>
      </Link>
      <div className="nav-left-item">
        <MdOutlineOndemandVideo className="nav-left-icon" /> Video phổ biến
      </div>
    </div>
  );
};
