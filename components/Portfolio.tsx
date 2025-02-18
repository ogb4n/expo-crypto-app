import { Link } from 'expo-router';
import { View, Text, FlatList, Image } from 'react-native';

import portfolioData from '~/assets/mocks/portfolio';

const PortfolioCard = ({ item }: { item: any }) => (
  <View className="m-2 w-52 rounded-2xl bg-white p-4">
    <View className="flex flex-row justify-between">
      <View>
        <Text className="text-lg font-semibold text-black">{item.name}</Text>
        <Text className="text-xs text-gray-500">{item.symbol}</Text>
      </View>
      <Image source={{ uri: item.logo }} className="h-8 w-8 rounded-full bg-gray-200" />
    </View>

    <View className="align mt-1 flex flex-row items-center gap-10">
      <Text className="mt-2 text-xl font-bold text-black">{item.price}</Text>
      <View className="flex flex-row items-center">
        <Text className="text-md font-medium text-blue-500">{item.change}</Text>
        <Text className="text-sm text-blue-500"> ▲</Text>
      </View>
    </View>
  </View>
);

export const PortfolioList = () => {
  return (
    <View className="mt-6 px-4">
      <View className="flex flex-row justify-between px-2">
        <Text className="text-xl font-bold text-black">My Portfolio</Text>
        <Link href="/modal" className="text-md font-semibold text-blue-500">
          View all
        </Link>
      </View>

      <FlatList
        data={portfolioData}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <PortfolioCard item={item} />}
      />
    </View>
  );
};
