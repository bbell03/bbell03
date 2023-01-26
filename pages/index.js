import HomeView from '.././components/HomeView';
import AppBar from '.././components/material/appbar';
import Footer from '.././components/ui_prototype/Footer';
import Nav from '.././components/Nav';

//General Directions
//Separate out into more discrete components and then expand on them
//Think about page layouts

//Items
//1. Fonts, Styles and Dark Mode
//3. Generalize Section Component

//In Progress: Modular Nav -> look into how to get it to persist across pages
  //pass children to navbar for different site contexts

const Index = () => (
  <div className = "font-sofia min-w-xs pt-2 bg-white px-8 mx-auto max-w-7xl lg:px-16">
      <Nav/>
    <section className="pt-4 bg-white tails-selected-element">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
            <div className="sm:pt-6 md:pt-0">
            <HomeView/>
            </div>
        </div>
    </section>
    <section className="mb-12 pb-12" contenteditable="true">
        <div className="px-4 sm:px-7 mx-auto max-w-7xl">
            <hr className="sm:hidden pb-5"/>
            <img class="sm:hidden object-scale-down h-16 w-16 rounded-full shadow-xl" src="/img/store.jpg" alt="Man looking at item at a store"></img>
            <h1 className="flex sm:hidden mt-4 sm:mt-2 mb-4 text-5xl text-left">Hi, I'm Brandon.</h1>
            <hr className="mt-6 sm:hidden hidden sm:block"/>
            <h2 className="mb-4 text-2xl font-bold md:text-3xl"></h2>
            <div className="grid grid-cols-1 gap-0 text-gray-600">
              <div>
                <h4 className="mt-6 sm:mt-3 mb-3 font-semibold text-gray-900 sm:text-xl">Who am I?</h4>
                <p  className = "text-lg sm:text-xl">
                  I am a software developer currently based in NYC.
                  I graduated from Tufts University with a Bachelor of Arts in Computer Science.
                  I also have interests in Spanish, real estate, investment, food, chemistry,
                  fitness, and design.
                </p>
                <h2 className="mt-6 mb-3 font-semibold text-gray-900 sm:text-xl">What have I done?</h2>
                <p className = "text-lg sm:text-xl">
                  Work ranging from full-stack web development in Javascript,
                  HTML and CSS, to data structures and algorithms in C++, to artificial intelligence in Python,
                  to low level implementations in C. Most notably, I have implemented a ride sharing service
                  using Google Maps, a presidential campaign tracker, an image compressor, a MERN stack,
                  and a simple virtual machine.
                </p>
              </div>
            <div className="">
                <h4 className="mt-6 mb-3 font-semibold text-gray-900 sm:text-xl">What am I looking for?</h4>
                <p  className = "text-lg sm:text-xl">
                  I am looking for  opportunities in software engineering that value a
                  well principled and iterative workflow, healthy challenge, good code, and strong design ideals.
                  I am looking for ways to grow and improve through the work that I do so as to bridge my own interests.
                </p>
                <h4 className="mt-6 mb-3 font-semibold text-gray-900 sm:text-xl">What is the meaning of this?</h4>
                <p  className = "text-lg sm:text-xl">
                  This site is a place to share my interests, and how I look to
                  develop them. I would ask that you take care while looking through as there may yet be inconsistencies,
                   points of improvement or possible directions to consider.
                </p>
            </div>
        </div>
    </div>

</section><Footer/></div>
);

export default Index;
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
