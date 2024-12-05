import { DUMMY_NEWS } from "@/dummy_news";
import { notFound } from "next/navigation";

export default function ImagePage({params}){
    const newsItemSlug = params.newsSlug;
    const newsItem = DUMMY_NEWS.find((news) => news.slug === newsItemSlug);

    if(!newsItem){
        notFound();
    }

    return(
        <div className="fullscreen-image">
            <p>Normal image page!</p>
            <img src={`/images/news/${newsItem.image}`} 
                 alt={newsItem.slug}/>

        </div>
    )
}

