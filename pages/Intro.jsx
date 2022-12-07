const GridView = () => {
    return(
      <div class = "min-h-screen flex items-center bg-blue-500">
        <div class="flex-1 max-w-xl mx-auto p-10">
          <ul class="grid grid-cols-1 grid-flow-row">
            <li class="col-span-1 bg-white rounded-lg shadow-xl">
              <div class="h-60">
                <h4 class="mt-8 mx-4 self-center text-2xl font-semibold font-sans dark:text-black">
                Hello .
                </h4>
                <p class ="text-2xl font-sans dark:text-black my-4 mx-4">
                  I am born and raised in nyc.
                  I have a degree in Computer Science from Tufts University and am looking for
                  opportunities in Software.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  export default GridView;
