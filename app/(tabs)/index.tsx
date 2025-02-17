import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen />
      <View style={styles.container}>
        <Text style={styles.title} className="text-green-800">
          Je m'appelle Henry
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
