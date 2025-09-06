import React from 'react';

function ExampleCarouselImage({ text, imageUrl }) {
  return (
    <div
      style={{
        height: '400px',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
      }}
    >
      {text}
    </div>
  );
}

export default ExampleCarouselImage;
