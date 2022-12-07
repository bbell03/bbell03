import HomeView from '.././components/HomeView';
import AppBar from '.././components/material/appbar1';
// import Nav from '.././components/nav';
// <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow hover:bg-indigo-700" data-primary="indigo-600" data-rounded="rounded-md">Learn More</a>
// <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200" data-primary="indigo-600" data-rounded="rounded-md">Contact</a>

//1. Separate Nav -> look into how to get it to persist across pages
//2. Separate out into more discrete components and then expand on them
//3. Generalize Section Component and think about page layouts

//Old Nav
// <nav className="bg-white border-white-200 px-2 sm:px-4 py-2.5 rounded dark:bg-white-900">
// <div className="container flex flex-wrap justify-between items-center mx-auto">
//   <a href="/" className="flex items-center">
//       <span className="self-center text-xl font-semibold font-mono whitespace-nowrap dark:text-black">Brandon Bell</span>
//   </a>
//   <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
//     <span className="sr-only">Open main menu</span>
//     <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
//   </button>
//   <div className="hidden w-full md:block md:w-auto" id="navbar-default">
//     <ul className="flex flex-col p-4 mt-4 bg-white-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-white-800 md:dark:bg-white-900 dark:border-white-700">
//       <li>
//         <a href="#" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
//       </li>
//       <li>
//         <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
//       </li>
//       <li>
//         <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
//       </li>
//       <li>
//         <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
//       </li>
//       <li>
//         <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
//       </li>
//     </ul>
//   </div>
// </div>
// </nav>

const Index = () => (
  <div><AppBar/><section className="py-4 bg-white tails-selected-element">
    <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        <HomeView/>
    </div>
</section><section className="mt-6 py-8 bg-white" contenteditable="true">
    <div className="px-8 mx-auto max-w-7xl lg:px-16">
        <h2 className="mb-4 text-xl font-bold md:text-3xl">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 gap-0 text-gray-600 md:grid-cols-2 md:gap-16">
            <div>
                <h5 className="mt-10 mb-3 font-semibold text-gray-900">What have you done?</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <h5 className="mt-10 mb-3 font-semibold text-gray-900">Who are you?</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="">
                <h5 className="mt-10 mb-3 font-semibold text-gray-900">How do you do?</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <h5 className="mt-10 mb-3 font-semibold text-gray-900">What is the meaning of this?</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </div>
    </div>
</section></div>
);

export default Index;
