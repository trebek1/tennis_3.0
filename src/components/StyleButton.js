import React from 'react';

const StyleButton = ({ active, className, clickText, handleClick, text }) => (
  <span
    className={`${className} ${clickText === active ? 'active' : ''}`}
    key={text}
    onClick={() => handleClick(clickText)}
  >
    {text}
  </span>
);

export default StyleButton;
