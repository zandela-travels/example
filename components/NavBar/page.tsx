'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Righteous } from 'next/font/google'


const inter = Righteous({
  subsets: ["latin"],
  weight: ["400"]
});


const navigation = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'Book a Ride', href: '/Goride' },
  { id: 3, name: 'Privacy Policy', href: '/PrivacyPolicy' },
  { id: 4, name: 'Terms and Conditions', href: '/Terms&Conditions' },
];

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [active, setActive] = useState(1); // Default active item

  useEffect(() => {
    const activeItem = navigation.find((item) => item.href === pathname);
    if (activeItem) {
      setActive(activeItem.id);
    }
  }, [pathname]);

  const handleLinkClick = (href: string) => {
    setLoading(true);
    router.push(href);
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <nav aria-label="Global" className={`${inter.className} flex items-center justify-between p-3 lg:px-8 bg-navBarImg opacity-90`}>
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img
              alt="Logo"
              src="/assets/images/nav logom.png"
              className="h-10 w-auto md:h-12"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <Bars3Icon aria-hidden="true" className="h-6 w-6 text-white-500" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.href);
              }}
              className={`underline-animation ${active === item.id ? "text-yellow-500" : "text-white-500"} inline-block cursor-pointer transition duration-300 ease-in-out`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-navBarImg px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5 md:h-9">
              <img
                alt="Side Logo"
                src="/assets/images/side.png"
                className="h-10 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white-500" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-white-500 hover:bg-gray-50 hover:text-dark-200"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
