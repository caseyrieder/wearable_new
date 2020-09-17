import React from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import iconInstagram from '../../images/icons/instagram.png';
import iconTwitter from '../../images/icons/twitter.png';
import iconWebsite from '../../images/icons/link.png';
import { ImageProps, Image } from 'react-native';
import { theme } from '../../themes';

interface IProps extends IBrand {
  width: number;
}

const Container = styled.View`
  display: flex;
  padding: 5px 5px 5px 5px;
`;

const ImageContainer = styled.View`
  display: flex;
  width: 100%;
`;

// const BrandImage = styled.Image`
//   width: 100%;
//   height: 100%;
// `;
const BrandImage = styled.Image`
  width: ${props => props.width * 0.83};
  height: ${props => props.height * 0.83};
`;

const BrandTextContainer = styled.View`
  margin-vertical: 5px;
  padding: 10px 0 10px;
`;

const BrandName = styled.Text`
  text-transform: uppercase;
  font-size: 20px;
  font-family: helvetica;
  font-weight: 500;
`;

const BrandDescription = styled.Text`
  font-size: 15px;
  font-family: Helvetica;
`;

const IconRow = styled.View`
  display: flex;
  flex-direction: row;
  margin-vertical: 10px;
`;

const IconContainer = styled.TouchableOpacity`
  padding-right: 22px;
`;
// padding-right: 22px;

const IconImage = styled.Image`
  width: 100%;
  height: 100%;
`;
// height: ${props => props.height};

const getImageDimensions = (componentWidth: number, image: ImageProps) => {
  const { width, height } = Image.resolveAssetSource(image);

  const ratio = componentWidth / width;

  return {
    width: componentWidth,
    height: Math.round(ratio * height),
    ratio: componentWidth / width,
  };
};

export const Brand: React.FC<IProps> = props => {
  const image = getImageDimensions(props.width, props.image);

  return (
    <ScrollView>
      <Container>
        <ImageContainer>
          <BrandImage
            source={props.image}
            width={image.width}
            height={image.height}
          />
        </ImageContainer>
        <BrandTextContainer>
          <BrandName>{props.name}</BrandName>
          <BrandDescription>{props.line1}</BrandDescription>
          <BrandDescription>{props.line2}</BrandDescription>
          <IconRow>
            <IconContainer>
              <Icon
                name="logo-instagram"
                color={theme.colors.black.main}
                size={25}
              />
            </IconContainer>
            <IconContainer>
              <Icon
                name="logo-twitter"
                color={theme.colors.black.main}
                size={25}
              />
            </IconContainer>
            <IconContainer>
              <Icon name="link" color={theme.colors.black.main} size={25} />
            </IconContainer>
          </IconRow>
        </BrandTextContainer>
      </Container>
    </ScrollView>
  );
};
