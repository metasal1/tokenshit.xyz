import React from 'react'
import styles from "../../styles/Home.module.css";
import Image from 'next/image';

export default function Footer() {
  return (
    <div> <footer className={styles.footer}>
    <a href="https://milysec.com" target="_blank" rel="noopener noreferrer">
      Powered by{" "}
      <span className={styles.logo}>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span>
    </a>
    <a>© Copyright {new Date().getFullYear()}</a>
    {/* <a>{performance.now().toPrecision(2) / 10000}sec</a> */}
  </footer></div>
  )
}
