import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

import { theme, width, height } from '../themes';
import { Page } from '../components/Base';
import { PageHeader } from '../components/HeaderControl';
import { Brand } from '../components/Brand';

// load images
import imageTelekom from '../images/brands/telekom.png';
import imageKonig from '../images/brands/konig.png';
import imageArivda from '../images/brands/arivda.png';
import imageWearable from '../images/brands/wearable.png';

const brands: IBrand[] = [
  {
    image: imageTelekom,
    name: 'TELEKOM',
    line1:
      'Telekom, with it’s Fashion Fusion program, is fostering the visionary ideas of companies in the fashion, technology and product design industries. The mission is to turn visionary concepts into lifestyle reality. As a digital lifestyle brand, Telekom aims to offer customers products with genuine added value.',
    linkInstagram: '',
    linkTwitter: '',
    linkWebsite: '',
  },
  {
    image: imageKonig,
    name: 'KÖNIG SOUVENIR',
    line1: 'One to two sentences about Konig',
    line2: 'Souvenir role in this project',
    linkInstagram: '',
    linkTwitter: '',
    linkWebsite: '',
  },
  {
    image: imageArivda,
    name: 'ARVIDA BYSTROM',
    line1: 'One to two sentences about Arvida',
    line2: 'Bystrom role in this project.',
    linkInstagram: '',
    linkTwitter: '',
    linkWebsite: '',
  },
  {
    image: imageWearable,
    name: 'WEARABLE MEDIA',
    line1: 'A fashion tech studio creates',
    line2: 'interactive wearable experiences.',
    linkInstagram: '',
    linkTwitter: '',
    linkWebsite: '',
  },
];

const WhiteBackground = styled.View`
  background-color: ${theme.colors.grey.light};
  width: 100%;
  height: 60%;
  bottom: 0;
`;

const BrandContainer = styled.View`
  padding: 30px;
  margin-top: -40%;
`;

const HeaderContainer = styled.View`
  display: flex;
  padding-left: ${width * 0.1}px;
  padding-bottom: ${height * 0.015}px;
  height: 25%;
`;
const HeaderText = styled.Text`
  color: ${theme.colors.black.dark};
  font-family: Helvetica;
  font-size: 18px;
`;
const Subhead = styled.Text`
  color: ${theme.colors.black.dark};
  font-family: Helvetica;
  font-size: 13px;
`;

const About = () => {
  return (
    <Page>
      <PageHeader title={''} />
      <HeaderContainer>
        <HeaderText>About</HeaderText>
        <Subhead>The teams behind the project</Subhead>
      </HeaderContainer>
      <WhiteBackground>
        <BrandContainer>
          <ScrollView showsVerticalScrollIndicator={true}>
            {brands.map(brand => {
              return <Brand width={width} {...brand} />;
            })}
          </ScrollView>
        </BrandContainer>
      </WhiteBackground>
    </Page>
  );
};

export default About;
