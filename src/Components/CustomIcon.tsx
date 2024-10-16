import React from 'react';

const CustomIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18" // Set your desired width
      height="18" // Set your desired height
      viewBox="0 0 24 24"
      fill="none" // Set fill color if needed
      stroke="#CA8144" // Use current color for stroke
      strokeWidth="2" // Set stroke width
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"></path>
    </svg>
  );
};

export default CustomIcon;
