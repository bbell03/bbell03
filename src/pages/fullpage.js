/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import ReactDOM from "react-dom";
import ReactFullpage from "@fullpage/react-fullpage";
import Layout from '../.././components/layout';

import Blog from '../.././components/blogcopy.js';

const SEL = "custom-section";
const SECTION_SEL = `.${SEL}`;

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
  
  /*
   * require('./fullpage.fadingEffect.min'); // Optional. Required when using the "fadingEffect" extension.
   */
};

const originalColors = [
  '#fffff'
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionsColor: [...originalColors],
      fullpages: [
        {
          text: <Blog/>
        },
        {
          text: "Section 2"
        },
        {
          text: "Section 3"
        }
      ]
    };
  }

  onLeave(origin, destination, direction) {
    console.log("onLeave", { origin, destination, direction });
    // arguments are mapped in order of fullpage.js callback arguments do something
    // with the event
  }

  render() {
    const { fullpages } = this.state;

    if (!fullpages.length) {
      return null;
    }

    const Menu = () => (
      <div
        className="menu"
        style={{
          top: 0,
          zIndex: 100
        }}
      ><Layout/></div>
    );

    return (

      <div className="App fixed">
        <Menu />
        <ReactFullpage
          debug /* Debug logging */
          // Required when using extensions
          pluginWrapper={pluginWrapper}
          // fullpage options
          licenseKey={"YOUR_KEY_HERE"} // Get one from https://alvarotrigo.com/fullPage/pricing/
          navigation
          anchors={["firstPage", "secondPage", "thirdPage"]}
          sectionSelector={SECTION_SEL}
          onLeave={this.onLeave.bind(this)}
          sectionsColor={this.state.sectionsColor}
          render={(comp) => (
            <ReactFullpage.Wrapper>
              {fullpages.map(({ text }) => (
                <div key={text} className={SEL}>
                  <div className="slide">
                    <h3>{text}</h3>
                  </div>
                  <div className="slide">
                    <h3>pages</h3>
                  </div>
                </div>
              ))}
            </ReactFullpage.Wrapper>
          )}
        />
      </div>
 
    );
  }
}

export default App;
