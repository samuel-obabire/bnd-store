import { useRef } from 'react';

const style = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  objectPosition: 'center',
  position: 'absolute',
};

const LazyImage = ({
  uri = '',
  src = '',
  width,
  height,
  position = 'relative',
}) => {
  const ref = useRef(),
    onLoad = () => (ref.current.style.opacity = 1);

  return (
    <>
      <div
        style={{
          width,
          height,
          position,
        }}>
        <img style={style} src={uri} alt="" arial-aria-hidden="true" />
        <img
          ref={ref}
          src={src}
          alt=""
          onLoad={onLoad}
          style={{
            ...style,
            opacity: 0,
          }}
        />
      </div>
    </>
  );
};

export default LazyImage;
