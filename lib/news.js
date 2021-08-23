import parser from "persian-date-parser";
import NewsCard from "../components/news-card/news-card";
import React from "react";

export default function renderCards(newsData) {
    const parse = parser()
    const format = 'pjyyyy/pjmm/pjdd - pjdddd - pjHH:pjMM pjTT'


    return newsData.map((item) => {
        let date = parse(format, new Date(item.pubDate))
        let properCols = (item) => {
            if (newsData.indexOf(item) % 11 == 0) {
                return 'col-12 col-sm-12 col-lg-6'
            } else if (newsData.indexOf(item) % 11 == 1) {
                return 'col-12 col-sm-6 col-lg-6'
            } else {
                return 'col-12 col-sm-6 col-lg-4'
            }
        }
        return (
            <div className={properCols(item)}>
                <NewsCard key={item.title} title={item.title} link={item.link} desc={item.description}
                          img={item.thumbnail}
                          date={date}/>
            </div>
        );

    })
}