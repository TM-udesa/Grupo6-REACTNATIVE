import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';


const Tab = createBottomTabNavigator();
const HomeMenu = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
      <Tab.Screen

      />
      <Tab.Screen

      />
      <Tab.Screen

      />
       <Tab.Screen

      />
    </Tab.Navigator>
  );
};


export default HomeMenu;