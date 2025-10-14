'use client'
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function AnimatedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <AnimatePresence mode="wait">
      {isClient ? (
        <motion.div
          key={pathname}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      ) : null}

    </AnimatePresence>
  )
}