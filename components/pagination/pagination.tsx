import {useState} from "react";
import * as React from "react";

const Pagination = ({
                        numberOfPages,
                        changePageHandler,
                        currentPage
                    }: {
    numberOfPages: number,
    changePageHandler: (number) => void,
    currentPage: number
}) => {
    const [desiredPage, setDesiredPage] = useState<number>(1)
    const handleClick = (event) => {
        const name = event.target.name
        let pageNumber = desiredPage

        if (name == "page-number") {
            pageNumber = parseInt(event.target.id)

        } else if (name == "page-previous") {
            pageNumber = parseInt(currentPage.toString()) - 1
        } else if (name == "page-next") {
            pageNumber = parseInt(currentPage.toString()) + 1
        } else if (name == "enter-directly") {
            pageNumber = desiredPage
        }

        if (desiredPage >= 1 && desiredPage <= numberOfPages) {
            setDesiredPage(pageNumber)
            changePageHandler(pageNumber)
        }
    }
    const renderLotsOfOptions = () => {
        const options = [];
        let start: number = parseInt(currentPage.toString()) - 2;
        let end: number = parseInt(currentPage.toString()) + 2;
        if (currentPage < 4) {
            start = currentPage
        }
        if (currentPage > numberOfPages - 4) {
            end = numberOfPages
        }
        if (start != 1) {
            options.push(
                <li className="page-item" key={1}>
                    <button id={"1"} name={"page-number"} onClick={handleClick}
                            className="page-link">{1}</button>
                </li>
            )
            options.push(
                <li className="page-item" aria-current="page" key={'...start'}>
                    <span className="page-link">...</span>
                </li>
            )
        }

        for (let i = start; i <= end; i++) {

            if (currentPage == i) {
                options.push(
                    <li className="page-item active" aria-current="page" key={i}>
                        <span className="page-link">{i}</span>
                    </li>
                )

            } else {
                options.push(
                    <li className="page-item" key={i}>
                        <button id={i.toString()} name={"page-number"} onClick={handleClick}
                                className="page-link">{i}</button>
                    </li>
                )
            }
        }
        if (end != numberOfPages) {
            options.push(
                <li className="page-item" aria-current="page" key={"...end"}>
                    <span className="page-link">...</span>
                </li>
            )
            options.push(
                <li className="page-item" key={numberOfPages}>
                    <button id={numberOfPages.toString()} name={"page-number"} onClick={handleClick}
                            className="page-link">{numberOfPages}</button>
                </li>
            )
        }
        return options
    }
    const renderOptions = () => {
        const options = [];
        for (let i = 1; i <= numberOfPages; i++) {

            if (currentPage == i) {
                options.push(
                    <li className="page-item active" aria-current="page" key={i}>
                        <span className="page-link">{i}</span>
                    </li>
                )

            } else {
                options.push(
                    <li className="page-item" key={i}>
                        <button id={i.toString()} name={"page-number"} onClick={handleClick}
                                className="page-link">{i}</button>
                    </li>
                )
            }
        }
        return options

    }

    return (
        <div
            className="row p-4 w-100 d-flex align-items-center">

            <nav className="col-6">
                <ul className="pagination m-0">
                    {
                        currentPage != 1 ?
                            <li className="page-item">
                                <button name={"page-previous"} onClick={handleClick} className="page-link">قبلی</button>
                            </li>
                            :
                            ""
                    }

                    {
                        numberOfPages > 6 ?
                            (renderLotsOfOptions()) :
                            (renderOptions())
                    }
                    {
                        numberOfPages != currentPage ?
                            <li className="page-item">
                                <button name={"page-next"} onClick={handleClick} className="page-link">بعدی</button>
                            </li>
                            :
                            ""
                    }

                </ul>
            </nav>
            <form name={"enter-directly"} onSubmit={handleClick} className="d-flex col align-items-center">
                <label htmlFor={"enter-page-num"} className="ms-2 text-nowrap">برو به:</label>
                <input placeholder={"شماره صفحه"} type="number" min="1" max={numberOfPages}
                       onChange={(event) => setDesiredPage(parseInt(event.target.value))} id={"enter-page-num"}
                       className={"ms-2 form-control"}/>
                <button type={"submit"} className="btn btn-primary ms-2">برو</button>
                <small className="ms-2 text-nowrap">
                    {`بین 1 و ${numberOfPages} وارد کنید.`}
                </small>
            </form>
        </div>

    )
}
export default Pagination