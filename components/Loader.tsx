"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react';

const Loader = () => {
  // Fungsi untuk mengambil mode awal dari localStorage
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark';
    }
    return true; // Default dark mode
  };

  const [isDark, setIsDark] = useState<boolean>(getInitialTheme);
  useEffect(() => {
    // Saat pertama kali halaman dimuat, terapkan mode yang tersimpan di localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  return (
    <div className={`w-full ${isDark && "dark"}`}>
      <div className="loader">
        <Image
          src="/assets/icons/loader.svg"
          alt="loader"
          width={32}
          height={32}
          className="animate-spin"
        />
        Loading...
      </div>
    </div>
  )
}

export default Loader