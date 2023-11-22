// const Circle = (props) => {
//     return (
//       <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
//     );
// }


//<div className={`w-${props.diameter} h-${props.diameter} bg-blue-500 rounded-full`}></div>

const Circle = (props) => {
  console.log(`w-${props.diameter} h-${props.diameter}`)
  return (
    <div style={{width: props.diameter, height: props.diameter}} className="bg-blue-500 rounded-full"></div>
  );
}

export default Circle;




//<div className={`w-${props.diameter} h-${props.diameter} bg-blue-500 rounded-full`}></div>