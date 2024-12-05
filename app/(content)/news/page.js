import { DUMMY_NEWS } from "@/dummy_news";
import NewsList from "@/components/news-list";
import { useEffect, useState } from "react";

export default function NewsPage(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [news, setNews] = useState();

    useEffect(() => {
        async function fetchNews() {

            setIsLoading(true); // datayı çekmeden önce
            
            const response = await fetch('http://localhost:8080');
            
            if (!response.ok){
                setError("Failed to fetch data!");
                setIsLoading(false);
            }
            
            const news = await response.json(); // promise döner --> await
            setIsLoading(false);
            setNews(news);
        
        };
        
        fetchNews();
    }, []);

    if(isLoading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>{error}</p>
    }

    return(
        <>
        <h1>News Page</h1>
        <NewsList news={DUMMY_NEWS} />
        </>
    )
}