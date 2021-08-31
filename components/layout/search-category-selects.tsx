import React from "react";
import Select from 'react-select';
import ICategory, {ProductGroupLevel} from "../../types/ICategory";
import {useGetProductGroupsQuery} from "../../redux/api.slice";

export default function SearchCategorySelects() {
    const {data: productGroups, isLoading: productGroupsLoading, error: productGroupsError} = useGetProductGroupsQuery()
    return (
        <>
            {
                productGroups ?
                    <React.Fragment>
                        <CategorySelect
                            data={productGroups.filter(item => item.pLevel == ProductGroupLevel.Company)}
                            title={"برند"} name={"Company"}/>
                        <CategorySelect
                            data={productGroups.filter(item => item.pLevel == ProductGroupLevel.Car)}
                            title={"خودرو"} name={"Car"}/>
                        <CategorySelect
                            data={productGroups.filter(item => item.pLevel == ProductGroupLevel.Section)}
                            title={"بخش ها"} name={"Section"}/>
                    </React.Fragment>
                    :
                    <></>
            }
        </>


    )
}

function CategorySelect(
    {
        name,
        title,
        data,
    }
        :
        {
            name: string,
            title: string,
            data: Array<ICategory>
        }
) {
    const noOption = () =>
        (
            <div className="d-flex justify-content-center align-items-center">
                <i className="fas fa-sad-tear me-2"/>
                <span>گزینه مورد نظر یافت نشد.</span>
            </div>
        )

    const catOptions = data.map(item => (
        {
            label: item.name,
            value: item.id
        }
    ))
    return (
        <div className="col-12 mb-3">
            <label htmlFor="brandSelectDesktop"
                   className="form-label">{title + ":"}</label>
            <Select
                isMulti
                name={name}
                options={catOptions}
                isRtl={true}
                noOptionsMessage={noOption}
                placeholder={"یک یا چند گزینه انتخاب کنید"}
            />
        </div>
    )
}

