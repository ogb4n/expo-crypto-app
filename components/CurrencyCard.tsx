import { View, Text, Image } from 'react-native';

const CurrencyCard = ({ item }: { item: any }) => {
  return (
    <View className="m-2 rounded-2xl bg-white p-4">
      <View className="flex flex-row justify-between">
        <View className="flex flex-row items-center gap-2">
          <Image source={{ uri: item.image }} className="h-8 w-8 rounded-full bg-gray-200" />
          <Text className="text-lg font-semibold text-black">{item.name}</Text>
        </View>
        <Text className="text-xs text-gray-500">{item.symbol}</Text>
      </View>

      <View className="align mr-2 mt-1 flex items-end">
        <Text className="mt-2 text-xl font-bold text-black">{item.price}</Text>
        <View className="flex flex-row items-center">
          <Text className="text-md font-medium text-blue-500">{item.change}</Text>
          <Text className="text-sm text-blue-500"> ▲</Text>
        </View>
      </View>
    </View>
  );
};

export default CurrencyCard;
