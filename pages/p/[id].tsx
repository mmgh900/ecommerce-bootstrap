import React, {ReactNode} from "react";
import Layout from "../../components/layout/layout";
import Link from "next/link"


import useWindowDimensions from "../../hooks/useWindowDimensions";
import ImageGallery from 'react-image-gallery';
import styles from "../../components/product-card/product-card.module.scss";
import IProduct from "../../types/IProduct";
import ProductCardDiscount from "../../components/product-card/product-card-discount.component";
import Price from "../../components/product-card/product-card-price.component";
import ProductCardCountInput from "../../components/product-card/product-card-count-input.component";
import ProductCardPricesPart from "../../components/product-card/product-card-prices-part.component";
import {useGetDetailsQuery} from "../../redux/api.slice";
import {GetStaticPaths, GetStaticProps} from "next";
import {getAllPostIds, getPostData} from "../../lib/posts";
import getApiUrl from "../../lib/backend-root";
import ProductCardCountControlPart
    from "../../components/product-card/product-card-count-control-part.component";
import useProductCount from "../../hooks/useProductCount";
import ICategory, {getProductGroupImage, persianNames, ProductGroupLevel} from "../../types/ICategory";


const Id = ({details}: {details: IProduct}) => {
    const images = [
        {
            original: '/images/products/sample.jpg',
            thumbnail: '/images/products/sample.jpg',
        },
        {
            original: '/images/products/sample.jpg',
            thumbnail: '/images/products/sample.jpg',
        },
        {
            original: '/images/products/sample.jpg',
            thumbnail: '/images/products/sample.jpg',
        },
    ];
    /*const {data: details, isLoading: detailsLoading, error: detailError} = useGetDetailsQuery(product.id.toString())*/
    const {productCount, setProductCount, setDelayedProductCount, isLoading: countLoading} = useProductCount(details?.id, details?.count)
    const {height, width} = useWindowDimensions();
    const BuyProductLstItem = (
        {
            title,
            children,
        }:
            {
                title: string,
                children: ReactNode
            }
    ) => {
        return (
            <li className="list-group-item d-flex justify-content-between align-items-center">
                            <span className={styles.rial}>
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
            <Link href={{
                pathname: '/products',
                query: {
                    Page: 1,
                    [ProductGroupLevel[cat.pLevel].toString()]: cat.pLevel
                }
            }} passHref>
                <a className="card mb-3">
                    <div className="row g-0">
                        <div className="col-4">
                            <img
                                className={"img-fluid rounded-start"}
                                src={getProductGroupImage(cat)}
                                alt={cat.name}
                            />
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h6 className="fw-bold card-title">{persianNames[cat.pLevel] + ":"}</h6>
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
                    <h4 className="fw-bold mb-2">{details.namePersian}</h4>
                    <h5 className="">
                        کدفنی:
                        <code className=""> {details.techNumber}</code>
                    </h5>


                </div>
                <div className="row mb-4 g-1">
                    <div className="col-6 d-flex">
                        <CatCard cat={{
                            name: details.car,
                            id: 69,
                            pLevel: ProductGroupLevel.Car
                        }}/>
                    </div>
                    <div className="col-6 d-flex">
                        <CatCard cat={{
                            name: details.company,
                            id: 69,
                            pLevel: ProductGroupLevel.Company
                        }}/>
                    </div>
                </div>
                {
                    details.nameAlias ?
                        <p>
                            {`نام‌های مستعار: ${details.nameAlias}`}
                        </p>
                        :
                        <></>
                }
                {
                    details.description ?
                        <p>
                            {details.description}
                        </p>
                        :
                        <></>
                }


            </div>
        )
    }
    const BuyColumn = () => {
        return (
            <div className="col-md-3">
                <div className="card shadow bg-light mb-3">
                    <div className="card-header fw-bold">خرید کالا</div>
                    <ul className="list-group list-group-flush">
                        {
                            details.discount ?
                                <BuyProductLstItem title={"درصد تخفیف"}>
                                    <ProductCardDiscount discountPercentage={details.discount}/>
                                </BuyProductLstItem>
                                :
                                <></>
                        }


                        <BuyProductLstItem title={"قیمت"}>
                            <Price isBig={true} salePrice={details.price}/>
                        </BuyProductLstItem>

                        <BuyProductLstItem title={"تعداد"}>
                            <ProductCardCountControlPart noLabel={true} isLoading={countLoading} productId={details.id}
                                                         count={productCount}
                                                         setProductCount={setProductCount}
                                                         setDelayedProductCount={setDelayedProductCount}/>
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
                        {
                            !details ?
                                <></>
                                :
                                <li className="breadcrumb-item active" aria-current="page">{details.namePersian}</li>
                        }

                    </ol>
                </nav>
                {
                    !details ?
                        <></>
                        :
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
                }


            </div>
        </Layout>


    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds()
    return {
        paths: [
            {params: {id: '3300'}}
        ],
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const details = await fetch(
        getApiUrl(`/api/Product/GetDetails?id=${params.id}`),
        {
            credentials: 'include', // This allows server to set cookies
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
        }
    )
        .then(response => response.json())
        .then(response => response.data)
        .catch(error => console.error(error))
    return {
        props: {
            details
        }
    }
}
export default Id;