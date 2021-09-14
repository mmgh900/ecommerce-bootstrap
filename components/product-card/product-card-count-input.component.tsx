import * as React from "react";
import {FaCartPlus, FaMinus, FaPlus, FaTrash} from "react-icons/fa";

export default function ProductCardCountInput(
    {count, setProductCount, setDelayedProductCount}:
        {
            setProductCount: (count: number) => void, setDelayedProductCount: (count: number) => void,
            count: number
        }
) {
    const handleChange = (e) => {
        let input = e.target.value
        try {
            input = parseInt(input)
            setDelayedProductCount(input)
            if (input <= 0 || input >= 10000) {
                throw new Error("Out of bound number")
            }
        } catch (error) {
            console.error(error.value)
            return
        }

    }
    return (
        <div className="input-group">
            {
                (count < 10000) ?
                    <button className={["btn btn-sm btn-outline-primary", (count < 10000) ? "" : "disabled"].join(" ")}
                            onClick={() => {
                                count < 10000 ? setProductCount(count + 1) : ""
                            }}>
                        {count > 0 ? <FaPlus className={'d-block'}/> : <FaCartPlus className={'d-block'}/>}
                    </button>
                    :
                    <></>
            }
            <input type="number"
                   onChange={handleChange}
                   value={count}
                   min={1} max={10000}
                   className={["form-control form-control-sm text-center"].join(" ")}/>
            {
                (count > 1) ?
                    <button className={["btn btn-sm btn-outline-secondary", (count > 0) ? "" : "disabled"].join(" ")}
                            onClick={() => {
                                count > 0 ? setProductCount(count - 1) : ""
                            }}>
                        {count > 1 ? <FaMinus className={'d-block'}/> : <FaTrash className={'d-block'}/>}
                    </button>
                    :
                    <></>
            }

        </div>

    )
}
