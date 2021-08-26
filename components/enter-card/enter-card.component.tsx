import * as React from "react";
import Link from "next/link"
import Image from 'next/image'
const Enter = (props: { title: string; subtitle: string; imagePath: string; children: any; }) =>
{
    const {title, subtitle, imagePath, children} = props 
   return (
       <div className='enter'>
           <div className='enter-container container py-5'>
               <div className='enter__card card shadow'>
                   <div className='enter__row row'>
                       <div className='enter__image-col col-12 col-lg-6'>
                           <div className='enter__image w-100 h-100' style={{
                               backgroundImage:`url(${imagePath})`,
                               backgroundSize: 'cover',
                               height: '500px'
                           }}/>
                       </div>
                       <div className='enter__form-col col-12 col-lg-6'>
                           <div className='enter__form-container p-5'>
                               <div className="imposter d-flex justify-content-center">
                                   {/*Change this to Link from react-router-dom when the home page is implemented in react too*/}
                                   <Link href={'/'} passHref>
                                       <a className='mb-2'>
                                           <Image alt='Paykan Pars' width={300} height={100} src={'/images/logo_600x200.png'}/>
                                       </a>
                                   </Link>
                                   
                               </div>
                               <h4 className='enter__title mb-2'>{title}</h4>
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
