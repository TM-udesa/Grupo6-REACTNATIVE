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
        <Text>Register</Text>
        <Text>Estas en Registro</Text>
      </View>
    );
  }
}