import "../public/style/global.css";

const MyApp = ({Component, pageProps}) => {
  //what are these style tags doing
  return <div className="">
           <Component {...pageProps} />
          </div>;
};

export default MyApp;
