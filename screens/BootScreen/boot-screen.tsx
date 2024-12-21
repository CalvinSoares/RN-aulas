import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const BootScreen = () => {
	const router = useRouter();

	useEffect(() => {
		const timeout = setTimeout(() => {
			router.navigate("/login");
		}, 2000);

		return () => clearTimeout(timeout);
	}, [router]);

	return (
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<Image
					style={styles.logo}
					source={{
						uri: "https://media.discordapp.net/attachments/1294062925946028114/1309530649560092682/image.png?ex=6741eaf4&is=67409974&hm=d0e57038efd743ebf284885d4d193750c5b05432968789a1aaf372388e899788&=&format=webp&quality=lossless",
					}}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#38265B",
	},
	logoContainer: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
	logo: {
		width: 120,
		height: 120,
		resizeMode: "contain",
	},
});

export default BootScreen;
