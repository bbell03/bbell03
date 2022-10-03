import BlogPost from './BlogPost';

const NewsFeed = () => {
  return (
    <div class="container flex-1 max-w-4xl p-10">
      <ul class="grid grid-cols-1 gap-4 grid-flow-row">
        <li class="w-full col-span-1"><BlogPost/></li>
        <li class="w-full col-span-1"><BlogPost/></li>
        <li class="w-full col-span-1"><BlogPost/></li>
      </ul>
    </div>
  )
}

export default NewsFeed;
