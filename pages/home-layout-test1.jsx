import HomePagePhoto from "../components/orig_ui_mock/HomePagePhoto.js";
import NewsFeed from "../components/orig_ui_mock/NewsFeed.js";

const GridView = () => {
  return(
    <div class = "min-h-screen flex items-center bg-purple-500">
      <div class="flex-1 max-w-full max-w-4xl mx-auto items-center">
            <ul class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-x-72 justify-center place-items-center">
              <li class="sm:col-start-2 md:col-start-2 lg:col-start-2 col-span-1"><HomePagePhoto/></li>
              <li class="col-span-1 sm:col-span-3 md:col-span-3 lg:col-span-3"><NewsFeed/></li>
            </ul>
      </div>
    </div>
  );
};

export default GridView;
