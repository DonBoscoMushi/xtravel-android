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
import axios from 'axios';
import Spinner from 'react-native-spinkit';
import moment from 'moment';

export default class JourneyDetails extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.navigation.state.params.data,
      settings: this.props.navigation.state.params.settings,
      searchdataInfo: '',
      index: 0,
      size: 80,
      color: '#324191',
    };
  }

  componentDidMount = () => {
    // console.warn(this.state.data.startPointVal)
    // console.warn(this.state.data.endPointVal)
    // console.warn(this.state.data.chosenDate)
    // console.warn(this.state.data.fleetsData)
    _isMounted = true;
    axios
      .get(
        `${this.state.settings.base_url}Api/search?start_point=${this.state.data.startPointVal}&end_point=${this.state.data.endPointVal}&date=${this.state.data.chosenDate}`,
      )
      .then(res => {
        this.setState({
          ...this.state,
          searchdataInfo: res.data.response,
        });
      })
      .catch(err => console.log(err.response));
  };

  componentWillUnmount = () => {
    _isMounted = false;
  };

  _seatplan = (val, ava) => {
    const day = this.state.searchdataInfo.date;
    const fleetType = this.state.searchdataInfo.fleet_type;
    this.props.navigation.navigate('pickUp', {
      infodata: this.state,
      data: val,
      day: day,
      fleetType: fleetType,
      userDat: this.state,
      ava: ava,
      settings: this.state.settings,
    });
  };

  _getHeadInfoData = () => {
    if (this.state.searchdataInfo == '') {
      return <View></View>;
    } else {
      const routeName = (
        <View style={[styles.searchtour, {flexDirection: 'row'}]}>
          <View style={{flex: 2}}>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('profile')}>
              <Icon style={{color: '#fff'}} name="arrow-back" />
            </Button>
          </View>
          <View style={{flex: 14}}>
            <Text style={[styles.searchtourtext]}>
              {this.state.searchdataInfo.route_name == null
                ? this.state.settings.no_rout_available
                : this.state.searchdataInfo.route_name}
            </Text>
          </View>
        </View>
      );
      return routeName;
    }
  };

  _getSearchInfoData = () => {
    if (this.state.searchdataInfo == '') {
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
      const d = this.state.searchdataInfo.trip_list.map((value, i) => {
        // return this.state.searchdataInfo.available.map((val,key)=>{
        return (
          // get hands dirty
          <View key={value.trip_id_no}>
            <View
              style={[
                styles._main_card,
                {flexDirection: 'column', padding: 3},
              ]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Image
                  source={require('../../assets/bus-logo.png')}
                  style={styles.busImg}
                />
                <View style={{flex: 1, marginStart: 3}}>
                  <Text style={[styles.text_start, {marginTop: 5}]}>
                    xTravel
                  </Text>
                  <Text style={styles.trip_txt}>
                    {value.pickup_trip_location}
                  </Text>

                  <Text style={styles.trip_txt}>
                    {value.drop_trip_location}
                  </Text>
                </View>
                <View style={{flex: 1, marginTop: 5}}>
                  <Text style={styles.text_end}>
                    {this.state.settings.departure + ' ' + value.start}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <View style={{height: 50, width: 50, borderRadius: 40}}>
                  <Text style={{fontSize: 12, color: 'green'}}>
                    {value.fleet_seats + ' Seats Available'}
                  </Text>
                </View>
                <View
                  style={{flex: 1, flexDirection: 'column', marginStart: 3}}>
                  <Text style={styles.text_start}>
                    {this.state.settings.adult_fare}
                  </Text>
                  <Text style={styles.text_start}>Daraja</Text>
                </View>
                <View style={{flex: 1}}>
                  <Text style={[styles.text_end, {color: '#880C0C'}]}>
                    {value.price + ' Tsh'}
                  </Text>
                  <Text style={styles.text_end}>Luxury</Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <View style={[styles.btns, {marginEnd: 10}]}>
                  <Text style={[styles.btnsText]}>Taarifa za Basi</Text>
                </View>
                <View style={[styles.btns, {marginStart: 10}]}>
                  <TouchableOpacity
                    onPress={() =>
                      this._seatplan(
                        value,
                        this.state.searchdataInfo.available[i],
                      )
                    }>
                    <Text style={[styles.btnsText]}>
                      {this.state.settings.book.toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          // <View style={styles.AllDataVal} key={value.trip_id_no}>
          //   <View style={styles.departureView}>
          //     <View style={styles.depCont}>
          //       <Text style={styles.depText}>
          //         {this.state.settings.departure}
          //       </Text>
          //     </View>

          //     <View style={{flex: 1}}>
          //       <Text style={styles.firstTextVal}>{value.start}</Text>
          //       <Text style={styles.secondTextVal}>
          //         {value.pickup_trip_location}
          //       </Text>
          //     </View>
          //   </View>

          //   <View style={styles.departureView}>
          //     <View style={styles.depCont}>
          //       <Text style={styles.depText}>
          //         {this.state.settings.duration}
          //       </Text>
          //     </View>

          //     <View style={{flex: 1}}>
          //       <Text style={styles.firstTextVal}>{value.duration}</Text>
          //     </View>
          //   </View>

          //   <View style={styles.departureView}>
          //     <View style={styles.depCont}>
          //       <Text style={styles.depText}>
          //         {this.state.settings.distance}
          //       </Text>
          //     </View>

          //     <View style={{flex: 1}}>
          //       <Text style={styles.firstTextVal}>{value.distance}</Text>
          //     </View>
          //   </View>

          //   <View style={styles.departureView}>
          //     <View style={styles.depCont}>
          //       <Text style={styles.depText}>
          //         {this.state.settings.arrival}
          //       </Text>
          //     </View>

          //     <View style={{flex: 1}}>
          //       <Text style={styles.firstTextVal}>{value.end}</Text>
          //       <Text style={styles.secondTextVal}>
          //         {value.drop_trip_location}
          //       </Text>
          //     </View>
          //   </View>

          //   <View style={styles.departureView}>
          //     <View style={styles.depCont}>
          //       <Text style={styles.depText}>
          //         {this.state.settings.adult_fare}
          //       </Text>
          //     </View>

          //     <View style={{flex: 1}}>
          //       <Text style={styles.firstTextVal}>{value.price}</Text>
          //     </View>
          //   </View>

          //   <View style={styles.departureView}>
          //     <View style={styles.depCont}>
          //       <Text style={styles.depText}>
          //         {this.state.settings.child_fare}
          //       </Text>
          //     </View>

          //     <View style={{flex: 1}}>
          //       <Text style={styles.firstTextVal}>{value.children_price}</Text>
          //     </View>
          //   </View>

          //   <View style={styles.departureView}>
          //     <View style={styles.depCont}>
          //       <Text style={styles.depText}>
          //         {this.state.settings.special_fare}
          //       </Text>
          //     </View>

          //     <View style={{flex: 1}}>
          //       <Text style={styles.firstTextVal}>{value.special_price}</Text>
          //     </View>
          //   </View>

          //   <View style={{flexDirection: 'row', backgroundColor: '#ffffff'}}>
          //     <View style={styles.depCont}>
          //       <Text style={styles.depText}>
          //         {this.state.settings.seat_details}
          //       </Text>
          //     </View>

          //     <View style={{flex: 1}}>
          //       <Text style={[styles.secondTextVal, {color: '#B21D21'}]}>
          //         {value.fleet_seats + ' ' + this.state.settings.total_seats}
          //       </Text>
          //       <Text
          //         style={[
          //           styles.secondTextVal,
          //           {
          //             color:
          //               this.state.searchdataInfo.available[i] > 5
          //                 ? 'green'
          //                 : 'red',
          //           },
          //         ]}>
          //         {this.state.searchdataInfo.available[i] +
          //           ' ' +
          //           this.state.settings.seats_available}{' '}
          //       </Text>
          //     </View>
          //   </View>

          //   <View
          //     style={{
          //       backgroundColor: '#ffffff',
          //       borderTopWidth: 2,
          //       borderTopColor: '#e3e3e3',
          //     }}>
          //     <View
          //       style={{
          //         flex: 1,
          //         justifyContent: 'center',
          //         alignItems: 'center',
          //       }}>
          //       <TouchableOpacity
          //         onPress={() =>
          //           this._seatplan(
          //             value,
          //             this.state.searchdataInfo.available[i],
          //           )
          //         }>
          //         <Text style={styles.bookbtn}>
          //           {this.state.settings.book.toUpperCase()}
          //         </Text>
          //       </TouchableOpacity>
          //     </View>
          //   </View>
          // </View>
        );
        // })
      });

      return d;
    }
  };

  render() {
    return (
      <Container style={{backgroundColor: '#E2DFDF', overflow: 'hidden'}}>
        <Header style={styles.loginHeader}>
          <Body>
            <View style={styles.logoD}>
              <Image
                style={{width: 140, height: 30, resizeMode: 'contain'}}
                source={{uri: this.state.data.logo}}
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
        {/* <View>{this._getHeadInfoData()}</View> */}
        <ScrollView>{this._getSearchInfoData()}</ScrollView>
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

  busImg: {
    height: 50,
    width: 50,
    borderRadius: 40,
  },

  btns: {
    width: 110,
    borderRadius: 30,
    marginTop: 5,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B21D21',
    height: 25,
  },

  btnsText: {
    color: '#ffffff',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },

  text_start: {
    textAlign: 'left',
    paddingStart: 5,
  },
  trip_txt: {
    fontSize: 12,
    textAlign: 'left',
    color: '#9F9F9F',
    padding: 5,
  },

  text_end: {
    textAlign: 'right',
    paddingHorizontal: 5,
  },

  spinner: {
    marginBottom: 50,
  },
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
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  firstTextVal: {
    marginVertical: 10,
    marginHorizontal: 15,
    justifyContent: 'center',
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
