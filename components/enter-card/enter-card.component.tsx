import * as React from "react";
import Link from "next/link"
import Image from 'next/image'
import styles from './enter-card.module.scss'

const Enter = (props: { title: string; subtitle: string; imagePath: string; children: any; }) => {
    const {title, subtitle, imagePath, children} = props
    return (
        <div className={styles.containerWrapper}>
            <div className={'container-sm ' + styles.container}>
                <div className='mb-3'>
                    <Link href={'/'} passHref>
                        <a>
                            <img alt='Paykan Pars' src={'/images/logo_250x30.png'}/>
                        </a>
                    </Link>
                </div>

                <div className='card shadow'>
                    <div className='g-0 row'>
                        <div className='col-md-6'>
                            <div className='w-100 h-100' style={{
                                backgroundImage: `url(${imagePath})`,
                                backgroundSize: 'cover',
                            }}/>
                        </div>
                        <div className='col-12 col-md-6'>
                            <div className='p-4 p-md-5'>
                                <h5 className='fw-bold mb-2'>{title}</h5>
                                <p className='enter__subtitle mb-4'>{subtitle}</p>
                                {children}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}


export default Enter;
