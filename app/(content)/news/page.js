"use client";
// DUMMY_NEWS is not used anymore! we have backend!
import NewsList from "@/components/news-list";
import { useEffect, useState } from "react";

export default async function NewsPage(){
   
    const response = await fetch('http://localhost:8080/news');
    if(!response.ok){
        throw new Error("Failed to fetch data!");
    }

    const news = await response.json(); // promise döner --> await --> async

    // let newsContent;
    // if (news){ //doğru çekilebilmmiş ise
    //     newsContent = <NewsList news={news} />
    // }

    return(
        <>
        <h1>News Page</h1>
        <NewsList news={news} />
        </>
    )
}