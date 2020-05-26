import React from 'react';
import styled from 'styled-components/native';

import iconInstagram from '../../images/icons/instagram.png';
import iconTwitter from '../../images/icons/twitter.png';
import iconWebsite from '../../images/icons/link.png';
import { ImageProps, Image } from 'react-native';

interface IProps extends IBrand {
  width: number;
}

const Container = styled.View`
  display: flex;
  padding: 0 0 40px 0;
`;

const ImageContainer = styled.View`
  display: flex;
  width: 100%;
`;

const BrandImage = styled.Image`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

const BrandTextContainer = styled.View`
  padding: 25px 0 0px;
`;

const BrandName = styled.Text`
  text-transform: uppercase;
  font-size: 20px;
`;

const BrandDescription = styled.Text`
  font-size: 15px;
`;

const IconRow = styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px 0 0 0;
`;

const IconContainer = styled.TouchableOpacity`
  padding-right: 22px;
`;

const IconImage = styled.Image`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

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
            <IconImage source={iconInstagram} width={25} height={25} />
          </IconContainer>
          <IconContainer>
            <IconImage source={iconTwitter} width={31} height={25} />
          </IconContainer>
          <IconContainer>
            <IconImage source={iconWebsite} width={25} height={25} />
          </IconContainer>
        </IconRow>
      </BrandTextContainer>
    </Container>
  );
};
