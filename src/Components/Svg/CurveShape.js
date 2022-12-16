import * as React from "react";
import Svg, { G, Path, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const CurveShape = (props) => (
  <Svg
    width={551}
    height={120}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#a)">
      <Path
        d="M1 1s107.093 21.43 178.777 26.818c37.077 2.787 58.495 4.023 95.723 4.023s57.238-1.236 94.315-4.023C441.499 22.431 550 1 550 1v118H1V1Z"
        fill="url(#b)"
      />
      <Path
        d="m1 1 .05-.245-.3-.06V119.25h549.5V.696l-.298.059L550 1a3.028 3.028 0 0 0-.05-.245h-.003l-.015.004-.059.011-.235.046-.922.18c-.812.159-2.012.392-3.565.69-3.107.596-7.624 1.454-13.27 2.5a2623.61 2623.61 0 0 1-45.133 7.956c-36.084 6.031-81.121 12.734-116.951 15.427-37.075 2.786-57.078 4.022-94.297 4.022-37.219 0-58.63-1.236-95.704-4.022-35.83-2.693-80.515-9.396-116.248-15.427A2521.602 2521.602 0 0 1 18.9 4.187 2039.734 2039.734 0 0 1 2.27.997l-.91-.18L1.126.77 1.069.76 1.054.756H1.05L1 1Z"
        stroke="#7582F4"
        strokeWidth={0.5}
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={925.179}
        y1={14.409}
        x2={925.179}
        y2={132.409}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#3A3A6A" />
        <Stop offset={1} stopColor="#25244C" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default CurveShape;
