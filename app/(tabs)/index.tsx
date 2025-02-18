import { Stack } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { BalanceCard } from '~/components/BalanceCard';
import { LastSeen } from '~/components/LastSeen';
import { PortfolioList } from '~/components/Portfolio';

const DATA = [{ id: 'balance' }, { id: 'portfolio' }, { id: 'lastSeen' }];

export default function Home() {
  return (
    <>
      <Stack.Screen />
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item.id === 'balance') return <BalanceCard />;
          if (item.id === 'portfolio') return <PortfolioList />;
          if (item.id === 'lastSeen') return <LastSeen />;
          return null;
        }}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title} className="mt-[3.5rem]">
              Nora Johnson
            </Text>
            <Text className="text-gray-500">Welcome back 👋</Text>
          </View>
        }
        contentContainerStyle={styles.container}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
