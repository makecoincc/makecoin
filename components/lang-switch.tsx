'use client'

import { useState } from 'react'
// import { usePathname, useRouter } from 'next/navigation'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";

const languages = [
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'zh',
    name: '中文',
  },
]

export default function LangSwitch() {
  // const pathname = usePathname()
  // const router = useRouter()
  const [currentLang, setCurrentLang] = useState('en')
//   const currentLang = languages.find((lang) => pathname.startsWith(`/${lang.code}`))?.code || 'en'

  const handleChange = (lang: string) => {
    setCurrentLang(lang)
    // router.push(pathname.replace(`/${currentLang}`, `/${lang}`))
  }

  return (
    <div className="flex items-center gap-2">
      <Dropdown>
        <DropdownTrigger>
            <p className='flex items-center cursor-pointer text-sm'>{currentLang === 'en' ? '🇬🇧 En' : '🇨🇳 中文'}
                <svg className='fill-current ml-1' xmlns="http://www.w3.org/2000/svg" width="10" height="6">
                    <path d="m1.06.19 3.5 3.5 3.5-3.5 1.061 1.06-4.56 4.56L0 1.25 1.06.19Z"></path>
                </svg>
            </p>
        </DropdownTrigger>
        <DropdownMenu>
          {languages.map((lang) => (
            <DropdownItem
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              variant={lang.code === currentLang ? 'flat' : 'light'}
            >
              {lang.name}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}