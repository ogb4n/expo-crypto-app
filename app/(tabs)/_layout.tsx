import { HeaderButton } from '../../components/HeaderButton';
import { TabBarIcon } from '../../components/TabBarIcon';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link, Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => <AntDesign name="home" size={24} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Market',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chart-timeline-variant" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => <Octicons name="bell" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: 'Settings  ',
          tabBarIcon: ({ color }) => <Octicons name="gear" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
