// Modal.js
import React, { useEffect, useState } from 'react';

const Modal = (props) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      setIsAnimating(true);
    }, []);
    const clickedtoclose = () => {
        setIsAnimating(false);
        setTimeout(() => {
            props.onClose();
          }, 300);
    };

  return (
    <div className={`fixed inset-0 w-full  backdrop-blur-sm flex-col flex    items-center z-50 overflow-y-auto transition-all duration-300 ease-in-out ${isAnimating ? 'translate-y-0' : 'translate-y-full'} `} onClick={clickedtoclose }>
        <div className=' justify-between flex flex-row'>       
            <div className='mt-12 m-4 mb-0 text-lg font-bold p-2 px-4 text-black bg-white rounded-full w-fit'> Go Back</div>
        </div>
      <div className="sm:w-1/2 w-full h-fit " onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
