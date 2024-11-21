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
      <View>
        <Text>Login</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text>Registrate!</Text>
        </TouchableOpacity>
        <TextInput
          keyboardType="email-address"
          placeholder="email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        {this.state.errors.email === "" ? null : <Text>{this.state.errors.email}</Text>}

        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        {this.state.errors.password === "" ? null : <Text>{this.state.errors.password}</Text>}
        <TouchableOpacity onPress={() => this.onSubmit()}>
          <Text> Login </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

// export default class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: "",
//       password: "",
//       login: false,
//       error: "" // nuevo estado llamado error que se utilizará para almacenar y mostrar mensajes de error cuando las validaciones fallen. 
//     };
//   }
//   componentDidMount() {
//     auth.onAuthStateChanged((user) => {
//       console.log("El usuario es: ", user);
//     });
//   }
//   validateEmail(email) {
//     return email.includes("@"); // verifica si el email tiene @
//   }

//   validatePassword(password) {
//     return password.length >= 6; // verifica si la contraseña tiene > o = de 6 caracteres
//   }

//   onSubmit() {
//     const { email, password } = this.state; // destructuring de this,state extraigo email y password
//     if (!this.validateEmail(email)) {
//       this.setState({ error: "Email mal formateado" });
//       return;
//     // !this.validateEmail(email) está comprobando si el email que el usuario escribió es correcto.
//     //Llama a una función llamada validateEmail que verifica el formato del email. Si esta función dice que el email no es válido (devuelve "falso"), el signo de exclamación ! lo convierte en "verdadero". Así que, si el email no es válido, la condición se cumple.
//     //  Si el email no es válido, se llama a this.setState para actualizar el estado con un mensaje de error: "Email mal formateado"
//     // La instrucción return detiene la ejecución del método onSubmit, por lo que no se procederá a la siguiente validación
//   }
//     if (!this.validatePassword(password)) {
//       this.setState({ error: "La contraseña debe tener una longitud mínima de 6 caracteres" });
//       return;
//     }
//     if (!this.validatePassword(password)) {
//       this.setState({ error: "La contraseña debe tener una longitud mínima de 6 caracteres" });
//       return;
//     }

//     console.log(this.state);
//     auth.signInWithEmailAndPassword(email, password)
//     .then(response=> {this.setState({logged:true, error:''})
//     this.props.navigation.navigate('HomeMenu')
//   })
//     .catch(error=> {
//       console.error(error);
//       this.setState({error:'fallo el logueo'})
//     }
//     )
//   }
//       // signInWithEmailAndPassword(this.state.email, this.state.password) --> Esta función intenta iniciar sesión con el email y la contraseña que el usuario ha ingresado. Se le pasan los valores directamente desde el estado (this.state.email y this.state.password).
//       // si el intento es exitoso, se ejecuta este bloque de código --> La función then se llama cuando la promesa se resuelve correctamente.
//       // Aquí, se actualiza el estado del componente para indicar que el usuario ha iniciado sesión correctamente, estableciendo login: true
//       // Si hay un error se ejecuta el otro bloque --> se actualiza el estado con un mensaje de error: "Fallo en el registro.". Esto significa que el usuario verá un mensaje de error en la interfaz, informándole que no pudo iniciar sesión.

    

//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>Login</Text>
//         <Text style={styles.subtitle}>Estas en login</Text>
//         <TouchableOpacity
//           onPress={() => this.props.navigation.navigate("Register")}
//         >
//           <Text style={styles.link}>Ir al registro</Text>
//         </TouchableOpacity>
       

//         <TextInput
//           style={styles.input}
//           keyboardType="email-address"
//           placeholder="email"
//           onChangeText={(text) => this.setState({ email: text })}
//           value={this.state.email}
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="password"
//           secureTextEntry={true}
//           onChangeText={(text) => this.setState({ password: text })}
//           value={this.state.password}
//         />
//         <TouchableOpacity onPress={() => this.onSubmit()} style={styles.boton}>
//           <Text style={styles.text}> Login </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }