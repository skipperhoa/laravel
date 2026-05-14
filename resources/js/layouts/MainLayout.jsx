import React from 'react'
import NavMenu from '../components/ui/app-nav';
export default function MainLayout({children}) {
  return (
      <div className='w-full' data-title="Dashboard">
          {/* sidebar */}

          {/* menu */}
           <NavMenu />
          {/* end menu */}
          {/* content */}
          {children}
          {/* end content */}
      </div>
    )
}
