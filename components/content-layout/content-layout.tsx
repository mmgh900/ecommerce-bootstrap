import React from 'react';
import styles from './content-layout.module.scss'

const ContentLayout = (props: {
    [key: string]: any;
    heroTitle: string;
    heroImage: string;
    cardTitle: string;
    searchable: boolean;
    searchValue?: string
    children: any
}) => {
    let searchHandler = null, searchPlaceHolder = null;
    let {searchable, heroTitle, cardTitle, children, heroImage, ...otherProps} = props;

    /*
    * If content is searchable you should provide extra props
    * */
    if (searchable) {
        ({searchHandler, searchPlaceHolder, ...otherProps} = otherProps);
    }

    return (

        <div className='content-layout container-fluid px-0' {...otherProps}>
            <div
                className="hero__imposter d-flex justify-content-center align-items-center w-100 mb-4"
                style={{
                    height: "400px",
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), #198754e0), url(${heroImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div className={styles.hero + " d-flex flex-column justify-content-center align-items-center"}>
                    <h1 className="hero__title fw-bold text-white mb-4">{heroTitle}</h1>
                    {
                        searchable
                            ?
                            (<input value={otherProps.searchValue} onChange={searchHandler}
                                    className="form-control form-control-lg"
                                    placeholder={searchPlaceHolder}/>)
                            :
                            ""
                    }
                </div>
            </div>

            <div className={"content-layout__container container-xl px-lg-5"}>
                <div className={styles.card + " card shadow"}>
                    <div className='card-body p-3'>
                        <h4 className="card-title">{cardTitle}</h4>
                        <hr className='mb-2'/>
                        {children}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ContentLayout;