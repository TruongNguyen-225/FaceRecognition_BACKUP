import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity,Dimensions ,Image,Alert} from 'react-native'
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage';


import {setItemToAsyncStorage} from  '../../global/Global'

const RootRef = firebase.database ().ref ().child ('members');


const {width: WIDTH} = Dimensions.get ('window');
const {height: HEIGHT} = Dimensions.get ('window');

import logoBack from '../../icons/icons8-double-left-96.png';
import camera from '../../icons/icons8-compact-camera-96.png';

export default class Login extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = { email: '', password: '', errorMessage: null }
  componentDidMount() {
		this.unsubcriber = firebase.auth().onAuthStateChanged((changedUser) => {
			this.setState({
				user: changedUser
			});
		});
	}

	componentWillUnmount() {
		if (this.unsubcriber) {
			this.unsubcriber();
		}
	}
	getUserFromDB() {
		return new Promise((resolve) => {
			RootRef.orderByChild('email')
				.equalTo(this.state.email)
				.on('value', (childSnapshot) => {
					var userData = {};
					childSnapshot.forEach((doc) => {
						userData = {
							email: doc.toJSON().email,
						};
					});
					resolve(userData);
				});
		});
	}

  handleLogin = () => {
		if (this.state.email == '' || this.state.password == '') {
			Alert.alert('Thông báo','Email và Password không được bỏ trống');
			return;
		}
		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password) 
			.then( async (loginUser) => {
				const userData = await this.getUserFromDB();
				setItemToAsyncStorage('userData', userData);
				console.log(userData);
				Alert.alert('Thông báo','Đăng nhập thành công');
				this.props.navigation.navigate('HOME');
			})
			.catch((error) => {
				Alert.alert(`${error.toString().replace('Error: ', '')}`);
			});
	};



  // handleLogin = () => {
  //   const { email, password } = this.state
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then( async (loginUser) => {
				
				
	// 			// Lay role tu DB
	// 			const userData = await this.getUserFromDB();
	// 			setItemToAsyncStorage('userData', userData);
	// 			console.log(userData);
	// 			//await setItemToAsyncStorage('userData', userData);
	// 			Alert.alert('Thông báo','Đăng nhập thành công');
	// 			// this.props.navigation.navigate('App');
	// 		})
  //     .then(() => this.props.navigation.navigate('Loading'))
  //     .catch(error => this.setState({ errorMessage: error.message }))
  // }

  render() {
    return (
      <View style={styles.container}>
     
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text> 
        <View style={styles.viewTextInput}>
          
        <TextInput
          style={styles.inputStyle}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.inputStyle}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        </View>
        <View style={{marginTop: HEIGHT * 0.02, alignItems: 'center'}}>
          <TouchableOpacity style={styles.bigButton} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Log In Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff', 
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    height: 45,
    backgroundColor: '#03a9f4',
    flexDirection: 'row',
  },
  contentChild: {
    height: 45,
    width: WIDTH / 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  viewText: {
    height: 45,
    width: 140,
    marginLeft: (WIDTH - WIDTH / 10 - 140 - 40) / 2,
    justifyContent: 'center',
  },
  styleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
  uploadAvatar: {
    height: 60,
    backgroundColor:'#f1f1f1',
    width: 60,
    borderRadius:30,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    top: -110,
    zIndex: 10,
    position: 'relative',
    left:60,
  },
  inputStyle: {
    width: WIDTH * 0.9,
    height: 50,
    backgroundColor: '#90caf9',
    marginBottom: 10,
    borderRadius: 30,
    paddingLeft: 30,
  },
  bigButton: {
    width: WIDTH * 0.9,
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0093c4',
  },
  buttonText: {
    fontFamily: 'Avenir',
    color: '#fff',
    fontWeight: '400',
  },
  viewTextInput: {
    // borderColor: 'red',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
