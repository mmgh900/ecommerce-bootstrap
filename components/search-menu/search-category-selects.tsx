import React, {ChangeEvent, ChangeEventHandler} from "react";
import Select from 'react-select';
import ICategory, {ProductGroupLevel} from "../../types/ICategory";
import {useAppSelector} from "../../redux/hooks";
import {useGetProductGroupsQuery} from "../../redux/api.slice";

export default function SearchCategorySelects({changeHandler}: { changeHandler: ChangeEventHandler<HTMLInputElement> }) {
    const {data: productGroups, isLoading: productGroupsLoading, error: productGroupsError} = useGetProductGroupsQuery()
    return (
        <>
            {
                productGroups ?
                    <React.Fragment>
                        <CategorySelect changeHandler={changeHandler}
                                        data={productGroups.filter(item => item.pLevel == ProductGroupLevel.Company)}
                                        title={"برند"} name={"Company"}/>
                        <CategorySelect changeHandler={changeHandler}
                                        data={productGroups.filter(item => item.pLevel == ProductGroupLevel.Car)}
                                        title={"خودرو"} name={"Car"}/>
                        <CategorySelect changeHandler={changeHandler}
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
        changeHandler
    }
        :
        {
            name: string,
            title: string,
            data: Array<ICategory>
            changeHandler: ChangeEventHandler<HTMLInputElement>
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
                onChange={changeHandler}
                placeholder={"یک یا چند گزینه انتخاب کنید"}
            />
        </div>
    )
}

