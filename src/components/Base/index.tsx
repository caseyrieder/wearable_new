import styled from 'styled-components/native';
import { theme } from '../../themes';

export const Page = styled.ScrollView`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${theme.colors.grey.main};
`;
