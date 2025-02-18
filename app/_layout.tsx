import '../global.css';
import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(onboarding)',
};

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
        headerShown: false,
        animation: 'none', // Désactive l'animation par défaut
        headerStyle: {
          backgroundColor: '#F6F8FA',
        },
      }}
    >
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen 
        name="crypto/[id]" 
        options={{
          headerShown: true,
          animation: 'none', // Désactive spécifiquement l'animation pour cette route
          presentation: 'card',
        }} 
      />
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