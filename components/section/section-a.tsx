import React from "react";
import styles from "./section.module.scss"
import Image from 'next/image'
import Section from "./section";
import useWindowDimensions from "../../hooks/useWindowDimensions";
type SectionAProps = {
    isReversed: boolean;
    img: string;
    mini: any;
    head: string;
    subhead: string;
    isHero: boolean;
    additional?: any;
}
const SectionA = (props: SectionAProps) => {
    const {height, width} = useWindowDimensions();
    const {isReversed, img, mini, head, subhead, isHero, ...others} = props;
    return (
        <Section isHero={isHero} {...others}>
            <div className={"row g-0 " + " " + (isReversed ? "flex-md-row-reverse" : "")}>
                <div className={"col-12 col-md-6 d-flex justify-content-center align-items-center "}>
                    <div className={"d-flex justify-content-center align-items-center " + styles.imageWrapper}>
                        <div className={[(isHero ? styles.heroImage : ""), ""].join(" ")}>
                            <Image
                                src={img} // Route of the image file
                                alt={head}
                                width={(width > 600 ? 500 : 300)}
                                height={(width > 600 ? 500 : 300)}
                                priority={true}
                            />
                        </div>
{/*                            <img className={"w-100 " + styles.image} src={img}
                                 alt={head}
                            />*/}

                    </div>
                </div>
                <div className={[" d-flex flex-column justify-content-center col-12 col-md-6", styles.content].join(" ")}>
                    <div className={styles.mini + " section__mini"}>
                        {mini}
                    </div>
                    {
                        isHero
                            ?
                            <h1 className={styles.head + " mb-3 fw-bolder"}  >
                                {head}
                            </h1>
                            :
                            <h2 className={styles.head + " mb-3 fw-bold section__head"}>
                                {head}
                            </h2>
                    }
                    <p className={styles.subhead + " section__subhead"}>
                        {subhead}
                    </p>
                    {others.additional ? others.additional : ""}
                </div>
            </div>
        </Section>
    )
}

export default SectionA;