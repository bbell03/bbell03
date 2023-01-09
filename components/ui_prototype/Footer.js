
//make transparent
//soften top line

const Footer = () => {
  return (
<footer class="fixed bottom-0 left-0 z-20 p-4 w-full bg-white border-white-200 shadow sm:flex sm:items-center sm:justify-between sm:p-6 dark:bg-white-800 ">
    <span class="text-md text-black-500 sm:text-center dark:text-black-400">© 2023
    </span>
    <ul class="hidden sm:flex flex flex-wrap items-center mt-3 text-md text-black-500 dark:text-black-400 sm:mt-0">
        <li>
            <a href="#" class="mr-4 hover:underline sm:mr-6 ">Home</a>
        </li>
        <li>
            <a href="#" class="mr-4 hover:underline sm:mr-6">About</a>
        </li>
        <li>
            <a href="#" class="mr-4 hover:underline sm:mr-6">Resume</a>
        </li>
        <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">Projects</a>
        </li>
        <li>
            <a href="#" class="mr-2 hover:underline">Blog</a>
        </li>
    </ul>
</footer>

)};

export default Footer;
