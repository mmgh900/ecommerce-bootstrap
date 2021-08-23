﻿import * as React from "react";
import Link from "next/link"
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
                                   <a href='./'>
                                       <img className='enter__logo mb-5 mx-auto' src='./images/logo.png' alt='Paykan Pars' width='250'/>
                                   </a>
                                   
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
