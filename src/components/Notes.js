import React from 'react';


const Notes = (props) => {
  const dateTimeParts = props.dateTime.split(' ');
  const dateparts = dateTimeParts[0].split('-');
  const year = dateparts[0];
  const month = dateparts[1];
  const day = dateparts[2];
  const time = dateTimeParts[1];
  return (
    <li className="">
      <div className='flex flex-col'>
        <div className='flex flex-row mb-4'>
          <div className='bg-sky-900 text-center  p-2 mr-4 rounded-xl border-b-2 text-white border-white'>
            <p className='text-md font-semibold'>{month} {day}</p>
            <p className='text-sm'>{year}</p>
          </div>
          <div className='flex  flex-col'> 
            <div><p className='text-2xl font-bold mb-4'>{props.heading}</p></div>
            <div className=' text-sm w-fit font-semibold text-gray-800'>      <p>{time}</p></div>
          </div>
          
        </div>
        <div>      <p className='font-semibold'>{props.text}</p></div>
      </div>
      
      
    </li>
  );
};

export default Notes;
