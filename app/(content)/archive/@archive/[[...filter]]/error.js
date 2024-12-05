"use client";

export default function FilterError({error}){
    return(
        <>
        <div id="error">
            <h2>Error occured!</h2>

            {/* page.js'de throw new error e verilen kısım = error.message */}
            <p>{error.message}</p> 
        </div>
        </>

    )

}