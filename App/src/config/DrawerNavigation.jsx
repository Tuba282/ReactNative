import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigation';
import { colors } from '../utils/colors';
import Icon from '@react-native-vector-icons/ionicons';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Dashboard"
        icon={({ color, size }) => (
          <Icon name="home-outline" color={color} size={size} />
        )}
        onPress={() =>
          props.navigation.navigate('MainTabs', { screen: 'Home' })
        }
        activeTintColor={colors.primary}
      />
      <DrawerItem
        label="About Us"
        icon={({ color, size }) => (
          <Icon name="information-circle-outline" color={color} size={size} />
        )}
        onPress={() =>
          props.navigation.navigate('MainTabs', { screen: 'About' })
        }
        activeTintColor={colors.primary}
      />
      <DrawerItem
        label="Contact Us"
        icon={({ color, size }) => (
          <Icon name="call-outline" color={color} size={size} />
        )}
        onPress={() =>
          props.navigation.navigate('MainTabs', { screen: 'Contact' })
        }
        activeTintColor={colors.primary}
      />
    </DrawerContentScrollView>
  );
}

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
      }}
    >
      {/* The only actual screen is the BottomTabs. The drawer items navigate inside it. */}
      <Drawer.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{ title: 'BDIF' }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
