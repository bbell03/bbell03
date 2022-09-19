import HomePagePhoto from "../components/ui_prototype/HomePagePhoto.js";
import NewsFeed from "../components/ui_prototype/NewsFeed.js";
//          <li class="col-span-1 bg-white rounded-lg shadow-xl"><div class="h-24"></div></li>
const GridView = () => {
  return(
    <div class = "min-h-screen flex bg-purple-500">
      <div class="flex-1 w-full max-w-4xl mx-auto ">
        <ul class="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-x-24 grid-flow-row justify-center">
          <li class="px-8 max-h-screen col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 bg-white rounded-lg shadow-xl"><HomePagePhoto/></li>
          <li class="px-5 max-h-screen col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-3 bg-teal-300 rounded-lg shadow-xl"><NewsFeed/></li>
        </ul>
      </div>
    </div>
  );
};

export default GridView;
