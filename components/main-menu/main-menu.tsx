import {useAppSelector} from "../../redux/hooks";
import Link from 'next/link'

import ICategory, {getProductGroupImage, ProductGroupLevel} from "../../types/ICategory";
import {useGetProductGroupsQuery} from "../../redux/api.slice";
import React from "react";
import Image from 'next/image'
export default function MainMenu() {
    const {data: productGroups, isLoading: productGroupsLoading, error: productGroupsError} = useGetProductGroupsQuery()

    return (
        <div className="accordion accordion-flush" id="mainMenuAccordion">
            <div className="accordion-item">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#shop" aria-expanded="true" aria-controls="shop">
                    <i className="fad fa-shopping-bag me-2"/>
                    <h6>خرید</h6>
                </button>

                <div id="shop" className="accordion-collapse collapse show" aria-labelledby="flush-headingOne"
                     data-bs-parent="#mainMenuAccordion">
                    <div className="accordion-body">
                        <div className="list-group list-group-flush">
                            <Link href={{
                                pathname: "/products",
                                query: {OnlyExists: true}
                            }}>
                                <button data-bs-dismiss="offcanvas.tsx" className="list-group-item list-group-item-action">
                                    <span className="mb-1 fw-bold">خرید</span>
                                    <br/>
                                    <small>لیست محصولات موجود</small>
                                </button>
                            </Link>
                            <Link href={{
                                pathname: "/products",
                                query: {ProductView: 1}
                            }}>
                                <button data-bs-dismiss="offcanvas.tsx" className="list-group-item list-group-item-action">
                                    <span className="mb-1 fw-bold">خریدسریع</span>
                                    <br/>
                                    <small>لیست محصولات بدون عکس</small>
                                </button>
                            </Link>
                            <Link href={"/products"}>
                                <button data-bs-dismiss="offcanvas.tsx" className="list-group-item list-group-item-action">
                                    <span className="mb-1 fw-bold">لیست همه محصولات</span>
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
            {
                productGroups ?
                    <React.Fragment>
                        <MainMenuCategory id={"cars"} title={"خودرو ها"}
                                          data={productGroups.filter(item => item.pLevel == ProductGroupLevel.Car)}
                                          icon={"fa-cars"}/>
                        <MainMenuCategory id={"brands"} title={"برند ها"}
                                          data={productGroups.filter(item => item.pLevel == ProductGroupLevel.Company)}
                                          icon={"fa-flag"}/>
                        <MainMenuCategory id={"parts"} title={"بخش ها"}
                                          data={productGroups.filter(item => item.pLevel == ProductGroupLevel.Section)}
                                          icon={"fa-cogs"}/>
                    </React.Fragment>
                    :
                    <></>
            }

            <MainMenuLinks title={"اخبار و تازه ها"} icon={"fa-newspaper"} url={"/news"}/>
            <MainMenuLinks title={"سوالات متداول"} icon={"fa-question"} url={"/faq"}/>
            <MainMenuLinks title={"درباره ما"} icon={"fa-info"} url={"/about"}/>
        </div>
    )
}

function MainMenuLinks(
    {
        title,
        icon,
        url
    }:
        {
            title: string,
            icon: string,
            url: string
        }
) {
    return (
        <a className="btn accordion-button collapsed no-sub" href={url}>
            <i className={"fad " + icon + " me-2"}/>
            {title}
        </a>
    )
}

function MainMenuCategory({
                              id,
                              title,
                              data,
                              icon
                          }:
                              {
                                  id: string,
                                  title: string,
                                  data: Array<ICategory>,
                                  icon: string
                              }) {
    return (
        <div className="accordion-item">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target={"#" + id} aria-expanded="false" aria-controls={id}>
                <i className={"fad " + icon + " me-2"}/>
                {title}
            </button>

            <div id={id} className="cat-menu accordion-collapse collapse" aria-labelledby="flush-headingTwo"
                 data-bs-parent="#mainMenuAccordion">
                {
                    data.map(item => {
                        return (
                            <Link
                                key={item.name}
                                href={{
                                    pathname: '/products',
                                    query: {
                                        Page: 1,
                                        [ProductGroupLevel[item.pLevel].toString()]: item.id
                                    }
                                }}
                            >
                                <button
                                    type="button"
                                    data-bs-dismiss="offcanvas.tsx"
                                    aria-label="Close"
                                    className="cat-option btn btn-link"

                                >
                                    <figure>
                                        <img
                                            className={"card-img-top"}
                                            src={getProductGroupImage(item)}
                                            alt={item.name}
                                        />
                                        <figcaption className="card-title">{item.name}</figcaption>
                                    </figure>
                                </button>
                            </Link>

                        )
                    })
                }
            </div>
        </div>
    )
}