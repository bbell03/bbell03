import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 text-sm font-medium uppercase text-accent hover:text-accent-600 dark:hover:text-accent-400 hover:text-glow-accent-sm transition-all duration-300"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
