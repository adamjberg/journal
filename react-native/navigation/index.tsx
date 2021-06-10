/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Link,
} from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import LoginScreen from "../screens/LoginScreen";
import useColorScheme from "../hooks/useColorScheme";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/UserActions";
import LogScreen from "../screens/LogScreen";
import { Image } from "react-native-elements/dist/image/Image";
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

const Logo = require("../assets/images/adaptive-icon.png");

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <RootNavigator />
      </NavigationContainer>
    </>
  );
}

const Drawer = createDrawerNavigator();

function RootNavigator({ navigation }: any) {
  return (
    <Drawer.Navigator
      initialRouteName={"Daily"}
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen
        name="Brain Dump"
        component={LogScreen}
        initialParams={{ brainDump: true }}
        options={{ unmountOnBlur: true }}
      />
      <Drawer.Screen
        name="Daily"
        component={BottomTabNavigator}
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate("Brain Dump");
                }}
                style={{
                  marginRight: 8,
                }}
              >
                <Image style={{ width: 36, height: 36 }} source={Logo} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Log In",
          headerTitle: "engram",
          headerLeft: () => {
            return null;
          },
        }}
      />
      <Drawer.Screen
        name="SignUp"
        component={LoginScreen}
        options={{
          title: "Sign Up",
          headerTitle: "engram",
          headerLeft: () => {
            return null;
          },
        }}
        initialParams={{ isSignUp: true }}
      />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}

function LogoutScreen() {
  const theme = useColorScheme();
  const dispatch = useDispatch();

  React.useEffect(() => {
    logout(dispatch);
  }, []);
  return (
    <Link
      style={{
        fontSize: 24,
        textAlign: "center",
        color: theme === "light" ? "black" : "white",
      }}
      to="/login"
    >
      Return to login
    </Link>
  );
}