import React from "react";

export default function CartSettleDaysCard(
    {onSettleDaysChange, settleDays}:
        { onSettleDaysChange: (event) => void, settleDays: number }
) {

    return (
        <div className="card mb-2">
            <div className="card-body">

                <h6 className="card-title fw-bold m-0">{'مدت زمان تسویه'}</h6>
                <small className="card-subtitle text-muted">لطفا مدت زمان تسویه را مشخص کنید.</small>

                <select required className="form-select mt-2" value={settleDays}
                        onChange={onSettleDaysChange}>
                    <option value={10}>۱۰ روز</option>
                    <option value={20}>۲۰ روز</option>
                    <option value={30}>۳۰ روز</option>
                </select>

            </div>
        </div>
    )
}