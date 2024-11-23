import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import NuevoPost from "../screens/NuevoPost"

const Tab = createBottomTabNavigator();
const HomeMenu = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen name="New Post" component={NuevoPost}/>
      
    </Tab.Navigator>
  );
};


export default HomeMenu;