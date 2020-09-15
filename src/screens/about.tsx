import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

import { theme, width } from '../themes';
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
    line1: 'Communication technology company that',
    line2: 'supports arts and creativity.',
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
    name: 'ARIVDA BYSTROM',
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

const BrandContainer = styled.View`
  padding: 30px;
`;

const About = () => {
  return (
    <Page>
      <PageHeader title={'About'} />
      <BrandContainer>
        <ScrollView showsVerticalScrollIndicator={true}>
          {brands.map(brand => {
            return <Brand width={width} {...brand} />;
          })}
        </ScrollView>
      </BrandContainer>
    </Page>
  );
};

export default About;
