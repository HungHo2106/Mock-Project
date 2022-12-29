import { Col, Row } from "react-bootstrap";
import bg from "../../assets/images/tải xuống.jpg";

export const ListFriendProfile = ({ profile, currentUser }: any) => {
  return (
    <div className="friends-profile">
      <h3>Bạn bè</h3>
      {profile.profile.username === currentUser.user.user.username ? (
        <p>4.999 người bạn</p>
      ) : (
        <p>99 bạn chung</p>
      )}
      <Row xs={12} className="friend-container">
        <Col xs={4}>
          <div className="friend-item">
            <img src={bg} alt="" />
          </div>
          <p className="friend-name">Hung</p>
        </Col>

        <Col xs={4}>
          <div className="friend-item">
            <img src={bg} alt="" />
          </div>
          <p className="friend-name">Nam</p>
        </Col>
        <Col xs={4}>
          <div className="friend-item">
            <img src={bg} alt="" />
          </div>
          <p className="friend-name">Dũng</p>
        </Col>
        <Col xs={4}>
          <div className="friend-item">
            <img src={bg} alt="" />
          </div>
          <p className="friend-name">Mai</p>
        </Col>
        <Col xs={4}>
          <div className="friend-item">
            <img src={bg} alt="" />
          </div>
          <p className="friend-name">Thảo</p>
        </Col>
        <Col xs={4}>
          <div className="friend-item">
            <img src={bg} alt="" />
          </div>
          <p className="friend-name">Hưng</p>
        </Col>
        <Col xs={4}>
          <div className="friend-item">
            <img src={bg} alt="" />
          </div>
          <p className="friend-name">Linh</p>
        </Col>
        <Col xs={4}>
          <div className="friend-item">
            <img src={bg} alt="" />
          </div>
          <p className="friend-name">Hà</p>
        </Col>
        <Col xs={4}>
          <div className="friend-item">
            <img src={bg} alt="" />
          </div>
          <p className="friend-name">Cường</p>
        </Col>
      </Row>
    </div>
  );
};
