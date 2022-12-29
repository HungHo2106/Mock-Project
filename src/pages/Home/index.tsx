import { useEffect, useState, useContext } from "react";
import { Col, Row, Nav } from "react-bootstrap";
import { httpClient } from "../../api/httpClient";
import "./styles.css";
import { AiFillLike } from "react-icons/ai";

import like from "../../assets/images/like.svg";
import likeLight from "../../assets/images/like_light.svg";
import heart from "../../assets/images/heart.svg";
import care from "../../assets/images/care.svg";
import share from "../../assets/images/share.svg";
import comment from "../../assets/images/comment.svg";
import { GlobalContext } from "../../globalContext";
import { Link, useNavigate } from "react-router-dom";
import { StoryComponent } from "../../components/Story";
import moment from "moment";

import { setArticles } from "../../redux/store/slice/article";
import { useDispatch, useSelector } from "react-redux";
import { NavLeftComponent } from "../../components/Nav-left";
import { ArticleCreate } from "../../components/Article-create";
import { ListFriendHomePage } from "../../components/List-friends";
import { TutorialComponent } from "../../components/Tutorial";
import { ModalSaveComponent } from "../../components/Modal";
import { BirthdayNotiComponent } from "../../components/Birthday-Noti";
import { CommentComponent } from "../../components/Comment";

