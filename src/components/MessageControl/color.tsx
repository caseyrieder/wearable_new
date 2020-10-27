import React, { Fragment, FC } from 'react';
import { Button } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import Slider from 'azir-slider';
import { rgb2Hex, hex2Rgb } from '../../utils/color';
import { theme, height, width } from '../../themes';

// import { theme } from '../../themes';
// import { lang } from '../lang/en';

interface IProps {
  change: (value: string) => void;
  value: string;
}

const Container = styled.TouchableOpacity`
  height: ${height * 0.045}px;
  width: 90%;
  margin-left: 2%;
  margin-top: ${height / 330}px;
`;

const Box = styled.View`
  margin-top: ${height * 0.02}px;
  margin-bottom: 15px;
  height: 28%;
  width: 100%;
  padding-horizontal: 5%;
  background-color: ${theme.colors.grey.light};
`;

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
  let RGB = hex2Rgb(props.value);
  let red = RGB[0];
  let green = RGB[1];
  let blue = RGB[2];

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
            onValueChange={(data: number) => changeRed(data)}
          />
        </Container>
        <Container>
          <Background
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={gradGreen}
          />
          <StyledSlider
            value={green}
            step={1}
            minimumValue={0}
            maximumValue={255}
            thumbColor={theme.colors.misc.green}
            thumbSize={60}
            onValueChange={(data: number) => changeGreen(data)}
          />
        </Container>
        <Container>
          <Background
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={gradBlue}
          />
          <StyledSlider
            value={blue}
            step={1}
            minimumValue={0}
            maximumValue={255}
            thumbColor={theme.colors.misc.blue}
            thumbSize={60}
            onValueChange={(data: number) => changeBlue(data)}
          />
        </Container>
      </Box>
    </Fragment>
  );
};
