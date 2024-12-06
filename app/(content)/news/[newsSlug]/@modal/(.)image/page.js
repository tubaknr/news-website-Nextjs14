// import { DUMMY_NEWS } from "@/dummy_news";
import ModalBackdrop from "@/components/modal-backdrop";
import { notFound } from "next/navigation";
import { getNewsItem } from "@/lib/news";


export default async function interceptedImagePage({params}){
    const newsItemSlug = params.newsSlug;
    // const newsItem = DUMMY_NEWS.find((news) => news.slug === newsItemSlug);
    const newsItem = await getNewsItem(newsItemSlug);

    if(!newsItem){
        notFound();
    }

    return(
        <>
        {/* AŞAĞIDAKİ DIV'İ AYRI BİR COMP YAPARAK BU SAYFAYI SERVER-SIDE YAPABİLİR 
        VE SERVER-SIDE YAPINCA (YAVAŞ BACKEND'DEN DOLAYI AWAIT OALCAĞI İÇİN)
         ASYNC-AWAIT YAPABİLİRİZ */}

        <ModalBackdrop />
        <dialog className="modal" open>
            <div className="fullscreen-image">
                <p>Intercepted image page!!</p>
                <img src={`/images/news/${newsItem.image}`} 
                     alt={newsItem.slug}/>

            </div>
        </dialog>
        </>
        
    )
}

