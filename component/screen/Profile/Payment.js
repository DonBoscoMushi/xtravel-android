import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Container, Header, Body, Right, Icon, Button} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const icon = <FontAwesome5 name={'chevron-right'} size={22} color="#EFF5FF" />;

export default class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allDataInfo: this.props.navigation.state.params.pay,
      settings: this.props.navigation.state.params.settings,
      isChecked: false,
    };
  }

  render() {
    return (
      <Container style={{backgroundColor: '#F9F9F9'}}>
        <Header style={styles.loginHeader}>
          <Body>
            <View style={styles.logoD}>
              <Image
                style={{width: 140, height: 30, resizeMode: 'contain'}}
                source={{
                  uri: this.state.allDataInfo.allinfoData.data.infodata.data
                    .logo,
                }}
              />
            </View>
          </Body>

          <Right style={{marginRight: 15}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <Icon style={{fontSize: 22}} type="FontAwesome" name="bars" />
            </TouchableOpacity>
          </Right>
        </Header>

        <View style={[styles.searchtour, {flexDirection: 'row'}]}>
          <View style={{flex: 2}}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('passenger')}>
              <Icon style={{color: '#fff'}} name="arrow-back" />
            </Button>
          </View>
          <View style={{flex: 14}}>
            <Text style={[styles.searchtourtext]}>
              {this.state.settings.select_your_payment_method}
            </Text>
          </View>
        </View>

        <ScrollView>
          <View style={styles.AllDataVal}>
            <View style={{marginBottom: 10}}>
              <View style={{marginBottom: 20}}>
                <Text style={styles.locationDet}>
                  {this.state.settings.select_your_payment_method}
                </Text>
              </View>

              {/* <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('paypaypal', {
                    allData: this.state,
                    settings: this.state.settings,
                  })
                }
                style={{
                  borderWidth: 2,
                  borderColor: '#e3e3e3',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  marginBottom: 20,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 2}}>
                    <Image
                      style={styles.payimg}
                      source={require('../../assets/paypal.png')}
                    />
                  </View>
                  <View style={{flex: 5}}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        marginTop: 9,
                        fontSize: 16,
                        paddingHorizontal: 15,
                        color: '#003085',
                      }}>
                      {this.state.settings.paypal}
                    </Text>
                  </View>
                  <View style={{flex: 1, marginTop: 10}}>{icon}</View>
                </View>
              </TouchableOpacity> */}

              {/* <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('paybank', {
                    allData: this.state,
                    settings: this.state.settings,
                  })
                }
                style={{
                  borderWidth: 2,
                  borderColor: '#e3e3e3',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  marginBottom: 20,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 2}}>
                    <Image
                      style={styles.payimg}
                      source={require('../../assets/bank.png')}
                    />
                  </View>
                  <View style={{flex: 5}}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        marginTop: 9,
                        fontSize: 16,
                        paddingHorizontal: 15,
                        color: '#003085',
                      }}>
                      {this.state.settings.bank_transfer}
                    </Text>
                  </View>
                  <View style={{flex: 1, marginTop: 10}}>{icon}</View>
                </View>
              </TouchableOpacity> */}

              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('paycash', {
                    allData: this.state,
                    settings: this.state.settings,
                  })
                }
                style={{
                  borderWidth: 2,
                  borderColor: '#e3e3e3',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  marginBottom: 20,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 2}}>
                    <Image
                      style={styles.payimg}
                      source={require('../../assets/icon-cash.png')}
                    />
                  </View>
                  <View style={{flex: 5}}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        marginTop: 9,
                        fontSize: 16,
                        paddingHorizontal: 15,
                        color: '#003085',
                      }}>
                      {this.state.settings.cash_payment}
                    </Text>
                  </View>
                  <View style={{flex: 1, marginTop: 10}}>{icon}</View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  loginHeader: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#333',
    borderBottomWidth: 2,
  },
  logoD: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    resizeMode: 'contain',
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchtourtext: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Aleo-Bold',
  },
  searchtour: {
    backgroundColor: '#B21D21',
    // justifyContent:'center',
    alignItems: 'center',
    height: 50,
  },
  AllDataVal: {
    width: '92%',
    marginLeft: '4%',
    marginVertical: 15,
  },
  locationDet: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    marginLeft: 7,
    color: '#333',
  },
  payimg: {
    resizeMode: 'contain',
    // width: (Dimensions.get('window').height <= '600' ? 120 : 200),
    height: 45,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: (Dimensions.get('window').height <= '600' ? 0 : 30),
    backgroundColor: '#EFF5FF',
  },
});
