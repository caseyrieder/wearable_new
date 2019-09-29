import React, { Fragment } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

const isHermes = () => {
  return global.HermesInternal == null ? 'default' : 'Hermes';
};

const Home = () => {
  const { navigate } = useNavigation();

  return (
    <Fragment>
      <StatusBar />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <Text>Engine: {isHermes()}</Text>
            <Button
              title="Go to Connection"
              onPress={() => navigate('connection')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default Home;
