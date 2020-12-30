import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { generateId } from '../utils/generateId';

const RouteBar = ({ location, ...props }) => {
  console.log(props);
  const [path, setPath] = useState([]);

  useEffect(() => {
    const path = location.pathname.split('/').filter(Boolean);
    setPath(path);
  }, [location.pathname]);

  console.log(path);

  const renderPath = path.map((url, index) => {
    return (
      <Fragment key={generateId()}>
        <Link
        // to={`${window.location.origin}/${path.join('/')}`}
        >
          {url}
        </Link>
      </Fragment>
    );
  });

  return <div className="route-bar">{renderPath}</div>;
};

export default RouteBar;
