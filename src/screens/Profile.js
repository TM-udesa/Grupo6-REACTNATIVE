import React, { Component } from "react";
import {View,Text,TouchableOpacity,StyleSheet} from "react-native";
import { auth, db } from "../firebase/config";
export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      usuario: [],
      loading: true,
      
    };
  }
  componentDidMount() {
    db.collection("users").onSnapshot((docs) => {
      let usuario = [];
      docs.forEach((doc) => {
        usuario.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({
        usuario: usuario,
        loading: false,
      });
      console.log(usuario);
    });
  }
  handleLogOut() {
    auth.signOut().then(this.props.navigation.navigate("Login"));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>
        <Text style={styles.subtitle}>Bienvenido</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => this.handleLogOut()}
        >
          <Text style={styles.logoutText}>LogOut</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F7F9FC",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#666",
  },
  logoutButton: {
    backgroundColor: "#D9534F",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
