// import { DUMMY_NEWS } from "@/dummy_news";
import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";

export default async function ImagePage({params}){
    const newsItemSlug = params.newsSlug;
    // const newsItem = DUMMY_NEWS.find((news) => news.slug === newsItemSlug);
    const newsItem = await getNewsItem(newsItemSlug);

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

