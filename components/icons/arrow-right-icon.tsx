import React from 'react';

interface ArrowRightProps {
  color: string;
}

const ArrowRight: React.FC<ArrowRightProps> = ({ color }) => {
  return (
    <svg width='12' height='12' xmlns='http://www.w3.org/2000/svg'>
      <path
        fill={color}
        d='m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z'
        className='group-hover:fill-green-theme'
      />
    </svg>
  );
};

export default ArrowRight;
