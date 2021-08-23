
import * as React from "react";

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
                        <i className={`fas fa-${count > 0 ? "plus" : "cart-plus"} d-block`}/>
                    </button>
                    :
                    <></>
            }
            <input type="number"
                   onChange={handleChange}
                   value={count}
                   min={0} max={10000}
                   className={["form-control form-control-sm text-center"].join(" ")}/>
            {
                (count > 1) ?
                    <button className={["btn btn-sm btn-outline-secondary", (count > 0) ? "" : "disabled"].join(" ")}
                            onClick={() => {
                                count > 0 ? setProductCount(count - 1) : ""
                            }}><i className={`fas fa-${count > 1 ? "minus" : "trash"} d-block`}/></button>
                    :
                    <></>
            }

        </div>

    )
}
