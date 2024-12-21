import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
	const allowedRoutes = ["home"];

	return (
		<View style={{ backgroundColor: "#252837" }}>
			<View style={styles.container}>
				{state.routes
					.filter((route) => allowedRoutes.includes(route.name))
					.map((route, index) => {
						const { options } = descriptors[route.key];
						const isFocused = state.index === index;

						const onPress = () => {
							const event = navigation.emit({
								type: "tabPress",
								target: route.key,
								canPreventDefault: true,
							});

							if (!isFocused && !event.defaultPrevented) {
								navigation.navigate(route.name);
							}
						};

						const onLongPress = () => {
							navigation.emit({
								type: "tabLongPress",
								target: route.key,
							});
						};

						return (
							<Pressable
								key={route.key}
								onPress={onPress}
								onLongPress={onLongPress}
								accessibilityRole="button"
								accessibilityState={isFocused ? { selected: true } : {}}
								accessibilityLabel={options.tabBarAccessibilityLabel}
								testID={options.tabBarButtonTestID}
								style={styles.tabItem}
							/>
						);
					})}
			</View>
		</View>
	);
};

export default TabBar;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		height: 70,
		backgroundColor: "#38265B",
		borderTopEndRadius: 24,
		borderTopStartRadius: 24,
	},
	tabItem: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	icon: {
		width: 24,
		height: 24,
		marginBottom: 4,
	},
	customTabBarButton: {
		top: -30,
		justifyContent: "center",
		alignItems: "center",
	},
	circleCustomButton: {
		width: 70,
		height: 70,
		borderRadius: 35,
		backgroundColor: "#38265B",
		justifyContent: "center",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
		shadowRadius: 10,
		elevation: 5,
	},
});
