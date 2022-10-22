import { Icon } from "@rneui/themed";
import * as React from "react";
import { TextInput } from "react-native";
import Svg, { G, Rect, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const SearchInput = (props) => (
  <Svg
    width={props.width}
    height={52}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#a)">
      <Rect
        width={props.width}
        height={52}
        rx={10}
        fill="url(#b)"
        fillOpacity={0.26}
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={9.179}
        y1={0.512}
        x2={10.018}
        y2={41.299}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#2E335A" />
        <Stop offset={1} stopColor="#1C1B33" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SearchInput;
