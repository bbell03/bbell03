const BlogPost = () => {
  return (
    <div class="mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
      <div class="md:flex">
        <div class="p-auto">
          <div class="uppercase tracking-wide text-md text-indigo-500 font-semibold">Item</div>
          <a href="https://pg-ops.vercel.app/" class="blocktext-lg leading-tight font-medium text-black hover:underline">Dashboarding with React and Dev Extreme</a>
          <p class="mt-2 text-slate-500">Getting a business off the ground takes work. </p>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
