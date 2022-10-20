import * as React from "react";
import Svg, {
  G,
  Circle,
  Mask,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const PlusButton = (props) => (
  <Svg
    width={104}
    height={111}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#a)">
      <Circle cx={52} cy={52} r={32} fill="url(#b)" fillOpacity={0.4} />
    </G>
    <G filter="url(#c)">
      <Circle cx={52} cy={52} r={29} fill="url(#d)" />
      <Circle cx={52} cy={52} r={28.9} stroke="url(#e)" strokeWidth={0.2} />
    </G>
    <Mask
      id="g"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={23}
      y={23}
      width={58}
      height={58}
    >
      <Circle cx={52} cy={52} r={29} fill="url(#f)" />
    </Mask>
    <Path
      d="M40.27 52.129c0 1.148.929 2.078 2.077 2.078h7.588v7.588c0 1.135.916 2.078 2.065 2.078a2.086 2.086 0 0 0 2.078-2.078v-7.588h7.588a2.071 2.071 0 0 0 0-4.142h-7.588v-7.588c0-1.135-.93-2.079-2.078-2.079a2.074 2.074 0 0 0-2.065 2.079v7.588h-7.588c-1.148 0-2.078.93-2.078 2.064Z"
      fill="#48319D"
    />
    <Defs>
      <LinearGradient
        id="b"
        x1={31.5}
        y1={33}
        x2={70.5}
        y2={79}
        gradientUnits="userSpaceOnUse"
      >
        <Stop />
        <Stop offset={1} stopColor="#fff" stopOpacity={0.76} />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={37}
        y1={31}
        x2={68.5}
        y2={75.833}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F5F5F9" />
        <Stop offset={1} stopColor="#DADFE7" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={31.833}
        y1={32.833}
        x2={66.167}
        y2={78.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" />
        <Stop offset={1} stopColor="#AEAEAE" />
      </LinearGradient>
      <LinearGradient
        id="f"
        x1={37}
        y1={31}
        x2={68.5}
        y2={75.833}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F5F5F9" />
        <Stop offset={1} stopColor="#DADFE7" />
      </LinearGradient>
      <LinearGradient
        id="i"
        x1={27.791}
        y1={33.201}
        x2={52}
        y2={81}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#fff" stopOpacity={0} />
        <Stop offset={1} stopColor="#BBBFC7" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default PlusButton;
