import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
  NativeEventEmitter
} from 'react-native';

const _tfsReactBridge = NativeModules.MyReactBridge;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisabled : true
    }
  }

  componentDidMount() {
    if(NativeModules.MyReactBridge) {
      this.myBridgeHandler = new NativeEventEmitter(NativeModules.MyReactBridge);
      this.myBridgeHandler.addListener("myAppEnableBackButton", this.onEnableBackButtonEvent.bind(this));
    }
  }

  onEnableBackButtonEvent() {
    this.setState({
      buttonDisabled : false
    })
  }

  onBackPressed() {
    if(_tfsReactBridge && _tfsReactBridge.handleBackButton) {
      _tfsReactBridge.handleBackButton();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>This page is created using React Native.</Text>
        <Text> Use this page to showcase your SDK capabilities. </Text>
        <TouchableOpacity style = {
          [
            styles.button,
            {
              backgroundColor: this.state.buttonDisabled ? "#758775" : "#4db74d"
            }
          ]
        } onPress={this.onBackPressed}
        disabled = {this.state.buttonDisabled}>
          <Text style = {{color: "#fff"}}> Click to go back </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  button: {
    marginTop : 30,
    backgroundColor: "#4db74d",
    padding: 10
  }
});

AppRegistry.registerComponent('MyReactNativeApp', () => App);
