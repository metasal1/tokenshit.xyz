import React from "react";
import { useState } from "react";
export default function Modal({ open, onClose, tokenAddress, tokenData, tokenName, tokenSymbol }) {

  if (!open) {
    return null;
  }
  return (
    <div className="inset-0 fixed bg-secondary bg-opacity-20 flex justify-center items-center backdrop-blur-sm">
      <div
        id="modal"
        className="bg-secondary text-primary max-w-sm p-3 shadow-lg fixed border-primary border-4 "
      >
         <div
          id="closeBtn"
          onClick={onClose}
          className="text-xl hover:text-secondary hover:bg-primary cursor-pointer w-min p-2 absolute right-1"
        >
          X
        </div>
        <div className="font-karma text-bold text-4xl pb-10">TOKEN INFORMATION</div>

        <p className="font-karma">Token Name</p>
        <p className="text-2xl">{tokenName || 'got nothing'}</p>
        <p className="font-karma">Token Symbol</p>
        <p className="text-2xl">{tokenSymbol || 'got nothing'}</p>
        <h2 className="font-karma">Token Address</h2>
        <p id="no" className="overflow-auto">{tokenAddress || 'got nothing'}</p>
        <button>✂️</button>

        <h2 className="font-karma">Total Supply</h2>
        <p className="text-2xl">{tokenData.result.value.amount || 'got nothing'}</p>

        <a
                        target="blank"
                        href={`https://solscan.io/account/${tokenAddress}`}
                      >
                        {" "}
                        🔦{" "}
                      </a>
       
      </div>
    </div>
  );
}
