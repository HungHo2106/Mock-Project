import "./style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { httpClient } from "../../api/httpClient";
import { GlobalContext } from "../../globalContext";
import { IoCloseSharp, IoHeart, IoTrash } from "react-icons/io5";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { RiSendPlaneFill, RiShareForwardLine } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import moment from "moment";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { AiOutlineLike } from "react-icons/ai";
import image from "../../assets/images/str2.jpg";
import { BsCheckLg } from "react-icons/bs";

export const ArticlePage = () => {
  const [articleDetail, setArticleDetail] = useState({
    author: { username: "", image: "", bio: "", following: "" },
    body: "",
    createdAt: "",
    description: "",
    favorited: false,
    favoritesCount: 0,
    slug: "",
    tagList: [""],
    title: "",
    updatedAt: "",
  });

  const { slug } = useParams();
  const { isLoggedIn, commentList, setCommentList } = useContext(GlobalContext);

  const currentUser = useSelector((store: any) => store.currentUser);
  const [comment, setComment] = useState("");
  const [profileUser, setProfileUser] = useState({
    profile: {
      bio: "",
      following: "",
      image: "",
      username: "",
    },
  });
  const navigate = useNavigate();

  const follow = () => {
    if (isLoggedIn) {
      httpClient
        .post(`profiles/${articleDetail.author.username}/follow`)
        .then((response: any) => {
          setProfileUser(response.data);
        });
    } else {
      navigate("/login");
    }
  };

  const unfollow = () => {
    if (isLoggedIn) {
      httpClient
        .delete(`profiles/${articleDetail.author.username}/follow`)
        .then((response: any) => {
          setProfileUser(response.data);
        });
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    httpClient.get(`articles/${slug}`).then((response: any) => {
      setArticleDetail(response.data.article);
    });
  }, []);

  useEffect(() => {
    if (articleDetail.author.username) {
      httpClient
        .get(`profiles/${articleDetail.author.username}`)
        .then((response: any) => {
          setProfileUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [articleDetail]);

  const getComment = () => {
    httpClient.get(`articles/${slug}/comments`).then((response: any) => {
      setCommentList(response.data.comments, commentList);
    });
  };

  useEffect(() => {
    getComment();
  }, [slug]);

  const postComment = () => {
    httpClient
      .post(`articles/${slug}/comments`, {
        comment: {
          body: comment,
        },
      })
      .then(() => {
        getComment();
      });
    setComment("");
  };

  const deleteComment = (id: number) => {
    httpClient.delete(`articles/${slug}/comments/${id}`).then(() => {
      getComment();
    });
  };

  const deleteArticle = () => {
    httpClient.delete(`articles/${slug}`).then((response: any) => {
      navigate("/");
    });
  };

  const favorite = () => {
    if (isLoggedIn) {
      httpClient.post(`articles/${slug}/favorite`).then((response: any) => {
        setArticleDetail(response.data.article);
      });
    } else {
      navigate("/login");
    }
  };

  const unfavorite = () => {
    if (isLoggedIn) {
      httpClient.delete(`articles/${slug}/favorite`).then((response: any) => {
        setArticleDetail(response.data.article);
      });
    } else {
      navigate("/login");
    }
  };

  const backFromArticleDetail = () => {
    navigate(-1);
  };

  return (
    <>
      <Row className="m-0 ">
        <Col sm={8} className="p-0">
          <div>
            <div
              className="article-detail-close"
              onClick={backFromArticleDetail}
            >
              <IoCloseSharp className="article-detail-close-icon" />
            </div>
            <img src={image} className="image-detail-article" alt="" />
          </div>
        </Col>
        <Col sm={4} className="p-0">
          <div className=" article-detail-right d-flex flex-column">
            <div className="d-flex align-items-center my-3">
              {articleDetail.author.image ? (
                <img
                  className="article-avatar"
                  src={articleDetail.author.image}
                  alt=""
                />
              ) : (
                <></>
              )}
              <div className="mx-2">
                <Link
                  className="article-name-user m-0"
                  to={`/profile/${articleDetail.author.username}`}
                >
                  {articleDetail.author.username}
                </Link>
                <p className="article-date mb-0">
                  {articleDetail.createdAt
                    ? moment(articleDetail.createdAt).format("MMMM D, YYYY")
                    : ""}
                </p>
              </div>
            </div>

            <div>
              <div className="article-body text-dark">
                <h4>{articleDetail.title}</h4>
                <p>{articleDetail.body}</p>
                {articleDetail.tagList.map((tag: any, index: number) => (
                  <div className="tags" key={index}>
                    {tag ? <a key={index}>{tag}</a> : <></>}
                  </div>
                ))}
              </div>
            </div>

            <div className="article-interactive d-flex justify-content-between">
              <div>
                <AiFillLike className="text-info" />
                <IoHeart className="text-danger" />{" "}
                <span className="text-dark">
                  {articleDetail.favoritesCount}
                </span>
              </div>
              <div className="cursor-pointer">
                <span className="mx-1">{commentList?.length} Bình luận</span>
                <span className="mx-1"> 10 Chia sẻ</span>
              </div>
            </div>

            <div className="article-footer">
              <button
                className="btn-article-action"
                onClick={articleDetail.favorited ? unfavorite : favorite}
              >
                {articleDetail.favorited ? (
                  <AiFillLike className="article-icon text-info" />
                ) : (
                  <AiOutlineLike className="article-icon text-info" />
                )}

                <span>Thích</span>
              </button>
              {articleDetail.author.username &&
              isLoggedIn &&
              currentUser.user.user.username ? (
                articleDetail.author.username ===
                  currentUser.user.user.username &&
                articleDetail.author.username ? (
                  <>
                    <button className="btn-article-action">
                      <Link
                        to={`/editor/${slug}`}
                        className="text-decoration-none text-dark "
                      >
                        <FaEdit className="article-icon text-success" />
                        <span className="mx-1">Edit Article</span>
                      </Link>
                    </button>
                    <button
                      className="btn-article-action"
                      onClick={deleteArticle}
                    >
                      <span>
                        <FaTrashAlt className="article-icon text-danger" />
                      </span>
                      <span>Delete Article</span>
                    </button>
                  </>
                ) : (
                  <>
                    {profileUser.profile.following ? (
                      <button className="btn-article-action">
                        <span
                          onClick={unfollow}
                          className="d-flex align-items-center"
                        >
                          <span>
                            <BsCheckLg className="article-icon text-info" />
                          </span>
                          <span className="mx-1">
                            Unfollow {articleDetail.author.username}
                          </span>
                        </span>
                      </button>
                    ) : (
                      <button className="btn-article-action">
                        <span
                          onClick={follow}
                          className="d-flex align-items-center"
                        >
                          <span>
                            <FaPlus className="article-icon text-info" />
                          </span>
                          <span className="mx-1">
                            Follow {articleDetail.author.username}
                          </span>
                        </span>
                      </button>
                    )}
                    <button className="btn-article-action">
                      <RiShareForwardLine className="article-icon text-info" />
                      <span>Chia sẻ</span>
                    </button>
                  </>
                )
              ) : (
                <></>
              )}
            </div>

            {isLoggedIn ? (
              <div className="article-actions">
                <div className="comment">
                  <div className="d-flex align-items-center">
                    {articleDetail.author.image ? (
                      <Link to={`/profile/${currentUser.user.user.username}`}>
                        <img
                          className="article-avatar mx-2"
                          src={currentUser?.user?.user?.image}
                          alt=""
                        />
                      </Link>
                    ) : (
                      <></>
                    )}
                    <input
                      type="text"
                      className="input-comment"
                      placeholder="viết bình luận..."
                      value={comment}
                      onChange={(e: any) => setComment(e.target.value)}
                    />
                    <div className="send-btn" onClick={postComment}>
                      <RiSendPlaneFill className="article-icon  text-info" />
                    </div>
                  </div>

                  <div>
                    {commentList &&
                      commentList.length > 0 &&
                      commentList.map((comment: any) => (
                        <div className="card my-3" key={comment.id}>
                          <div className="card-block p-3">
                            <p className="text-secondary">{comment.body}</p>
                          </div>
                          <div className="d-flex  p-2 bg-light align-items-center justify-content-between ">
                            <div className="d-flex">
                              <img
                                className="comment-avatar"
                                src={comment.author.image}
                                alt=""
                              />

                              <div className="d-flex mx-2 flex-row justify-content-between">
                                <Link
                                  className="article-date text-decoration-none text-secondary"
                                  to={`/profile/${comment.author.username}`}
                                >
                                  {comment.author.username}
                                </Link>
                                <p className="article-date text-secondary m-0 mx-1">
                                  {moment(comment.createdAt).format(
                                    "MMMM D, YYYY"
                                  )}
                                </p>
                              </div>
                            </div>
                            <div
                              className="trash-icon"
                              onClick={() => deleteComment(comment.id)}
                            >
                              <IoTrash className="text-danger" />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-dark mt-3">
                <Link to="/login" className="text-decoration-none">
                  {" "}
                  Sign in
                </Link>
                &nbsp; or &nbsp;
                <Link to="/register" className="text-decoration-none">
                  Sign up
                </Link>{" "}
                to add comments on this article.
              </p>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};
