import { Stack } from 'expo-router';
import { COLORS } from '../src/constants';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="product/[id]"
          options={{
            headerShown: true,
            headerTitle: 'Product Details',
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="checkout"
          options={{
            headerShown: true,
            headerTitle: 'Checkout',
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: true,
            headerTitle: 'Login',
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="track/[id]"
          options={{
            headerShown: true,
            headerTitle: 'Track Order',
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack>
    </>
  );
}
