import Head from "next/head";
import styles from "../styles/Home.module.css";
import Modal from "./Components/Modal";
import { useState, useEffect, Fragment } from "react";
import TwitterMeta from "./Components/TwitterMeta";
import Footer from "./Components/Footer";

export default function Home({ tokens, count }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [tokenAddress, setTokenAddress] = useState('DhpikB5Qf4YZRzeGpFiAcZdSPAETS1mLF94PZz3oUos1');
  const [tokenData, setTokenData] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");

  useEffect(() => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getTokenSupply",
      params: [tokenAddress],
    });

    fetch("https://api.mainnet-beta.solana.com", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        setTokenData(data);
      });
  }, [tokenAddress]);

  function doStuff(tokenAddress) {
    setIsOpen(true)
    setTokenAddress(tokenAddress);
    setTokenName(tokenName);
    setTokenSymbol(tokenSymbol);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Solana Token List | tokenshit.xyz</title>
        <TwitterMeta />
        <link rel="icon" href="/favicon.ico" />                
      </Head>

      <main className="p-5 font-bold">
        <div className="shadow-lg font-karma border-4 sticky top-0 bg-primary text-secondary backdrop-blur-lg p-5 text-3xl md:text-5xl text-center">
          Solana Token List
        </div>
<div className="text-center p-2 font-extralight italic">
        {count} tokens registered.
        </div>
        <div>
          <input
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            className="text-center bg-black text-white p-2 w-full md:3/4 lg:1/3 focus-within:"
            type="search"
            placeholder="Filter your search..."
          ></input>
        </div>
        <div className={styles.grid}>
          <>
            <div className="text-2xl font-medium p-2">Latest 50 Tokens</div>
            <div className="grid grid-cols-[2fr_2fr_4fr_1fr] gap-3 shadow-2xl p-5">
              <div className="header">Logo</div>
              <div className="header">Symbol</div>
              <div className="header">Name</div>
              <div className="header">Deets</div>
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
                  <Fragment key={token.address}>
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
                      {/* <a className="cursor-pointer" target="blank" onClick={() => setIsOpen(true)}> 🔎 </a> */}
                      <a
                        className="cursor-pointer"
                        target="blank"
                        onClick={() => doStuff(token.address)}
                      >
                        {" "}
                        🔎{" "}
                      </a>
                      <a
                        target="blank"
                        href={`https://solscan.io/account/${token.address}`}
                      >
                        {" "}
                        🔦{" "}
                      </a>
                    </div>
                  </Fragment>
                ))}
            </div>
          </>
        </div>
      </main>
      <Footer />
      <Modal
        tokenAddress={tokenAddress}
        tokenName={tokenName}
        tokenSymbol={tokenSymbol}
        tokenData={tokenData}
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
}
export async function getServerSideProps(context) {

  const res = await fetch(
    `https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens/solana.tokenlist.json`
  );
  const data = await res.json();
  const count = data.tokens.length;
  const tokens = data.tokens.reverse();

  return { props: { tokens, count } };
}
