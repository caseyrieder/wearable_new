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
    line2: '',
    linkInstagram: 'https://www.instagram.com/​telekomfashionfusion/?hl=de',
    linkTwitter: 'https://www.twitter.com/fashionfusion?lang=de',
    linkWebsite: 'http://www.fashionfusion.telekom.com',
  },
  {
    image: imageKonig,
    name: 'KÖNIG SOUVENIR',
    line1:
      "KÖNIG SOUVENIR creates products in collaboration with artists, key figures from the realms of art, fashion and design. A wide audience interested in art is given the opportunity to engage with the gallery's programme outside the constraints of the gallery walls.",
    line2: '',
    linkInstagram: 'https://www.instagram.com/koenig.souvenir/',
    linkTwitter: 'https://twitter.com/koeniggalerie',
    linkWebsite: 'https://koenig-souvenir.com/',
  },
  {
    image: imageArivda,
    name: 'ARVIDA BYSTROM',
    line1: 'Arvida Byström is a Swedish artist, photographer, and model.',
    line2: '',
    linkInstagram: 'https://www.instagram.com/arvidabystrom',
    linkTwitter: 'https://twitter.com/arvidabystrom',
    linkWebsite: 'https://arvidabystrom.squarespace.com/',
  },
  {
    image: imageWearable,
    name: 'WEARABLE MEDIA',
    line1:
      'Wearable Media is a New York-based fashion tech studio that creates interactive wearable experiences. Co-founded by Yuchen Zhang and Hellyn Teng in 2017, Wearable Media creates conceptual and commercial garments that push the boundaries of fashion technology.',
    line2: '',
    linkInstagram: 'https://www.instagram.com/wearable.media/?hl=en',
    linkTwitter: 'https://twitter.com/wearablemediawm?lang=en',
    linkWebsite: 'https://www.wearablemedia.co/',
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
