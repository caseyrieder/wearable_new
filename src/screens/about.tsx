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

const About = () => {
  const { navigate } = useNavigation();

  return (
    <Fragment>
      <StatusBar />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <Text>About Page</Text>
            <Button title="Go to Home" onPress={() => navigate('Home')} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default About;
