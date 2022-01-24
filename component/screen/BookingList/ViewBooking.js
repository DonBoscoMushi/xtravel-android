import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Header, Body, Right, Icon, Button} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-spinkit';
import base_url from '../base_url';

export default class ViewBooking extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      title: 'xtravel',
      active: true,
      logo: '',
      Data: this.props.navigation.state.params.data,
      base_url: base_url,
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    AsyncStorage.getItem('state_data', (error, res) => {
      let d = JSON.parse(res);
      this.setState({
        logo: d.logo,
      });
    });
  };

  componentWillUnmount() {
    this._isMounted = false;
  }
  _getHeadInfoData = () => {
    if (this.state.searchdataInfo == '') {
      return <View></View>;
    } else {
      const routeName = (
        <View style={[styles.searchtour, {flexDirection: 'row'}]}>
          <View style={{flex: 2}}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('BookingList')}>
              <Icon style={{color: '#fff'}} name="arrow-back" />
            </Button>
          </View>
          <View style={{flex: 14}}>
            <Text style={[styles.searchtourtext]}>Booking Details</Text>
          </View>
        </View>
      );
      return routeName;
    }
  };
  _GetBooking = () => {
    if (this.state.Data == '') {
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
        <View style={styles.AllDataVal}>
          <View style={styles.departureView}>
            <View style={styles.depCont}>
              <Text style={styles.depText}>Name</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.firstTextVal}>
                {this.state.Data.firstname}
              </Text>
            </View>
          </View>
          <View style={styles.departureView}>
            <View style={styles.depCont}>
              <Text style={styles.depText}>Email</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.firstTextVal}>{this.state.Data.email}</Text>
            </View>
          </View>

          <View style={styles.departureView}>
            <View style={styles.depCont}>
              <Text style={styles.depText}>Drop location</Text>
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.firstTextVal}>
                {this.state.Data.pickup_trip_location}
              </Text>
            </View>
          </View>

          <View style={styles.departureView}>
            <View style={styles.depCont}>
              <Text style={styles.depText}>PickUp location</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.firstTextVal}>
                {this.state.Data.drop_trip_location}
              </Text>
            </View>
          </View>
          <View style={styles.departureView}>
            <View style={styles.depCont}>
              <Text style={styles.depText}>Price</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.firstTextVal}>{this.state.Data.price}</Text>
            </View>
          </View>

          <View style={styles.departureView}>
            <View style={styles.depCont}>
              <Text style={styles.depText}>Discount</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.firstTextVal}>
                {this.state.Data.discount == null
                  ? 'Not Any'
                  : this.state.Data.discount}
              </Text>
            </View>
          </View>
          <View style={styles.departureView}>
            <View style={styles.depCont}>
              <Text style={styles.depText}>Facilities</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.firstTextVal}>
                {this.state.Data.request_facilities}
              </Text>
            </View>
          </View>
          <View style={styles.departureView}>
            <View style={styles.depCont}>
              <Text style={styles.depText}>Price</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.firstTextVal}>{this.state.Data.price}</Text>
            </View>
          </View>
          <View style={[styles.departureView]}>
            <View style={styles.depCont}>
              <Text style={styles.depText}>Adult</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.firstTextVal}>
                {this.state.Data.adult == '0' ? 0 : this.state.Data.adult}{' '}
              </Text>
            </View>
          </View>
          <View style={[styles.departureView]}>
            <View style={styles.depCont}>
              <Text style={styles.depText}>Child</Text>
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.firstTextVal}>
                {this.state.Data.child == '0' ? 0 : this.state.Data.child}
              </Text>
            </View>
          </View>

          <View style={styles.departureView}>
            <View style={styles.depCont}>
              <Text style={styles.depText}>Special</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.firstTextVal}>
                {this.state.Data.special == '0' ? 0 : this.state.Data.special}
              </Text>
            </View>
          </View>
          <View style={styles.departureView}>
            <View style={styles.depCont}>
              <Text style={styles.depText}>Total Seats</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.firstTextVal}>
                {this.state.Data.total_seat}
              </Text>
            </View>
          </View>
          <View style={styles.departureView}>
            <View style={styles.depCont}>
              <Text style={styles.depText}>Seat Numbers</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.firstTextVal}>
                {this.state.Data.seat_numbers}
              </Text>
            </View>
          </View>

          <View style={styles.departureView}>
            <View style={styles.depCont}>
              <Text style={styles.depText}>Offer Code</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.firstTextVal}>
                {this.state.Data.offer_code == null
                  ? 'Not Any'
                  : this.state.Data.offer_code}
              </Text>
            </View>
          </View>
          <View style={styles.departureView}>
            <View style={styles.depCont}>
              <Text style={styles.depText}>Booking Type</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.firstTextVal}>
                {this.state.Data.booking_type}
              </Text>
            </View>
          </View>
          <View style={styles.departureView}>
            <View style={styles.depCont}>
              <Text style={styles.depText}>Booking Date</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.firstTextVal}>{this.state.Data.date}</Text>
            </View>
          </View>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header style={styles.loginHeader}>
          <Body>
            <View style={styles.logoD}>
              <Image
                style={{width: 140, height: 30}}
                source={{uri: this.state.logo}}
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
        <View>{this._getHeadInfoData()}</View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this._GetBooking()}
        </ScrollView>
      </View>
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
    fontFamily: 'Montserrat-SemiBold',
  },
  searchtour: {
    backgroundColor: '#B21D21',
    // justifyContent:'center',
    alignItems: 'center',
    height: 50,
  },
  departureView: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
  },
  AllDataVal: {
    width: '94%',
    marginLeft: '3%',
    marginVertical: 15,
    borderWidth: 2,
    borderColor: '#e3e3e3',
  },
  depCont: {
    flex: 1,
    borderRightWidth: 2,
    borderRightColor: '#e3e3e3',
  },
  depText: {
    marginVertical: 10,
    marginHorizontal: 15,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  firstTextVal: {
    marginVertical: 10,
    marginHorizontal: 15,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  secondTextVal: {
    marginHorizontal: 15,
    marginVertical: 10,
    justifyContent: 'center',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
  },
  bookbtn: {
    marginVertical: 13,
    backgroundColor: '#5B69BC',
    color: '#fff',
    paddingHorizontal: 70,
    paddingVertical: 5,
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
