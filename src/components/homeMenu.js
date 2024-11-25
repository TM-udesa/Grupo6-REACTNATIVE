import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import NuevoPost from "../screens/NuevoPost"
import Search from "../screens/Search"
import Home from "../screens/Home"
import Profile from "../screens/Profile"

const Tab = createBottomTabNavigator();
const HomeMenu = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
      <Tab.Screen name="Home" component={Home} options={{tabBarIcon: () => <AntDesign name="home" size={24} color="black" />}}/>
      <Tab.Screen name="Nuevo Post" component={NuevoPost} options={{tabBarIcon: () => <Entypo name="new-message" size={24} color="black" />}}/>
      <Tab.Screen name="Search" component={Search} options={{tabBarIcon: () => <AntDesign name="search1" size={24} color="black" />}}/>
      <Tab.Screen name="Mi perfil" component={Profile} options={{tabBarIcon: () => <AntDesign name="user" size={24} color="black" />}}/>
    </Tab.Navigator>
  );
};

export default HomeMenu;