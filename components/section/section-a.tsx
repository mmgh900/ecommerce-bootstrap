import React from "react";
import styles from "./section.module.scss"
import Image from 'next/image'
import Section from "./section";
import useWindowDimensions, {BootstrapBreakpoints} from "../../hooks/useWindowDimensions";
import {ScrollRotate} from 'react-scroll-rotate';

type SectionAProps = {
    isReversed: boolean;
    rotatable?: boolean;
    img: string;
    mini: any;
    head: string;
    subhead: string;
    isHero: boolean;
    additional?: any;

}
const SectionA = (props: SectionAProps) => {
    const {height, width} = useWindowDimensions();
    const {isReversed, img, mini, head, subhead, isHero, rotatable, ...others} = props;
    const SectionAImage = () => (
        <Image
            src={img} // Route of the image file
            alt={head}
            width={width > BootstrapBreakpoints.lg ? 500 : .6 * width}
            height={width > BootstrapBreakpoints.lg ? 500 : .6 * width}
            priority={true}
        />
    )
    return (
        <Section isHero={isHero} {...others}>
            <div className={"row g-0 " + " " + (isReversed ? "flex-md-row-reverse" : "")}>
                <div className={"col-12 col-md-6 d-flex justify-content-center align-items-center "}>
                    <div className={"d-flex justify-content-center align-items-center " + styles.imageWrapper}>
                        <div className={[(isHero ? styles.heroImage : ""), ""].join(" ")}>
                            {
                                rotatable ?
                                    <ScrollRotate>
                                        <SectionAImage/>
                                    </ScrollRotate>
                                    :
                                    <SectionAImage/>
                            }
                        </div>
                    </div>
                </div>
                <div
                    className={[" d-flex flex-column justify-content-center col-12 col-md-6", styles.content].join(" ")}>
                    <div className={styles.mini}>
                        {mini}
                    </div>
                    {
                        isHero
                            ?
                            <h1 className={styles.head + " mb-3 fw-bolder font-silicon"}>
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