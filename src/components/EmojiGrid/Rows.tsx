import React from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';

interface IPropsItem {
    code: string;
    image: object;
    // onPress:(code: string) => boolean;
}

const Row = styled.View`
    display: flex;
    height: 80px;
    width: 100%;
    background-color: transparent;
    align-items: center;
    justify-content: center;
`
const Item = styled.TouchableOpacity`
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const Icon = styled.Image`
    align-self: center;
    flex: 1;
`;

const Emoji: React.FC<IPropsItem> = props =>{
    return (
        <Item onPress={() => Alert.alert(`${props.code}`)}>
            <Icon source={props.image} />
        </Item>
    )
}

export const SingleRow: React.FC<IPropsItem> = props => {
    return (
        <Row>
            <Emoji code={props.code} image={props.image} />
        </Row>
    );    
};

export const FiveXRow = ( emoji: object ) => {
    return (
        <Row onPress={() => Alert.alert(`${emoji.code}`)}>
          <Icon source={emoji.image} />
        </Row>
    );    
};