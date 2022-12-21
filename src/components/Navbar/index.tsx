import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../globalContext";
import { IoSettingsSharp } from "react-icons/io5";
import { FaTimes, FaBars, FaBlog, FaHome, FaPen } from "react-icons/fa";
import "./style.css";

export const NavbarComponent = () => {
  const { isLoggedIn, currentUser } = useContext(GlobalContext);

  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Link to="">
              <span className="text-light mx-2">Blog 16</span>
            </Link>
          </div>

          <ul
            className={
              click ? "nav-menu active text-warning" : "nav-menu text-warning"
            }
            onClick={handleClick}
          >
            <li className="nav-item">
              <Link to="/" className="text-decoration-none nav-link">
                <FaHome className="mx-1 " />
                Home
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/editor" className="text-decoration-none nav-link">
                    <FaPen className="mx-1" />
                    New Article
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/settings"
                    className="text-decoration-none nav-link"
                  >
                    <IoSettingsSharp className="mx-1 " />
                    Settings
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to={`/profile/${currentUser?.user.username}`}
                    className="text-decoration-none nav-link"
                  >
                    <img
                      alt=""
                      src={currentUser.user.image}
                      width="30"
                      height="30"
                      className="d-inline-block rounded-circle"
                    />
                    <span className="mx-2">{currentUser.user.username}</span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="text-decoration-none nav-link">
                    Sign in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className="text-decoration-none nav-link"
                  >
                    {" "}
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>
    </>
  );
};
