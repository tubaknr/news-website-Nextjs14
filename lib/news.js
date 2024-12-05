import { DUMMY_NEWS } from "@/dummy_news";

export function getAllNews(){
    return DUMMY_NEWS;
}

export function getLatestNews(){
    return DUMMY_NEWS.slice(0,3);
}

// article olan tüm yılları getir
export function getAvailableNewsYears(){
    return DUMMY_NEWS.reduce((years, news) => {
        const year = new Date(news.date).getFullYear();
        if(!years.includes(year)){
            years.push(year);
        }
        return years;
    }, []).sort((a,b) => b-a);
}

// verdiğim yıl içide article olan ayları getir
export function getAvailableNewsMonths(year) {
    return DUMMY_NEWS.reduce((months, news) => {
      const newsYear = new Date(news.date).getFullYear();
      if (newsYear === +year) {
        const month = new Date(news.date).getMonth();
        if (!months.includes(month)) {
          months.push(month + 1);
        }
      }
      return months;
    }, []).sort((a, b) => b - a);
  }

// verdiğim yıla ait haberleri getir
export function getNewsForYear(year){
    return DUMMY_NEWS.filter(
        (news) => new Date(news.date).getFullYear() === +year
    );
}

export function getNewsForYearAndMonth(year, month){
    return DUMMY_NEWS.filter(
        (news) => {
            const newsYear = new Date(news.date).getFullYear();
            const newsMonth = new Date(news.date).getMonth() + 1;
            return newsYear === +year  && newsMonth === +month;
        }
    );
}



