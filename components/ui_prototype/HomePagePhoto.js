//HOME PAGE PHOTO : React Functional Component
// <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow hover:bg-indigo-700" data-primary="indigo-600" data-rounded="rounded-md">Learn More</a>
// <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-indigo-700 bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200" data-primary="indigo-600" data-rounded="rounded-md">Contact</a>
const HomePagePhoto = () => {
  return (
    <div class="sm:mt-2 xs:mt-2 grid grid-col-1 justify-center object-fit">
      <img class="md:mt-12 lg:max-w-md md:max-w-md max-w-sm object-center rounded-full shadow-xl" src="/img/store.jpg" alt="Man looking at item at a store"></img>
      <div className="flex justify-center mt-8 mb-8 space-x-3">

      </div>
    </div>
  )
}

export default HomePagePhoto;
