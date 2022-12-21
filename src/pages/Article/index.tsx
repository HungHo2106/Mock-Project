import "./style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { httpClient } from "../../api/httpClient";
import { GlobalContext } from "../../globalContext";
import { IoTrash } from "react-icons/io5";
import { FaEdit, FaTrashAlt, FaHeart, FaPlus } from "react-icons/fa";
import moment from "moment";

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
  const { currentUser, isLoggedIn, commentList, setCommentList } =
    useContext(GlobalContext);
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

  return (
    <>
      <div className="banner d-flex flex-column">
        <h1>{articleDetail.title}</h1>{" "}
        <div className="article-meta d-flex align-items-center my-3">
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
          {articleDetail.author.username && currentUser.user.username ? (
            articleDetail.author.username === currentUser.user.username &&
            articleDetail.author.username ? (
              <button className="btn btn-sm btn-info action-btn mx-2 d-flex">
                <Link
                  to={`/editor/${slug}`}
                  className="text-decoration-none text-light d-flex align-items-center"
                >
                  <FaEdit />
                  <span className="mx-1">Edit Article</span>
                </Link>
              </button>
            ) : profileUser.profile.following ? (
              <button className="btn btn-sm btn-info action-btn mx-2 d-flex">
                <span onClick={unfollow} className="d-flex align-items-center">
                  <span>
                    <FaPlus />
                  </span>
                  <span className="mx-1">
                    Unfollow {articleDetail.author.username}
                  </span>
                </span>
              </button>
            ) : (
              <button className="btn btn-sm btn-info action-btn mx-2 d-flex">
                <span onClick={follow} className="d-flex align-items-center">
                  <span>
                    <FaPlus className="mx-1 my-1" />
                  </span>
                  <span className="mx-1">
                    Follow {articleDetail.author.username}
                  </span>
                </span>
              </button>
            )
          ) : (
            <></>
          )}
          &nbsp;&nbsp; &nbsp;
          {articleDetail.author.username && currentUser.user.username ? (
            articleDetail.author.username === currentUser.user.username ? (
              <button
                className="btn btn-sm btn-danger action-btn d-flex "
                onClick={deleteArticle}
              >
                <span>
                  <FaTrashAlt className="mb-1 mx-1 my-1" />
                </span>
                <span>Delete Article</span>
              </button>
            ) : (
              <button className="btn btn-sm btn-danger action-btn ">
                <span>
                  {articleDetail.favorited ? (
                    <span
                      onClick={unfavorite}
                      className="d-flex align-items-center"
                    >
                      <span>
                        <FaHeart className="mx-1 my-1" />
                      </span>
                      <span>Unfavorite Post</span>
                      <span className="counter mx-1">
                        ({articleDetail.favoritesCount})
                      </span>
                    </span>
                  ) : (
                    <span onClick={favorite} className="d-flex">
                      <span>
                        <FaHeart className="mx-1 my-1" />
                      </span>
                      <span>
                        <span>Favorite Post</span>
                        <span className="counter mx-1">
                          ({articleDetail.favoritesCount})
                        </span>
                      </span>
                    </span>
                  )}
                </span>
              </button>
            )
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="container page">
        <div className="row ">
          <div className="col-md-12 article-body text-light">
            <p>{articleDetail.body}</p>
            {articleDetail.tagList.map((tag: any, index: number) => (
              <div className="tags">
                {tag ? <a key={index}>{tag}</a> : <></>}
              </div>
            ))}
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta d-flex align-items-center justify-content-center my-3">
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
              <p className="article-date text-light mb-0">
                {articleDetail.createdAt
                  ? moment(articleDetail.createdAt).format("MMMM D, YYYY")
                  : ""}
              </p>
            </div>
            {articleDetail.author.username && currentUser.user.username ? (
              articleDetail.author.username === currentUser.user.username ? (
                <button className="btn btn-sm btn-outline-info action-btn mx-2">
                  <Link
                    to={`/editor/${slug}`}
                    className="text-decoration-none text-light d-flex align-items-center"
                  >
                    <FaEdit />
                    <span className="mx-1">Edit Article</span>
                  </Link>
                </button>
              ) : profileUser.profile.following ? (
                <button className="btn btn-sm btn-outline-info action-btn mx-2">
                  <span
                    onClick={unfollow}
                    className="d-flex align-items-center"
                  >
                    <span>
                      <FaPlus />
                    </span>
                    <span className="mx-1">
                      Unfollow {articleDetail.author.username}
                    </span>
                  </span>
                </button>
              ) : (
                <button className="btn btn-sm btn-outline-info action-btn mx-2">
                  <span onClick={follow} className="d-flex align-items-center">
                    <span>
                      <FaPlus />
                    </span>
                    <span className="mx-1">
                      Follow {articleDetail.author.username}
                    </span>
                  </span>
                </button>
              )
            ) : (
              <></>
            )}
            &nbsp;&nbsp; &nbsp;
            {articleDetail.author.username && currentUser.user.username ? (
              articleDetail.author.username === currentUser.user.username ? (
                <button
                  className="btn btn-sm btn-danger action-btn d-flex align-items-center"
                  onClick={deleteArticle}
                >
                  <span>
                    <FaTrashAlt />
                  </span>
                  <span className="mx-1">Delete Article</span>
                </button>
              ) : (
                <button className="btn btn-sm btn-outline-danger action-btn">
                  <span>
                    {articleDetail.favorited ? (
                      <span
                        onClick={unfavorite}
                        className="d-flex align-items-center"
                      >
                        <span>
                          <FaHeart />
                        </span>
                        <span className="mx-1">Unfavorite Post</span>
                        <span className="counter">
                          ({articleDetail.favoritesCount})
                        </span>
                      </span>
                    ) : (
                      <span onClick={favorite} className="d-flex">
                        <span>
                          <FaHeart className="mx-1 my-1" />
                        </span>
                        <span>
                          Favorite Post{" "}
                          <span className="counter">
                            ({articleDetail.favoritesCount})
                          </span>
                        </span>
                      </span>
                    )}
                  </span>
                </button>
              )
            ) : (
              <></>
            )}
          </div>
        </div>

        {isLoggedIn ? (
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2  my-3">
              <form
                className="card comment-form"
                onSubmit={(e: any) => e.preventDefault()}
              >
                <div className="card-block">
                  <textarea
                    placeholder="Write a comment"
                    rows={3}
                    value={comment}
                    onChange={(e: any) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3">
                  <Link
                    to={`/profile/${currentUser.user.username}`}
                    className="text-decoration-none d-flex align-items-center"
                  >
                    <img
                      className="article-avatar"
                      src={currentUser.user.image}
                      alt=""
                    />
                    <p className="article-name-user mb-0 mx-1">
                      {currentUser.user.username}
                    </p>
                  </Link>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={postComment}
                  >
                    Post Comment
                  </button>
                </div>
              </form>

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
                            {moment(comment.createdAt).format("MMMM D, YYYY")}
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
        ) : (
          <p className="text-center text-light">
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
    </>
  );
};
