import React, {useState} from "react";
import {useLazyGetGiftCodeQuery} from "../../redux/api.slice";
import Price from "../product-card-price/product-card-price.component";


export default function CartGiftCard(
    {onGiftCodeChange, giftCode}:
        { onGiftCodeChange: (code: string) => void, giftCode: string }
) {

    const [fetchGiftCode, {data: giftCodeAmount, error: giftError, isLoading: giftLoading}] = useLazyGetGiftCodeQuery()
    const [isValid, setValid] = useState<boolean>(true)

    function handleApplyCodeOnClick() {
        fetchGiftCode({GiftCode: giftCode})
        setValid(false)
    }

    return (
        <div className="card">
            <div className="card-body">

                <h6 className="card-title fw-bold m-0">{'کدهدیه'}</h6>


                {
                    giftCodeAmount ?
                        <React.Fragment>
                            <small
                                className="card-subtitle mb-2 text-muted">{["با استفاده از کد تخفیف", giftCode, "به مبلغ زیر هدیه دریافت خواهید کرد."].join(" ")}</small>
                            <div className='d-flex flex-row-reverse justify-content-between align-items-center mt-2'>
                                <Price salePrice={giftCodeAmount * 10000}/>
                                <button className='btn btn-light text-muted ms-2' role={'button'} onClick={e => {
                                    e.preventDefault()
                                    onGiftCodeChange('')
                                    fetchGiftCode({GiftCode: ''})
                                    setValid(true)
                                }}>
                                    استفاده از کد دیگر
                                </button>
                            </div>

                        </React.Fragment>
                        :
                        giftLoading ?
                            <div className="d-flex justify-content-center p-5">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            :
                            <React.Fragment>
                                <small className="card-subtitle mb-2 text-muted">در صورتی که کد هدیه دارید وارد
                                    کنید.</small>
                                <div className="input-group mt-3">
                                    <button onClick={handleApplyCodeOnClick} className="btn btn-outline-secondary"
                                            type="button"
                                            id="button-addon1">اعمال
                                    </button>
                                    <input value={giftCode}
                                           onChange={(event) => {
                                               onGiftCodeChange(event.target.value)
                                           }}
                                           type="text"
                                           className="form-control "
                                           placeholder="کد"
                                           aria-label="Example text with button addon"
                                           aria-describedby="button-addon1"/>
                                </div>
                                {
                                    isValid ?
                                        <></>
                                        :
                                        <div className='text-end  mt-1'>
                                            <small className='text-danger'>کد وارد شده معتبر نیست.</small>
                                        </div>
                                }


                            </React.Fragment>

                }


            </div>
        </div>
    )
}