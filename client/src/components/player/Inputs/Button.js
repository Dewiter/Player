import React, { useState, useEffect, useRef } from 'react';

const Button = React.forwardRef(({ content, onclick, customClass }, ref) => {
  const [currentContent, setCurrentContent] = useState('');

  useEffect(() => {
    setCurrentContent(() => content);
    ref?.current.classList.add(customClass);
  }, [, content]);

  return (
    <button ref={ref} className='btn btn-not-pressed' onClick={onclick}>
      <i className={currentContent}></i>
    </button>
  );
});

export default Button;
