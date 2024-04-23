'use client';
import Image from 'next/image';
import { IThemeContext, ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';
import Link from 'next/link';

function Header() {
  const { darkMode, toggleDarkMode } = useContext(
    ThemeContext
  ) as IThemeContext;
  let image: [string, string, number?] = darkMode
    ? ['/images/moon.png', 'moon', 24]
    : ['/images/sun.svg', 'sun', 24];

  const [src, alt, size] = image;

  return (
    <header className="container flex justify-start px-4 gap-4 flex-wrap pt-12">
      <div className="grow flex justify-center ml-14">
        <div className="relative z-0 text-center text-3xl font-medium before:content-[''] before:block before:w-10 before:h-6 before:bg-[#FDD47A] before:absolute before:-top-1 before:-left-1 before:-z-10 after:content-[''] after:w-10 after:h-6 after:bg-[#FDD47A] after:block after:absolute after:-bottom-1 after:-right-1 after:-z-10 dark:text-white">
          <Link href="/" className="block bg-[#FDF7E7] dark:bg-slate-950 p-1">
            Habit Tracker
          </Link>
        </div>
      </div>
      <button
        className="bg-white border-2 border-[#FDD47A] rounded-full w-10 h-10 cursor-pointer flex justify-center items-center"
        onClick={toggleDarkMode}
      >
        <Image src={src} width={size} height={size} alt={alt} />
      </button>
    </header>
  );
}

export default Header;
