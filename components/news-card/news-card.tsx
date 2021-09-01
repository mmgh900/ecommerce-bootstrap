import React from 'react';
import Image from 'next/image'
const NewsCard = (props: {
    img: string,
    link: string,
    title: string,
    date: string,
    desc: string

}) => {
    return (
        <a className={" news-card card h-100"} href={props.link}>
            <Image
                width={400}
                height={300}
                className={"card-img-top"}
                src={props.img} // Route of the image file
                alt={props.title}
            />
            <div className="card-body d-flex flex-column">
                <div>
                    <h5 className="card-title">{props.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{props.date}</h6>
                </div>

                <p className="card-text">{props.desc}</p>
            </div>
        </a>
    );
}

export default NewsCard


