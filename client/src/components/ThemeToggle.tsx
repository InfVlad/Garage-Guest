'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

const ThemeToggle = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  /**
   * Con esto el componente muestra el icono correcto, ya que, asi este
   * espera a estar montado para luego confirmar si hay o no un Theme en el
   * localStorage
   */
  useEffect(() => {
    setIsMounted(!isMounted);
  }, []); //En este caso ESlint esta equivocado

  const icon = theme === 'dark' ? 'moon' : 'sun';
  const handleThemeToggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const rotationClass =
    theme === 'dark' ? 'animate-rotationBackwards' : 'animate-rotationForward';

  if (!isMounted) return null;
  return (
    <button
      title='Theme toggle'
      aria-label='Theme toggle'
      className='relative h-8 w-8 transition-all duration-300 ease-in-out'
      onClick={handleThemeToggle}
    >
      <Image
        alt='Theme'
        src={`/images/icons/${icon}.svg`}
        fill
        className={`${rotationClass}`}
      />
    </button>
  );
};

export default ThemeToggle;