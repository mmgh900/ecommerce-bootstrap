import * as React from "react";
import styles from "./product-card.module.scss";
import ProductCardCountInput from "./product-card-count-input.component";
import {useRemoveFromCartMutation} from "../../redux/api.slice";

export default function ProductCardCountControlPart({
                                                        isLoading,
                                                        productId,
                                                        count,
                                                        setDelayedProductCount,
                                                        setProductCount,
                                                        deleteButton,
                                                        noLabel
                                                    }: { noLabel?: boolean, productId: string, isLoading: boolean, setProductCount: (count: number) => void, setDelayedProductCount: (count: number) => void, count: number, deleteButton?: boolean }) {


    const [
        removeFromCart, // This is the mutation trigger
        {isLoading: removeFromCartLoading},
    ] = useRemoveFromCartMutation()


    function handleDeleteButton() {
        removeFromCart({ProductId: productId})
    }

    return (
        <React.Fragment>
            {
                isLoading || removeFromCartLoading ?
                    <div
                        className="d-flex justify-content-center align-items-center">
                        <div className="spinner-grow text-primary"
                             role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    :
                    <div
                        className="d-flex justify-content-center align-items-center">
                        <div className="w-100 row g-2">
                            <div
                                className={["col-12 d-flex justify-content-center align-items-center", (deleteButton ? "col-md-9" : "")].join(" ")}>
                                {
                                    noLabel ?
                                        <></>
                                        :
                                        <span className={[styles.rial, "me-2 d-none d-lg-inline"].join(" ")}>تعداد</span>
                                }

                                <ProductCardCountInput setProductCount={setProductCount}
                                                       setDelayedProductCount={setDelayedProductCount} count={count}/>
                            </div>


                            {
                                deleteButton ?
                                    <div className="col-12 col-md-3">
                                        <button onClick={handleDeleteButton}
                                                className="btn btn-sm w-100 text-muted text-nowrap">
                                            <i className="far fa-trash me-1"/>
                                            حذف
                                        </button>
                                    </div>
                                    :
                                    <></>
                            }


                        </div>


                    </div>
            }
        </React.Fragment>

    )
}