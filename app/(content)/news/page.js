// DUMMY_NEWS is not used anymore! we have backend!
import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";

export default async function NewsPage(){
    const news = await getAllNews();
   
//     const response = await fetch('http://localhost:8080/news');
//     if(!response.ok){
//         throw new Error("Failed to fetch data!");
//     }

//     const news = await response.json(); // promise döner --> await --> async

    return(
        <>
        <h1>News Page</h1>
        <NewsList news={news} />
        </>
    )
}