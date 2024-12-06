import Link from "next/link"; 
import NewsList from "@/components/news-list";
import { 
    getAvailableNewsMonths, 
    getAvailableNewsYears, 
    getNewsForYear, 
    getNewsForYearAndMonth 
} from "@/lib/news";
import { Suspense } from "react";

// SUSPENSE İÇİN OLUŞTURULAN AYRI COMPONENT:
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
    
    const availableYears = await getAvailableNewsYears();
    let links = availableYears;
    
    
    if(selectedYear && !selectedMonth){
        // o yıla ait article ların ayları
        links = getAvailableNewsMonths(selectedYear);
    }

    if(selectedYear && selectedMonth){
        // news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
        links = [];
    } 
        

    // SQL'den çekilen data STRING olduğu için aşağıdaki IF statement'da +selectedYear 
    // diyerek Number'a çevirmeye gerek yok. aynı şekilde +selectedMonth a da gerek yok.
    if(
       (selectedYear && !availableYears.includes(selectedYear)) // url'e yanlış yıl girildiyse
       ||
       (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(selectedMonth)) // url'e yanlış ay girildiyse
    ){    
        throw new Error("Invalid filter!");
    }

    return(
        <>
        <header id="archive-header">
            <nav>
                <ul>
                    {/* links */}
                    {links.map((link) => 
                    {
                        // seçili yıl varsa o yıl içnde seçilebilecek ayları göster.
                        // seçili yıl yoksa direk yılları göster. default links = yıllar
                        const href = selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`;
                    
                        return(
                            <li key={link}>
                                <Link href={href}>{link}</Link>
                            </li>
                        )
                    }
                    )}
                </ul>
            </nav>
        </header>

        {/* {newsContent} */}
        <Suspense fallback={<p>Loading news...</p>}>
            <FilteredNews year={selectedYear} month={selectedMonth}/>
        </Suspense>
        </>
    )
};



