'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { id: 1, name: 'Product', href: '#' },
  { id: 2, name: 'Features', href: '#' },
  { id: 3, name: 'Marketplace', href: '#' },
  { id: 4, name: 'Company', href: '#' },
]

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
    <nav aria-label="Global" className="flex items-center justify-between p-3 lg:px-8 bg-bannerImg opacity-90">
      <div className="flex lg:flex-1">
        <a href="/" className="-m-1.5 p-1.5">
          <img
            alt=""
            src="/assets/images/nav logom.png"
            className="h-9 w-auto md:h-7"
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
          <a key={item.id} href={item.href} className="text-sm/6 font-semibold text-white-500 hover:text-yellow-400">
            {item.name}
          </a>
        ))}
      </div>
    </nav>
    <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
      <div className="fixed inset-0 z-50" />
      <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-bannerImg px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ">
        <div className="flex items-center justify-between">
          <a href="/" className="-m-1.5 p-1.5 md:h-9">
            <img
              alt=""
               src="/assets/images/side.png"
              className="h-10 w-auto "
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
            <div className="space-y-2 py-6 ">
              {navigation.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white-500 hover:bg-gray-50 hover:text-dark-200"
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
  )
}
