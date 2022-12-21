import HomePagePhoto from "./ui_prototype/HomePagePhoto.js";
import NewsFeed from "./ui_prototype/NewsFeed.js";
import IntroModule from ".././pages/Intro.jsx";

//Second Try Based on Test Layouts... made with Grid
//Flex might be better you might be able to avoid all of the manual spanning
const HomeView = () => {
  return(
    <div class = "mb-4 mt-8 sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 flex items-center object-scale-down">
      <div class="flex-1 max-w-full max-w-4xl mx-auto items-center">
            <ul class="mt-4 grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 lg:gap-x-72 md:gap-x-64 gap-x-56 justify-center place-items-center">
              <li class="sm:col-start-2 md:col-start-2 lg:col-start-2 col-span-1"><HomePagePhoto/></li>
              <li class="col-span-1 sm:col-span-3 md:col-span-3 lg:col-span-3"><NewsFeed/></li>
            </ul>
      </div>
    </div>
  );
};

//First Try Modular View Component
// const HomeView = () => {
//   return(
//
//       <div class="w-full max-w-4xl mx-auto items-center">
//             <ul class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-x-72 justify-center place-items-center">
//               <li class="sm:col-start-2 md:col-start-2 lg:col-start-2 col-span-1 bg-white rounded-lg shadow-xl"><HomePagePhoto/></li>
//               <li class="col-span-1 sm:col-span-3 md:col-span-3 lg:col-span-3 bg-white rounded-lg shadow-xl"><NewsFeed/></li>
//             </ul>
//       </div>
//
//   );
// };
export default HomeView;
