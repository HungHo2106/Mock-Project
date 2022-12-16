import "./styles.css";
import { Nav, Row } from "react-bootstrap";
import { IoSettingsSharp, IoHeart } from "react-icons/io5";
import { FaPlus, FaCheck } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { httpClient } from "../../api/httpClient";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../globalContext";
import moment from "moment";

export const ProfilePage = () => {
  const [profile, setProfile] = useState({
    profile: { image: "", username: "", bio: "", following: "" },
  });
  const { username } = useParams();
  const { currentUser, isLoggedIn } = useContext(GlobalContext);
  const [myArticle, setMyArticle] = useState([]);
  const [mode, setMode] = useState("my-articles");
  const navigate = useNavigate();

  const getProfile = () => {
    httpClient.get(`profiles/${username}`).then((response: any) => {
      setProfile(response.data);
    });
  };

  const getArticleOfProfile = () => {
    if (mode === "my-articles") {
      httpClient.get(`articles?author=${username}`).then((response: any) => {
        setMyArticle(response.data.articles);
      });
    } else if (mode === "favorited-articles") {
      httpClient.get(`articles?favorited=${username}`).then((response: any) => {
        setMyArticle(response.data.articles);
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
    httpClient.post(`articles/${slug}/favorite`).then((response: any) => {
      getArticleOfProfile();
    });
  };

  const unfavorite = (slug: any) => {
    httpClient.delete(`articles/${slug}/favorite`).then((response: any) => {
      getArticleOfProfile();
    });
  };

  return (
    <>
      <div className="pb-5 mb-5">
        <div className="user-info py-4 bg-light">
          <div className="col-12 text-center">
            <img src={profile.profile.image} className="user-img" alt="" />
            <h4 className="my-2">{profile.profile.username}</h4>
            <p>{profile.profile.bio}</p>
          </div>
          <div className="col-12 d-flex justify-content-end">
            {profile.profile.username === currentUser.user.username ? (
              <Link to="/settings">
                <button className="btn btn-sm btn-outline-secondary action-btn mx-4">
                  <IoSettingsSharp className="mb-1" />{" "}
                  <span>Edit Profile Settings</span>
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
            )}
          </div>
        </div>

        <div className="container">
          <div className="my-4">
            <Row>
              <Nav variant="tabs" defaultActiveKey="/">
                <Nav.Item>
                  <Nav.Link
                    onClick={() => setMode("my-articles")}
                    className="text-success"
                    active={mode === "my-articles"}
                  >
                    My Articles
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    onClick={() => setMode("favorited-articles")}
                    className="text-success"
                    active={mode === "favorited-articles"}
                  >
                    Favourited Articles
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Row>

            {myArticle &&
              myArticle.length > 0 &&
              myArticle.map((article: any, index: number) => (
                <div key={index}>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex mt-3">
                      <Link to={`profile/${article.author.username}`}>
                        <img
                          src={article.author.image}
                          className="article-avatar mt-2"
                          alt=""
                        />
                      </Link>
                      <div className="mx-2">
                        <Link
                          to={`profile/${article.author.username}`}
                          className="article-name-user m-0"
                        >
                          {article.author.username}
                        </Link>
                        <p className="article-date">
                          {moment(article.createdAt).format("MMMM D, YYYY")}
                        </p>
                      </div>
                    </div>
                    <button
                      className={`btn-heart btn ${
                        article.favorited
                          ? "btn-success"
                          : "btn-outline-success"
                      }  d-flex justify-content-center align-items-center mt-3`}
                      onClick={
                        article.favorited
                          ? () => unfavorite(article.slug)
                          : () => favorite(article.slug)
                      }
                    >
                      <IoHeart className="mx-1" /> {article.favoritesCount}
                    </button>
                  </div>
                  <Link
                    to={`/article/${article.slug}`}
                    className="text-decoration-none text-secondary"
                  >
                    <h1 className="article-content">{article.title}</h1>
                    <p className="article-description">{article.description}</p>
                  </Link>
                  <Link
                    to={`/article/${article.slug}`}
                    className="read-more text-decoration-none text-secondary"
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
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
