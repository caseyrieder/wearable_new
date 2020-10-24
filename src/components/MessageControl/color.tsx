import React, { Fragment, FC } from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import Slider from 'azir-slider';
import { rgb2Hex, hex2Rgb } from '../../utils/color';
import { theme, otherColors, height, width } from '../../themes';

// import { theme } from '../../themes';
// import { lang } from '../lang/en';

interface IProps {
  change: (value: string) => void;
  value: string;
}

interface ISliderProps {
  gradient: string[];
  val: number;
  onChange: (val: number) => void;
  color: string;
}

const Container = styled.TouchableOpacity`
  height: ${height * 0.045}px;
  width: 90%;
  margin-left: 2%;
  margin-top: ${height / 330}px;
`;
  
const Box = styled.View`
  margin-top: ${height*0.02}px;
  margin-bottom: 15px;
  height: 28%;
  width: 100%;
  padding-horizontal: 5%;
  background-color: ${theme.colors.grey.light};
`

const Background = styled(LinearGradient)`
  position: absolute;
  top: 45%;
  left: 0%;
  right: 0%;
  bottom: 45%;
`;

const StyledSlider = styled.Slider`
  width: 100%;
  height: 100%;
  margin-top: 0px;
`;

const SectionLabel = styled.Text`
  font-size: ${width * 0.03}px;
  margin-left: ${width * 0.01}px;
  margin-top: ${height * 0.02}px;
  margin-bottom: 0px;
  height: ${height * 0.03}px;
  color: ${theme.colors.black.dark};
`;

const gradRed = [theme.colors.black.main, theme.colors.misc.red];
const gradGreen = [theme.colors.black.main, theme.colors.misc.green];
const gradBlue = [theme.colors.black.main, theme.colors.misc.blue];

export const Color: FC<IProps> = props => {
  // for some reason hooks for state didn't work so we replaced with actual variables
  // const [hue, setHue] = useState(0);
  // let hue = 0;
  // let saturation = 0;

  let RGB = hex2Rgb(props.value);
  let red = RGB[0];
  let blue = RGB[1];
  let green = RGB[2];

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
  //   console.log(`new color: [${red}, ${green}, ${blue}]`);
  //   props.change(rgb2Hex([red, green, blue]));
  // };
  // const updateColor = (val: string) => {
  //   props.change(val);
  // };

  // const changeHue = (value: number) => {
  //   hue = value;
  //   updateColor();
  // };

  // const changeColor = (value: number) => {
  //   saturation = value;
  //   updateColor();
  // };

  const updateColor = () => {
    props.change(rgb2Hex([red, green, blue]));
  };

  const changeRed = (value: number) => {
    console.log('changing red');
    red = value;
    updateColor();
  };
  const changeGreen = (value: number) => {
    console.log('changing green');
    green = value;
    updateColor();
  };
  const changeBlue = (value: number) => {
    console.log('changing blue');
    blue = value;
    updateColor();
  };

  // const changeG = (value: number) => {
  //   RGB = [RGB[0], value, RGB[2]];
  //   let newHex: string = rgb2Hex(RGB);
  //   updateColor(newHex);
  // };

  // const changeB = (value: number) => {
  //   RGB = [RGB[0], RGB[1], value];
  //   let newHex: string = rgb2Hex(RGB);
  //   updateColor(newHex);
  // };

  // const changeRGB = (value: number, color: string) => {
  //   let newRgb: number[] = RGB;
  //   if (color === 'r') {
  //     // RGB = [value, green, blue];
  //     newRgb[0] = value;
  //   } else if (color === 'g') {
  //     // RGB = [red, value, blue];
  //     newRgb[1] = value;
  //   } else {
  //     // RGB = [red, green, value];
  //     newRgb[2] = value;
  //   }
  //   return newRgb;
  // };

  // function changeColor(value: number, color: string) {
  //   // const newRgb = await changeRGB(value, color);
  //   // props.change(rgb2Hex(newRgb));
  //   props.change(rgb2Hex(changeRGB(value, color)));
  // }

  // function updateRgb(vals: number[]) {
  //   props.change(rgb2Hex(vals));
  // }

  // const RGBSlider: FC<ISliderProps> = sliderProps => (
  //   // const {gradient, color, clr} = props;
  //   // gradient: string[] = gradRed/Green/Blue
  //   // color: string = otherColors.red/green/blue
  //   // clr: string = 'r','g','b'
  //   <Container>
  //     <Background
  //       start={{ x: 0, y: 0 }}
  //       end={{ x: 1, y: 0 }}
  //       colors={sliderProps.gradient}
  //     />
  //     <StyledSlider
  //       value={sliderProps.val}
  //       step={1}
  //       minimumValue={0}
  //       maximumValue={255}
  //       minimumTrackTintColor="transparent"
  //       maximumTrackTintColor="transparent"
  //       thumbTintColor={sliderProps.color}
  //       thumbSize={60}
  //     />
  //     <SectionLabel>{sliderProps.val}</SectionLabel>
  //   </Container>
  // );

  return (
    <Fragment>
      <Box>
        <SectionLabel>Adjust Color</SectionLabel>
        <Container>
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
            thumbColor={theme.colors.misc.red}
            thumbSize={60}
            onChange={(data: number) => changeRed(data)}
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
            thumbColor={theme.colors.misc.green}
            thumbSize={60}
            onChange={(data: number) => changeGreen(data)}
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
            thumbColor={theme.colors.misc.blue}
            thumbSize={60}
            onChange={(data: number) => changeBlue(data)}
          />
        </Container>
      </Box>
    </Fragment>
  );
};
