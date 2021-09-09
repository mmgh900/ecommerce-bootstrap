import Link from "next/link";
import React from "react";
import styles from './layout.module.scss'

export default function Footer() {
    return (
        <div className={`${styles.footer} footer text-white container-fluid pt-3`}>
            <div id="footer" className={`${styles.footer} footer container-lg text-white`}>
                <div className="row p-4">
                    <div className="col-12 col-md-3">
                        <h4 className="fw-bold mb-3">درباره پیکان پارس</h4>
                        <ul className="list-unstyled">
                            <li className="text-white  text-right">
                                <p>گروه پیکان پارس با هدف بهبود فضای کسب و کار و در راستای اقتصاد اسلامی برای پیشرفت
                                    همگانی
                                    جامعه با شعار با هم پیشرفت از سال 1388 تشکیل شده است و هم اینک تمرکز خود را در زمینه
                                    تهیه و توزیع لوازم یدکی خودرو قرار داده است.</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-2">
                        <h4 className="fw-bold mb-3">لینک های مفید</h4>
                        <ul className="list-unstyled">
                            <FooterListItem text={'لیست قیمت بروز ایساکو'} url={'/isaco'}/>
                            <FooterListItem text={'درگاه پرداخت پیکان پارس'} url={'/payment'}/>
                            <FooterListItem text={'اخبار و تازه‌ها'} url={'/news'}/>
                            <FooterListItem text={'سوالات متداول'} url={'/faq'}/>
                            <FooterListItem text={'درباره ما'} url={'/about'}/>
                        </ul>
                    </div>
                    <div className="col-12 col-md-3">
                        <h4 className="fw-bold mb-3">تماس با ما</h4>
                        <ul className="list-unstyled">

                            <FooterListItem text={'شعبه اول: مشهد، امام رضا 34، نبش چهارراه دوم'}
                                            url={'https://goo.gl/maps/CnLzBgEDHiip6cLZ7'}/>
                            <FooterListItem text={'شعبه دوم: مشهد، بین پیروزی 36 و 38'}
                                            url={'https://goo.gl/maps/FGjVaWQUJBp6LCvDA'}/>
                            <FooterListItem text={'۴۰۰ ۱۴ ۳۸۵ (۰۵۱)'} url={'tel:+985138514400'}/>
                            <FooterListItem text={'۰۹۱۵۳۱۷۹۰۸۲'} url={'tel:+989153179082'}/>
                            <FooterListItem text={'پیج اینستاگرام'} url={'#'}/>
                            <FooterListItem text={'کانال تلگرام'} url={'https://t.me/PaykanPars'}/>

                        </ul>
                    </div>
                    <div className="col-12 col-md-4">
                        <h4 className="fw-bold mb-3">مکان شعبه‌اصلی روی نقشه</h4>
                        <iframe
                            className={'w-100'}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3216.711378228753!2d59.60229321476376!3d36.2707855050212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f6c96d2e5814393%3A0x984a6678ed89e75c!2z2b7bjNqp2KfZhiDZvtin2LHYsw!5e0!3m2!1sen!2s!4v1630391608248!5m2!1sen!2s"
                            height="300" style={{border: 0}} allowFullScreen={true} loading="lazy"/>
                    </div>
                </div>
            </div>
        </div>

    )
}

const FooterListItem = ({text, url}: { text: string, url: string }) => {
    return (
        <li>
            <Link href={url} passHref>
                <a className={'text-light'}>{text}</a>
            </Link>
        </li>
    )
}
