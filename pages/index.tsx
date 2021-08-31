import React from "react";
import SectionA from "../components/section/section-a";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";
import Image from 'next/image'
import Link from 'next/link'
import styles from './index.module.scss'


// import Swiper core and required modules
import SwiperCore, {Autoplay, Navigation, Pagination} from 'swiper/core';
import ICategory, {getCar, getCompany, getProductGroupImage, ProductGroupLevel} from "../types/ICategory";
import SectionB from "../components/section/section-b";
import ActionLink from "../components/action-link/action-link";
import Layout from "../components/layout/layout";
import {ProductItemView} from "../lib/products";
import ProductCard from "../components/product-card/product-card";
import {GetServerSideProps} from "next";
import getApiUrl from "../lib/backend-root";
import {useGetProductGroupsQuery} from "../redux/api.slice";


// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);


const Home = (props) => {

    const {data: productGroups, isLoading: productGroupsLoading, error: productGroupsError} = useGetProductGroupsQuery()
    return (
        <Layout title={"صفحه اصلی"}>
            <div className="w-100 h-100">

                <SectionA
                    isReversed={true}
                    img={"/images/home/hero.png"}
                    mini={
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active" aria-current="page">خانه</li>
                            </ol>
                        </nav>
                    }
                    isHero={true}
                    head={"به پیکان پارس خوش آمدید"}
                    subhead={"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد."}
                    additional={
                        (
                            <ActionLink link={"./products"} text={"مشاهده محصولات"}/>
                        )
                    }
                />
                <SectionB title="کالاهای بارجدید" isColorDark={true} color={"#198754"} className='ps-3'>
                    <Swiper slidesPerView={'auto'}
                            spaceBetween={5}
                            pagination={true}
                            breakpoints={{
                                "1000":{
                                    "slidesPerView": 4,
                                }
                            }}
                            className="mySwiper" dir="rtl">
                        {
                            props.products ?
                                props.products.map(item => (
                                    <SwiperSlide className={styles.productSlide} key={item.id}>
                                        <ProductCard productData={item} view={ProductItemView.CARD}/>
                                    </SwiperSlide>
                                ))
                                :
                                <></>
                        }


                    </Swiper>
                </SectionB>
                <SectionB title="پیشنهادات ویژه">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="  shadow-sm">
                                <Swiper dir="rtl" pagination={{
                                    "type": "progressbar"
                                }} navigation={true} className="mySwiper">
                                    <SwiperSlide>
                                        <img
                                            className={"card-img-top"}
                                            src="/images/special-offers/13.jpg" // Route of the image file
                                            alt={"پیشنهاد ویژه"}
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img
                                            className={"card-img-top"}
                                            src="/images/special-offers/14.jpg" // Route of the image file
                                            alt={"پیشنهاد ویژه"}
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <img
                                            className={"card-img-top"}
                                            src="/images/special-offers/15.jpg" // Route of the image file
                                            alt={"پیشنهاد ویژه"}
                                        />
                                    </SwiperSlide>
                                </Swiper>

                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="row g-3">
                                <div className="col-12 col-sm-6 col-lg-12">
                                    <div className="card  " data-aos="fade-up">
                                        <div className="row g-0 h-100">
                                            <div className="col-6 d-flex justify-content-between align-items-center">
                                                <img src="images/svg/Off road-rafiki.svg" alt="..."/>
                                            </div>
                                            <div className="col d-flex justify-content-between align-items-center">
                                                <div className="card-body ps-0  flex-column">
                                                    <h4 className="card-title section__title fw-bold">لیست قیمت
                                                        ایساکو</h4>
                                                    <p>قیمت لحظه ای از قیمت لوازم یدکی شرکت ایساکو</p>
                                                    <Link href={"/isaco"} passHref>
                                                        <a className="btn btn-success">مشاهده لیست</a>
                                                    </Link>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-12">
                                    <div className="card " data-aos="fade-up">
                                        <div className="row g-0 h-100">
                                            <div className="col-6 d-flex justify-content-between align-items-center">
                                                <img src="images/svg/Spreadsheets-rafiki.svg" alt="..."/>
                                            </div>
                                            <div className="col d-flex justify-content-between align-items-center">
                                                <div className="card-body ps-0 flex-column">
                                                    <h4 className="card-title section__title fw-bold">نرم افزار حسابداری
                                                        پیکان پارس</h4>
                                                    <p>اولین و تنها نرم افزار ویژه فروشندگان لوازم یدکی</p>
                                                    <Link href={"/accounting"} passHref>
                                                        <a className="btn btn-success">اطلاعات بیشتر</a>
                                                    </Link>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </SectionB>

                {
                    productGroups ?
                        <React.Fragment>
                            <SectionB className={'ps-3'} title="خودرو ها">
                                <CategoryCarousel
                                    array={getCar(productGroups).slice(0, 8)}/>
                            </SectionB>
                            <SectionB className={'ps-3'}  title="برند ها">
                                <CategoryCarousel
                                    array={getCompany(productGroups).slice(0, 8)}/>
                            </SectionB>
                        </React.Fragment>
                        :
                        <></>
                }


                <SectionA
                    isReversed={false}
                    img={"/images/home/software.png"}
                    mini={"نرم افزار حسابداری"}
                    head={"حسابداری آسان و هوشمند با پیکان پارس"}
                    isHero={false}
                    subhead={"لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد."}
                />

            </div>
        </Layout>


    )
}


type CategoryCarouselProps = {
    array: Array<ICategory>,

}
const CategoryCarousel = (props: CategoryCarouselProps) => {
    const {
        array,
    } = props;
    return (
        <Swiper slidesPerView={"auto"}
                spaceBetween={7}
                pagination={{
                    "clickable": true
                }}
                autoplay={{
                    "delay": 2500,
                    "disableOnInteraction": false
                }}
                breakpoints={{
                    "1000":{
                        "slidesPerView": 6,
                    }
                }}
                className="mySwiper" dir="rtl">
            {
                array.map(item => (
                    <SwiperSlide className={styles.categorySlide} key={item.name}>
                        <div className="">
                            <Link href={{
                                pathname: '/products',
                                query: {
                                    Page: 1,
                                    [ProductGroupLevel[item.pLevel].toString()]: item.id
                                }
                            }} passHref>
                                <a className="card">
                                    <img
                                        className={"card-img-top"}
                                        src={getProductGroupImage(item)}
                                        alt={item.name}
                                    />

                                    <div className="card-footer bg-white text-center">
                                                    <span>
                                                       {item.name}
                                                    </span>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))
            }


        </Swiper>
    )
}
export const getStaticProps: GetServerSideProps = async (context) => {

    const productsData = await fetch(getApiUrl(`/api/Product/GetProducts?OnlyLastInputs=True`), {
        method: 'GET',
    }).then(response => response.json())


    if (!productsData?.data) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            products: productsData.data.products,
        }, // will be passed to the page component as props
    }
}

export default Home;