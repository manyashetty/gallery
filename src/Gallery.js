import React from "react";
import "./Gallery.css";
import A from "./images/1.jpeg";
import B from "./images/2.jpg";
import C from "./images/3.jpg";
import D from "./images/4.jpg";
import E from "./images/5.jpg";
import F from "./images/6.jpg";
import G from "./images/7.jpg";
import H from "./images/8.jpg";
import I from "./images/9.jpg";
import { useState, useEffect } from "react";

const InfiniteLooper = function InfiniteLooper({
  speed,
  direction,
  children,
}) {
  const [looperInstances, setLooperInstances] = useState(1);
  const outerRef = React.useRef(null);
  const innerRef = React.useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  function resetAnimation() {
    if (innerRef?.current) {
      innerRef.current.setAttribute("data-animate", "false");

      setTimeout(() => {
        if (innerRef?.current) {
          innerRef.current.setAttribute("data-animate", "true");
        }
      }, 10);
    }
  }

  const setupInstances = React.useCallback(() => {
    if (!innerRef?.current || !outerRef?.current) return;

    const { width } = innerRef.current.getBoundingClientRect();

    const { width: parentWidth } = outerRef.current.getBoundingClientRect();

    const widthDeficit = parentWidth - width;

    const instanceWidth = width / innerRef.current.children.length;

    if (widthDeficit) {
      setLooperInstances(
        looperInstances + Math.ceil(widthDeficit / instanceWidth) + 1
      );
    }

    resetAnimation();
  }, [looperInstances]);

  useEffect(() => setupInstances(), [setupInstances]);

  useEffect(() => {
    window.addEventListener("resize", setupInstances);

    return () => {
      window.removeEventListener("resize", setupInstances);
    };
  }, [looperInstances, setupInstances]);

  return (
    <div
      className={`looper ${isHovered ? "paused" : ""}`}
      ref={outerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="looper__innerList" ref={innerRef} data-animate="true">
        {[...Array(looperInstances)].map((_, ind) => (
          <div
            key={ind}
            className="looper__listInstance"
            style={{
              animationDuration: `${speed}s`,
              animationDirection: direction === "right" ? "reverse" : "normal",
            }}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => (
  <div className="app">

    <InfiniteLooper speed="14" direction="right">
      <div className="contentBlock contentBlock--one">
        <img className="contentImage" src={A} alt="img1" />
      </div>
      <div className="contentBlock contentBlock--one">
        <img className="contentImage" src={B} alt="img2" />
      </div>
      <div className="contentBlock contentBlock--one">
        <img className="contentImage" src={C} alt="img2" />
      </div>
      <div className="contentBlock contentBlock--one">
        <img className="contentImage" src={D} alt="img2" />
      </div>
      <div className="contentBlock contentBlock--one">
        <img className="contentImage" src={E} alt="img2" />
      </div>
    </InfiniteLooper>

    <InfiniteLooper direction="left" speed="14">
      <div className="contentBlock contentBlock--two">
        <img className="contentImage" src={F} alt="img2" />
      </div>
      <div className="contentBlock contentBlock--two">
        <img className="contentImage" src={G} alt="img2" />
      </div>
      <div className="contentBlock contentBlock--two">
        <img className="contentImage" src={H} alt="img2" />
      </div>
      <div className="contentBlock contentBlock--two">
        <img className="contentImage" src={I} alt="img2" />
      </div>
    </InfiniteLooper>

  </div>
);

const Gallery = () => {
  return (
    <div className="gallery">
      <App />
    </div>
  );
};

export default Gallery;



// import React from "react";
// import "./Gallery.css";
// import A from "./images/1.jpeg";
// import B from "./images/2.jpg";
// import C from "./images/3.jpg";
// import D from "./images/4.jpg";
// import E from "./images/5.jpg";
// import F from "./images/6.jpg";
// import G from "./images/7.jpg";
// import H from "./images/8.jpg";
// import I from "./images/9.jpg";
// import { useEffect } from "react";
// const InfiniteLooper = function InfiniteLooper({
//   speed,
//   direction,
//   children,
// }) {
//   const [looperInstances, setLooperInstances] = React.useState(1);
//   const outerRef = React.useRef(null);
//   const innerRef = React.useRef(null);

//   function resetAnimation() {
//     if (innerRef?.current) {
//       innerRef.current.setAttribute("data-animate", "false");

//       setTimeout(() => {
//         if (innerRef?.current) {
//           innerRef.current.setAttribute("data-animate", "true");
//         }
//       }, 10);
//     }
//   }

//   const setupInstances = React.useCallback(() => {
//     if (!innerRef?.current || !outerRef?.current) return;

//     const { width } = innerRef.current.getBoundingClientRect();

//     const { width: parentWidth } = outerRef.current.getBoundingClientRect();

//     const widthDeficit = parentWidth - width;

//     const instanceWidth = width / innerRef.current.children.length;

//     if (widthDeficit) {
//       setLooperInstances(
//         looperInstances + Math.ceil(widthDeficit / instanceWidth) + 1
//       );
//     }

//     resetAnimation();
//   }, [looperInstances]);

//   useEffect(() => setupInstances(), [setupInstances]);

//   useEffect(() => {
//     window.addEventListener("resize", setupInstances);

//     return () => {
//       window.removeEventListener("resize", setupInstances);
//     };
//   }, [looperInstances, setupInstances]);

//   return (
//     <div className="looper" ref={outerRef}>
//       <div className="looper__innerList" ref={innerRef} data-animate="true">
//         {[...Array(looperInstances)].map((_, ind) => (
//           <div
//             key={ind}
//             className="looper__listInstance"
//             style={{
//               animationDuration: `${speed}s`,
//               animationDirection: direction === "right" ? "reverse" : "normal",
//             }}
//           >
//             {children}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const App = () => (
//   <div className="app">
//     <p className="description">
//         {/* Content starts from here... */}
//       Gallery.....
//     </p>

//     <InfiniteLooper speed="9" direction="right">
//       <div className="contentBlock contentBlock--one">
//       <img className="contentBlock" src={A} alt="img1" />
//       </div>
//       <div className="contentBlock contentBlock--one">
//       <img className="contentBlock" src={B} alt="img2" />
//         </div>
//         <div className="contentBlock contentBlock--one">
//       <img className="contentBlock" src={C} alt="img2" />
//         </div>
//         <div className="contentBlock contentBlock--one">
//       <img className="contentBlock" src={D} alt="img2" />
//         </div>
//         <div className="contentBlock contentBlock--one">
//       <img className="contentBlock" src={E} alt="img2" />
//         </div>
//     </InfiniteLooper>

//     <InfiniteLooper direction="left" speed="11">
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={F} alt="img2" />
//       </div>
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={G} alt="img2" />
//       </div>
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={H} alt="img2" />
//       </div>
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={I} alt="img2" />
//       </div>
//     </InfiniteLooper>

//     <InfiniteLooper direction="right" speed="9">
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={F} alt="img2" />
//       </div>
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={A} alt="img2" />
//       </div>
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={B} alt="img2" />
//       </div>
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={C} alt="img2" />
//       </div>
//       <div className="contentBlock contentBlock--two">
//       <img className="contentBlock" src={D} alt="img2" />
//       </div>
//     </InfiniteLooper>
//   </div>
// );

// const Gallery = () => {
//   return (
//     <div className="gallery">
//       <App />
//     </div>
//   );
// };

// // ReactDOM.render(<Gallery />, document.getElementById("root"));
// export default Gallery;

