import styles from './layout.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import ICategory, {getProductGroupImage, ProductGroupLevel} from "../../types/ICategory";
import {useGetProductGroupsQuery} from "../../redux/api.slice";
import React, {ReactNode} from "react";
import {Accordion, Button} from "react-bootstrap";
import {FaCogs, FaFlag, FaShoppingBag, FaCar, FaNewspaper, FaQuestion, FaInfo} from "react-icons/fa";

export default function MainMenu() {
    const {data: productGroups, isLoading: productGroupsLoading, error: productGroupsError} = useGetProductGroupsQuery()

    return (
        <Accordion flush defaultActiveKey={'shop'}>
            <Accordion.Item eventKey={'shop'}>
                <Accordion.Header>
                    <FaShoppingBag className={'me-2'}/>
                    خرید
                </Accordion.Header>

                <Accordion.Body id="shop" className="p-0">

                    <div className="list-group list-group-flush">
                        <Link href={{
                            pathname: "/products",
                            query: {OnlyExists: true}
                        }}>
                            <button className="list-group-item list-group-item-action">
                                <span className="mb-1 fw-bold">خرید</span>
                                <br/>
                                <small>لیست محصولات موجود</small>
                            </button>
                        </Link>
                        <Link href={{
                            pathname: "/products",
                            query: {ProductView: 1}
                        }}>
                            <button className="list-group-item list-group-item-action">
                                <span className="mb-1 fw-bold">خریدسریع</span>
                                <br/>
                                <small>لیست محصولات بدون عکس</small>
                            </button>
                        </Link>
                        <Link href={"/products"}>
                            <button className="list-group-item list-group-item-action">
                                <span className="mb-1 fw-bold">لیست همه محصولات</span>
                            </button>
                        </Link>

                    </div>

                </Accordion.Body>
            </Accordion.Item>
            {
                productGroups ?
                    <React.Fragment>
                        <MainMenuCategory eventKey={"cars"} title={"خودرو ها"}
                                          data={productGroups.filter(item => item.pLevel == ProductGroupLevel.Car)}
                                          icon={<FaCar className={'me-2'}/>}/>
                        <MainMenuCategory eventKey={"brands"} title={"برند ها"}
                                          data={productGroups.filter(item => item.pLevel == ProductGroupLevel.Company)}
                                          icon={<FaFlag className={'me-2'}/>}/>
                        <MainMenuCategory eventKey={"parts"} title={"بخش ها"}
                                          data={productGroups.filter(item => item.pLevel == ProductGroupLevel.Section)}
                                          icon={ <FaCogs className={'me-2'}/>}/>
                    </React.Fragment>
                    :
                    <></>
            }

            <MainMenuLinks title={"اخبار و تازه ها"} icon={<FaNewspaper className={'me-2'}/>} url={"/news"}/>
            <MainMenuLinks title={"سوالات متداول"} icon={<FaQuestion className={'me-2'}/>} url={"/faq"}/>
            <MainMenuLinks title={"درباره ما"} icon={<FaInfo className={'me-2'}/>} url={"/about"}/>
        </Accordion>
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
            icon: ReactNode,
            url: string
        }
) {
    return (
        <a className="btn accordion-button collapsed no-sub" href={url}>
            {icon}
            {title}
        </a>
    )
}

function MainMenuCategory({
                              eventKey,
                              title,
                              data,
                              icon
                          }:
                              {
                                  eventKey: string,
                                  title: string,
                                  data: Array<ICategory>,
                                  icon: ReactNode
                              }) {
    return (
        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header>
                {icon}
                {title}
            </Accordion.Header>

            <Accordion.Body className={styles.catMenu}>
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
                                }}>
                                <Button variant={'link'} className={styles.catOption}
                                >
                                    <figure>
                                        <Image
                                            height={250}
                                            width={230}
                                            className={"card-img-top"}
                                            src={getProductGroupImage(item)}
                                            alt={item.name}
                                        />
                                        <figcaption className="card-title">{item.name}</figcaption>
                                    </figure>
                                </Button>
                            </Link>

                        )
                    })
                }
            </Accordion.Body>
        </Accordion.Item>
    )
}