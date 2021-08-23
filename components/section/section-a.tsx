import React from "react";
import styles from "./section.module.scss"
import Image from 'next/image'
import Section from "./section";
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
    const {isReversed, img, mini, head, subhead, isHero, ...others} = props;
    return (
        <Section isHero={isHero}>
            <div className={"section__row row " + " " + (isReversed ? "flex-md-row-reverse" : "")}>
                <div className={"section__image-container col-12 col-md-6 centerex "}>
                    <div className={"centerex " + styles.imageWrapper}>
                        <div className={[styles.image, ""].join(" ")}>
                            <Image
                                src={img} // Route of the image file
                                height={500} // Desired size with correct aspect ratio
                                width={500} // Desired size with correct aspect ratio
                                alt={head}
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