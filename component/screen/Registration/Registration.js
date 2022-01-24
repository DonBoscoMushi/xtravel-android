import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
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
import DeviceInfo from 'react-native-device-info';
export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      address: '',
      phone: '',
      nid: '',
      total: '',
      settings: this.props.navigation.state.params.settings,
      allinfoData: this.props.navigation.state.params.userInfo,
      bookid: this.props.navigation.state.params.userInfo.bookid,
      // seatNum: this.props.navigation.state.params.userInfo.seatNum,
      seatNum: this.props.navigation.state.params.seatNum,
      facilitis: this.props.navigation.state.params.userInfo.facilitis,
      resp: this.props.navigation.state.params.userInfo.resp,
      isChecked: true,
      logo: this.props.navigation.state.params.logo,
      settings: this.props.navigation.state.params.settings,
      userid: DeviceInfo.getUniqueId(),
    };
  }

  _regBus365 = () => {
    // alert(this.state.fname + " "+this.state.lname + " "+this.state.email + " "+this.state.pass + " "+this.state.confirmP )
    if (
      this.state.firstname == '' ||
      this.state.lastname == '' ||
      this.state.phone == ''
    ) {
      Alert.alert(
        this.state.settings.settings.title,
        '* ' + this.state.settings.required_field,
        [{}, {}, {text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    } else {
      Keyboard.dismiss();

      axios
        .get(
          `${this.state.settings.base_url}Api/user_registration?firstname=${this.state.firstname}&lastname=${this.state.lastname}&email=${this.state.email}&password=${this.state.pass}&nid=${this.state.nid}&address=${this.state.address}&phone=${this.state.phone}&id_no=${this.state.userid}`,
        )
        .then(res => {
          if (res.data.response.status == 'ok') {
            // Alert.alert(
            //   this.state.settings.settings.title,
            //   res.data.response.message,
            //   [
            //     {},
            //     {},
            //     {
            //       text: 'OK',
            //       onPress: () => this.props.navigation.navigate('login'),
            //     },
            //   ],
            //   {cancelable: false},
            // );
            // this.setState({
            //   address: '',
            //   firstname: '',
            //   lastname: '',
            //   email: '',
            //   pass: '',
            //   confirmP: '',
            //   nid: '',
            // });
          } else {
            Alert.alert(
              this.state.settings.settings.title,
              res.data.response.message,
              [{}, {}, {text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          }

          // console.log(res.data.response.status)
        })
        .catch(error => console.log(error.response));

      // console.log(
      //   this.state.allinfoData.data.data.trip_id_no +
      //     '\n' +
      //     this.state.userid +
      //     '\n' +
      //     this.state.allinfoData.data.data.route +
      //     '\n' +
      //     this.state.allinfoData.data.pickupData +
      //     '\n' +
      //     this.state.allinfoData.data.dropData +
      //     '\n' +
      //     this.state.allinfoData.Fnum +
      //     '\n' +
      //     this.state.allinfoData.total +
      //     '\n' +
      //     this.state.allinfoData.data.adult +
      //     '\n' +
      //     this.state.allinfoData.seatsize +
      //     '\n' +
      //     this.state.seatNum +
      //     '\n' +
      //     this.state.allinfoData.data.offer +
      //     '\n' +
      //     this.state.allinfoData.data.day,
      // );

      // );

      // send data to db
      setTimeout(() => {
        axios
          .get(
            `${this.state.settings.base_url}Api/booking_history?trip_id_no=${this.state.allinfoData.data.data.trip_id_no}&passenger_id=${this.state.userid}&trip_route_id=${this.state.allinfoData.data.data.route}&pickup_location=${this.state.allinfoData.data.pickupData}&drop_location=${this.state.allinfoData.data.dropData}&facilities=${this.state.allinfoData.Fnum}&price=${this.state.allinfoData.total}&adult=${this.state.allinfoData.data.adult}&total_seat=${this.state.allinfoData.seatsize}&seat_number=${this.state.seatNum}&offer_code=${this.state.allinfoData.data.offer}&booking_date=${this.state.allinfoData.data.day}`,
          )
          .then(res => {
            if (res.data.response.status === 'ok') {
              this.setState({
                ...this.state,
                bookid: res.data.response.booking_id,
                resp: res.data.response,
              });
              console.log(res.data.response);
              this.props.navigation.navigate('pay', {
                pay: this.state,
                settings: this.state.settings,
              });
            } else {
              Alert.alert(
                this.state.settings.settings.title,
                'Tafadhali jaribu tena!',
                [
                  {},
                  {},
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false},
              );
            }
          })
          .catch(err => console.log(err.response));
      }, 1000);
    }
  };

  render() {
    return (
      <Container style={{backgroundColor: '#cecece'}}>
        <Header style={styles.loginHeader}>
          <Left style={(styles.marginLeft = 2)}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={{fontSize: 22}} type="FontAwesome" name="bars" />
              </TouchableOpacity>
            </View>
          </Left>

          <Right>
            <Title
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 16,
                paddingEnd: 5,
                paddingVertical: 5,
                color: '#000',
              }}>
              Jumla ya Gharama:
            </Title>
            <View
              style={{
                backgroundColor: '#B21D21',
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                paddingVertical: 5,
              }}>
              <Text
                style={{
                  paddingStart: 5,
                  fontSize: 16,
                  paddingEnd: 7,
                  fontFamily: 'Monrope-Bold',
                  color: '#FFF',
                }}>
                {this.state.allinfoData.total}
              </Text>
            </View>
          </Right>
        </Header>

        <Content style={{backgroundColor: '#F9F9F9'}}>
          <View
            style={[
              styles._main_card,
              {flexDirection: 'column', padding: 3, marginTop: 10},
            ]}>
            <Text
              style={{
                alignContent: 'center',
                textAlign: 'center',
                fontFamily: 'Manrope-Bold',
                fontSize: 14,
              }}>
              Weka Taarifa
            </Text>

            <View style={[styles.inputbox, {marginTop: 20}]}>
              <Icon type="FontAwesome" style={styles.fontIcon} name="user" />
              <TextInput
                style={styles.inpBox}
                onChangeText={firstname => this.setState({firstname})}
                // autoCapitalize="none"
                placeholder={this.state.settings.first_name + ' *'}
                value={this.state.firstname}
              />
            </View>
            <View style={styles.inputbox}>
              <Icon type="FontAwesome" style={styles.fontIcon} name="user" />
              <TextInput
                style={styles.inpBox}
                onChangeText={lastname => this.setState({lastname})}
                // autoCapitalize="none"
                placeholder={this.state.settings.last_name + ' *'}
                value={this.state.lastname}
              />
            </View>
            <View style={styles.inputbox}>
              <Icon type="FontAwesome" style={styles.fontIcon} name="phone" />
              <TextInput
                style={styles.inpBox}
                onChangeText={phone => this.setState({phone})}
                // autoCapitalize="none"
                keyboardType="numeric"
                placeholder={this.state.settings.phone + ' *'}
                value={this.state.phone}
              />
            </View>
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
              <Icon type="FontAwesome" style={styles.lockicon} name="book" />
              <TextInput
                style={styles.inpBox}
                keyboardType="numeric"
                onChangeText={nid => this.setState({nid})}
                autoCapitalize="none"
                placeholder="NID"
                value={this.state.nid}
              />
            </View>

            <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
              <View>
                <Text style={{fontSize: 12, textAlign: 'left'}}>
                  Jumla ya Nauli: {this.state.allinfoData.total} Tsh
                </Text>
              </View>
              <View style={{marginStart: 10}}>
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'right',
                  }}>
                  Seats: {this.state.seatNum}
                </Text>
              </View>
            </View>
          </View>

          {/* <Content style={{backgroundColor: '#F9F9F9'}}> */}
          {/* <View style={styles.logoD}>
            <Image
               style=te{{width: 180, height: 50}}
               source={{uri: this.state.logo}}
            />
          </View> */}

          <View style={{width: '94%', marginLeft: '3%', marginTop: 15}}>
            {/* <View style={styles.inputbox}>
              <Icon type="FontAwesome" style={styles.fontIcon} name="user" />
              <TextInput
                style={styles.inpBox}
                onChangeText={firstname => this.setState({firstname})}
                // autoCapitalize="none"
                placeholder={this.state.settings.first_name + ' *'}
                value={this.state.firstname}
              />
            </View>

            <View style={styles.inputbox}>
              <Icon type="FontAwesome" style={styles.fontIcon} name="user" />
              <TextInput
                style={styles.inpBox}
                onChangeText={lastname => this.setState({lastname})}
                // autoCapitalize="none"
                placeholder={this.state.settings.last_name + ' *'}
                value={this.state.lastname}
              />
            </View>

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
                placeholder={this.state.settings.email + ' *'}
                value={this.state.email}
              />
            </View>

            <View style={styles.inputbox}>
              <Icon
                type="FontAwesome"
                style={styles.fontIcon}
                name="address-card"
              />
              <TextInput
                style={styles.inpBox}
                onChangeText={address => this.setState({address})}
                // autoCapitalize="none"
                autoCorrect={false}
                placeholder={this.state.settings.address}
                value={this.state.address}
              />
            </View>

            <View style={styles.inputbox}>
              <Icon type="FontAwesome" style={styles.fontIcon} name="phone" />
              <TextInput
                style={styles.inpBox}
                onChangeText={phone => this.setState({phone})}
                // autoCapitalize="none"
                keyboardType="numeric"
                placeholder={this.state.settings.phone}
                value={this.state.phone}
              />
            </View>

            <View style={styles.inputbox}>
              <Icon type="FontAwesome" style={styles.lockicon} name="book" />
              <TextInput
                style={styles.inpBox}
                keyboardType="numeric"
                onChangeText={nid => this.setState({nid})}
                autoCapitalize="none"
                placeholder="NID"
                value={this.state.nid}
              />
            </View>

            <View style={styles.inputbox}>
              <Icon type="FontAwesome" style={styles.lockicon} name="lock" />
              <TextInput
                style={styles.inpBox}
                onChangeText={pass => this.setState({pass})}
                secureTextEntry={true}
                autoCapitalize="none"
                placeholder={this.state.settings.password + ' *'}
                value={this.state.pass}
              />
            </View>

            <View style={styles.inputbox}>
              <Icon type="FontAwesome" style={styles.lockicon} name="lock" />
              <TextInput
                style={styles.inpBox}
                onChangeText={confirmP => this.setState({confirmP})}
                secureTextEntry={true}
                autoCapitalize="none"
                placeholder={this.state.settings.confirm_password + ' *'}
                value={this.state.confirmP}
              />
            </View> */}

            <TouchableOpacity
              onPress={() => this._regBus365()}
              style={styles.regbtn}>
              <Text style={styles.regtext}>Lipia</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  _main_card: {
    width: '94%',
    borderRadius: 10,
    margin: '2%',
    elevation: 7,
    paddingBottom: 10,
    paddingStart: 10,
    shadowColor: '#000000',
    backgroundColor: '#FFF',
    opacity: 1,
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },

  loginHeader: {
    backgroundColor: '#FFF',
  },
  inputbox: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#ececec',
    paddingVertical: 1,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: '#ffffff',
  },
  logoD: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    marginBottom: 15,
    marginTop: 15,
  },
  logoImage: {
    resizeMode: 'contain',
    width: Dimensions.get('window').height <= '600' ? 180 : 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Dimensions.get('window').height <= '600' ? 0 : 60,
    marginTop: Dimensions.get('window').height <= '600' ? 15 : 60,
  },
  fontIcon: {
    fontSize: 20,
    color: '#cecece',
    paddingVertical: 10,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  inpBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0,
    width: '97%',
    fontSize: 15,
    color: '#000',
    paddingHorizontal: 10,
    marginTop: 2,
  },
  regbtn: {
    backgroundColor: '#B21D21',
    alignSelf: 'flex-end',
    fontSize: 15,
    borderRadius: 30,
    width: 50,
    height: 50,
    marginEnd: 5,
    marginTop: Dimensions.get('window').height <= '600' ? 15 : 20,
    marginBottom: Dimensions.get('window').height <= '600' ? 15 : 20,
    borderColor: '#B21D21',
    alignItems: 'center',
    justifyContent: 'center',
  },
  regtext: {
    color: '#ffffff',
    fontSize: 16,
    paddingVertical: 8,
    fontFamily: 'Montserrat-SemiBold',
  },
  lockicon: {
    fontSize: 20,
    color: '#cecece',
    paddingVertical: 10,
    paddingHorizontal: 19,
  },
});
