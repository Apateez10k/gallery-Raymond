import React from 'react';
import ReactDOM from 'react-dom';
import ApateezGallery from './src/index.jsx';

const Gallery = () => (
  <div>
    <ApateezGallery />
  </div>
);

const GalleryLoader = (id) => {
  ReactDOM.hydrate(React.createElement(Gallery), document.getElementById(id));
};

window.Gallery = Gallery;
window.GalleryLoader = GalleryLoader;
