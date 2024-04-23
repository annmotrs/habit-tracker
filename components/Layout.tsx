'use client';
import { IThemeContext, ThemeContext } from '../context/ThemeContext';
import { useContext, useEffect } from 'react';
import Header from './Header';

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { darkMode, updateTheme } = useContext(ThemeContext) as IThemeContext;
  useEffect(() => {
    updateTheme();
  });

  return (
    <div className={`${darkMode && 'dark'}`}>
      <div className="flex flex-col items-center bg-[#FDF7E7] dark:bg-slate-950 min-h-screen">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default Layout;
