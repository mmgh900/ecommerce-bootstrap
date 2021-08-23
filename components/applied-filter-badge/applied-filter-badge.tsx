import * as React from "react";
import {CatType} from "../../types/ICategory";

function AppliedFilterBadge(
    {
        label,
        handler,
        id,
        type
    }: {
        label: string,
        handler: (event: React.ChangeEvent<HTMLInputElement> | React.FormEvent<HTMLButtonElement>, type: CatType) => void,
        id: number,
        type: CatType
    }
) {
    return (
        <span
            className="liFilterItem list-filter__badge badge bg-light text-dark border border-light">
                                        <button id={id.toString()} type="button"
                                                className="btnRemoveFilter btn text-dark p-0"
                                                onClick={(e) => {
                                                    handler(e, type)
                                                }}>
                                            {label}
                                            <i id={id.toString()} className="far fa-times ps-2"/>
                                        </button>
        </span>
    )
}
export default AppliedFilterBadge