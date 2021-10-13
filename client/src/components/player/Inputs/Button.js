import React, { useState, useEffect } from 'react';

const Button = React.forwardRef(({ content, onclick }, ref) => {
  const [currentContent, setCurrentContent] = useState('');

  useEffect(() => {
    setCurrentContent(content);
  }, [content]);

  return (
    <button ref={ref} className='btn btn-not-pressed' onClick={onclick}>
      <i className={currentContent}></i>
    </button>
  );
});

export default Button;
