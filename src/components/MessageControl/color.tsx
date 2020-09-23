import React, { Fragment, FC } from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
// import Slider from 'azir-slider';
import { rgb2Hex } from '../../utils/color';
import { theme, otherColors } from '../../themes';

// import { theme } from '../../themes';
// import { lang } from '../lang/en';

interface IProps {
  change: (value: string) => void;
  changeRgb: (val: number[]) => void;
  rgbVal: number[];
}

interface ISliderProps {
  gradient: string[];
  val: number;
  onChange: (val: number) => void;
  rgbIndex: number;
}

const Container = styled.TouchableOpacity`
  height: 50px;
  width: 95%;
  margin-left: 2.5%;
  margin-vertical: 3px;
`;

const Background = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const StyledSlider = styled.Slider`
  width: 100%;
  height: 60px;
  margin-top: -5px;
`;

const SectionLabel = styled.Text`
  font-size: 16px;
  margin-left: 10px;
  margin-top: 30px;
  margin-bottom: 10px;
  color: ${theme.colors.grey.main};
`;

// const grad1 = ['#4c669f', '#3b5998', '#192f6a'];
// const grad2 = ['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#f00'];
const gradRed = [theme.colors.black.main, otherColors.red];
const gradGreen = [theme.colors.black.main, otherColors.green];
const gradBlue = [theme.colors.black.main, otherColors.blue];
// const LIGHTNESS = 0.5;
// const SATURATION_MIN = 0.2;
// const SATURATION_MAX = 0.8;

