import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import MarketList from '~/components/MarketList';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Market', headerShown: false }} />
      <View style={styles.container}>
        <Text className="text-3xl font-bold text-gray-900 mb-4">Crypto Market</Text>
        <MarketList />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FA',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
});