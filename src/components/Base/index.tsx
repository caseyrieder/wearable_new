import React from 'react';
import styled from 'styled-components/native';
import { theme, width, height } from '../../themes';
import Background from '../../images/background/launch_screen_new.png';

export const PageLayout = styled.ScrollView`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${theme.colors.grey.main};
`;

const Backdrop = styled.ImageBackground`
  height: ${height}px;
  width: ${width}px;
  top: 0px;
  left: 0px;
`;

export const Page = props => (
  <PageLayout>
    <Backdrop source={Background}>{props.children}</Backdrop>
  </PageLayout>
);
