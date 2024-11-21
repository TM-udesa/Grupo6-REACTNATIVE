import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import {auth,db} from "../firebase/config"

export default class Register extends Component {
  constructor() {
    super();

  }

  componentDidMount() {

  }

  onSubmit() {

  }

  render() {
    return (
      <View>
        <Text>Login</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text>Registrate!</Text>
        </TouchableOpacity>
        <Text>Estas en Login</Text>
      </View>
    );
  }
}