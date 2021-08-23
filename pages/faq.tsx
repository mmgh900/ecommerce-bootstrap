import React, {useEffect, useState} from 'react';
import questionsData from '../data/faq.json'

import ContentLayout from "../components/content-layout/content-layout";
import Layout from "../components/layout/layout";
import NoSearchResult from "../errors/no-search-result";


const FAQ = () => {
    const [questions, setQuestions] = useState(questionsData);
    const [searchedString, setSearchedString] = useState(null);

    useEffect(() => {
        if (!searchedString || searchedString?.length === 0) {
            setQuestions(questionsData)
        } else {
            setQuestions(questionsData.filter((item) => item.question.includes(searchedString)))
        }
    }, [searchedString])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.currentTarget;
        setSearchedString(value);
    };

    const renderQuestions = () => {
        if (questions === undefined || questions?.length == 0) {
            return (
                <NoSearchResult
                    mainMassage={"سوالی یافت نشد"}
                    description={"لطفا عبارت دیگری را جستجو کنید"}
                    button={{
                        label: "مشاهده همه سوالات",
                        onClickHandler: (event) => {
                            setSearchedString(null)
                        }
                    }}
                />
            )
        }
        return questions.map(item => (
            <div className="accordion-item border-1 border-top-1 mb-3">
                <h2 className="accordion-header" id={"heading" + item.id}>
                    <button className={"p-4 accordion-button " + ((item.id == 1) ? "" : "collapsed")} type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={"#collapse" + item.id} aria-expanded={(item.id == 1) ? 'true' : 'false'}
                            aria-controls={"collapse" + item.id}>
                        {item.question}
                    </button>
                </h2>
                <div id={"collapse" + item.id}
                     className={"accordion-collapse collapse " + ((item.id == 1) ? 'show' : '')}
                     aria-labelledby={"collapse" + item.id}
                     data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                        {item.answer}
                    </div>
                </div>
            </div>
        ))
    }
    return (
        <Layout title={"پاسخ به سوالات پرتکرار"}>
            <ContentLayout
                heroTitle={"پاسخ به سوالات پرتکرار"}
                heroImage={"./images/heroes/faq.jpg"}
                cardTitle={(searchedString ? "نتایج جستجو برای عبارت " + `"${searchedString}"` : "پرتکرار ترین سوالات")}
                searchable={true}
                searchHandler={handleChange}
                searchPlaceHolder={"جستجو در سوالات"}
                searchValue={searchedString}
            >
                <div className="accordion" id="faqAccordion">
                    {renderQuestions()}
                </div>
            </ContentLayout>
        </Layout>
    )
}

export default FAQ;