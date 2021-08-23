import React, {ReactNode} from "react";
import Layout from "../components/layout/layout";
import Link from "next/link"
import ICategory, {CatType, getPersianNameByType} from "../types/ICategory";

import useWindowDimensions from "../hooks/useWindowDimensions";
import ImageGallery from 'react-image-gallery';
import styles from "../components/product-card/product-card.module.scss";
import IProduct from "../types/IProduct";
import ProductCardDiscount from "../components/product-card-discount/product-card-discount.component";
import Price from "../components/product-card-price/product-card-price.component";
import ProductCardCountInput from "../components/product-card-count-input/product-card-count-input.component";
import ProductCardPricesPart from "../components/product-card-prices-part/product-card-prices-part.component";

const P = () => {
    const images = [
        {
            original: 'https://dkstatics-public.digikala.com/digikala-products/111596343.jpg?x-oss-process=image/resize,h_1600/quality,q_80',
            thumbnail: 'https://dkstatics-public.digikala.com/digikala-products/111596343.jpg?x-oss-process=image/resize,h_1600/quality,q_80',
        },
        {
            original: 'https://dkstatics-public.digikala.com/digikala-products/111596370.jpg?x-oss-process=image/resize,h_1600/quality,q_80',
            thumbnail: 'https://dkstatics-public.digikala.com/digikala-products/111596370.jpg?x-oss-process=image/resize,h_1600/quality,q_80',
        },
        {
            original: 'https://dkstatics-public-2.digikala.com/digikala-products/111596504.jpg?x-oss-process=image/resize,h_1600/quality,q_80',
            thumbnail: 'https://dkstatics-public-2.digikala.com/digikala-products/111596504.jpg?x-oss-process=image/resize,h_1600/quality,q_80',
        },
    ];
    const product = {
        id: 3300,
        namePersian: "ضديخ 1ليتري داراي استاندارد",
        techNumber: "",
        price: 100000,
        isExists: true,
        lastBuyDate: "1399/07/15",
        company: "پاشا",
        car: "انژکتور",
        section: "موتور",
        isNewest: true,
        discount: 0.0,
        orderTempCount: 0
    }
    const {height, width} = useWindowDimensions();
    const BuyProductLstItem = (
        {
            title,
            children,
            icon
        }:
            {
                title: string,
                children: ReactNode
                icon: string
            }
    ) => {
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center">
                            <span className={styles.rial}>
                                <span className="icon-container">
                                    <i className={`fas ${icon}`}/>
                                </span>

                                {title}:
                                </span>
                <div>

                    {children}
                </div>
            </li>
        )
    }
    const CatCard = (
        {
            cat
        }
            :
            {
                cat: ICategory
            }
    ) => {
        return (
            <Link href="#">
                <a className="card mb-3">
                    <div className="row g-0">
                        <div className="col-4">

                            <img src={cat.image} className="img-fluid rounded-start" alt={cat.name}/>
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h6 className="fw-bold card-title">{getPersianNameByType(cat.type) + ":"}</h6>
                                <p className="card-text">{cat.name}</p>
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
        )
    }
    const PhotoColumn = () => {
        return (
            <div className=" col-md-4 mb-4 mb-md-0">
                <div className="row justify-content-center">
                    <div className="col-9 col-md-12">
                        <div className="slider-for">
                            <div className="product-details__photo-item">
                                <ImageGallery items={images} useBrowserFullscreen={false} isRTL={true}
                                              showPlayButton={false}/>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        )
    }
    const DetailsColumn = () => {
        return (
            <div className="col-md-5">

                <div className="mb-4">
                    <h4 className="fw-bold mb-2">پتانسيومتر دريچه گاز زيمنس جديد</h4>
                    <h5 className="">
                        کدفنی:
                        <code className=""> ۰۳۶۰۶۰۱۴۱۱/۱۳/۱۵/۷۸</code>
                    </h5>


                </div>
                <div className="row mb-4 g-1">
                    <div className="col-6 d-flex">
                        <CatCard cat={{
                            name: "پژو ۲۰۶",
                            id: 10,
                            image: "/images/productGroups/car_70.png",
                            type: CatType.CAR
                        }}/>
                    </div>
                    <div className="col-6 d-flex">
                        <CatCard cat={{
                            name: "ایساکو",
                            id: 10,
                            image: "/images/productGroups/company_64.png",
                            type: CatType.BRANDS
                        }}/>
                    </div>
                </div>
                <p>
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان
                    گرافیک است.
                    چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                    تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای
                    زیادی در
                    شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم
                    افزارها
                    شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان
                    فارسی
                    ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و
                    شرایط
                    سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات
                    پیوسته
                    اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                </p>
            </div>
        )
    }
    const BuyColumn = () => {
        return (
            <div className="col-md-3">
                <div className="card shadow bg-light mb-3">
                    <div className="card-header fw-bold">خرید کالا</div>
                    <ul className="list-group list-group-flush">
                        <BuyProductLstItem icon={"fa-badge-percent"} title={"درصد تخفیف"} >
                            <ProductCardDiscount discountPercentage={product.discount}/>
                        </BuyProductLstItem>

                        <BuyProductLstItem icon={"fa-badge-dollar"} title={"قیمت"} >
                            <Price isBig={true} salePrice={product.price}/>
                        </BuyProductLstItem>

                        <BuyProductLstItem icon={"fa-badge"} title={"تعداد"} >
                            <ProductCardPricesPart discount={product.discount} price={product.price}/>
                        </BuyProductLstItem>

                    </ul>

                </div>

            </div>
        )
    }
    return (

        <Layout title={"نام محصول"}> {/*TODO: Change this with real product name */}
            <div className="container-xxl py-3 px-lg-5">

                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link href={"/"}>
                                خانه
                            </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link href={"/products"}>
                                محصولات
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">پتانسيومتر دريچه گاز زيمنس جديد</li>
                    </ol>
                </nav>
                <div className="card product-details">
                    <div className="card-body p-lg-5">
                        {
                            width > 992 ?

                                <div className="row g-lg-5">
                                    <PhotoColumn/>
                                    <DetailsColumn/>
                                    <BuyColumn/>
                                </div>


                                :
                                <div className="row g-lg-5">
                                    <PhotoColumn/>
                                    <BuyColumn/>
                                    <DetailsColumn/>
                                </div>
                        }
                    </div>
                </div>


            </div>
        </Layout>


    )
}

export default P;