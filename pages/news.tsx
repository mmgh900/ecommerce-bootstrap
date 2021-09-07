import * as React from 'react';
import './news.module.scss'
import ContentLayout from "../components/content-layout/content-layout";
import renderCards from "../lib/news";
import { GetStaticProps} from 'next'
import getApiUrl from "../lib/backend-root";
import Layout from "../components/layout/layout";

export default function News ({data}) {

    return (
        <Layout title={"اخبار"}>
            <ContentLayout heroTitle={"اخبار و تازه های خودرو"} heroImage={"/images/heroes/news.jpg"}
                           cardTitle={"آخرین اخبار خودرو"} searchable={false}>
                <div className={"row g-3 /*row-cols-2 row-cols-md-3 row-cols-xxl-4*/"}>
                    {data ?
                        renderCards(data)
                        :
                        <div className="card mb-4 d-none">
                            <div className="card-body p-0">
                                <div className="shopping-cart__empty d-flex justify-content-center align-items-center flex-column">
                                    <h4 className="pb-2">سبد خرید شما خالی است!</h4>
                                    <span
                                        className="pb-3">برای خرید لطفا ابتدا از لیست محصولات، به سبد خرید خود اضافه کنید.</span>

                                    <a className="btn btn-primary main-banner__action" href="./Products">مشاهده لیست
                                        محصولات</a>
                                </div>

                            </div>
                        </div>
                    }
                </div>
            </ContentLayout>
        </Layout>
    );
}
export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(getApiUrl("/api/News/GetNews"))
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {data: data.data}, // will be passed to the page component as props
    }
}