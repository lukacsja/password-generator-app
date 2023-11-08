'use client';

import { includeOptions } from '@/lib/data';
import Image from 'next/image';
import React, { useState } from 'react';

const PasswordGenerator = () => {
  const [currentStrength, setCurrentStrength] = useState<number>(10);

  return (
    <main className='flex w-full max-w-[540px] flex-col items-center justify-center '>
      <h1 className='mb-4 text-[16px] font-bold text-gray-medium md:mb-8 md:text-[24px]'>
        Password Generator
      </h1>
      <div className='flex w-full flex-col gap-4 text-[24px] font-bold text-gray-light md:gap-6 md:text-[32px]'>
        <div className='flex items-center justify-between bg-gray-dark p-4 md:px-8 md:py-5'>
          <h2>asd</h2>
          <button>
            <Image
              src='/icons/icon-copy.svg'
              width={17.5}
              height={20}
              alt='copy to clipboard'
            />
          </button>
        </div>

        <div className='bg-gray-dark p-4 md:px-8 md:py-6'>
          <div className='flex flex-col gap-2 md:gap-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-[16px] md:text-[24px]'>Character Length</h3>
              <h3 className='text-[24px] text-green-theme md:text-[32px]'>
                {currentStrength}
              </h3>
            </div>
            <div>
              <input
                type='range'
                min={1}
                max={20}
                value={currentStrength}
                className='h-2 w-full'
                onChange={(e) => setCurrentStrength(+e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-4 md:gap-5'>
              {includeOptions.map((option) => (
                <div
                  key={option.title}
                  className='flex gap-5 text-[16px] md:gap-6'
                >
                  <input type='checkbox' name={option.type} />
                  <label htmlFor={option.type}>{option.title}</label>
                </div>
              ))}
            </div>
            <div className='flex h-14 items-center justify-between bg-gray-darkest px-4 text-[16px] md:h-[72px] md:px-8 md:text-[24px]'>
              <div className='text-gray-medium'>STRENGTH</div>
              <div>
                <div>MEDIUM</div>
              </div>
            </div>
            <div className='flex h-14 items-center justify-center bg-green-theme text-[16px] text-gray-darkest md:h-[72px] md:text-[24px]'>
              <button>GENERATE</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PasswordGenerator;
