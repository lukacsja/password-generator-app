'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { includeOptions } from '@/lib/data';
import { CharacterType, PasswordStrength } from '@/lib/types';

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState<number>(10);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [charTypesToUse, setCharTypesToUse] = useState<CharacterType[]>([
    'uppercase',
    'lowercase',
    'number',
  ]);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>(
    PasswordStrength.TooWeak
  );
  const [isPasswordCopied, setIsPasswordCopied] = useState(false);

  const determinePasswordStrength = (
    options: CharacterType[],
    passwordLength: number
  ) => {
    const STRONG_THRESHOLD = 8;
    const MEDIUM_THRESHOLD = 6;
    const WEAK_THRESHOLD = 5;

    const weights = {
      0: passwordLength >= 12 ? 4 : 0,
      1: passwordLength >= 10 ? 3 : 0,
      2: passwordLength >= 8 ? 2 : 0,
      3: passwordLength >= 6 ? 1 : 0,
      4: passwordLength <= 4 ? -3 : 0,
      5: options.length >= 1 ? 1 : 0,
      6: options.length >= 2 ? 2 : 0,
      7: options.length >= 3 ? 3 : 0,
      8: options.length >= 4 ? 4 : 0,
    };

    const totalWeight = Object.values(weights).reduce(
      (acc, weight) => acc + weight,
      0
    );

    if (totalWeight >= STRONG_THRESHOLD) {
      return PasswordStrength.Strong;
    } else if (totalWeight >= MEDIUM_THRESHOLD) {
      return PasswordStrength.Medium;
    } else if (totalWeight >= WEAK_THRESHOLD) {
      return PasswordStrength.Weak;
    } else {
      return PasswordStrength.TooWeak;
    }
  };

  const handleCheckboxChange = (
    charType: CharacterType,
    isChecked: boolean
  ) => {
    if (isChecked) {
      const item = includeOptions.find((option) => option.type === charType);

      if (item) {
        setCharTypesToUse((prevOptions) => [
          ...prevOptions,
          item.type as CharacterType,
        ]);
      }
    } else {
      setCharTypesToUse((prevOptions) =>
        prevOptions.filter((option) => option !== charType)
      );
    }
  };

  const generatePassword = () => {
    const charSets = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      number: '0123456789',
      symbol: '!@#$%^&*()_+[]{}|;:\'"<>,.?/~`',
    };

    const getRandomInt = (min: number, max: number) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    };

    const result = [];

    let tempSet = charTypesToUse.map((option) => charSets[option]);

    for (let i = 0; i < passwordLength; i++) {
      const randomSet = tempSet[getRandomInt(0, tempSet.length)];
      result.push(randomSet[getRandomInt(0, randomSet.length)]);
    }

    setGeneratedPassword(result.join(''));
  };

  const generateStrengthColums = (strength: PasswordStrength) => {
    switch (strength) {
      case PasswordStrength.TooWeak:
        return (
          <div className='flex gap-2'>
            <div className='h-[28px] w-[10px] bg-red-theme' />
            <div className='h-[28px] w-[10px] border border-gray-light' />
            <div className='h-[28px] w-[10px] border border-gray-light' />
            <div className='h-[28px] w-[10px] border border-gray-light' />
          </div>
        );
      case PasswordStrength.Weak:
        return (
          <div className='flex gap-2'>
            <div className='h-[28px] w-[10px] bg-orange-theme' />
            <div className='h-[28px] w-[10px] bg-orange-theme' />
            <div className='h-[28px] w-[10px] border border-gray-light' />
            <div className='h-[28px] w-[10px] border border-gray-light' />
          </div>
        );
      case PasswordStrength.Medium:
        return (
          <div className='flex gap-2'>
            <div className='h-[28px] w-[10px] bg-yellow-theme' />
            <div className='h-[28px] w-[10px] bg-yellow-theme' />
            <div className='h-[28px] w-[10px] bg-yellow-theme' />
            <div className='h-[28px] w-[10px] border border-gray-light' />
          </div>
        );
      case PasswordStrength.Strong:
        return (
          <div className='flex gap-2'>
            <div className='h-[28px] w-[10px] bg-green-theme' />
            <div className='h-[28px] w-[10px] bg-green-theme' />
            <div className='h-[28px] w-[10px] bg-green-theme' />
            <div className='h-[28px] w-[10px] bg-green-theme' />
          </div>
        );
    }
  };

  useEffect(() => {
    const strength = determinePasswordStrength(charTypesToUse, passwordLength);
    if (strength) {
      setPasswordStrength(strength);
    }
  }, [charTypesToUse, passwordLength]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPassword);
      setIsPasswordCopied(true);

      setTimeout(() => {
        setIsPasswordCopied(false);
      }, 3000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return (
    <main className='flex w-full min-w-[350px] max-w-[540px] flex-col items-center justify-center'>
      <h1 className='mb-4 text-[16px] font-bold text-gray-medium md:mb-8 md:text-[24px]'>
        Password Generator
      </h1>
      <div className='flex w-full flex-col gap-4 text-[24px] font-bold text-gray-light md:gap-6 md:text-[32px]'>
        <div className='flex h-[64px] items-center justify-between bg-gray-dark p-4 md:h-[80px] md:px-8 md:py-5'>
          <h2 className='text-[24px] md:text-[32px]'>{generatedPassword}</h2>
          <div className='flex items-center gap-4'>
            {isPasswordCopied && (
              <div className='text-[16px] uppercase text-green-theme'>
                copied
              </div>
            )}
            <button onClick={copyToClipboard}>
              <Image
                src='/icons/icon-copy.svg'
                width={17.5}
                height={20}
                alt='copy to clipboard'
              />
            </button>
          </div>
        </div>

        <div className='flex flex-col gap-4 bg-gray-dark p-4 md:gap-8 md:px-8 md:py-6'>
          <div className='flex flex-col gap-2 md:gap-4'>
            <div className='flex items-center justify-between'>
              <h3 className='text-[16px] md:text-[24px]'>Character Length</h3>
              <h3 className='text-[24px] text-green-theme md:text-[32px]'>
                {passwordLength}
              </h3>
            </div>
            <div>
              <input
                type='range'
                min={1}
                max={20}
                value={passwordLength}
                className='range-selector'
                onChange={(e) => setPasswordLength(+e.target.value)}
              />
            </div>
          </div>
          <div className='flex flex-col gap-4 md:gap-5'>
            {includeOptions.map((option) => (
              <div
                key={option.title}
                className='flex gap-5 text-[16px] md:gap-6'
              >
                <div className='relative h-5 w-5'>
                  <input
                    className='h-5 w-5 cursor-pointer appearance-none border border-gray-light checked:border-none checked:bg-green-theme'
                    type='checkbox'
                    name={option.type}
                    checked={charTypesToUse.some(
                      (item) => item === option.type
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(
                        option.type as CharacterType,
                        e.target.checked
                      )
                    }
                  />
                  {charTypesToUse.some((item) => item === option.type) && (
                    <Image
                      src='/icons/icon-check.svg'
                      alt='check/uncheck option'
                      width={11}
                      height={8}
                      className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
                    />
                  )}
                </div>
                <label htmlFor={option.type} className='capitalize'>
                  {option.title}
                </label>
              </div>
            ))}
          </div>
          <div className='flex h-14 items-center justify-between bg-gray-darkest px-4 text-[16px] md:h-[72px] md:px-8 md:text-[24px]'>
            <div className='uppercase text-gray-medium'>strength</div>
            <div className='flex items-center gap-4'>
              <div className='uppercase'>{passwordStrength}</div>
              {generateStrengthColums(passwordStrength)}
            </div>
          </div>
          <button
            className='flex h-14 items-center justify-center gap-4 bg-green-theme text-[16px] uppercase text-gray-darkest transition-all duration-300 hover:border hover:border-green-theme hover:bg-gray-darkest hover:text-green-theme disabled:cursor-not-allowed disabled:bg-gray-dark md:h-[72px] md:gap-6 md:text-[24px]'
            disabled={
              passwordStrength === PasswordStrength.TooWeak ||
              charTypesToUse.length === 0
            }
            onClick={() => generatePassword()}
          >
            <span>generate</span>
            <Image
              src='/icons/icon-arrow-right.svg'
              alt='generate password'
              width={12}
              height={12}
            />
          </button>
        </div>
      </div>
    </main>
  );
};

export default PasswordGenerator;
