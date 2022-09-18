const NavBar = () => {
  return(
    <ul class="fixed-top top-0 pt-4 right-0 mr-12 fixed flex">
      <li class="ml-6">
        <a class="text-blue-500 hover:text-blue-800" href="#">Active</a>
      </li>
      <li class="ml-6">
        <a class="text-blue-500 hover:text-blue-800" href="#">Link</a>
      </li>
      <li class="ml-6">
        <a class="text-blue-500 hover:text-blue-800" href="#">Link</a>
      </li>
      <li class="ml-6">
        <a class="text-gray-400 cursor-not-allowed" href="#">Disabled</a>
      </li>
    </ul>
  );
}

export default NavBar;
