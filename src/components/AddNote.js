import React, { useState, useRef } from 'react';


function AddNote(props) {
  const headingRef = useRef('');
  const textRef = useRef('');
  const [dateTime, setDateTime] = useState(new Date()); // Initialize with current date and time

  function submitHandler(event) {
    event.preventDefault();

    // could add validation here...
    const formattedTime = formatTime(dateTime.toISOString()); // Call formatTime before creating the note object

    const note = {
      heading: headingRef.current.value,
      text: textRef.current.value,
      dateTime: formattedTime, // Include automatically captured timestamp
    };

    props.onAddNote(note);
    props.onClose();
  }

  React.useEffect(() => {
    setDateTime(new Date());
  }, []);

  function formatTime(timeString) {
    const dateTime = new Date(timeString);
  
    if (dateTime > new Date()) {
      console.warn("This function cannot convert timestamps from the future to the past. Please provide a valid date in the past.");
      return;
    }
  
    const year = dateTime.getFullYear();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIndex = dateTime.getMonth();
    const month = monthNames[monthIndex];
  
    const day = dateTime.getDate();
    const paddedDay = day.toString().padStart(2, '0');
  
    let hours = dateTime.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const paddedHours = hours.toString().padStart(2, '0'); 
    const minutes = dateTime.getMinutes();
    const paddedMinutes = minutes.toString().padStart(2, '0'); 
  
    return `${year}-${month}-${paddedDay} ${paddedHours}:${paddedMinutes}${ampm}`;
}

  

  return (
    <form onSubmit={submitHandler} className='w-full'>
      <div className='text-right mb-4'>
        <button className='bg-blue-600 p-4 px-8 rounded-full text-white font-bold'>Add Note</button>
      </div>

      <div >
        <div className='rounded-2xl p-4 bg-white font-semibold'><input type='text' className='bg-white w-full  text-2xl text-black placeholder:text-gray-400' placeholder="Heading"ref={headingRef} /></div>
      </div>
      <div>
        <div className='rounded-2xl p-4 mt-4 bg-white font-semibold'>
          <textarea rows='30' className='bg-white  rounded-2xl w-full text-xl text-black' ref={textRef} placeholder='Type Here..'></textarea>
        </div>
      </div>


      </form>
  );
}

export default AddNote;