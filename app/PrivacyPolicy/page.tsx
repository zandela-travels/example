'use client'

import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar/page'
import { Rubik } from 'next/font/google'

const inter = Rubik({
    subsets: ["latin"],
    weight: ["400", "700"]
});

const Policy = () => {
  
  return (
    <>
      <NavBar />
      <div className={`${inter.className} bg-backgroundImg bg-cover bg-no-repeat min-h-screen flex flex-col p-6 md:p-12 lg:p-24 opacity-90`}>
        <h1 className='mt-6 mb-4 text-4xl lg:text-5xl text-center text-dark-200 font-bold'>Privacy and Policy</h1>
        <div className='bg-white bg-opacity-80 p-6 rounded-lg shadow-lg'>
          <dl className='space-y-4 mb-6'>
            <dt className='text-xl font-semibold'>Overview</dt>
            <dd className='text-lg'>“At Zandela Travels, we prioritize the privacy and security of our users’ personal information. This Privacy Policy details our methods for collecting, using, and safeguarding your data when you visit our website or make a booking. By accessing our services, you agree to the terms outlined in this policy.”</dd>
          </dl>
          <dl className='space-y-4 mb-6'>
            <dt className='text-xl font-semibold'>Information Collection</dt>
            <dd className='text-lg'>“We collect personal details such as customer names, pickup addresses, and pickup dates and times. For vehicle registration by companies, we require vehicle registration numbers, types, photos, insurance card images, and vehicle registration certificates. Driver registrations necessitate details like names, ID numbers, license numbers, ages, photos, driver’s ID and license card photos.”</dd>
            <dd className='text-lg'>“Additionally, we may collect information about your interactions with our website, including IP addresses, browser types, and access times. This data helps us understand user behavior and improve our services.”</dd>
          </dl>
          <dl className='space-y-4 mb-6'>
            <dt className='text-xl font-semibold'>Use of Information</dt>
            <dd className='text-lg'>“The information we collect is used to facilitate your bookings, improve our services, and ensure a seamless travel experience. We may also use your data for internal analytics, service updates, and promotional communications, with your consent.”</dd>
            <dd className='text-lg'>“We may share your information with third-party service providers who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.”</dd>
          </dl>
          <dl className='space-y-4 mb-6'>
            <dt className='text-xl font-semibold'>Data Security</dt>
            <dd className='text-lg'>“We implement robust security measures to protect your personal information from unauthorized access, alteration, or destruction. Our security protocols include encryption, access controls, and regular security assessments.”</dd>
            <dd className='text-lg'>“Despite our efforts, no security measures are perfect or impenetrable, and we cannot guarantee the absolute security of your data. However, we strive to use commercially acceptable means to protect your personal information.”</dd>
          </dl>
          <dl className='space-y-4 mb-6'>
            <dt className='text-xl font-semibold'>User Rights</dt>
            <dd className='text-lg'>“You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your data. To exercise these rights, please contact us using the information provided below.”</dd>
            <dd className='text-lg'>“If you believe that your data protection rights have been violated, you have the right to lodge a complaint with the relevant supervisory authority.”</dd>
          </dl>
          <dl className='space-y-4 mb-6'>
            <dt className='text-xl font-semibold'>Contact Information</dt>
            <dd className='text-lg'>“For any questions or concerns regarding our Privacy Policy or your personal data, please reach out to us at <span>zandelatravels@gmail.com</span> or call us on <span> 0781799999 </span>. Our dedicated team will assist you promptly.”</dd>
            <dd className='text-lg'>“We are committed to resolving any issues or concerns you may have regarding our privacy practices.”</dd>
          </dl>
          <dl className='space-y-4 mb-6'>
            <dt className='text-xl font-semibold'>Updates to Policy</dt>
            <dd className='text-lg'>“We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We encourage you to review this policy regularly for the latest information on our privacy practices.”</dd>
            <dd className='text-lg'>“Any significant changes to this policy will be communicated through our website and, where appropriate, through direct communication with you.”</dd>
          </dl>
          <dl className='space-y-4 mb-6'>
            <dt className='text-xl font-semibold'>Effective Date</dt>
            <dd className='text-lg'>“This Privacy Policy is effective as of 2024 June. Any changes to our policy will be communicated through our website and, where appropriate, through direct communication with you.”</dd>
            <dd className='text-lg'>“We recommend that you review this policy periodically to stay informed about how we are protecting your information.”</dd>
          </dl>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Policy
