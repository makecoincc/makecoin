'use client'

// import { useState } from 'react'
import { usePathname, useRouter } from '@/i18n/routing'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { useLocale } from 'next-intl';

const languages = {
  zh: { name: '中文', flag: '🇨🇳' },
  en: { name: 'English', flag: '🇺🇸' }
};

export default function LangSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    // Use next-intl's router which handles locale switching properly
    router.replace(pathname, {locale: newLocale});
  };

  return (
    <div className="flex items-center gap-2">
      <Dropdown>
        <DropdownTrigger>
          <div className="flex items-center">
            <span className="text-lg">{languages[locale as keyof typeof languages]?.flag || '🇨🇳'}</span>
            <svg className='fill-current ml-1' xmlns="http://www.w3.org/2000/svg" width="10" height="6">
              <path d="m1.06.19 3.5 3.5 3.5-3.5 1.061 1.06-4.56 4.56L0 1.25 1.06.19Z"></path>
            </svg>
          </div>

        </DropdownTrigger>
        <DropdownMenu aria-label="Language selection"
          onAction={(key) => handleLanguageChange(key as string)}>
          {Object.entries(languages).map(([code, lang]) => (
            <DropdownItem
              key={code}
              className={locale === code ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
            >
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}