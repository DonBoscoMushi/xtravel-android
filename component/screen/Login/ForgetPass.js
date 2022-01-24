import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Alert,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Title,
  Content,
  Button,
} from 'native-base';
import axios from 'axios';
export default class ForgetPass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      logo: this.props.navigation.state.params.logo,
      settings: this.props.navigation.state.params.settings,
    };
  }

  _forgetpass365 = () => {
    if (this.state.email == '') {
      Alert.alert(
        this.state.settings.settings.title,
        this.state.settings.must_put_email,
        [{}, {}, {text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      axios
        .get(
          `${this.state.settings.base_url}Api/password_recovery?email=${this.state.email}`,
        )
        .then(res => {
          if (res.data.response.status == 'ok') {
            this.setState({
              email: '',
            });
            Alert.alert(
              this.state.settings.settings.title,
              this.state.settings.plz_check_your_mail_to_reset_passw,
              [{}, {}, {text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );

            setTimeout(() => {
              this.props.navigation.navigate('login');
            }, 5000);
          } else {
            Alert.alert(
              this.state.settings.settings.title,
              this.state.settings.invalid_email_address,
              [{}, {}, {text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          }

          // console.log(res.data.response.status)
        })
        .catch(error => console.log(error.response));

      Keyboard.dismiss();
    }
  };

  render() {
    return (
      <Container>
        <Header style={styles.loginHeader}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('login')}>
              <Icon name="arrow-back" />
            </Button>
          </Left>

          <Body>
            <Title>Forget Password</Title>
          </Body>

          <Right></Right>
        </Header>

        <Content style={{backgroundColor: '#F9F9F9'}}>
          <View style={styles.logoD}>
            <Image
              style={{width: 180, height: 50}}
              source={{uri: this.state.logo}}
            />
          </View>

          <View style={{width: '94%', marginLeft: '3%'}}>
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

            <TouchableOpacity
              onPress={() => this._forgetpass365()}
              style={styles.loginbtn}>
              <Text style={styles.logintext}>
                {this.state.settings.continue}
              </Text>
            </TouchableOpacity>
          </View>
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
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#ffffff',
  },
  logoD: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
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
    fontSize: 18,
    color: '#000',
    paddingHorizontal: 10,
    marginTop: 2,
  },
  loginbtn: {
    backgroundColor: '#B21D21',
    fontSize: 20,
    borderRadius: 8,
    marginTop: Dimensions.get('window').height <= '600' ? 15 : 20,
    marginBottom: Dimensions.get('window').height <= '600' ? 15 : 20,
    borderColor: '#B21D21',
    borderWidth: 2,
    alignItems: 'center',
  },
  logintext: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#ffffff',
    fontSize: 16,
    paddingVertical: 8,
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
    fontSize: 22,
    color: '#B21D21',
    paddingVertical: 10,
    paddingHorizontal: 19,
    backgroundColor: '#B21D21',
    color: '#fff',
  },
  lbtntext: {
    fontSize: 18,
    paddingTop: 9,
    paddingLeft: 18,
    color: '#B21D21',
    fontFamily: 'ZCOOLXiaoWei-Regular',
  },
  gmaillogin: {
    width: '45%',
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 5,
  },
  gmailicon: {
    fontSize: 22,
    paddingVertical: 10,
    paddingHorizontal: 19,
    backgroundColor: '#FF0000',
    color: '#fff',
  },
  gmailbtntext: {
    fontSize: 18,
    paddingTop: 9,
    paddingLeft: 18,
    color: '#FF0000',
    fontFamily: 'ZCOOLXiaoWei-Regular',
  },
  lockicon: {
    fontSize: 20,
    color: '#B21D21',
    paddingVertical: 10,
    paddingHorizontal: 19,
  },
});
