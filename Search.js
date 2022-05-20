import React from "react";
import JSONDATA from "./list.json";

import { useState } from "react";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
        <input type="search" onChange={event => {setSearchTerm(event.target.value)}}></input>
        <div>
            {JSONDATA.tokens.length}
        </div>
        <div>
            {JSONDATA.tokens.reverse().filter((value)=>{
                if (searchTerm === "")
                {
                    return value
                }
                else if (value.name.toLowerCase().includes(searchTerm.toLowerCase()))
                {
                    return value
                }
            }).map( (v,k) => 
            <li id={k}>
             <img height="25" width="25" src={v.logoURI} alt={v.name} />  {v.symbol} | {v.name} | {v.address} 
                </li>
            )}
        </div>
            </>
    )
}