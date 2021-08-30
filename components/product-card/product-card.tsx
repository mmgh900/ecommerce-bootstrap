import * as React from "react";
import Link from "next/link";
import IProduct from "../../types/IProduct";

import {useAppSelector} from "../../redux/hooks";

import styles from './product-card.module.scss'
import {ProductItemView} from "../../lib/products";
import ProductTitle from "../product-card-title/product-card-title.component";
import ProductCardCountControlPart from "../product-card-count-control-part/product-card-count-control-part.component";

import ProductCardPricesPart from "../product-card-prices-part/product-card-prices-part.component";
import ProductCardTechnicalCode from "../product-card-technical-code/product-card-technical-code";
import {useGetCartQuery} from "../../redux/api.slice";
import useProductCount from "../../hooks/useProductCount";


export default function ProductCard(
    {
        productData,
        view
    }: {
        productData: IProduct
        view: ProductItemView
    }
) {
    const {
        id,
        namePersian,
        techNumber,
        price,
        isExists,
        lastBuyDate,
        company,
        car,
        section,
        isNewest,
        discount,
        count
    } = productData;
    const {data: cart, error: cartError, isLoading: cartLoading} = useGetCartQuery()
    const user = useAppSelector(state => state.user.currentUser)

    const {productCount, setProductCount, setDelayedProductCount, isLoading: countLoading} = useProductCount(id, count)

    const Availability = () => {
        return (
            isExists ?
                <span
                    className={"badge bg-available " + styles.smallText}><i
                    className="fas fa-check me-2"/>موجود</span>
                :

                <span
                    className={"badge bg-available " + styles.smallText}><i
                    className="fas fa-times me-2"/>ناموجود</span>
        )
    }

    const PreOrderButton = () => {
        return (
            <button type="button"
                    className="btn btn-sm btn-outline-dark w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#preorderModal">
                پیش خرید
            </button>

        )
    }



    return (
        <div className={["card rounded", styles.productCard, (view == ProductItemView.CARD ? styles.cardView : ""),
            (view == ProductItemView.CARD_NO_IMAGE ? styles.cardViewNoImage : "")].join(" ")}>
            {
                user ?
                    <div className={
                        [styles.successIndicator,
                            (cart?.find(item => item.productId == id)?.count == productCount ?
                                    styles.successIndicatorActivated : ""
                            )
                        ].join(" ")}/>
                    :
                    <></>
            }

            {
                (view == ProductItemView.CARD || view == ProductItemView.PRE_ORDER_VIEW) ?
                    <div className="card-img-top ">
                        <Link href={`./p/${id}`} passHref>
                            <a>
                                <div className="row d-flex justify-content-center align-items-center">
                                    <div className="col-8 col-md-6">
                                        <img
                                            className={"w-100"}
                                            src="/images/products/sample.jpg"// Route of the image file
                                            alt={namePersian}
                                        />
                                    </div>
                                </div>
                            </a>

                        </Link>
                    </div>
                    :
                    <></>
            }
            <div className="card-body d-flex flex-column justify-content-between">
                <div>
                    <div className="row mb-2">
                        <div className="col-12">
                            <Link href={`./p/${id}`} passHref>
                                <a className="">
                                    <ProductTitle withCategories={true} car={car} company={company}
                                                  namePersian={namePersian}/> {
                                    techNumber != "" ?
                                        <div>
                                            <small className={"d-none d-md-inline text-muted " + styles.smallText}>
                                                کدفنی:
                                            </small>
                                            <ProductCardTechnicalCode techNumber={techNumber}/>
                                        </div>
                                        :
                                        <></>
                                }
                                </a>
                            </Link>
                        </div>

                    </div>
                    <div className="d-flex justify-content-start align-items-end mb-2">
                        <Availability/>
                        {
                            isNewest ?
                                <span
                                    className={"ms-1 badge bg-new " + styles.smallText}>
                                            بار جدید
                                        </span>
                                :
                                <></>
                        }
                    </div>
                </div>


                <div>
                    {
                        view == ProductItemView.PRE_ORDER_VIEW ?
                            <></>
                            :
                            user ?
                                <div>
                                    {
                                        isExists ?
                                            <div>

                                                <ProductCardPricesPart className="mb-2" discount={discount}
                                                                       price={price}/>

                                                <ProductCardCountControlPart isLoading={countLoading} productId={productData.id}
                                                                             count={productCount}
                                                                             setProductCount={setProductCount}
                                                                             setDelayedProductCount={setDelayedProductCount}
                                                />


                                            </div>

                                            :
                                            <div className="d-flex justify-content-center align-items-center">
                                                <PreOrderButton/>
                                            </div>
                                    }
                                </div>
                                :
                                <div className={[styles.smallText, 'text-center'].join(" ")}>
                                    برای مشاهده قیمت ها باید
                                    <Link href={'/login'} passHref><a> وارد </a></Link>
                                    شوید.
                                </div>


                    }
                </div>

            </div>

        </div>
    )


}