export const Color: FC<IProps> = props => {
  // for some reason hooks for state didn't work so we replaced with actual variables
  // const [hue, setHue] = useState(0);
  // let hue = 0;
  // let saturation = 0;

  let red = 100;
  let blue = 100;
  let green = 100;
  let RGB = [red, green, blue];

  // const showColors = (value: number) => {
  //   const colors = [
  //     HSLToHex(value, 0.2, LIGHTNESS),
  //     HSLToHex(value, 0.8, LIGHTNESS),
  //   ];

  //   return colors;
  // };

  // const getSaturation = () =>
  //   SATURATION_MIN + (SATURATION_MAX - SATURATION_MIN) * (saturation / 100);

  // const updateColor = () => {
  //   props.change(HSLToHex(hue, getSaturation(), LIGHTNESS));
  // };
  const updateColor = (val: string) => {
    props.change(val);
  };

  // const changeHue = (value: number) => {
  //   hue = value;
  //   updateColor();
  // };

  // const changeColor = (value: number) => {
  //   saturation = value;
  //   updateColor();
  // };

  const changeR = (value: number) => {
    RGB = [value, RGB[1], RGB[2]];
    let newHex: string = rgb2Hex(RGB);
    updateColor(newHex);
  };

  const changeG = (value: number) => {
    RGB = [RGB[0], value, RGB[2]];
    let newHex: string = rgb2Hex(RGB);
    updateColor(newHex);
  };

  const changeB = (value: number) => {
    RGB = [RGB[0], RGB[1], value];
    let newHex: string = rgb2Hex(RGB);
    updateColor(newHex);
  };

  const changeRGB = (value: number, color: string) => {
    let newRgb: number[] = RGB;
    if (color === 'r') {
      // RGB = [value, green, blue];
      newRgb[0] = value;
    } else if (color === 'g') {
      // RGB = [red, value, blue];
      newRgb[1] = value;
    } else {
      // RGB = [red, green, value];
      newRgb[2] = value;
    }
    return newRgb;
  };

  function changeColor(value: number, color: string) {
    // const newRgb = await changeRGB(value, color);
    // props.change(rgb2Hex(newRgb));
    props.change(rgb2Hex(changeRGB(value, color)));
  }

  function updateRgb(vals: number[]) {
    props.change(rgb2Hex(vals));
  }

  const RGBSlider: FC<ISliderProps> = sliderProps => (
    // const {gradient, color, clr} = props;
    // gradient: string[] = gradRed/Green/Blue
    // color: string = otherColors.red/green/blue
    // clr: string = 'r','g','b'
    <Container>
      <Background
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={sliderProps.gradient}
      />
      <StyledSlider
        value={sliderProps.rgbIndex}
        step={1}
        minimumValue={0}
        maximumValue={255}
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
        thumbTintColor="#777777"
      />
      <SectionLabel>{sliderProps.val}</SectionLabel>
    </Container>
  );

  return (
    <Fragment>
      <SectionLabel>Adjust Color</SectionLabel>
      <RGBSlider
        gradient={gradRed}
        rgbIndex={0}
        val={RGB[0]}
        onChange={(val: number) => changeR(val)}
      />
      <RGBSlider
        gradient={gradGreen}
        rgbIndex={1}
        val={RGB[1]}
        onChange={(val: number) => changeG(val)}
      />
      <RGBSlider
        gradient={gradBlue}
        rgbIndex={2}
        val={RGB[2]}
        onChange={(val: number) => changeB(val)}
      />
      {/* <RGBSlider gradient={gradGreen} rgbIndex={1} color={RGB[1]} clr="g" />
      <RGBSlider gradient={gradBlue} rgbIndex={2} color={RGB[2]} clr="b" /> */}
      {/* <Container>
        <Background
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={gradRed}
        />
        <StyledSlider
          value={0}
          step={1}
          minimumValue={0}
          maximumValue={255}
          trackColor="transparent"
          progressTrackColor="transparent"
          thumbColor={otherColors.red}
          thumbSize={60}
          // onChange={(data: number) => changeColor(data)}
          onChange={(data: number) => changeRGB(data, 'r')}
        />
      </Container>
      <Container>
        <Background
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={gradGreen}
        />
        <StyledSlider
          value={0}
          step={1}
          minimumValue={0}
          maximumValue={255}
          trackColor="transparent"
          progressTrackColor="transparent"
          thumbColor={otherColors.red}
          thumbSize={60}
          // onChange={(data: number) => changeColor(data)}
          onChange={(data: number) => changeRGB(data, 'g')}
        />
      </Container>
      <Container>
        <Background
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={gradBlue}
        />
        <StyledSlider
          value={0}
          step={1}
          minimumValue={0}
          maximumValue={255}
          trackColor="transparent"
          progressTrackColor="transparent"
          thumbColor={otherColors.blue}
          thumbSize={60}
          // onChange={(data: number) => changeColor(data)}
          onChange={(data: number) => changeRGB(data, 'b')}
        />
      </Container> */}
    </Fragment>
  );
  // return (
  //   <Fragment>
  //     <SectionLabel>Adjust Color</SectionLabel>
  //     <Container>
  //       <Background
  //         start={{ x: 0, y: 0 }}
  //         end={{ x: 1, y: 0 }}
  //         colors={grad2}
  //       />
  //       <StyledSlider
  //         value={0}
  //         step={1}
  //         minimumValue={0}
  //         maximumValue={359}
  //         trackColor="transparent"
  //         progressTrackColor="transparent"
  //         thumbColor="white"
  //         thumbSize={60}
  //         onChange={(data: number) => changeHue(data)}
  //       />
  //     </Container>
  //     <Container>
  //       <Background
  //         start={{ x: 0, y: 0 }}
  //         end={{ x: 1, y: 0 }}
  //         colors={showColors(hue)}
  //       />
  //       <StyledSlider
  //         value={0}
  //         step={1}
  //         minimumValue={0}
  //         maximumValue={100}
  //         trackColor="transparent"
  //         progressTrackColor="transparent"
  //         thumbColor="white"
  //         thumbSize={60}
  //         onChange={(data: number) => changeColor(data)}
  //       />
  //     </Container>
  //   </Fragment>
  // );
};
