"use client";
import { useRouter } from "next/navigation";
import { DUMMY_NEWS } from "@/dummy_news";
import { notFound } from "next/navigation";

export default function interceptedImagePage({params}){
    const router = useRouter();

    const newsItemSlug = params.newsSlug;
    const newsItem = DUMMY_NEWS.find((news) => news.slug === newsItemSlug);

    if(!newsItem){
        notFound();
    }

    return(
        <>
        <div className="modal-backdrop" onClick={router.back}/>
        <dialog className="modal" open>
            <div className="fullscreen-image">
                <img src={`/images/news/${newsItem.image}`} 
                     alt={newsItem.slug}/>

            </div>
        </dialog>
        </>
        
    )
}

