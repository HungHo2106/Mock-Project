import "./styles.css";
import { Nav, Row, Col } from "react-bootstrap";
import {
  IoSettingsSharp,
  IoHeart,
  IoTrash,
  IoLocationSharp,
} from "react-icons/io5";
import { FaPlus, FaCheck } from "react-icons/fa";
import { AiFillVideoCamera } from "react-icons/ai";
import {
  BsFillEmojiSmileFill,
  BsFillSuitHeartFill,
  BsThreeDots,
} from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { httpClient } from "../../api/httpClient";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../globalContext";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setProfileArticle } from "../../redux/store/slice/article";
import { AiFillLike, AiOutlineLike, AiTwotoneCamera } from "react-icons/ai";
import { TfiComment } from "react-icons/tfi";
import { RiShareForwardLine } from "react-icons/ri";
import { BsImages } from "react-icons/bs";
import { FcHome } from "react-icons/fc";
import { PaginationComponent } from "../../components/Pagination";

export const ProfilePage = () => {
  const { username } = useParams();
  const { isLoggedIn, profile, setProfile, commentList, setCommentList } =
    useContext(GlobalContext);

  const currentUser = useSelector((store: any) => store.currentUser);
  const profileArticles = useSelector((store: any) => store.profileArticle);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(3);
  const [mode, setMode] = useState("my-articles");
  const [showComment, setShowComment] = useState(false);
  const navigate = useNavigate();

  const getProfile = () => {
    httpClient.get(`profiles/${username}`).then((response: any) => {
      setProfile(response.data);
    });
  };

  const getArticleOfProfile = () => {
    if (mode === "my-articles") {
      httpClient.get(`articles?author=${username}`).then((response: any) => {
        dispatch(setProfileArticle(response.data.articles));
      });
    } else if (mode === "favorited-articles") {
      httpClient.get(`articles?favorited=${username}`).then((response: any) => {
        dispatch(setProfileArticle(response.data.articles));
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, [username]);

  useEffect(() => {
    getArticleOfProfile();
  }, [mode, username]);

  const follow = () => {
    if (isLoggedIn) {
      httpClient
        .post(`profiles/${profile.profile.username}/follow`)
        .then((response: any) => {
          setProfile(response.data);
        });
    } else {
      navigate("/login");
    }
  };

  const unfollow = () => {
    if (isLoggedIn) {
      httpClient
        .delete(`profiles/${profile.profile.username}/follow`)
        .then((response: any) => {
          setProfile(response.data);
        });
    } else {
      navigate("/login");
    }
  };

  const favorite = (slug: any) => {
    httpClient.post(`articles/${slug}/favorite`).then((res: any) => {
      const index = profileArticles.articles.findIndex(
        (a: any) => a.slug === slug
      );
      if (index < 0) return;
      const cloneFavoriteArticles = [...profileArticles.articles];
      const selectedArticle = { ...cloneFavoriteArticles[index] };
      selectedArticle.favorited = true;
      selectedArticle.favoritesCount = res.data.article.favoritesCount;
      cloneFavoriteArticles[index] = selectedArticle;
      dispatch(setProfileArticle(cloneFavoriteArticles));
    });
  };

  const unfavorite = (slug: any) => {
    httpClient.delete(`articles/${slug}/favorite`).then((res: any) => {
      const index = profileArticles.articles.findIndex(
        (a: any) => a.slug === slug
      );
      if (index < 0) return;
      const cloneFavoriteArticles = [...profileArticles.articles];
      const selectedArticle = { ...cloneFavoriteArticles[index] };
      selectedArticle.favorited = false;
      selectedArticle.favoritesCount = res.data.article.favoritesCount;
      cloneFavoriteArticles[index] = selectedArticle;
      dispatch(setProfileArticle(cloneFavoriteArticles));
    });
  };

  // const getComment = (slug: any) => {
  //   httpClient.get(`articles/${slug}/comments`).then((response: any) => {
  //     setCommentList(response.data.comments, commentList);
  //   });
  // };

  //Logic Create Pagination
  const indexOfLastArticle = currentPage * itemPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemPerPage;
  const articleFilterPagine = profileArticles.articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  return (
    <>
      <div className="pb-5 mb-4 profile-container">
        <div className="cover-image">
          <div className="col-12 profile-information">
            <img src={profile.profile.image} className="user-img" alt="" />
            <h2 className="my-2">{profile.profile.username}</h2>
            <p>{profile.profile.bio}</p>
            <div>
              {profile.profile.username && currentUser.user.user.username ? (
                profile.profile.username === currentUser.user.user.username ? (
                  <Link to="/settings" className="text-decoration-none">
                    <button className="btn btn-sm btn-success d-flex align-items-center mx-4">
                      <IoSettingsSharp />
                      <span className="mx-1 ">Chỉnh sửa trang cá nhân</span>
                    </button>
                  </Link>
                ) : (
                  <>
                    {profile.profile.following ? (
                      <button
                        className="btn btn-sm btn-success action-btn mx-4"
                        onClick={unfollow}
                      >
                        <FaCheck className="mb-1" />{" "}
                        <span>Unfollow {profile.profile.username}</span>
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-secondary action-btn mx-4"
                        onClick={follow}
                      >
                        <FaPlus className="mb-1" />{" "}
                        <span>Follow {profile.profile.username}</span>
                      </button>
                    )}
                  </>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-end action-cover-image">
            <AiTwotoneCamera />
          </div>
        </div>

        <Nav fill variant="tabs">
          <div className="d-flex profile-tabs">
            <Nav.Item onClick={() => setMode("favorited-articles")}>
              <Nav.Link className="tab">Bài viết yêu thích</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={() => setMode("my-articles")}>
              <Nav.Link className="tab">Tường của tôi</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="tab">Giới thiệu</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="tab">Bạn bè</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="tab">Ảnh</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="tab">Check in</Nav.Link>
            </Nav.Item>
          </div>
        </Nav>
        <div>
          <Row className="m-0 article-profile-container">
            <Col sm={4}>
              <div className="introduce-profile">
                <h3>Giới thiệu</h3>
                {profile.profile.username === currentUser.user.user.username ? (
                  <Link to="/settings">
                    <button className="introduce-btn">Thêm tiểu sử</button>
                  </Link>
                ) : (
                  <Link to={""}>
                    <button className="introduce-btn">Xem tiểu sử</button>
                  </Link>
                )}

                <div className="address-info">
                  <FcHome className="introduce-icon" /> Sống tại <b>Hà Nội</b>
                </div>
                <div className="address-info">
                  <IoLocationSharp className="introduce-icon" /> Đến từ{" "}
                  <b>Hà Nội</b>
                </div>
                <div className="address-info">
                  <BsFillSuitHeartFill className="introduce-icon" /> Độc thân
                </div>
                {profile.profile.username === currentUser.user.user.username ? (
                  <Link to="/settings">
                    <button className="introduce-btn">
                      Chỉnh sửa chi tiết
                    </button>
                    <button className="introduce-btn">Thêm sở thích</button>
                  </Link>
                ) : (
                  <Link to={""}>
                    <button className="introduce-btn">Xem chi tiết</button>
                    <button className="introduce-btn">Xem sở thích</button>
                  </Link>
                )}

                <Link to="/editor">
                  <button className="introduce-btn">
                    Thêm nội dung đáng chú ý
                  </button>
                </Link>
              </div>
              <div className="friends-profile">
                <h3>Bạn bè</h3>
                {profile.profile.username === currentUser.user.user.username ? (
                  <p>4.999 người bạn</p>
                ) : (
                  <p>99 bạn chung</p>
                )}
                <Row lg={3} className="friend-container">
                  <div>
                    <div className="friend-item"></div>
                    <p className="friend-name">Hung</p>
                  </div>
                  <div>
                    <div className="friend-item"></div>
                    <p className="friend-name">Nam</p>
                  </div>
                  <div>
                    <div className="friend-item"></div>
                    <p className="friend-name">Dũng</p>
                  </div>
                  <div>
                    <div className="friend-item"></div>
                    <p className="friend-name">Mai</p>
                  </div>
                  <div>
                    <div className="friend-item"></div>
                    <p className="friend-name">Thảo</p>
                  </div>
                  <div>
                    <div className="friend-item"></div>
                    <p className="friend-name">Hưng</p>
                  </div>
                  <div>
                    <div className="friend-item"></div>
                    <p className="friend-name">Linh</p>
                  </div>
                  <div>
                    <div className="friend-item"></div>
                    <p className="friend-name">Hà</p>
                  </div>
                  <div>
                    <div className="friend-item"></div>
                    <p className="friend-name">Cường</p>
                  </div>
                </Row>
              </div>
            </Col>
            <Col sm={8}>
              <div className="article-create ">
                <div className="article-create-header">
                  <img
                    className="article-avatar"
                    src={currentUser.user.user.image}
                    alt=""
                  />
                  <Link
                    to="/editor"
                    className="article-create-input text-decoration-none text-secondary"
                  >
                    <div>Bạn đang nghĩ gì thế</div>
                  </Link>
                </div>
                <div className="article-create-footer ">
                  <div className="article-create-footer-item">
                    <AiFillVideoCamera className="article-footer-icon text-danger" />{" "}
                    Video trực tiếp
                  </div>
                  <div className="article-create-footer-item">
                    <BsImages className="article-footer-icon text-success" />{" "}
                    Ảnh/Video
                  </div>
                  <div className="article-create-footer-item">
                    <BsFillEmojiSmileFill className="article-footer-icon text-warning" />{" "}
                    Cảm xúc
                  </div>
                </div>
              </div>
              {articleFilterPagine && articleFilterPagine.length > 0 ? (
                articleFilterPagine.map((article: any, index: number) => (
                  <div className="article-item" key={index}>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex mt-3">
                        <Link to={`profile/${article.author.username}`}>
                          <img
                            src={article.author.image}
                            className="article-avatar mt-2 "
                            alt=""
                          />
                        </Link>
                        <div className="mx-2">
                          <Link
                            to={`/profile/${article.author.username}`}
                            className="article-name-user m-0"
                          >
                            {article.author.username}
                          </Link>
                          <p className="article-date text-dark">
                            {moment(article.createdAt).format("MMMM D, YYYY")}
                          </p>
                        </div>
                      </div>
                      <button className="menu-icon">
                        <BsThreeDots />
                      </button>
                    </div>
                    <Link
                      to={`/article/${article.slug}`}
                      className="text-decoration-none text-dark"
                    >
                      <h1 className="article-content">{article.title}</h1>
                      <p className="article-description">
                        {article.description}
                      </p>
                    </Link>
                    <Link
                      to={`/article/${article.slug}`}
                      className="read-more text-decoration-none text-dark"
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
                    <div className="article-interactive d-flex justify-content-between">
                      <div>
                        <AiFillLike className="text-info" />
                        <IoHeart className="text-danger" />{" "}
                        <span className="text-dark">
                          {article.favoritesCount}
                        </span>
                      </div>
                      <div className="cursor-pointer">
                        <span className="mx-1">Bình luận</span>
                        <span className="mx-1">Chia sẻ</span>
                      </div>
                    </div>
                    <div className="article-footer">
                      <button
                        onClick={
                          article.favorited
                            ? () => unfavorite(article.slug)
                            : () => favorite(article.slug)
                        }
                        className="btn-article-action"
                      >
                        {article.favorited ? (
                          <>
                            <AiFillLike className="text-info article-icon" />
                            <span>Thích</span>
                          </>
                        ) : (
                          <>
                            <AiOutlineLike className="article-icon" />
                            <span>Thích</span>
                          </>
                        )}
                      </button>
                      <button
                        className="btn-article-action"
                        onClick={() => {
                          setShowComment(!showComment);
                          // getComment(article.slug);
                        }}
                      >
                        <TfiComment className="article-icon" />
                        <span>Bình luận</span>
                      </button>
                      <button className="btn-article-action">
                        <RiShareForwardLine className="article-icon" />
                        <span>Chia sẻ</span>
                      </button>
                    </div>
                    {showComment && (
                      <div className="comment">
                        <Link to={`/profile/${currentUser.user.user.username}`}>
                          <div className="d-flex align-items-center">
                            <img
                              className="article-avatar mx-1"
                              src={currentUser?.user?.user?.image}
                              width="40"
                              height="40"
                              alt=""
                            />
                            <Link
                              to={`/article/${article.slug}`}
                              className="input-comment-cover"
                            >
                              <input type="text" className="input-comment" />
                            </Link>
                          </div>
                        </Link>
                        {/* <div>
                          {commentList &&
                            commentList.length > 0 &&
                            commentList.map((comment: any) => (
                              <div className="card my-3" key={comment.id}>
                                <div className="card-block p-3">
                                  <p className="text-secondary">
                                    {comment.body}
                                  </p>
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
                                    // onClick={() => deleteComment(comment.id)}
                                  >
                                    <IoTrash className="text-danger" />
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div> */}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <h5 className=" mt-4 text-center">Không có bài viết nào</h5>
              )}
              <div className="d-flex justify-content-center my-3">
                <PaginationComponent
                  totalArticles={profileArticles.articles.length}
                  itemPerPage={itemPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
