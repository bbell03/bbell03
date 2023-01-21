//HOME PAGE PHOTO : React Functional Component
// <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow hover:bg-indigo-700" data-primary="indigo-600" data-rounded="rounded-md">Learn More</a>
// <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200" data-primary="indigo-600" data-rounded="rounded-md">Contact</a>
const HomePagePhoto = () => {
  return (
    <div class="hidden sm:block sm:mt-2 xs:mt-2 grid grid-col-1 object-fit">
      <img class="md:mt-12 md:max-w-sm max-w-sm rounded-full shadow-xl" src="/img/store.jpg" alt="Man looking at item at a store"></img>
      <div className="flex justify-center mt-8 mb-4 space-x-3">
                              <h1 className="mt-4 hidden lg:block sm:mt-2 mb-4 text-5xl font-bold text-left">Hi I'm Brandon.</h1>
      </div>
    </div>
  )
}

export default HomePagePhoto;
