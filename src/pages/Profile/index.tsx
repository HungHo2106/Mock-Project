import "./styles.css";
import { Row, Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
export const ProfilePage = () => {
  return (
    <div className="pb-5 mb-5">
      <div className="user-info py-4 bg-light">
        <div className="col-12 text-center">
          <img src="http://i.imgur.com/Qr71crq.jpg" className="user-img" />
          <h4 className="my-2">Eric Simons</h4>
          <p>Cofounder @GoThinkster</p>
        </div>
        <div className="col-12 d-flex justify-content-end">
          <button className="btn btn-sm btn-outline-secondary action-btn mx-4">
            <i className="ion-plus-round"></i>
            <span>+</span> Follow Eric Simons
          </button>
        </div>
      </div>

      <div className="container">
        <div className="my-4">
          <Row>
            <Nav variant="tabs" defaultActiveKey="/">
              <Nav.Item>
                <Nav.Link href="">My Articles</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="">Favourited Articles</Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>

          <div>
            <div className="d-flex justify-content-between">
              <div className="d-flex mt-3">
                <img
                  className="article-avatar mt-2"
                  src="https://api.realworld.io/images/demo-avatar.png"
                />
                <div className="mx-2">
                  <a className="article-name-user m-0" href="">
                    Eric Simons
                  </a>
                  <p className="article-date">October 9, 2022</p>
                </div>
              </div>
              <div>
                <Button
                  variant="success"
                  className="btn-heart d-flex justify-content-center align-items-center mt-3"
                >
                  {" "}
                  294
                </Button>
              </div>
            </div>
            <a href="" className="text-decoration-none text-secondary">
              <h1 className="article-content">
                How to build webapps that scale
              </h1>
              <p className="article-description">
                This is the description for the post.
              </p>
              <span className="read-more">Read more...</span>
            </a>
          </div>

          <div>
            <div className="d-flex justify-content-between">
              <div className="d-flex mt-3">
                <a href="">
                  <img
                    src="http://i.imgur.com/N4VcUeJ.jpg"
                    className="article-avatar mt-2"
                  />
                </a>
                <div className="mx-2">
                  <a href="" className="article-name-user m-0">
                    Albert Pai
                  </a>
                  <p className="article-date">October 9, 2022</p>
                </div>
              </div>
              <div>
                <Button
                  variant="success"
                  className="btn-heart d-flex justify-content-center align-items-center mt-3"
                >
                  {" "}
                  32
                </Button>
              </div>
            </div>
            <a href="" className="text-decoration-none text-secondary">
              <h1 className="article-content">
                The song you won't ever stop singing. No matter how hard you
                try.
              </h1>
              <p className="article-description">
                This is the description for the post.
              </p>
            </a>
            <div className="d-flex justify-content-between">
              <a href="" className="read-more">
                Read more...
              </a>
              <div className="article-tag">
                <span>sequi</span>
                <span>doloribus</span>
                <span>vitae</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
