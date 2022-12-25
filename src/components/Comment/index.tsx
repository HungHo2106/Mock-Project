import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
import like from "../../assets/images/like.svg";
import { IoTrash } from "react-icons/io5";
export const CommentComponent = ({ comment, deleteComment }: any) => {
  return (
    <Row className="comment-container">
      <Col xs={2}>
        <Link to={`profile/${comment.author.username}`}>
          <img className="comment-avatar" src={comment.author.image} alt="" />
        </Link>
      </Col>
      <Col xs={10} className="p-0">
        <div className="comment-body">
          <Link
            className="comment-username text-decoration-none text-dark"
            to={`/profile/${comment.author.username}`}
          >
            {comment.author.username}
          </Link>
          <p className="text-secondary">{comment.body}</p>
        </div>
        <div>
          <span className="comment-actions">
            <img src={like} alt="" width={20} height={20} />
            <span>Thích</span>
          </span>
          <span
            className="comment-actions"
            onClick={() => deleteComment(comment.id)}
          >
            <IoTrash className="comment-delete-icon" />
            <span>Xóa</span>
          </span>
        </div>
      </Col>
    </Row>
  );
};
