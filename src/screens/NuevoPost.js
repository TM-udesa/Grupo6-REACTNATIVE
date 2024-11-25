import React from "react";
import { View } from "react-native";
import NewPost from "../components/NewPost";

export default function NuevoPost({navigation}){
  return(
    <View>
      <NewPost navigation={navigation}/>
    </View>
  )
}