import { Col, Row, Nav } from "react-bootstrap";
import Button from "react-bootstrap/esm/Button";
import "./styles.css";

export const HomePage = () => {
  return (
    <Row className="px-5 mx-5 mb-5 mt-3 pb-5">
      <Col lg={9}>
        <Row>
          <Nav variant="tabs" defaultActiveKey="/">
            <Nav.Item>
              <Nav.Link href="" className="text-success">
                Your Feed
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="" className="text-success">
                Global Feed
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>

        <div className="article-container pb-3">
          <div className=" d-flex justify-content-between">
            <div className="d-flex mt-3">
              <img
                className="article-avatar mt-2"
                src="https://api.realworld.io/images/demo-avatar.png"
              />
              <div className="mx-2">
                <a className="article-name-user m-0" href="">
                  Magda Parry
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
          <p className="article-content m-0">
            Repellat nihil in magnam quasi. Et dicta at est laborum doloribus
            sit. Quia possimus necessitatibus magnam, est, nulla, reiciendis
            exercitationem neque et tenetur quia deserunt asperiores blanditiis
            doloribus ipsum beatae numquam. Ullam rerum consequuntur occaecati
            error. Possimus consequatur consectetur doloribus voluptate nihil,
            tenetur sunt fugiat quae id, ducimus non.
          </p>
          <p className="article-description">
            Eos necessitatibus officia quos. Et vitae aliquid autem occaecati
            repudiandae placeat repellat odit. Minus iure voluptates autem quam
            dicta. Iste consequatur aspernatur voluptas quibusdam sint beatae.
          </p>
          <div className="d-flex justify-content-between">
            <a className="read-more">Read more...</a>
            <div className="article-tag">
              <span>sequi</span>
              <span>doloribus</span>
              <span>vitae</span>
            </div>
          </div>
        </div>

        <div className="article-container pb-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex mt-3">
              <img
                className="article-avatar mt-2"
                src="https://api.realworld.io/images/demo-avatar.png"
              />
              <div className="mx-2">
                <a className="article-name-user m-0" href="">
                  Magda Parry
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
          <p className="article-content m-0">
            Repellat nihil in magnam quasi. Et dicta at est laborum doloribus
            sit. Quia possimus necessitatibus magnam, est, nulla, reiciendis
            exercitationem neque et tenetur quia deserunt asperiores blanditiis
            doloribus ipsum beatae numquam. Ullam rerum consequuntur occaecati
            error. Possimus consequatur consectetur doloribus voluptate nihil,
            tenetur sunt fugiat quae id, ducimus non.
          </p>
          <p className="article-description">
            Eos necessitatibus officia quos. Et vitae aliquid autem occaecati
            repudiandae placeat repellat odit. Minus iure voluptates autem quam
            dicta. Iste consequatur aspernatur voluptas quibusdam sint beatae.
          </p>
          <div className="d-flex justify-content-between">
            <a className="read-more">Read more...</a>
            <div className="article-tag">
              <span>sequi</span>
              <span>doloribus</span>
              <span>vitae</span>
            </div>
          </div>
        </div>
      </Col>

      <Col lg={3}>
        <div className="popular-tags p-2">
          <p className="m-0">Popular Tags</p>
          <div className="tags">
            <a>qui</a>
            <a>et</a>
            <a>doloribus</a>
            <a>doloribus</a>
            <a>doloribus</a>
            <a>doloribus</a>
          </div>
        </div>
      </Col>
    </Row>
  );
};
