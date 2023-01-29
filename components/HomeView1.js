import HomePagePhoto from "./ui_prototype/HomePagePhoto1.js";
import NewsFeed from "./ui_prototype/NewsFeed0.js";
import IntroModule from ".././pages/Intro.jsx";

//Second Try Based on Test Layouts... made with Grid
//Flex might be better you might be able to avoid all of the manual spanning
//<li class="col-span-1 sm:col-span-3 md:col-span-3 lg:col-span-3"><NewsFeed/></li>
const HomeView = () => {
  return(
    <div class = "mb-2 mt-0  items-center object-scale-down">

      <div class="flex-1 max-w-full max-w-4xl mx-auto items-center">
            <ul class="mt-0 flex justify-left place-items-left">
              <li class="col-span-1"><HomePagePhoto/></li>
              <li class="col-span-1"></li>
            </ul>
      </div>
      
      <h1 className="pt-5 hidden sm:block text-6xl text-left">Hi, I'm Brandon.</h1>
      <hr className="mt-3 hidden sm:block"/>
    </div>
  );
};

export default HomeView;
