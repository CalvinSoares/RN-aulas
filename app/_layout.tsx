import { AuthProvider } from "@/shared/contexts/authContext/auth";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<AuthProvider>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="drawer" options={{ headerShown: false }} />
			</Stack>
		</AuthProvider>
	);
}
