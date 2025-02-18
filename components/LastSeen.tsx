import { Link } from 'expo-router';
import { View, Text, FlatList } from 'react-native';

import CurrencyCard from './CurrencyCard';

import lastSeen from '~/assets/mocks/lastSeen';
export const LastSeen = () => {
  return (
    <View className="mt-6 px-4">
      <View className="flex flex-row justify-between px-2">
        <Text className="text-xl font-bold text-black">Last Seen</Text>
      </View>

      <FlatList
        data={lastSeen}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CurrencyCard item={item} />}
      />
    </View>
  );
};
