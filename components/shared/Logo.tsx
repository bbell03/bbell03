'use client'

import Image from 'next/image'

export default function Logo() {
  return (
    <Image
      src="/logo.png"
      alt="logo-adobe-express"
      className="dark:invert"
      width={90}
      height={24}
      priority
    />
  )
}