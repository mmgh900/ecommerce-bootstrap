import React, {ChangeEventHandler} from "react";
import Select from 'react-select';
import ICategory, {ProductGroupLevel} from "../../types/ICategory";
import {useGetProductGroupsQuery} from "../../redux/api.slice";
import {ProductsParamsType} from "../../lib/products";
import {FaSadTear} from "react-icons/fa";

export default function SearchCategorySelects({
                                                  handler,
                                                  params
                                              }: { handler: any, params: ProductsParamsType }) {

    const {data: productGroups, isLoading: productGroupsLoading, error: productGroupsError} = useGetProductGroupsQuery()
    return (
        <>
            {
                productGroups ?
                    <React.Fragment>
                        <CategorySelect
                            handler={handler}
                            value={params.Company}
                            data={productGroups.filter(item => item.pLevel == ProductGroupLevel.Company)}
                            title={"برند"} name={"Company"}/>
                        <CategorySelect
                            handler={handler}
                            value={params.Car}
                            data={productGroups.filter(item => item.pLevel == ProductGroupLevel.Car)}
                            title={"خودرو"} name={"Car"}/>
                        <CategorySelect
                            handler={handler}
                            value={params.Section}
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
        handler,
        value
    }
        :
        {
            name: string,
            title: string,
            data: Array<ICategory>,
            handler: any,
            value: Array<number>
        }
) {


    const noOption = () =>
        (
            <div className="d-flex justify-content-center align-items-center">

                <FaSadTear className={'me-2'} />
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
                theme={theme => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: "#19875450",
                        primary: "#198754"
                    }
                })}
                value={value}
                onChange={handler}
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

