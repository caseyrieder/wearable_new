import React, { Fragment, useState } from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import Slider from 'azir-slider';
import { HSLToHex } from '../../utils/color';
import { theme } from '../../themes';

// import { theme } from '../../themes';
// import { lang } from '../lang/en';
const redSlider = '#A60311';
const blueSlider = '#031CA6';
const greenSlider = '#2DA61B';

interface IProps {
  change: (value: string) => void;
}

const Container = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
`;

const Background = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 60px;
`;

const SectionLabel = styled.Text`
  font-size: 16px;
`;

const grad1 = ['#4c669f', '#3b5998', '#192f6a'];
const grad2 = ['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#f00'];
const LIGHTNESS = 0.5;
const SATURATION_MIN = 0.2;
const SATURATION_MAX = 0.8;

export const Color: React.FC<IProps> = props => {
  // for some reason hooks for state didn't work so we replaced with actual variables
  // const [hue, setHue] = useState(0);
  let hue = 0;
  let saturation = 0;

  let red = 128;
  let blue = 128;
  let green = 128;
  let RGB = [red, green, blue];

  const showColors = (value: number) => {
    const colors = [
      HSLToHex(value, 0.2, LIGHTNESS),
      HSLToHex(value, 0.8, LIGHTNESS),
    ];

    return colors;
  };

  const getSaturation = () =>
    SATURATION_MIN + (SATURATION_MAX - SATURATION_MIN) * (saturation / 100);

  const updateColor = () => {
    props.change(HSLToHex(hue, getSaturation(), LIGHTNESS));
  };

  const changeHue = (value: number) => {
    hue = value;
    updateColor();
  };

  const changeColor = (value: number) => {
    saturation = value;
    updateColor();
  };

  const changeRGB = (value: number, color: string) => {
    if (color === 'r') {
      RGB = [value, green, blue];
    } else if (color === 'g') {
      RGB = [red, value, blue];
    } else {
      RGB = [red, green, value];
    }
  };

  return (
    <Fragment>
      <SectionLabel>Adjust Color</SectionLabel>
      <Container>
        <Background
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={grad2}
        />
        <StyledSlider
          value={1}
          step={1}
          minimumValue={1}
          maximumValue={255}
          trackColor={theme.colors.other.red}
          progressTrackColor={theme.colors.black.main}
          thumbColor={theme.colors.other.red}
          thumbSize={60}
          // onChange={(data: number) => changeColor(data)}
          onChange={(data: number) => changeRGB(data, 'r')}
        />
      </Container>
      <Container>
        <Background
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={showColors(hue)}
        />
        <StyledSlider
          value={1}
          step={1}
          minimumValue={1}
          maximumValue={255}
          trackColor={theme.colors.other.green}
          progressTrackColor={theme.colors.black.main}
          thumbColor={theme.colors.other.green}
          thumbSize={60}
          // onChange={(data: number) => changeColor(data)}
          onChange={(data: number) => changeRGB(data, 'g')}
        />
      </Container>
      <Container>
        <Background
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={showColors(hue)}
        />
        <StyledSlider
          value={1}
          step={1}
          minimumValue={1}
          maximumValue={255}
          trackColor={theme.colors.other.blue}
          progressTrackColor={theme.colors.black.main}
          thumbColor={theme.colors.other.blue}
          thumbSize={60}
          // onChange={(data: number) => changeColor(data)}
          onChange={(data: number) => changeRGB(data, 'b')}
        />
      </Container>
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
