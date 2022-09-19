import NavBar from './Nav';
import NewsFeed from './NewsFeed';
import HomePagePhoto from './HomePagePhoto';
import HomeView from '../HomeView';

const ScrollView = () => {
  return (
    <div class = "snap-y snap-mandatory h-screen w-screen bg-gray-500 overflow-scroll">
      <div class="snap-start bg-cover bg-blue-200 w-screen h-screen min-h-screen items-center text-xl">
        <HomeView/>
      </div>
      <div class="snap-start bg-amber-200 w-screen h-screen flex items-center justify-center text-xl">
        <h1 class="">Some text about myself...</h1>
      </div>
      <div class="snap-start bg-amber-200 w-screen h-screen flex items-center justify-center text-xl">
        <h1 class="">Some text about myself...</h1>
      </div>
    </div>
  )
}

export default ScrollView;
