import * as React from "react";
import Svg, { G, Path, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const CurveShape = (props) => (
  <Svg
    width={702}
    height={132}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#a)">
      <Path
        d="M1 1s136.548 23.61 227.949 29.546c47.275 3.07 74.584 4.431 122.051 4.431s72.981-1.361 120.256-4.431C562.657 24.61 701 1 701 1v130H1V1Z"
        fill="url(#b)"
        fillOpacity={0.26}
      />
      <Path
        d="m1 1 .043-.246L.75.704V131.25h700.5V.704l-.292.05L701 1a3.013 3.013 0 0 0-.044-.246h-.004l-.019.004-.076.013-.298.05a2000.68 2000.68 0 0 1-5.723.958c-3.961.658-9.721 1.603-16.92 2.756a3826.643 3826.643 0 0 1-57.548 8.764c-46.01 6.645-103.438 14.03-149.128 16.997-47.272 3.07-72.781 4.431-120.24 4.431-47.46 0-74.763-1.361-122.035-4.431-45.69-2.967-102.669-10.352-148.23-16.996a3677.354 3677.354 0 0 1-56.931-8.765A2969.318 2969.318 0 0 1 7.087 1.78a1836.475 1836.475 0 0 1-5.65-.958L1.142.77 1.067.758 1.05.755 1.044.754 1 1Z"
        stroke="#7582F4"
        strokeOpacity={0.5}
        strokeWidth={0.5}
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={488.326}
        y1={1}
        x2={488.326}
        y2={131}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#3A3A6A" />
        <Stop offset={1} stopColor="#25244C" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default CurveShape;
