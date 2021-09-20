import React, {MouseEventHandler} from "react";
import * as animationData from "../data/330-empty-status.json";
import Link from 'next/link'
import Image from 'next/image'
export default function NoSearchResult(
    {
        mainMassage,
        description,
        button,
        image
    }:
        {
            image?: string,
            mainMassage: string,
            description: string,
            button?: { label: string, link?: string, onClickHandler?: MouseEventHandler<HTMLButtonElement> }
        }
) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {preserveAspectRatio: 'xMidYMid slice'}
    }
    return (
        <div className="empty__imposter d-flex justify-content-center align-items-center">
            <div className="empty d-flex flex-column justify-content-center align-items-center">

                <Image src={image ? image : '/images/errors/no-results-found.png'} height={400} width={400} alt={'نتیجه ای یافت نشد'}/>
                {/*<Lottie
                    options={defaultOptions}
                    height={300}
                    width={300}
                />*/}
                <h4 className="fw-bold pb-1">{mainMassage}</h4>
                <span className="pb-3">{description}</span>
                {
                    button ?
                        button.link ?
                            <Link href={button.link}>
                                <button className={"btn btn-primary"}>
                                    {button.label}
                                </button>
                            </Link> :
                            <button onClick={button.onClickHandler} className={"btn btn-primary"}>
                                {button.label}
                            </button>
                        :
                        ""
                }

            </div>
        </div>
    )
}