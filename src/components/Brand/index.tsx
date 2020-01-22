import React from 'react';
import styled from 'styled-components/native';

import iconInstagram from '../../images/icons/instagram.png';
import iconTwitter from '../../images/icons/twitter.png';
import iconWebsite from '../../images/icons/link.png';

const Container = styled.View`
  display: flex;
  padding: 0 0 40px 0;
`;

const ImageContainer = styled.View`
  display: flex;
  width: 100%;
`;

const BrandImage = styled.Image`
  width: 346px;
  height: 219px;
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
  width: 25px;
  height: 25px;
`;

export const Brand: React.FC<IBrand> = props => {
  return (
    <Container>
      <ImageContainer>
        <BrandImage source={props.image} />
      </ImageContainer>
      <BrandTextContainer>
        <BrandName>{props.name}</BrandName>
        <BrandDescription>{props.line1}</BrandDescription>
        <BrandDescription>{props.line2}</BrandDescription>
        <IconRow>
          <IconContainer>
            <IconImage source={iconInstagram} />
          </IconContainer>
          <IconContainer>
            <IconImage source={iconTwitter} />
          </IconContainer>
          <IconContainer>
            <IconImage source={iconWebsite} />
          </IconContainer>
        </IconRow>
      </BrandTextContainer>
    </Container>
  );
};
