import { useHistory } from 'react-router-dom';
import './HomePage.scss';

import homeBackground from '../../../asset/home-background.jpg';
import CollectionOverview from '../../collection-overview/CollectionOverview';
import CollectionOverviewWithSpinner from '../../hoc/CollectionOverviewWithSpinner';
import LazyImage from '../../lazy-image/LazyImage';

const HomePage = () => {
  const history = useHistory();
  const uri =
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/AABEIABEAGQMBEQACEQEDEQH/xAGiAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgsQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+gEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoLEQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AP4HdI0x9Tu4bdTgPIqk+xOM10HOtdFuz3T4mfCW08I6BpWpW8+4XNvGx2xkh5Cilj5jMCRlsAhSjc7SQM1hDE0ak5U4TTlH4l29fM9jF5DmuCwlHG4rCVKWGrq9KpKy5luny3vqvI+dTwSPQ1ueOFAHVeFb2Cyv4ZZyQiyBjj2YE8/QUpbP0Kg7Si1umvzPfvin8RdP8SeGtJ0y1YH7HAFbcxLdOmBwOnJ5J6nnk+bTwkYV51Yuzna+nW+vn933M+3zHiqvmOT4XLK0U44ZWi3v8/Lpa2u73bPlg9T9T/OvRj8K+f5nxEvify/ISqJLdp98fX/CgDbuv9Sv+7/jXOdBzR6n6n+dbQ+FfP8ANmM/ify/JCVRJ//Z';

  return (
    <>
      <div className="home-background">
        <LazyImage
          uri={uri}
          src={homeBackground}
          width={'100%'}
          height={'100%'}
          position={'absolute'}
        />
        <h2 className="shop-name">
          Bnd
          <span>Fashion Palaace</span>
        </h2>

        <div className="shop-now">
          <em>...shop quality products</em>
          <h2 className="shop-now-button" onClick={() => history.push('/shop')}>
            Shop Now
          </h2>
        </div>
      </div>
      <CollectionOverviewWithSpinner Component={CollectionOverview} />
    </>
  );
};

export default HomePage;
