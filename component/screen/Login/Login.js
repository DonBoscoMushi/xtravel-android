import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from 'react-native';
import {Container, Icon, Content} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import Spinner from 'react-native-spinkit';
import base_url from '../base_url';

export default class Login extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    // TODO
    this.state = {
      title: 'xtravel',
      email: '',
      pass: '',
      logo: '',
      settings: '',
      loading: true,
      size: 90,
      color: '#324191',
      base_url: base_url,
    };

    AsyncStorage.getItem('intro_tokenr', (err, result) => {
      if (result == 'intro123') {
        this.props.navigation.navigate('profile');
      }
    });
  }

  static navigationOptions = {
    drawerLockMode: 'locked-close',
    disableGestures: true,
  };

  componentDidMount = () => {
    this._isMounted = true;

    NetInfo.fetch()
      .then(state => {
        if (state.isConnected) {
          console.log(state.isConnected);
          this._callwebSettings();
        } else {
          Alert.alert(
            this.state.title,
            'please Check Your Data Connection',
            [
              {},
              {},
              {
                text: 'OK',
                onPress: () =>
                  setTimeout(() => {
                    this._callwebSettings();
                  }, 5000),
              },
            ],
            {cancelable: false},
          );
        }
      })
      .catch(err => console.log(err));
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  _callwebSettings = () => {
    axios
      .get(`${this.state.base_url}Api/webSetting`)
      .then(res => {
        this.setState({
          logo: res.data.response.logo_url,
          settings: res.data.response,
          loading: false,
        });
      })
      .catch(error => console.log(error.response));
  };

  static navigationOptions = {
    title: 'Home',
  };

  _loginBus365 = () => {
    NetInfo.fetch()
      .then(state => {
        if (state.isConnected) {
          console.log(state.isConnected);
          if (this.state.email == '' || this.state.pass == '') {
            Alert.alert(
              this.state.settings.settings.title,
              this.state.settings.must_put_email_pass,
              [
                {
                  text: this.state.settings.havn_nt_acc + ' ?',
                  onPress: () =>
                    this.props.navigation.navigate('registration', {
                      logo: this.state.logo,
                      settings: this.state.settings,
                    }),
                },
                {},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: false},
            );
          } else {
            axios
              .get(
                `${this.state.settings.base_url}Api/login?email=${this.state.email}&password=${this.state.pass}`,
              )
              .then(res => {
                if (res.data.response.status == 'ok') {
                  this.props.navigation.navigate('profile');
                  this.setState({
                    email: '',
                    pass: '',
                  });
                  AsyncStorage.setItem('intro_tokenr', 'intro123');
                  AsyncStorage.setItem(
                    'state_data',
                    JSON.stringify(this.state),
                  );
                  AsyncStorage.setItem(
                    'user_data',
                    JSON.stringify(res.data.response.user_data),
                  );
                } else {
                  Alert.alert(
                    this.state.settings.settings.title,
                    this.state.settings.email_and_password_d_match,
                    [
                      {
                        text: this.state.settings.forgot_password,
                        onPress: () =>
                          this.props.navigation.navigate('forget', {
                            logo: this.state.logo,
                            settings: this.state.settings,
                          }),
                      },
                      {},
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false},
                  );
                }
              })
              .catch(error => console.log(error.response));

            Keyboard.dismiss();
          }
        } else {
          Alert.alert(
            this.state.title,
            'please Check Your Data Connection',
            [{}, {}, {text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        }
      })
      .catch(err => console.log(err));
  };

  _logoBusL = () => {
    if (this.state.logo == '') {
      return <View style={{marginBottom: 50}} />;
    } else {
      return (
        <Image
          style={{width: 140, height: 30}}
          source={{uri: this.state.logo}}
        />
      );
    }
  };

  _getLoginDataPage = () => {
    if (this.state.loading == true) {
      <View style={{marginTop: 270, alignItems: 'center'}}>
        <Spinner
          style={styles.spinner}
          size={this.state.size}
          type={'Pulse'}
          color={this.state.color}
        />
      </View>;
    } else {
      if (this.state.settings == '') {
        return (
          <View style={{marginTop: 270, alignItems: 'center'}}>
            <Spinner
              style={styles.spinner}
              size={this.state.size}
              type={'Pulse'}
              color={this.state.color}
            />
          </View>
        );
      } else {
        return (
          <View>
            <View style={styles.logoD}>{this._logoBusL()}</View>

            <View style={{width: '90%', marginLeft: '5%'}}>
              <View style={styles.inputbox}>
                <Icon
                  type="FontAwesome"
                  style={styles.fontIcon}
                  name="envelope"
                />
                <TextInput
                  style={styles.inpBox}
                  onChangeText={email => this.setState({email})}
                  autoCapitalize="none"
                  placeholder={this.state.settings.email}
                  value={this.state.email}
                />
              </View>

              <View style={styles.inputbox}>
                <Icon type="FontAwesome" style={styles.lockicon} name="lock" />
                <TextInput
                  style={styles.inpBox}
                  onChangeText={pass => this.setState({pass})}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  placeholder={this.state.settings.password}
                  value={this.state.pass}
                />
              </View>

              <TouchableOpacity
                onPress={() => this._loginBus365()}
                style={styles.loginbtn}>
                <Text style={styles.logintext}>
                  {this.state.settings.login}
                </Text>
              </TouchableOpacity>

              <View style={{flexDirection: 'row', flex: 1, marginTop: 10}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('registration', {
                      logo: this.state.logo,
                      settings: this.state.settings,
                    })
                  }
                  style={{flex: 1}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#B21D21',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {this.state.settings.register}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('forget', {
                      logo: this.state.logo,
                      settings: this.state.settings,
                    })
                  }
                  style={{flex: 1, flexDirection: 'row-reverse'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#B21D21',
                      fontFamily: 'Montserrat-SemiBold',
                    }}>
                    {this.state.settings.forgot_password}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      }
    }
  };

  render() {
    return (
      <Container>
        <Content style={{backgroundColor: '#F9F9F9'}}>
          {this._getLoginDataPage()}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  loginHeader: {
    backgroundColor: '#B21D21',
  },
  inputbox: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#ececec',
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 10,
    backgroundColor: '#ffffff',
  },
  logoD: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
    marginTop: 190,
  },
  logoImage: {
    resizeMode: 'contain',
    width: Dimensions.get('window').height <= '600' ? 180 : 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Dimensions.get('window').height <= '600' ? 0 : 30,
  },
  fontIcon: {
    fontSize: 20,
    color: '#B21D21',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  inpBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    width: '100%',
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 10,
    marginTop: 2,
    fontFamily: 'Montserrat-Regular',
  },
  loginbtn: {
    backgroundColor: '#B21D21',
    fontSize: 20,
    borderRadius: 5,
    marginTop: Dimensions.get('window').height <= '600' ? 15 : 20,
    marginBottom: Dimensions.get('window').height <= '600' ? 15 : 20,
    alignItems: 'center',
  },
  logintext: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#ffffff',
    fontSize: 16,
    paddingVertical: 10,
  },
  dashd: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: '#DAE9FF',
  },
  orLogin: {
    marginTop: Dimensions.get('window').height <= '600' ? 0 : 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  fblogin: {
    width: '45%',
    marginRight: '10%',
    borderWidth: 2,
    borderColor: '#B21D21',
    borderRadius: 5,
  },
  fbicon: {
    fontSize: 23,
    color: '#B21D21',
    paddingVertical: 11,
    paddingHorizontal: 19,
    backgroundColor: '#B21D21',
    color: '#fff',
  },
  lbtntext: {
    fontSize: 16,
    paddingTop: 9,
    paddingLeft: 18,
    color: '#B21D21',
    fontFamily: 'Montserrat-SemiBold',
  },
  gmaillogin: {
    width: '45%',
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 5,
  },
  gmailicon: {
    fontSize: 23,
    paddingVertical: 11,
    paddingHorizontal: 19,
    backgroundColor: '#FF0000',
    color: '#fff',
  },
  gmailbtntext: {
    fontSize: 16,
    paddingTop: 9,
    paddingLeft: 18,
    color: '#FF0000',
    fontFamily: 'Montserrat-SemiBold',
  },
  lockicon: {
    fontSize: 20,
    color: '#B21D21',
    paddingVertical: 10,
    paddingHorizontal: 19,
  },
});
