import React from "react";
/*import "./about.styles.scss"*/
import ActionLink from "../components/action-link/action-link";
import SectionA from "../components/section/section-a";
import SectionB from "../components/section/section-b";
import Head from "next/head";
import Layout from "../components/layout/layout";

const About = () => {
    type LearnMore = {
        icon: string,
        title: string,
        subtitle: string,
        action: string,
        actionLink: string
    }
    const learnMore: Array<LearnMore> = [
        {
            icon: "fa-headphones",
            title: "پشتیبانی قوی",
            subtitle: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
            action: "با ما تماس بگیر",
            actionLink: "tel:+989153179082"
        },
        {
            icon: "fa-percentage",
            title: "تخفیف های ویژه",
            subtitle: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
            action: "برو به صفحه کالا ها",
            actionLink: "./Products"
        },
        {
            icon: "fa-users",
            title: "جامعه پشتیبان",
            subtitle: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
            action: "برو به گروه همکاران",
            /*
            * TODO:
            *  replace this link with actual link after creating messenger
            * */
            actionLink: "./"
        }
    ]
    const renderLearnMore = () => {
        return learnMore.map((item) => (
            <div className="learn-more__item col mb-5 aos-init" data-aos="zoom-in-right">
                <h6 className="section__mini h1">
                    <i className={"far mb-4" + " " + item.icon}/>
                </h6>

                <h3 className="mb-2 section__head">{item.title}</h3>
                <p className="section__subhead">
                    {item.subtitle}
                </p>
                <ActionLink
                    link={item.actionLink} text={item.action}
                />
            </div>
        ))
    }
    return (

        <Layout title={"درباره ما"}>
            <div className="w-100 h-100">
                <SectionA
                    isReversed={true}
                    img={"/images/home/main.png"}
                    mini={
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">خانه</a></li>
                                <li className="breadcrumb-item active" aria-current="page">درباره ما</li>
                            </ol>
                        </nav>
                    }
                    isHero={true}
                    head={" پیکان پارس، بزرگترین تامین کننده قطعات یدکی شرق کشور"}
                    subhead={"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد."}/>

                <SectionA
                    isReversed={false}
                    img={"/images/about/team.png"}
                    mini={"تیم ما"}
                    head={"ساخت جامعه ای پیشرو"}
                    isHero={false}
                    subhead={"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد."}
                />

                <SectionB title={"درباره پیکان پارس بیشتر بدانید"}>
                    {renderLearnMore()}
                </SectionB>
            </div>
        </Layout>


    )
}

export default About;