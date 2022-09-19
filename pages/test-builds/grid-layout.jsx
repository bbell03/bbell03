const GridView = () => {
  return(
    <div class = "min-h-screen flex items-center bg-purple-500">
      <div class="flex-1 max-w-4xl mx-auto p-10">
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 grid-flow-row">
          <li class="col-span-1 bg-white rounded-lg shadow-xl"><div class="h-24"></div></li>
          <li class="col-span-1 bg-teal-300 rounded-lg shadow-xl"><div class="h-24"></div></li>
          <li class="col-span-1 bg-white rounded-lg shadow-xl"><div class="h-24"></div></li>
          <li class="col-span-1 bg-white rounded-lg shadow-xl"><div class="h-24"></div></li>
          <li class="col-span-1 bg-white rounded-lg shadow-xl"><div class="h-24"></div></li>
          <li class="col-span-1 bg-white rounded-lg shadow-xl"><div class="h-24"></div></li>
          <li class="col-span-1 bg-white rounded-lg shadow-xl"><div class="h-24"></div></li>
          <li class="col-span-1 bg-white rounded-lg shadow-xl"><div class="h-24"></div></li>
          <li class="col-span-1 bg-white rounded-lg shadow-xl"><div class="h-24"></div></li>
          <li class="col-span-1 bg-white rounded-lg shadow-xl"><div class="h-24"></div></li>
          <li class="col-span-1 bg-white rounded-lg shadow-xl"><div class="h-24"></div></li>
          <li class="col-span-1 bg-white rounded-lg shadow-xl"><div class="h-24"></div></li>
        </ul>
      </div>
    </div>
  );
};

export default GridView;
