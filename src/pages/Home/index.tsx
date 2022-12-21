import { useEffect, useState, useContext } from "react";
import { Col, Row, Nav } from "react-bootstrap";
import { httpClient } from "../../api/httpClient";
import "./styles.css";
import { IoHeart } from "react-icons/io5";
import { GlobalContext } from "../../globalContext";
import { Link, useNavigate } from "react-router-dom";
import { PaginationComponent } from "../../components/Pagination";
import { HeroComponent } from "../../components/Hero";
import moment from "moment";

export const HomePage = () => {
  const { isLoggedIn } = useContext(GlobalContext);
  const { articles, setArticles } = useContext(GlobalContext);
  const [mode, setMode] = useState("global-feed");
  const [tags, setTags] = useState([]);
  const [filterTag, setFilterTag] = useState("");
  const navigate = useNavigate();

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
    } else if (mode === "filter-tags") {
      httpClient
        .get(`articles?tag=${filterTag}`)
        .then((response: any) => setArticles(response.data.articles));
    }
  };

  useEffect(() => {
    httpClient.get("tags").then((response: any) => {
      setTags(response.data.tags);
    });
  }, [articles]);

  useEffect(() => {
    getArticles();
  }, [mode, filterTag]);

  const favorite = (slug: any) => {
    if (isLoggedIn) {
      httpClient.post(`articles/${slug}/favorite`).then((res: any) => {
        setArticles(() => {
          for (let i = 0; i < articles.length; i++) {
            if (articles[i].title === res.data.article.title) {
              articles[i].favoritesCount = res.data.article.favoritesCount;
              articles[i].favorited = true;
              break;
            }
          }
          return [...articles];
        });
      });
    } else {
      navigate("/login");
    }
  };

  const unfavorite = (slug: any) => {
    if (isLoggedIn) {
      httpClient.delete(`articles/${slug}/favorite`).then((res: any) => {
        setArticles(() => {
          for (let i = 0; i < articles.length; i++) {
            if (articles[i].title === res.data.article.title) {
              articles[i].favoritesCount = res.data.article.favoritesCount;
              articles[i].favorited = false;
              break;
            }
          }
          return [...articles];
        });
      });
    } else {
      navigate("/login");
    }
  };

  const limitArticlesPerPage = 15;

  const getArticleByPagination = (number: number) => {
    if (mode === "global-feed") {
      httpClient
        .get(
          `articles?limit=${limitArticlesPerPage}&offset=${(number - 1) * 10}`
        )
        .then((response: any) => {
          setArticles(response.data.articles);
        });
    } else if (mode === "your-feed") {
      httpClient
        .get(
          `articles/feed?limit=${limitArticlesPerPage}&offset=${
            (number - 1) * 10
          }`
        )
        .then((response: any) => {
          setArticles(response.data.articles);
        });
    }
  };

  return (
    <>
      <HeroComponent />
      <div className="home-container pt-4" id="home-container">
        <Row className="px-5 mx-5 mb-5 mt-3 ">
          <Col sm={10}>
            <Row>
              <Nav variant="tabs" defaultActiveKey="/">
                {isLoggedIn && (
                  <Nav.Link
                    href=""
                    className="text-success "
                    onClick={() => setMode("your-feed")}
                    active={mode === "your-feed"}
                  >
                    Your Feed
                  </Nav.Link>
                )}

                <Nav.Link
                  href=""
                  className="text-success"
                  onClick={() => setMode("global-feed")}
                  active={mode === "global-feed"}
                >
                  Global Feed
                </Nav.Link>

                {mode === "filter-tags" && (
                  <Nav.Link
                    href=""
                    className="text-success"
                    active={mode === "filter-tags"}
                  >
                    # {filterTag}
                  </Nav.Link>
                )}
              </Nav>
            </Row>

            {articles && articles.length > 0 ? (
              articles.map((article: any, index: number) => (
                <div
                  className="article-container article-item pb-3"
                  key={index}
                >
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

                    <div>
                      <button
                        onClick={
                          article.favorited
                            ? () => unfavorite(article.slug)
                            : () => favorite(article.slug)
                        }
                        className={`btn-heart btn ${
                          article.favorited
                            ? "btn-danger"
                            : "btn-outline-danger"
                        }  d-flex justify-content-center align-items-center mt-3`}
                      >
                        <IoHeart className="mx-1" />{" "}
                        <span className="text-light">
                          {article.favoritesCount}
                        </span>
                      </button>
                    </div>
                  </div>
                  <Link
                    to={`/article/${article.slug}`}
                    className="text-decoration-none"
                  >
                    <p className="article-content m-0 text-light ">
                      {article.title}
                    </p>
                    <p className="article-description text-light">
                      {article.description}
                    </p>
                  </Link>
                  <Link
                    className="read-more text-light"
                    to={`/article/${article.slug}`}
                  >
                    <div className="d-flex justify-content-between">
                      Read more...
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
                  </Link>
                </div>
              ))
            ) : (
              <p className="mt-2 text-light">No articles are here...yet</p>
            )}
            <div className="my-4 d-flex justify-content-center">
              <PaginationComponent
                totalMyPages={Math.round(
                  articles.length / limitArticlesPerPage
                )}
                mode={mode}
                totalGlobalPages={15}
                getArticleByPagination={getArticleByPagination}
              />
            </div>
          </Col>

          <Col sm={2}>
            <div className="popular-tags p-2">
              <p className="m-0">Popular Tags</p>
              {tags &&
                tags.length > 0 &&
                tags.map((tag: any) => (
                  <div
                    className="tags"
                    onClick={() => {
                      setFilterTag(tag);
                      setMode("filter-tags");
                    }}
                    key={tag}
                  >
                    <a>{tag}</a>
                  </div>
                ))}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
