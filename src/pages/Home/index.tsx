import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Col, Row, Nav } from "react-bootstrap";
import { httpClient } from "../../api/httpClient";
import "./styles.css";
import { IoHeart } from "react-icons/io5";
import { GlobalContext } from "../../globalContext";
export const HomePage = () => {
  const { isLoggedIn } = useContext(GlobalContext);
  const [article, setArticles] = useState([]);
  const [mode, setMode] = useState("global-feed");

  const getArticles = () => {
    if (mode === "global-feed") {
      httpClient.get("articles?limit=10&offset=0").then((response: any) => {
        setMode("global-feed");
        setArticles(response.data.articles);
      });
    } else if (mode === "your-feed") {
      httpClient
        .get("articles/feed")
        .then((response: any) => setArticles(response.data.articles));
    }
  };
  useEffect(() => {
    getArticles();
  }, [mode]);

  console.log(article);

  return (
    <Row className="px-5 mx-5 mb-5 mt-3 pb-5">
      <Col lg={9}>
        <Row>
          <Nav variant="tabs" defaultActiveKey="/">
            {isLoggedIn && (
              <Nav.Item>
                <Nav.Link
                  href=""
                  className="text-success"
                  onClick={() => setMode("your-feed")}
                >
                  Your Feed
                </Nav.Link>
              </Nav.Item>
            )}

            <Nav.Item>
              <Nav.Link
                href=""
                className="text-success"
                onClick={() => setMode("global-feed")}
              >
                Global Feed
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>

        {article.map((article: any, index: number) => (
          <div className="article-container pb-3" key={index}>
            <div className=" d-flex justify-content-between">
              <div className="d-flex mt-3">
                <img
                  className="article-avatar mt-2"
                  src={article.author.image}
                />
                <div className="mx-2">
                  <a className="article-name-user m-0" href="">
                    {article.author.username}
                  </a>
                  <p className="article-date">{article.createAt}</p>
                </div>
              </div>
              <div>
                <button className="btn-heart btn btn-outline-success d-flex justify-content-center align-items-center mt-3">
                  <IoHeart className="mx-1" />{" "}
                  <span>{article.favoritesCount}</span>
                </button>
              </div>
            </div>
            <p className="article-content m-0">{article.body}</p>
            <p className="article-description">{article.description}</p>
            <div className="d-flex justify-content-between">
              <a className="read-more" href={`/article/${article.slug}`}>
                Read more...
              </a>
              <div className="article-tag">
                {article.tagList.map((tag: any, index: number) => (
                  <span key={index}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
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
