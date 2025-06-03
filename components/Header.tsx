import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
// import Logo from './Logo'
import Image from 'next/image'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'


const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
            <Image
              src="/logo.png"
              alt="logo-adobe-express"
              className="dark:invert"
              width={90}
              height={24}
              priority
            />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden pr-4 mb-10 h-6 text-2xl font-semibold sm:block">
                {/* {siteMetadata.headerTitle} */}
                <Image
                  src="/name.png"
                  alt="logo-adobe-express"
                  className="dark:invert"
                  width={200}
                  height={100}
                  priority
                />
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400
              sm:block"
            >
              {link.title}
            </Link>
          ))}
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
