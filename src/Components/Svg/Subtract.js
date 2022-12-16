import * as React from "react";
import Svg, { G, Path, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const Subtract = (props) => (
  <Svg
    width={266}
    height={100}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#a)">
      <Path
        d="M112 0h42c32 0 41.501 24.14 51.732 48.699C216.325 74.124 227 100 262 100H4c35 0 45.675-25.875 56.268-51.301C70.498 24.139 80 0 112 0Z"
        fill="url(#b)"
      />
      <Path
        d="M112 .25h42c15.923 0 26.229 6 33.838 15.05 7.372 8.77 12.215 20.404 17.156 32.275l.508 1.22.102.247c5.259 12.623 10.576 25.385 18.921 35.006 7.047 8.125 16.252 14.007 29.384 15.702H12.091c13.133-1.695 22.337-7.577 29.385-15.702 8.345-9.62 13.661-22.383 18.92-35.006l.103-.247.507-1.22c4.941-11.87 9.784-23.505 17.156-32.274C85.77 6.25 96.077.25 112 .25Z"
        stroke="#7582F4"
        strokeOpacity={0.5}
        strokeWidth={0.5}
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={183.615}
        y1={100}
        x2={183.615}
        y2={0}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#262C51" />
        <Stop offset={1} stopColor="#3E3F74" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default Subtract;
