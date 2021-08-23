import React, {MouseEventHandler} from "react";
import * as animationData from "../data/330-empty-status.json";
import Lottie from 'react-lottie';
import Link from 'next/link'

export default function NoSearchResult(
    {
        mainMassage,
        description,
        button
    }:
        {
            mainMassage: string,
            description: string,
            button?: { label: string, link?: string, onClickHandler?: MouseEventHandler<HTMLButtonElement> }
        }
) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="empty__imposter d-flex justify-content-center align-items-center">
            <div className="empty d-flex flex-column justify-content-center align-items-center">
                <Lottie
                    options={defaultOptions}
                    height={300}
                    width={300}
                />
                <h4 className="empty__massage pb-2">{mainMassage}</h4>
                <span className="empty__hint pb-3">{description}</span>
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