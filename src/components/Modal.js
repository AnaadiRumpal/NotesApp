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
    useEffect(() => {
      if (props.onNoteAdded) {
          clickedtoclose();
      }
    }, [props.onNoteAdded]);

  return (
    <div className={`fixed inset-0 w-full   flex-col flex  items-center z-50 overflow-y-auto duration-300 ease-in-out ${isAnimating ? 'backdrop-blur-sm' : ' backdrop-blur-0'}`} onClick={clickedtoclose }>
      <div className={`transition-all w-full flex-col flex  items-center duration-300 ease-in-out ${isAnimating ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className=' justify-between flex flex-row'>       
              <button className='mt-12 m-4 mb-0 text-lg font-bold p-2 px-4 text-black bg-white rounded-full w-fit'> Go Back</button>
          </div>
        <div className="sm:w-1/2 w-full h-fit " onClick={(e) => e.stopPropagation()}>
          {props.children}
        </div>
      </div>
      
    </div>
  );
};

export default Modal;
