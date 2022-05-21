/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
import Modal from "./Components/Modal";
import { useState, useEffect } from "react";
import TwitterMeta from "./Components/TwitterMeta";
import Footer from "./Components/Footer";

export default function Home({ tokens, count }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [ isOpen, setIsOpen ] = React.useState(false);
  const [ tokenAddress, setTokenAddress ] = React.useState('86aFUzjnSNr3DHTYBBFWoogNfvBCfWkSVYWtjJAWGcCH');
  const [ tokenData, setTokenData ] = React.useState('');

  useEffect(() => {
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify({
       "jsonrpc": "2.0",
       "id": 1,
       "method": "getTokenSupply",
       "params": [
         tokenAddress
       ]
     });
     
     fetch("https://api.mainnet-beta.solana.com", { 
       method: "POST",
       body: bodyContent,
       headers: headersList
     }).then(function(response) {
       return response.text();
     }).then(function(data) {
       console.log(data);
       setTokenData(data)
     })
  
  }, [tokenAddress])
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Solana Token List | tokenshit.xyz</title>
        <TwitterMeta />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="border-4 sticky top-0 bg-primary text-secondary backdrop-blur-lg p-5 text-5xl font-extrabold rounded-2xl text-center">
          Solana Token List
        </div>

        <p className="italic p-5">{count} tokens currently registered.</p>
        <div>
          <input
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            className="bg-black text-white p-2 rounded-lg w-11/12"
            type="search"
            placeholder="Filter your search..."
          ></input>
        </div>
        <div className={styles.grid}>
          <>
            <div className="text-2xl font-medium p-5">50 Newest Tokens</div>
            <div className="grid grid-cols-[2fr_2fr_4fr_1fr] gap-1 rounded-lg shadow-2xl p-5">
              <div className="uppercase font-bold ">Logo</div>
              <div className="uppercase font-bold ">Symbol</div>
              <div className="uppercase font-bold ">Name</div>
              <div className="uppercase font-bold ">Address</div>
              {tokens
                .filter((value) => {
                  if (searchTerm === "") {
                    return value;
                  } else if (
                    value.name.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .slice(0, 50)
                .map((token) => (
                  <React.Fragment key={token.address}>
                    <div className="max-w-lg mx-auto">
                      <img
                        src={token.logoURI}
                        alt={token.symbol}
                        width="25"
                        height="25"
                      />
                    </div>
                    <div>{token.symbol}</div>
                    <div>{token.name}</div>
                    <div>
                      <a className="cursor-pointer" target="blank" onClick={() => setIsOpen(true)}> 🔎 </a>
                      {/* <a target="blank" href={`https://solscan.io/account/${token.address}`}> 🔎 </a> */}
                      {/* {token.address} */}
                    </div>
                  </React.Fragment>
                ))}
            </div>
          </>
        </div>
      </main>
     <Footer />
      <Modal open={isOpen} onClose={() => {setIsOpen(false)}} />

    </div>
  );
}
export async function getServerSideProps(context) {
  // const hostname = context.req.headers.host;

  const res = await fetch(
    `https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json`
  );
  // const res = await fetch(`https://tokenshit-xyz.vercel.app/api/tokens`)
  const data = await res.json();

  const count = data.tokens.length;
  const tokens = data.tokens.reverse();
  // const tokens = data.tokens.slice(0,1000);

  return { props: { tokens, count } };
}
