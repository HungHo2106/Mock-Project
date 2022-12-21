import "./style.css";
export const HeroComponent = () => {
  return (
    <div className="hero">
      <div className="image-container">
        <div className="hero-content">
          <p>Taking you to the best places</p>
          <a href="#home-container">
            <button className="btn-getstarted">Get Started</button>
          </a>
        </div>
      </div>
    </div>
  );
};
