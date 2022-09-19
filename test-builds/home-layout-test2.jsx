import HomePagePhoto from "../components/ui_prototype/HomePagePhoto.js";
import NewsFeed from "../components/ui_prototype/NewsFeed.js";

const GridView = () => {
  return(
    <div class = "min-h-screen flex items-center bg-purple-500">
      <div class="flex-1 max-w-full max-w-4xl mx-auto items-center">
            <ul class="grid-cols-1 gap-x-12 justify-center place-items-center">
              <li class="col-span-1"><NewsFeed/></li>
            </ul>
      </div>
    </div>
  );
};

export default GridView;
