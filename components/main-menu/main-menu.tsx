import ICategory, {CatType, getListNameByType} from "../../types/ICategory";
import {useAppSelector} from "../../redux/hooks";
import Link from 'next/link'
import Image, {ImageLoader} from "next/image";
export default function MainMenu() {
    const parts = useAppSelector(state => state.categories[CatType.PART])
    const brands = useAppSelector(state => state.categories[CatType.BRANDS])
    const cars = useAppSelector(state => state.categories[CatType.CAR])

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
                            <Link href={"/products?OnlyExists=true"}>
                                <a className="list-group-item list-group-item-action">
                                    <span className="mb-1 fw-bold">خرید</span>
                                    <br/>
                                    <small>لیست محصولات موجود</small>
                                </a>
                            </Link>
                            <Link href={"/products?ProductView=1"}>
                                <a className="list-group-item list-group-item-action">
                                    <span className="mb-1 fw-bold">خریدسریع</span>
                                    <br/>
                                    <small>لیست محصولات بدون عکس</small>
                                </a>
                            </Link>
                            <Link href={"/products"}>
                                <a className="list-group-item list-group-item-action">
                                    <span className="mb-1 fw-bold">لیست همه محصولات</span>
                                </a>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
            <MainMenuCategory id={"cars"} title={"خودرو ها"} data={cars} icon={"fa-cars"}/>
            <MainMenuCategory id={"brands"} title={"برند ها"} data={brands} icon={"fa-flag"}/>
            <MainMenuCategory id={"parts"} title={"بخش ها"} data={parts} icon={"fa-cogs"}/>
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
                    data.map(item => (
                        <Link key={item.name} href={`/products?Page=1&${getListNameByType(item.type)}=${item.id}`}>
                            <button
                                type="button"
                                data-bs-dismiss="offcanvas.tsx"
                                aria-label="Close"
                                className="cat-option btn btn-link"

                            >
                                <figure>
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={500}
                                        height={500}
                                    />

                                    <figcaption className="card-title">{item.name}</figcaption>
                                </figure>
                            </button>
                        </Link>

                    ))
                }
            </div>
        </div>
    )
}