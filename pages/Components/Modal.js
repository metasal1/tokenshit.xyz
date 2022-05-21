import React from 'react'

export default function Modal({open, onClose, tokenAddress, tokenData }) {

    if (!open){
        return null
    }
  return (
    <div className="inset-0 fixed bg-secondary bg-opacity-20 flex justify-center items-center backdrop-blur-sm">
          <div id="modal" className="bg-secondary text-primary text-lg max-w-sm rounded-2xl p-3 shadow-lg fixed ">
            TOKEN {tokenAddress || 'got nada'}
            <div>
              {tokenData || 'din get data'}
            </div>
            <div id="closeBtn" onClick={onClose} className="text-xl hover:text-secondary hover:bg-primary cursor-pointer w-min p-1 rounded-md">
              X
            </div>
          </div>
        </div>
  )
}
