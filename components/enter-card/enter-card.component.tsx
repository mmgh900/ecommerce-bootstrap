import * as React from "react";
import Link from "next/link"
import Image from 'next/image'
import styles from './enter-card.module.scss'

const Enter = (props: { title: string; subtitle: string; imagePath: string; children: any; }) => {
    const {title, subtitle, imagePath, children} = props
    return (
        <div className={styles.containerWrapper}>
            <div className={'container-sm ' + styles.container}>
                <div className=''>
                    <Link href={'/'} passHref>
                        <a className={'d-flex align-items-center justify-content-center mb-2'}>
                            <Image
                                width={50}
                                height={50}
                                layout={'fixed'}
                                src={"/images/carrow-logo.png"} // Route of the image file
                                alt={"www.paykanpars.com"}
                            />
                            <h3 className={'fw-bold'} style={{marginBottom: -3, textTransform: 'uppercase', fontSize: 24, marginLeft: 10}}>
                                Carrow
                            </h3>
                        </a>
                    </Link>
                </div>

                <div className='card shadow'>
                    <div className='g-0 row'>
                        <div className='col-md-6 position-relative'>
                            <Image src={imagePath} layout={'fill'} alt={'ورود'}/>
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
