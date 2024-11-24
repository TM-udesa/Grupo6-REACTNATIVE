import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import {auth,db} from "../firebase/config"

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      login: false,
      errors:{ email: "", password: "" }
    };

  }

  componentDidMount() {

  }

  onSubmit() {
    const { email, password } = this.state;
    console.log(this.state);
    auth.signInWithEmailAndPassword(email, password)
    .then(response=> {this.setState({login:true, error:''})
    this.props.navigation.navigate('homeMenu')
  })
    .catch(error=> {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        this.setState({ errors: { email: "El email ya está en uso." } });
      } else if (error.code === "auth/invalid-email") {
        this.setState({ errors: { email: "El formato del email es inválido." } });
      } else if (error.code === "auth/weak-password") {
        this.setState({ errors: { password: "La contraseña debe tener al menos 6 caracteres." } });
      } else if(error.code === "auth/internal-error"){
        this.setState({ errors: { password: "Login invalido",} });
      }
    }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.link}>¿no tenes cuenta? Registrate!</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        {this.state.errors.email === "" ? null : <Text style={styles.error}>{this.state.errors.email}</Text>}

        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        {this.state.errors.password === "" ? null : <Text style={styles.error}>{this.state.errors.password}</Text>}
        <TouchableOpacity style={styles.button} onPress={() => this.onSubmit()}>
          <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1DA1F2",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    padding: 15,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#1DA1F2",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    color: "#1DA1F2",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: -5,
    marginBottom: 10,
  },
});