export const HomePage = () => {
  const { isLoggedIn } = useContext(GlobalContext);
  const { commentList, setCommentList } = useContext(GlobalContext);
  const currentUser = useSelector((store: any) => store.currentUser);

  const [mode, setMode] = useState("global-feed");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInfinity, setIsLoadingInfinity] = useState(false);
  const [isLoadingComment, setIsLoadingComment] = useState(false);
  const [tags, setTags] = useState([]);
  const [filterTag, setFilterTag] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [slugComment, getSlugComment] = useState("");

  const navigate = useNavigate();

  const articles = useSelector((store: any) => store.articles);
  const dispatch = useDispatch();
  const [offset, setOffSet] = useState(0);
  const [articleInfinity, setArticleInfinity] = useState([
    ...articles.articles,
  ]);

  const getArticles = () => {
    setIsLoading(true);
    setIsLoadingInfinity(false);
    if (mode === "global-feed") {
      httpClient.get("articles").then((response: any) => {
        dispatch(setArticles(response.data.articles));
        setArticleInfinity(response.data.articles);
        setIsLoading(false);
      });
    } else if (mode === "your-feed") {
      httpClient.get("articles/feed").then((response: any) => {
        dispatch(setArticles(response.data.articles));
        setArticleInfinity(response.data.articles);
        setIsLoading(false);
      });
    } else if (mode === "filter-tags") {
      httpClient.get(`articles?tag=${filterTag}`).then((response: any) => {
        dispatch(setArticles(response.data.articles));
        setArticleInfinity(response.data.articles);
        setIsLoading(false);
      });
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

  const getComment = () => {
    setIsLoadingComment(true);
    if (slugComment)
      httpClient
        .get(`articles/${slugComment}/comments`)
        .then((response: any) => {
          setCommentList(response.data.comments, commentList);
          setIsLoadingComment(false);
        });
  };

  const renderComment = () => {
    const indexComment = articleInfinity.findIndex(
      (a: any) => a.slug === slugComment
    );
    const newArr = articleInfinity.map((a: any, i: number) => {
      if (i === indexComment) {
        const articleWithComment = {
          ...articleInfinity[i],
          comment: commentList,
        };
        return articleWithComment;
      } else {
        return a;
      }
    });
    setArticleInfinity(newArr);
  };

  useEffect(() => {
    getComment();
  }, [slugComment]);

  useEffect(() => {
    renderComment();
  }, [commentList]);

  const deleteComment = (id: number) => {
    httpClient
      .delete(`articles/${slugComment}/comments/${id}`)
      .then((r: any) => {
        getComment();
      });
  };

  const favorite = (slug: any) => {
    if (isLoggedIn) {
      httpClient.post(`articles/${slug}/favorite`).then((res: any) => {
        const index = articles.articles.findIndex((a: any) => a.slug === slug);
        if (index < 0) return;
        const cloneArticles = [...articles.articles];
        const selectedArticle = { ...cloneArticles[index] };
        selectedArticle.favorited = true;
        selectedArticle.favoritesCount = res.data.article.favoritesCount;
        cloneArticles[index] = selectedArticle;
        dispatch(setArticles(cloneArticles));
        setArticleInfinity(cloneArticles);
      });
    } else {
      navigate("/login");
    }
  };

  const unfavorite = (slug: any) => {
    if (isLoggedIn) {
      httpClient.delete(`articles/${slug}/favorite`).then((res: any) => {
        const index = articles.articles.findIndex((a: any) => a.slug === slug);
        if (index < 0) return;
        const cloneArticles = [...articles.articles];
        const selectedArticle = { ...cloneArticles[index] };
        selectedArticle.favorited = false;
        selectedArticle.favoritesCount = res.data.article.favoritesCount;
        cloneArticles[index] = selectedArticle;
        dispatch(setArticles(cloneArticles));
        setArticleInfinity(cloneArticles);
      });
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    setIsLoading(false);
    setIsLoadingInfinity(true);
    if (offset) {
      const loadMoreArticle = () => {
        if (mode === "global-feed") {
          httpClient
            .get(`articles?limit=10&offset=${offset}`)
            .then((response: any) => {
              let data = response.data.articles;
              setArticleInfinity((prev: any) => [...prev, ...data]);
              setIsLoadingInfinity(false);
            });
        } else if (mode === "your-feed") {
          httpClient
            .get(`articles/feed?limit=10&offset=${offset}`)
            .then((response: any) => {
              let data = response.data.articles;
              setArticleInfinity((prev: any) => [...prev, ...data]);
              setIsLoadingInfinity(false);
            });
        }
      };
      loadMoreArticle();
    }
  }, [offset]);

  useEffect(() => {
    const handleScroll = (e: any) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        setOffSet(offset + 5);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [articleInfinity]);

  return (
    <>
      <div className="home-container pt-4" id="home-container">
        <Row className="pb-5 mt-3 m-0 ">
          <Col sm={12} lg={3}>
            {isLoggedIn && <NavLeftComponent setMode={setMode} />}
          </Col>
          <Col sm={8} lg={6} className="middle">
            <Row className="mx-2 p-0">
              <StoryComponent />
            </Row>

            {isLoggedIn ? <ArticleCreate /> : <></>}

            <Row className="p-0 mx-2 my-2 ">
              <div className="nav-article-mobile">
                <button onClick={() => setMode("your-feed")}>
                  Tường của bạn
                </button>
                <button onClick={() => setMode("global-feed")}>
                  Gần đây nhất
                </button>
                <button>Bạn bè</button>
                <Link to="/settings" className="text-decoration-none text-dark">
                  <button>Cài đặt chung</button>
                </Link>
                <button>Video phổ biến</button>
              </div>
            </Row>

            <Row className="p-0 mx-2 my-2  ">
              <div className="popular-tags-mobile ">
                <p className="m-0">Thẻ xu hướng mới</p>
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
                      <span>{tag}</span>
                    </div>
                  ))}
              </div>
            </Row>

            {mode === "filter-tags" && (
              <div className="filter-article-tags mx-2 mt-2">
                Các bài viết có chủ đề liên quan về: # {filterTag}
              </div>
            )}
            {isLoading ? (
              <div className="d-flex justify-content-center">
                <div className="loader"></div>
              </div>
            ) : articleInfinity && articleInfinity.length > 0 ? (
              articleInfinity.map((article: any, index: number) => (
                <div className="article-container article-item " key={index}>
                  <div className=" d-flex justify-content-between pt-3">
                    <div className="d-flex align-items-center">
                      <Link
                        className="article-name-user m-0"
                        to={`profile/${article.author.username}`}
                      >
                        <img
                          className="article-avatar "
                          src={article.author?.image}
                          alt=""
                        />
                      </Link>
                      <div className="mx-2">
                        <Link
                          className="article-name-user m-0 text-decoration-none text-dark"
                          to={`profile/${article.author.username}`}
                        >
                          {article.author.username}
                        </Link>
                        <p className="article-date">
                          {moment(article.updatedAt).format("MMMM D, YYYY")}
                        </p>
                      </div>
                    </div>
                    <div className="article-close">
                      <ModalSaveComponent />
                    </div>
                  </div>

                  <Link
                    to={`/article/${article.slug}`}
                    className="text-decoration-none"
                  >
                    <p className="article-content m-0 text-dark ">
                      {article.title}
                    </p>
                    <p className="article-description text-dark">
                      {article.description}
                    </p>
                  </Link>

                  <Link
                    className=" text-decoration-none"
                    to={`/article/${article.slug}`}
                  >
                    <div className="d-flex justify-content-between">
                      <div className="read-more">Read more...</div>

                      <div className="article-tag text-dark">
                        {article.tagList.map((tag: any, index: number) =>
                          tag ? (
                            <span key={index}>{tag}</span>
                          ) : (
                            <div key={index}></div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="image-article"></div>
                  </Link>

                  <div className="article-interactive d-flex justify-content-between">
                    <div>
                      <img src={like} width={25} height={25} alt="" />
                      <img src={heart} width={25} height={25} alt="" />
                      <img src={care} width={25} height={25} alt="" />
                      <span className="text-dark mx-2">
                        {article.favoritesCount}
                      </span>
                    </div>
                    <div className="cursor-pointer">
                      <span className="mx-1">
                        {article.comment && article.comment?.length} Binh luan
                      </span>
                      <span className="mx-1">Chia se</span>
                    </div>
                  </div>

                  <div className="article-footer">
                    <button
                      onClick={
                        article.favorited
                          ? () => unfavorite(article.slug)
                          : () => favorite(article.slug)
                      }
                      className={"btn-article-action"}
                    >
                      {article.favorited ? (
                        <>
                          <AiFillLike className="text-info article-icon" />
                          <span>Thích</span>
                        </>
                      ) : (
                        <>
                          <img src={likeLight} width={20} height={20} alt="" />
                          <span className="mx-2">Thích</span>
                        </>
                      )}
                    </button>
                    <button
                      className="btn-article-action"
                      onClick={() => {
                        setShowComment(true);
                        getSlugComment(article.slug);
                      }}
                    >
                      <img src={comment} width={20} height={20} alt="" />
                      <span className="mx-2">Bình luận</span>
                    </button>
                    <button className="btn-article-action">
                      <img src={share} width={20} height={20} alt="" />
                      <span className="mx-2">Chia sẻ</span>
                    </button>
                  </div>
                  {showComment && (
                    <div className="comment">
                      <div className="d-flex align-items-center">
                        <Link
                          to={`profile/${currentUser?.user?.user.username}`}
                        >
                          <img
                            className="article-avatar mx-1"
                            src={currentUser?.user?.user.image}
                            alt=""
                          />
                        </Link>
                        <Link
                          to={`article/${article.slug}`}
                          className="input-comment-cover"
                        >
                          <input type="text" className="input-comment" />
                        </Link>
                      </div>
                      {article.slug === slugComment && isLoadingComment ? (
                        <div className="d-flex justify-content-center">
                          <div className="loader"></div>
                        </div>
                      ) : (
                        article.slug === slugComment && (
                          <div>
                            {article.comment &&
                              article.comment.map((comment: any) => (
                                <div key={comment.id}>
                                  <CommentComponent
                                    comment={comment}
                                    deleteComment={deleteComment}
                                  />
                                </div>
                              ))}
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="mt-3 text-dark text-center">
                No articles are here...yet
              </p>
            )}

            {isLoadingInfinity && (
              <div className="d-flex justify-content-center">
                <div className="loader"></div>
              </div>
            )}
          </Col>
          <Col sm={3} lg={3} className="right">
            {isLoggedIn && <BirthdayNotiComponent />}
            <div className="popular-tags ">
              <p className="m-0">Thẻ xu hướng mới</p>
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
                    <span>{tag}</span>
                  </div>
                ))}
            </div>

            {!isLoggedIn && <TutorialComponent />}

            {isLoggedIn && <ListFriendHomePage />}
          </Col>
        </Row>
      </div>
    </>
  );
};
