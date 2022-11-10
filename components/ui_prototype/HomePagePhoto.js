//HOME PAGE PHOTO : React Functional Component
// <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow hover:bg-indigo-700" data-primary="indigo-600" data-rounded="rounded-md">Learn More</a>
// <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200" data-primary="indigo-600" data-rounded="rounded-md">Contact</a>
const HomePagePhoto = () => {
  return (
    <div class="sm:mt-2 xs:mt-2 grid grid-col-1 justify-center object-fit">
      <img class="md:mt-12 lg:max-w-md md:max-w-sm max-w-sm object-center rounded-full shadow-xl" src="/img/store.jpg" alt="Man looking at item at a store"></img>
      <div className="flex object-center justify-center mt-8 mb-8 space-x-3">
          <label for="toggle-example" class="flex items-center cursor-pointer relative mb-4">
            <input type="checkbox" id="toggle-example" class="sr-only" />
            <div class="toggle-bg bg-purple-500 border-2 border-purple-500 h-6 w-11 rounded-full  shadow-inner inset-y-0"></div>
            <span class="ml-3 text-gray-900 text-sm font-medium">Dark Mode</span>
          </label>
        </div>
    </div>
  )
}

export default HomePagePhoto;
