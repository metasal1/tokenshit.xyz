/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import React from 'react';
import styles from '../styles/Home.module.css'

export default function Home({tokens, count}) {

  const [ searchTerm, setSearchTerm] = React.useState('');

  return (
    <div className={styles.container}>
      <Head>
        <title>Solana Token List | tokenshit.xyz</title>
        <meta name="description" content="Solana Program Library token list updated at regular intervals straight from the source" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@metasal_" />
        <meta name="twitter:creator" content="@metasal_" />
        <meta name="twitter:title" content="Solana Token Lookup | tokenshit.xyz" />
        <meta name="twitter:description" content="Lookup Solana tokens - quick and easy" />
        <meta name="twitter:image" content="https://solwho.com/sns-desktop.png" />
        <meta name="twitter:image:alt" content="Lookup all the tokens and filter down" />
        <meta name="twitter:url" content="https://tokenshit.xyz" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Solana Token Lookup service" />
        <meta property="og:description" content="Lookup Solana tokens - quick and easy" />
        <meta property="og:url" content="https://tokenshit.xyz/" />
        <meta property="og:image" content="https://tokenshit.xyz/image.png" />
                
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className='sticky top-0 bg-primary text-secondary backdrop-blur-lg p-5 text-5xl font-extrabold rounded-2xl text-center'>
          Solana Token List
        </div>

        <p className="italic p-5">
        {count} tokens currently registered.
        </p>
        <div>
          <input onChange={event => {setSearchTerm(event.target.value)}} className='bg-black text-white p-2 rounded-lg w-11/12' type="search" placeholder='Filter your search...'></input>
        </div>

        <div className={styles.grid}>
<>
<div className="text-2xl font-medium p-5">50 Newest Tokens</div>
<div className='grid grid-cols-[2fr_2fr_4fr_1fr] gap-1 rounded-lg shadow-2xl p-5'>
  <div className='uppercase font-bold ' >Logo</div>
  <div className='uppercase font-bold '>Symbol</div>
  <div className='uppercase font-bold '>Name</div>
  <div className='uppercase font-bold '>Address</div>
            {tokens.filter((value)=>{
                if (searchTerm === "")
                {
                    return value
                }
                else if (value.name.toLowerCase().includes(searchTerm.toLowerCase()))
                {
                    return value
                }
            }).slice(0,50).map((token) => (
              <React.Fragment key={token.address} className="hover:bg-secondary">
              <div><img src={token.logoURI} width="25" height="25"/></div>
              <div>{token.symbol}</div>
              <div>{token.name}</div>
              <div>
              <a target="blank" href={`https://solscan.io/account/${token.address}`} className="blur-[2px] hover:blur-none"> 🔎 </a>
              {/* {token.address} */}
              </div>
              </React.Fragment>
            ))}
  </div>
</>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://milysec.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
export async function getServerSideProps(context) {
  // const hostname = context.req.headers.host;

  const res = await fetch(`https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json`)
  // const res = await fetch(`https://tokenshit-xyz.vercel.app/api/tokens`)
  const data = await res.json()
  
  const count = data.tokens.length;
  const tokens = data.tokens.reverse();
  // const tokens = data.tokens.slice(0,1000);

  return { props: { tokens, count } }
}
