import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../globalContext";
import { MdOutlineOndemandVideo, MdPowerSettingsNew } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiTwotoneSetting,
} from "react-icons/ai";
import { CgMenuGridO } from "react-icons/cg";
import { BsMessenger, BsPen } from "react-icons/bs";
import "./style.css";
import { useSelector } from "react-redux";
import logoFB from "../../assets/images/fb-logo.png";
import {
  FaBars,
  FaRegRegistered,
  FaSignInAlt,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";

export const NavbarComponent = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(GlobalContext);
  const currentUser = useSelector((store: any) => store.currentUser);
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const logout = () => {
    sessionStorage.removeItem("userToken");
    navigate("/login");
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="">
            <img src={logoFB} className="logo" alt="" />
          </Link>
          {isLoggedIn ? (
            <input
              type="text"
              className="nav-input"
              placeholder="Tìm kiếm trên Facebook"
            />
          ) : (
            <></>
          )}
        </div>

        <div className="nav-middle">
          <div className="nav-menu " onClick={handleClick}>
            <div className="nav-item active">
              <Link to="/" className="text-decoration-none nav-link">
                <AiOutlineHome className="mx-1" />
              </Link>
            </div>
            {isLoggedIn ? (
              <>
                <div
                  className={click ? "nav-item active" : "nav-item"}
                  onClick={handleClick}
                >
                  <Link to="/" className="text-decoration-none nav-link">
                    <MdOutlineOndemandVideo className="mx-1" />
                  </Link>
                </div>
                <div className="nav-item active">
                  <Link to="/editor" className="text-decoration-none nav-link">
                    <BsPen className="mx-1 " />
                  </Link>
                </div>
                <div className="nav-item active">
                  <Link
                    to="/settings"
                    className="text-decoration-none nav-link"
                  >
                    <AiOutlineSetting className="mx-1" />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="nav-item active">
                  <Link to="/login" className="text-decoration-none nav-link">
                    <RiLoginBoxLine />
                  </Link>
                </div>
                <div className="nav-item active">
                  <Link
                    to="/register"
                    className="text-decoration-none nav-link"
                  >
                    <FaRegRegistered />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {isLoggedIn ? (
          <div className="nav-right">
            <ul className="nav-menu ">
              <li className="nav-item-right active">
                <Link to="" className="text-decoration-none nav-link">
                  <CgMenuGridO className="nav-noti" />
                </Link>
              </li>
              <li className="nav-item-right active">
                <Link to="" className="text-decoration-none nav-link">
                  <BsMessenger className="nav-noti" />
                </Link>
              </li>
              <li className="nav-item-right active">
                <Link to="" className="text-decoration-none nav-link">
                  <IoNotifications className="nav-noti" />
                </Link>
              </li>
              <div className="drop-down">
                <li className="nav-item-image active">
                  {isLoggedIn ? (
                    <Link
                      to={`/profile/${currentUser?.user.user.username}`}
                      className="text-decoration-none nav-link"
                    >
                      <img
                        alt=""
                        src={currentUser?.user?.user?.image}
                        width="40"
                        height="40"
                        className="d-inline-block rounded-circle"
                      />
                    </Link>
                  ) : (
                    <></>
                  )}
                </li>
                <div className="dropdown-content">
                  <Link to={`profile/${currentUser?.user?.user.username}`}>
                    <FaUserCircle className="text-info mx-1 drop-down-icon" />
                    Trang cá nhân
                  </Link>
                  <Link to={"/settings"}>
                    <AiTwotoneSetting className="text-warning mx-1 drop-down-icon" />
                    Cài đặt
                  </Link>
                  <Link to={"/login"} onClick={logout}>
                    <MdPowerSettingsNew className="text-danger mx-1 drop-down-icon" />{" "}
                    Đăng xuất
                  </Link>
                </div>
              </div>
            </ul>
          </div>
        ) : (
          <>
            <div className="nav-right">
              <ul className="nav-menu "></ul>
            </div>
          </>
        )}
      </nav>
    </>
  );
};
