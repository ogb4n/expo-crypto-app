import { View, Text, Image } from 'react-native';

export const BalanceCard = () => {
  return (
    <View className="relative mt-12 flex items-center">
      <View className="absolute -top-6 z-10 h-12 w-12 overflow-hidden rounded-2xl border-4 border-white">
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/79.jpg' }}
          className="h-full w-full"
        />
      </View>

      <View className="w-[80%] rounded-[40px] bg-blue-600 px-6 py-10 shadow-sm">
        <Text className="text-center text-lg font-light text-white">Current Balance</Text>
        <Text className="mt-2 text-center text-3xl font-bold text-white">$143,421.20</Text>

        <View className="display-flex mx-auto mt-2 w-fit flex-row gap-2">
          <Text className="mt-2 text-center text-sm font-semibold text-white">Weekly Profit</Text>
          <View className="mx-auto mt-1 flex flex-row items-center rounded-full bg-white/20 px-3 py-1">
            <Text className="text-white">2.35%</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
