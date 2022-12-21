import "./style.css";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaDribbble,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <ul className="icons">
          <li>
            <Link to="">
              <FaTwitter />
            </Link>
          </li>
          <li>
            <Link to="">
              <FaFacebook />
            </Link>
          </li>
          <li>
            <Link to="">
              <FaInstagram />
            </Link>
          </li>
          <li>
            <Link to="">
              <FaDribbble />
            </Link>
          </li>
          <li>
            <Link to="">
              <FaYoutube />
            </Link>
          </li>
        </ul>
        <ul className="copyright">
          <li>&copy; Untitled</li>
          <li>
            Design: <Link to="">HungHQ14</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};
