import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

type userData = {
	token: string;
	userId: number;
	email?: string;
	nickname?: string;
	phoneNumber?: string;
};

type AuthContextType = {
	isAuthenticated: boolean;
	user: userData | null;
	token: string | null;
	setToken: (token: string) => void;
	clearToken: () => void;
	login: (userData: userData) => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	user: null,
	token: null,
	setToken: () => {},
	clearToken: () => {},
	login: async () => {},
	logout: async () => {},
});

export const useAuth = () => {
	return useContext(AuthContext);
};

const saveToSecureStore = async (key: string, value: string) => {
	try {
		await SecureStore.setItemAsync(key, value);
	} catch (error) {
		console.error("Erro ao salvar no Secure Store", error);
	}
};

const getFromSecureStore = async (key: string) => {
	try {
		return await SecureStore.getItemAsync(key);
	} catch (error) {
		console.error("Erro ao buscar do Secure Store", error);
	}
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [user, setUser] = useState<userData | null>(null);
	const [token, setTokenState] = useState<string | null>(null);
	const router = useRouter();

	const setToken = async (newToken: string) => {
		setTokenState(newToken);
		await saveToSecureStore("token", newToken);
	};

	const clearToken = async () => {
		setTokenState(null);
		await SecureStore.deleteItemAsync("token");
	};

	const login = async (userData: userData) => {
		try {
			// Simulação de uma requisição de login
			await setToken(userData.token);
			await saveToSecureStore("userId", userData.userId.toString());
			setIsAuthenticated(true);
			setUser(userData);
			console.log("Login bem-sucedido!");
			router.push("/home");
		} catch (error) {
			console.error("Erro ao fazer login:", error);
		}
	};

	const logout = async () => {
		try {
			await clearToken();
			await SecureStore.deleteItemAsync("userId");
			setIsAuthenticated(false);
			setUser(null);
			console.log("Logout realizado com sucesso!");
			router.push("/");
		} catch (error) {
			console.error("Erro ao fazer logout:", error);
		}
	};

	useEffect(() => {
		const loadUser = async () => {
			try {
				const storedToken = await getFromSecureStore("token");
				const id = await getFromSecureStore("userId");

				if (storedToken && id) {
					setIsAuthenticated(true);
					setUser({ token: storedToken, userId: Number(id) });
					setTokenState(storedToken);
				}
			} catch (error) {
				console.error("Erro ao carregar o usuário:", error);
			}
		};
		loadUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				login,
				logout,
				token,
				setToken,
				clearToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const getToken = async () => {
	return await getFromSecureStore("token");
};
