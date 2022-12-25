import { AiFillVideoCamera } from "react-icons/ai";
import { BsFillEmojiSmileFill, BsImages } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ArticleCreate = () => {
  const currentUser = useSelector((store: any) => store.currentUser);

  return (
    <div className="article-create mx-2">
      <div className="article-create-header">
        <Link to={`profile/${currentUser?.user?.user.username}`}>
          <img
            className="article-avatar"
            src={currentUser?.user?.user.image}
            alt=""
          />
        </Link>
        <Link
          to="/editor"
          className="article-create-input text-decoration-none text-secondary"
        >
          <div>{currentUser.user.user.username} ơi, bạn đang nghĩ gì thế?</div>
        </Link>
      </div>
      <div className="article-create-footer ">
        <div className="article-create-footer-item">
          <AiFillVideoCamera className="article-footer-icon text-danger" />{" "}
          Video trực tiếp
        </div>
        <div className="article-create-footer-item">
          <BsImages className="article-footer-icon text-success" /> Ảnh/Video
        </div>
        <div className="article-create-footer-item">
          <BsFillEmojiSmileFill className="article-footer-icon text-warning" />{" "}
          Cảm xúc
        </div>
      </div>
    </div>
  );
};
