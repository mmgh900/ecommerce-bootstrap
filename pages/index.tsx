import React, {useEffect, useState} from "react";
import SectionA from "../components/section/section-a";
// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";
import Image from 'next/image'
import Link from 'next/link'


// import Swiper core and required modules
import SwiperCore, {Autoplay, Navigation, Pagination} from 'swiper/core';
import ICategory, {CatType, getListNameByType} from "../types/ICategory";
import SectionB from "../components/section/section-b";
import ActionLink from "../components/action-link/action-link";
import Layout from "../components/layout/layout";
import {useAppSelector} from "../redux/hooks";
import IProduct from "../types/IProduct";
import {createParamsFromQueries, getProducts, ProductItemView} from "../lib/products";
import ProductCard from "../components/product-card/product-card";
import {GetServerSideProps} from "next";
import getApiUrl from "../lib/backend-root";
import queryString from "querystring";


// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);


const Home = (props) => {
    const parts = useAppSelector(state => state.categories[CatType.PART])
    const brands = useAppSelector(state => state.categories[CatType.BRANDS])
    const cars = useAppSelector(state => state.categories[CatType.CAR])



    return (
        <Layout title={"صفحه اصلی"}>
            <div className="w-100 h-100">

                <SectionA
                    isReversed={true}
                    img={"/images/about/hero.png"}
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
                <SectionB title="کالاهای محبوب" isColorDark={true} color={"#198754"}>
                    <Swiper slidesPerView={2}
                            spaceBetween={10}
                            breakpoints={{
                                // when window width is >= 320px
                                // when window width is >= 480px
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 10
                                },
                                // when window width is >= 640px
                                1000: {
                                    slidesPerView: 4,
                                    spaceBetween: 10
                                }
                            }}
                            className="mySwiper" dir="rtl">
                        {
                            props.products ?
                                props.products.map(item => (
                                    <SwiperSlide key={item.id}>
                                        <ProductCard productData={item} view={ProductItemView.CARD}/>
                                    </SwiperSlide>
                                ))
                                :
                                <></>
                        }


                    </Swiper>
                </SectionB>
                <SectionB title="پیشنهادات ویژه">
                    <div className="row g-3 w-100">
                        <div className="col-lg-8">
                            <div className=" special__main shadow-sm">
                                <Swiper dir="rtl" pagination={{
                                    "type": "progressbar"
                                }} navigation={true} className="mySwiper">
                                    <SwiperSlide>
                                        <Image
                                            className={"card-img-top"}
                                            src="/images/special-offers/13.jpg" // Route of the image file
                                            height={600} // Desired size with correct aspect ratio
                                            width={800} // Desired size with correct aspect ratio
                                            alt={"پیشنهاد ویژه"}
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Image
                                            className={"card-img-top"}
                                            src="/images/special-offers/14.jpg" // Route of the image file
                                            height={600} // Desired size with correct aspect ratio
                                            width={800} // Desired size with correct aspect ratio
                                            alt={"پیشنهاد ویژه"}
                                        />
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <Image
                                            className={"card-img-top"}
                                            src="/images/special-offers/15.jpg" // Route of the image file
                                            height={600} // Desired size with correct aspect ratio
                                            width={800} // Desired size with correct aspect ratio
                                            alt={"پیشنهاد ویژه"}
                                        />
                                    </SwiperSlide>
                                </Swiper>

                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="row g-3">
                                <div className="col-12 col-sm-6 col-lg-12">
                                    <div className="card special__side " data-aos="fade-up">
                                        <div className="row g-0 h-100">
                                            <div className="col-6 centerex">
                                                <img src="images/svg/Off road-rafiki.svg" alt="..."/>
                                            </div>
                                            <div className="col centerex">
                                                <div className="card-body ps-0  flex-column">
                                                    <h4 className="card-title section__title fw-bold">لیست قیمت
                                                        ایساکو</h4>
                                                    <p>قیمت لحظه ای از قیمت لوازم یدکی شرکت ایساکو</p>
                                                    <Link href={"#"}>
                                                        <a className="btn btn-success">مشاهده لیست</a>
                                                    </Link>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-lg-12">
                                    <div className="card special__side" data-aos="fade-up">
                                        <div className="row g-0 h-100">
                                            <div className="col-6 centerex">
                                                <img src="images/svg/Spreadsheets-rafiki.svg" alt="..."/>
                                            </div>
                                            <div className="col centerex">
                                                <div className="card-body ps-0 flex-column">
                                                    <h4 className="card-title section__title fw-bold">نرم افزار حسابداری
                                                        پیکان پارس</h4>
                                                    <p>اولین و تنها نرم افزار ویژه فروشندگان لوازم یدکی</p>
                                                    <Link href={"#"}>
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

                <SectionB title="خودرو ها">
                    <CategoryCarousel array={cars}/>
                </SectionB>
                <SectionB title="برند ها">
                    <CategoryCarousel array={brands}/>
                </SectionB>

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
        <Swiper slidesPerView={3}
                spaceBetween={7}
                pagination={{
                    "clickable": true
                }}
                autoplay={{
                    "delay": 2500,
                    "disableOnInteraction": false
                }}
                breakpoints={{
                    // when window width is >= 320px
                    576: {
                        slidesPerView: 4,
                        spaceBetween: 7
                    },
                    // when window width is >= 480px
                    768: {
                        slidesPerView: 5,
                        spaceBetween: 7
                    },
                    // when window width is >= 640px
                    992: {
                        slidesPerView: 6,
                        spaceBetween: 7
                    }
                }}
                className="mySwiper" dir="rtl">
            {
                array.map(item => (
                    <SwiperSlide key={item.name}>
                        <div className="">
                            <Link href={`/products?Page=1&${getListNameByType(item.type)}=${item.id}`}>
                                <a className="card">
                                    <Image
                                        className={"card-img-top"}
                                        src={item.image} // Route of the image file
                                        height={500} // Desired size with correct aspect ratio
                                        width={500} // Desired size with correct aspect ratio
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