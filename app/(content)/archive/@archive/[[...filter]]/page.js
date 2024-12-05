import Link from "next/link"; 
import NewsList from "@/components/news-list";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";

export default function FilteredNewsPage({params}){
    const filter = params.filter || [];
    console.log(filter);

    const selectedYear = filter?.[0];
    let selectedMonth = filter?.[1];
    
    if (selectedMonth === "undefined" || !selectedMonth) {
        selectedMonth = undefined;
    }
    
    let news;
    let links = getAvailableNewsYears();
    
    if(selectedYear && !selectedMonth){
        news = getNewsForYear(selectedYear);
        // o yıla ait article ların ayları
        links = getAvailableNewsMonths(selectedYear);
    }

    if(selectedYear && selectedMonth){
        news = getNewsForYearAndMonth(selectedYear, selectedMonth);
        links = [];
    }

    

    const newsContent = news && news.length > 0 ? 
        (<NewsList news={news} />) :
        (<p>No news found for the selected period.</p>);
    
        
    if(
       (selectedYear && !getAvailableNewsYears().includes(+selectedYear)) // url'e yanlış yıl girildiyse
       ||
       (selectedMonth && !getAvailableNewsMonths(selectedYear).includes(+selectedMonth)) // url'e yanlış ay girildiyse
    //     console.log("selectedYear : ", selectedYear);
    //     console.log("includesss??? : ", getAvailableNewsYears().includes(selectedYear));
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

        {newsContent}
        </>
    )
}