import React, { Fragment } from 'react';
import { SafeAreaView, ScrollView, View, Text, StatusBar } from 'react-native';

const App = () => {
  return (
    <Fragment>
      <StatusBar />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {global.HermesInternal == null ? null : (
            <View>
              <Text>Engine: Hermes</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
