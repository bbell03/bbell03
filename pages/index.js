import React from "react";
import HomeView from ".././components/HomeView";
import NavBar from '../components/ui_prototype/Nav';
import Nav from '../components/nav';
import ReactFullpage from '@fullpage/react-fullpage';

const HomePage = () => (
  <ReactFullpage
    //fullpage options
    licenseKey = {'YOUR_KEY_HERE'}
    scrollingSpeed = {1000} /* Options here */

    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <div className="section">
              <div class="">
              <NavBar/>
              <div id="">
                <div class="">
                  <HomeView/>
                </div>
              </div>
          </div>
            <button onClick={() => fullpageApi.moveSectionDown()}>
              Click me to move down
            </button>
          </div>
          <div className="section">
            <p>Section 2</p>
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
);

// const HomePage = () => {
//   return (
//       <div class="">
//       <NavBar/>
//         <div id="">
//           <div class="">
//             <HomeView/>
//           </div>
//         </div>
//       </div>
//   );
// };

export default HomePage;
