import "./style.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext, useCallback } from "react";
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
  const { currentUser } = useContext(GlobalContext);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
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
    httpClient
      .post(`profiles/${articleDetail.author.username}/follow`)
      .then((response: any) => {
        setProfileUser(response.data);
      });
  };

  const unfollow = () => {
    httpClient
      .delete(`profiles/${articleDetail.author.username}/follow`)
      .then((response: any) => {
        setProfileUser(response.data);
      });
  };

  useEffect(() => {
    httpClient.get(`articles/${slug}`).then((response: any) => {
      setArticleDetail(response.data.article);
    });
    httpClient
      .get(`profiles/${articleDetail.author.username}`)
      .then((response: any) => {
        setProfileUser(response.data);
      });
  }, [slug]);

  console.log(profileUser);

  useEffect(() => {
    httpClient.get(`articles/${slug}/comments`).then((response: any) => {
      setCommentList(response.data.comments);
    });
  }, [slug]);

  const postComment = () => {
    httpClient
      .post(`articles/${slug}/comments`, {
        comment: {
          body: comment,
        },
      })
      .then((response: any) => {
        sessionStorage.setItem("userToken", response.data.user.token);
        console.log(response.data.comments);
      });
  };

  const deleteArticle = () => {
    httpClient.delete(`articles/${slug}`).then((response: any) => {
      navigate("/");
    });
  };

  const favorite = () => {
    httpClient.post(`articles/${slug}/favorite`).then((response: any) => {
      setArticleDetail(response.data.article);
    });
  };

  const unfavorite = () => {
    httpClient.delete(`articles/${slug}/favorite`).then((response: any) => {
      setArticleDetail(response.data.article);
    });
  };

  return (
    <>
      <div className="article-page pb-5 mb-5">
        <div className="banner d-flex flex-column">
          <h1>{articleDetail.title}</h1>{" "}
          <div className="article-meta d-flex align-items-center my-3">
            <img
              className="article-avatar"
              src={articleDetail.author.image}
              alt=""
            />
            <div className="mx-2">
              <Link
                className="article-name-user m-0"
                to={`/profile/${articleDetail.author.username}`}
              >
                {articleDetail.author.username}
              </Link>
              <p className="article-date">
                {moment(articleDetail.createdAt).format("MMMM D, YYYY")}
              </p>
            </div>
            <button className="btn btn-sm btn-outline-secondary action-btn mx-2">
              <i className="ion-plus-round"></i>
              {articleDetail.author.username === currentUser.user.username ? (
                <Link
                  to={`/editor/${slug}`}
                  className="text-decoration-none text-light"
                >
                  <FaEdit className="mb-1" /> Edit Article
                </Link>
              ) : profileUser.profile.following ? (
                <span onClick={unfollow}>
                  <FaPlus className="mx-1" />
                  <span>Unfollow</span>
                </span>
              ) : (
                <span onClick={follow}>
                  <FaPlus className="mx-1" />
                  <span>Follow</span>
                </span>
              )}{" "}
              {articleDetail.author.username})
            </button>
            &nbsp;&nbsp; &nbsp;
            {articleDetail.author.username === currentUser.user.username ? (
              <button
                className="btn btn-sm btn-outline-danger action-btn"
                onClick={deleteArticle}
              >
                <span>
                  <FaTrashAlt className="mb-1 mx-1" />
                  Delete Article
                </span>
              </button>
            ) : (
              <button className="btn btn-sm btn-outline-success action-btn">
                <span>
                  {articleDetail.favorited ? (
                    <span onClick={unfavorite}>
                      <FaHeart className="mx-1" /> Unfavorite Post
                    </span>
                  ) : (
                    <span onClick={favorite}>
                      {" "}
                      <FaHeart className="mx-1" />
                      Favorite Post
                    </span>
                  )}{" "}
                </span>
                &nbsp;
                <span className="counter">
                  ({articleDetail.favoritesCount})
                </span>
              </button>
            )}
          </div>
        </div>
        <div className="container page">
          <div className="row ">
            <div className="col-md-12 article-body">
              <p>{articleDetail.body}</p>
              <div className="tags">
                {articleDetail.tagList.map((tag: any, index: number) => (
                  <a key={index}>{tag}</a>
                ))}
              </div>
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <div className="article-meta d-flex align-items-center justify-content-center my-3">
              <img
                className="article-avatar"
                src={articleDetail.author.image}
                alt=""
              />
              <div className="mx-2">
                <Link
                  className="article-name-user m-0"
                  to={`/profile/${articleDetail.author.username}`}
                >
                  {articleDetail.author.username}
                </Link>
                <p className="article-date">
                  {moment(articleDetail.createdAt).format("MMMM D, YYYY")}
                </p>
              </div>
              <button className="btn btn-sm btn-outline-secondary action-btn mx-2">
                {articleDetail.author.username === currentUser.user.username ? (
                  <Link
                    to={`/editor/${slug}`}
                    className="text-decoration-none text-dark"
                  >
                    <FaEdit className="mb-1" /> Edit Article
                  </Link>
                ) : profileUser.profile.following ? (
                  <span onClick={unfollow}>
                    <FaPlus className="mx-1" />
                    <span>Unfollow</span>
                  </span>
                ) : (
                  <span onClick={follow}>
                    <FaPlus className="mx-1" />
                    <span>Follow</span>
                  </span>
                )}{" "}
                {articleDetail.author.username}
              </button>
              &nbsp;&nbsp; &nbsp;
              {articleDetail.author.username === currentUser.user.username ? (
                <button
                  className="btn btn-sm btn-outline-danger action-btn"
                  onClick={deleteArticle}
                >
                  <span>
                    <FaTrashAlt className="mb-1 mx-1" />
                    Delete Article
                  </span>
                </button>
              ) : (
                <button className="btn btn-sm btn-outline-success action-btn">
                  <span>
                    {articleDetail.favorited ? (
                      <span onClick={unfavorite}>
                        <FaHeart className="mx-1" /> Unfavorite Post
                      </span>
                    ) : (
                      <span onClick={favorite}>
                        {" "}
                        <FaHeart className="mx-1" />
                        Favorite Post
                      </span>
                    )}{" "}
                  </span>
                  &nbsp;
                  <span className="counter">
                    ({articleDetail.favoritesCount})
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2  my-3">
              <form
                className="card comment-form"
                onSubmit={(e: any) => e.preventDefault()}
              >
                <div className="card-block">
                  <textarea
                    className="form-control"
                    placeholder="Write a comment"
                    rows={3}
                    value={comment}
                    onChange={(e: any) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3">
                  <Link to={`/profile/${currentUser.user.username}`}>
                    <img
                      className="article-avatar"
                      src={currentUser.user.image}
                      alt=""
                    />
                  </Link>
                  <button
                    className="btn btn-sm btn-primary"
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
                      <div className="trash-icon">
                        <IoTrash />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
