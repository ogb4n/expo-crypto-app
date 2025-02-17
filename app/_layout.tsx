import '../global.css';
import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(onboarding)',
};

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen 
        name="modal" 
        options={{ 
          presentation: 'modal',
          headerShown: true 
        }} 
      />
    </Stack>
  );
}