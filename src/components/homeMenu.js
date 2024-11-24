import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import NuevoPost from "../screens/NuevoPost"
import Search from "../screens/Search"

const Tab = createBottomTabNavigator();
const HomeMenu = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen name="Nuevo Post" component={NuevoPost}/>
      <Tab.Screen name="Search" component={Search}/>
    </Tab.Navigator>
  );
};

export default HomeMenu;