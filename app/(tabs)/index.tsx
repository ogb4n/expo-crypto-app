import { Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

import { BalanceCard } from '~/components/BalanceCard';
import { PortfolioList } from '~/components/Portfolio';

export default function Home() {
  return (
    <>
      <Stack.Screen />
      <View style={styles.container}>
        <Text style={styles.title} className="mt-[3.5rem]">
          Nora Johnson
        </Text>
        <Text className="text-gray-500">Welcome back 👋</Text>
        <BalanceCard />
        <PortfolioList />
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
