import './HomePage.scss';

import homeBackground from '../../../asset/home-background.jpg';

const HomePage = () => {
  return (
    <>
      <div
        className="home-background"
        style={{
          backgroundImage: `url(${homeBackground})`,
        }}>
        <h2 className="shop-name">
          Bnd
          <span>Clothings</span>
        </h2>

        <div className="shop-now">
          <em>...shop quality products</em>
          <h2 className="shop-now-button">Shop Now</h2>
        </div>
      </div>
    </>
  );
};

export default HomePage;
