'use client'

import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar/page'
import { Rubik } from 'next/font/google'

const inter = Rubik({
    subsets: ["latin"],
    weight: ["400", "700"]
});

const Terms = () => {

  return (
    <>
      <NavBar />
      <div className={`${inter.className} bg-backgroundImg bg-cover bg-no-repeat min-h-screen flex flex-col p-6 md:p-12 lg:p-24 opacity-90`}>
        <h1 className='mt-6 mb-4 text-4xl lg:text-5xl text-center text-dark-200 font-bold'>Terms and Conditions</h1>
        <div className='bg-white bg-opacity-80 p-6 rounded-lg shadow-lg'>
          <dl className='space-y-4 mb-6'>
            <dt className='text-xl font-semibold'>Overview</dt>
            <dd className='text-lg'>“Welcome to Zandela Travels! These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, you accept these terms and conditions in full. Do not continue to use Zandela Travels’ website if you do not accept all of the terms and conditions stated on this page.”</dd>
          </dl>
          <dl className='space-y-4 mb-6'>
            <dt className='text-xl font-semibold'>Service Description</dt>
            <dd className='text-lg'>“Zandela Travels provides a platform for users to register vehicles and book rides. We strive to offer the best vehicles from around the country to fulfill your travel needs. Companies and individuals who register to provide services are not our employees; they work as our contractors. Although you represent as contractors, you will always be monitored by Zandela Travels' administration to ensure the best user experience and maintain a reliable and friendly relationship between our drivers and customers.”</dd>
          </dl>
          <dl className='space-y-4 mb-6'>
            <dt className='text-xl font-semibold'>User Account</dt>
            <dd className='text-lg'>“As part of our commitment to providing accessible services to all customers, we offer user account facilities exclusively to our contractors. When using our website to list your details, please adhere to the following guidelines:
              <ul className='list-disc list-inside'>
                <li><strong>Confidentiality:</strong> You are responsible for maintaining the confidentiality of your account information. All activities performed under your account are your responsibility.</li>
                <li><strong>Relevant and Clear Information:</strong> When posting or editing details through your account, ensure that the information is relevant and clear for our customers. Avoid violating company rules, as any such breaches may result in account termination.</li>
                <li><strong>Password Management:</strong> Upon creating an account, please remember your password. For security reasons, self-alteration of passwords is not available. If you forget your password, contact us at <span>0781799999</span>. Be prepared for a thorough process to regain account access.</li>
              </ul>
            </dd>
          </dl>
          <dl className='space-y-4 mb-6'>
            <dt className='text-xl font-semibold'>Content Usage</dt>
            <dd className='text-lg'>“The content displayed on the website is the intellectual property of Zandela Travels. You may not reuse, republish, or reprint such content without our written consent. Any issue related to duplication of content or reuse of content will be subjected to the company's legal authorities.”</dd>
          </dl>
          <dl className='space-y-4 mb-6'>
            <dt className='text-xl font-semibold'>Limitation of Liability</dt>
            <dd className='text-lg'>“Zandela Travels will not be liable for any indirect, special, or consequential loss or damage arising under these terms and conditions or in connection with our website.”</dd>
          </dl>
          <dl className='space-y-4 mb-6'>
            <dt className='text-xl font-semibold'>Governing Law</dt>
            <dd className='text-lg'>“These terms and conditions will be governed by and construed in accordance with the laws of the country, without regard to its conflict of law provisions.”</dd>
          </dl>
          <dl className='space-y-4 mb-6'>
            <dt className='text-xl font-semibold'>Changes to Terms</dt>
            <dd className='text-lg'>“Zandela Travels reserves the right to modify these terms and conditions at any time. We will notify users of any changes by posting the new terms and conditions on this website.”</dd>
          </dl>
          <dl className='space-y-4 mb-6'>
            <dt className='text-xl font-semibold'>Contact Us</dt>
            <dd className='text-lg'>“If you have any questions about these terms and conditions, please contact us using the information provided in the ‘Contact Information’ section on our <a href='/Policy'>Privacy & Policy</a> page. This document was last updated in June 2024.”</dd>
          </dl>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Terms
