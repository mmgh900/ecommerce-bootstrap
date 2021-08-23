import SearchCategorySelects from "./search-category-selects";

export default function MobileSearchMenu() {
    const handleChange = e => {
        console.log(e)
        /* setForm({
             ...form,
             [e.target.name]: [e.target.value]
         })*/
    }
    return (
        <form className={"d-flex flex-column"}>
            <label htmlFor="searchInputMobile" className="form-label">نام یا کد فنی محصول:</label>
            <input id="searchInputMobile" name="Anything"
                   className="form-control mb-3"
                   type="text" list="datalistOptions" placeholder="جستجو کنید"/>
            <SearchCategorySelects changeHandler={handleChange}/>
            <button className="mt-2 btn btn-primary" type="submit">جستجو</button>
        </form>
    )
}