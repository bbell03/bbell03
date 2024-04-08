import Image from 'next/image'


export default function name() {
    return <Image
    src="/name1.png"
    alt="Vercel Logo"
    className="dark:invert dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
    width={125}
    height={36}
    priority
    />;
}