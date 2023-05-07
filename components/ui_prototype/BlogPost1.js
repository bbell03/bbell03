
const BlogPost = () => {
  return (
    <div class="flex items-center">
      <a href = "https://pg-ops.vercel.app"class="group relative mx-auto w-96 overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
        <div class="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible"></div>
        <div class="relative rounded-[15px] bg-white p-6">
          <div class="space-y-4">
            <img src="https://nuxt.com/assets/home/ux-fast-light.svg" alt="" />
            <p class="text-lg font-semibold text-slate-800">Sample Project!</p>
            <p class="font-md text-slate-500">A showcase of some of my work with Dev Extreme, a React enabled dashboarding library for javascript.</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default BlogPost;
//https://tailwindcomponents.com/component/gradient-bordered-card
// <script src="https://cdn.tailwindcss.com"></script>
