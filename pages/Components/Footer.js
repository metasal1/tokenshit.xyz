import React from 'react'
import styles from "../../styles/Home.module.css";
import Image from 'next/image';
import useDarkMode from "../hooks/useDarkMode";

export default function Footer() {

  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);

  return (
    <div> <footer className={styles.footer}>
    <a href="https://milysec.com" target="_blank" rel="noopener noreferrer">
      Powered by{" "}
      <span className={styles.logo}>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span>
    </a>        <button className="hover:bg-black hover:rounded-full hover:p-1" title='switch between dark mode or light mode' onClick={handleMode}>
          {darkTheme ? "☀️" : "🌙"}
        </button>

    <a>© Copyright {new Date().getFullYear()}</a>
    {/* <a>{performance.now().toPrecision(2) / 10000}sec</a> */}
  </footer></div>
  )
}
