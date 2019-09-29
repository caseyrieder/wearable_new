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

const Settings = () => {
  const { navigate } = useNavigation();

  return (
    <Fragment>
      <StatusBar />
      <SafeAreaView>
        <ScrollView>
          <View>
            <Text>Settings Page</Text>
            <Button title="Go to Home" onPress={() => navigate('Home')} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default Settings;
