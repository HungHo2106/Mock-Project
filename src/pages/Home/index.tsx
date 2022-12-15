import { useEffect, useState, useContext } from "react";
import { Col, Row, Nav } from "react-bootstrap";
import { httpClient } from "../../api/httpClient";
import "./styles.css";
import { IoHeart } from "react-icons/io5";
import { GlobalContext } from "../../globalContext";
import { Link } from "react-router-dom";
import moment from "moment";

export const HomePage = () => {
  const { isLoggedIn } = useContext(GlobalContext);
  const { articles, setArticles } = useContext(GlobalContext);
  const [mode, setMode] = useState("your-feed");

  const getArticles = () => {
    if (mode === "global-feed") {
      httpClient.get("articles").then((response: any) => {
        setMode("global-feed");
        setArticles(response.data.articles);
      });
    } else if (mode === "your-feed") {
      httpClient
        .get("articles/feed")
        .then((response: any) => setArticles(response.data.articles));
    }
  };

  console.log(articles);

  useEffect(() => {
    getArticles();
  }, [mode]);

  const favorite = (slug: any) => {
    httpClient.post(`articles/${slug}/favorite`).then((response: any) => {
      console.log(response.data);
    });
  };

  const unfavorite = (slug: any) => {
    httpClient.delete(`articles/${slug}/favorite`).then((response: any) => {
      console.log(response.data);
    });
  };

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
                  active={mode === "your-feed"}
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
                active={mode === "global-feed"}
              >
                Global Feed
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>

        {articles && articles.length > 0 ? (
          articles.map((article: any, index: number) => (
            <div className="article-container pb-3" key={index}>
              <div className=" d-flex justify-content-between">
                <div className="d-flex mt-3">
                  <img
                    className="article-avatar mt-2"
                    src={article.author.image}
                    alt=""
                  />
                  <div className="mx-2">
                    <Link
                      className="article-name-user m-0"
                      to={`profile/${article.author.username}`}
                    >
                      {article.author.username}
                    </Link>
                    <p className="article-date">
                      {moment(article.updatedAt).format("MMMM D, YYYY")}
                    </p>
                  </div>
                </div>
                {/* Tạo hàm xác minh đã like -> isLiked  */}
                <div>
                  <button
                    onClick={() => favorite(article.slug)}
                    className="btn-heart btn btn-outline-success d-flex justify-content-center align-items-center mt-3"
                  >
                    <IoHeart className="mx-1" />{" "}
                    <span>{article.favoritesCount}</span>
                  </button>
                </div>
              </div>
              <Link
                to={`/article/${article.slug}`}
                className="text-decoration-none"
              >
                <p className="article-content m-0 text-dark ">
                  {article.title}
                </p>
                <p className="article-description text-secondary">
                  {article.description}
                </p>
              </Link>
              <div className="d-flex justify-content-between">
                <Link className="read-more" to={`/article/${article.slug}`}>
                  Read more...
                </Link>
                <div className="article-tag">
                  {article.tagList.map((tag: any, index: number) =>
                    tag ? (
                      <span key={index}>{tag}</span>
                    ) : (
                      <div key={index}></div>
                    )
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-2 text-secondary">No articles are here...yet</p>
        )}
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
