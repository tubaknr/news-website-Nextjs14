import Link from "next/link"; 
import NewsList from "@/components/news-list";
import { 
    getAvailableNewsMonths, 
    getAvailableNewsYears, 
    getNewsForYear, 
    getNewsForYearAndMonth 
} from "@/lib/news";
import { Suspense } from "react";


// SUSPENSE İÇİN OLUŞTURULAN AYRI COMPONENT (HEADER İÇİN):
async function FilterHeader({year, month}) {
    //links ile ilgili olan her şey buraya taşındı:
    
    const availableYears = await getAvailableNewsYears();
    let links = availableYears;
        

    // SQL'den çekilen data STRING olduğu için aşağıdaki IF statement'da +selectedYear 
    // diyerek Number'a çevirmeye gerek yok. aynı şekilde +selectedMonth a da gerek yok.
    if((year && !availableYears.includes(year)) // url'e yanlış yıl girildiyse
        ||
       (month && !getAvailableNewsMonths(year).includes(month)) // url'e yanlış ay girildiyse
    ){    
        throw new Error("Invalid filter!");
    }
 
    if(year && !month){
         // o yıla ait article ların ayları
         links = getAvailableNewsMonths(year);
    }
    
    if(year && month){
        // news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
        links = [];
    } 
    
    return(
        <header id="archive-header">
            <nav>
                <ul>
                    {links.map((link) => 
                    {
                        // seçili yıl varsa o yıl içnde seçilebilecek ayları göster.
                        // seçili yıl yoksa direk yılları göster. default links = yıllar
                        const href = year ? `/archive/${year}/${link}` : `/archive/${link}`;
                        return(
                            <li key={link}>
                                <Link href={href}>{link}</Link>
                            </li>
                        )}
                    )}
                </ul>
            </nav>
        </header>
    )
}



// SUSPENSE İÇİN OLUŞTURULAN AYRI COMPONENT (NEWS İÇİN):
async function FilteredNews({year, month}){
    //news ile ilgili olan her şey buraya taşındı:
    let news;
    
    if(year && !month){
        news = await getNewsForYear(year);
    }else if(year & month){
        news = await getNewsForYearAndMonth(year, month);
    }

    const newsContent = news && news.length > 0 ? 
        (<NewsList news={news} />) :
        (<p>No news found for the selected period.</p>);

    return newsContent;
}


export default async function FilteredNewsPage({params}){
    const filter = params.filter || [];
    // console.log(filter);

    const selectedYear = filter?.[0];
    let selectedMonth = filter?.[1];
    
    if (selectedMonth === "undefined" || !selectedMonth) {
        selectedMonth = undefined;
    }
    


    return(
        <>
        <Suspense fallback={<p>Loading filter...</p>}>
            <FilterHeader year={selectedYear} month={selectedMonth}/>
        </Suspense>

        {/* {newsContent} */}
        <Suspense fallback={<p>Loading news...</p>}>
            <FilteredNews year={selectedYear} month={selectedMonth}/>
        </Suspense>
        </>
    )
};



