import Link from "next/link";
import React from "react";

export default function Footer () {
    return (
        <div className="w-100 pt-3">
            <div id="footer" className="footer container-fluid text-white">
                <div className="row p-4">
                    <div className="col-12 col-md-4">
                        <h4 className="fw-bold mb-3">درباره پیکان پارس</h4>
                        <ul className="list-unstyled">
                            <li className="text-white  text-right">
                                <p>گروه پیکان پارس با هدف بهبود فضای کسب و کار و در راستای اقتصاد اسلامی برای پیشرفت همگانی
                                    جامعه با شعار با هم پیشرفت از سال 1388 تشکیل شده است و هم اینک تمرکز خود را در زمینه
                                    تهیه و توزیع لوازم یدکی خودرو قرار داده است.</p>
                            </li>
                        </ul>
                    </div>

                    <div className="col-12 col-md-2">
                        <h4 className="fw-bold mb-3">لینک های مفید</h4>
                        <ul className="list-unstyled">
                            <li className="text-white  text-right">
                                <Link href="#">لیست قیمت بروز ایساکو</Link>
                            </li>
                            <li className="text-white  text-right">
                                <Link href="#">درگاه پرداخت پیکان پارس</Link>
                            </li>
                            <li className="text-white  text-right">
                                <Link href="/news">اخبار و تازه ها</Link>
                            </li>
                            <li className="text-white  text-right">
                                <Link href="/faq">سوالات متداول</Link>
                            </li>
                            <li className="text-white  text-right">
                                <Link href="/about">درباره ما</Link>
                            </li>

                        </ul>
                    </div>

                    <div className="col-12 col-md-5">
                        <h4 className="fw-bold mb-3">تماس با ما</h4>
                        <ul className="list-unstyled">
                            <li className="text-white  text-right">
                                <a href="#">شعبه اول: مشهد، امام رضا 34، نبش چهارراه دوم</a>
                            </li>
                            <li className="text-white  text-right">
                                <a href="#">
                                    شعبه دوم: مشهد، بین پیروزی 36 و 38
                                </a>
                            </li>

                            <li className="text-white  text-right">
                                <a href="#">۴۰۰ ۱۴ ۳۸۵ (۰۵۱)</a>
                            </li>
                            <li className="text-white  text-right">
                                <a href="#">۰۹۱۵۳۱۷۹۰۸۲</a>
                            </li>
                            <li className="text-white  text-right">
                                <a href="#">پیج اینستاگرام</a>
                            </li>
                            <li className="text-white  text-right">
                                <a href="#">کانال تلگرام</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>

    )
}

