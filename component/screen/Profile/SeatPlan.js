import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, FlatList, ScrollView ,Alert} from 'react-native'
import { Container, Header,Body , Right, Icon,Button} from 'native-base'
import Spinner from 'react-native-spinkit'
import axios from 'axios'

class MyListItem extends Component {
    _onPress = () => {
      this.props.onPressItem(this.props.id);
    };
  
    render() {
      const textColor = this.props.selected ? "#194F9E" : "#9E9E9E";
      return (
        <TouchableOpacity style={{paddingVertical:15, paddingHorizontal:12, backgroundColor:textColor, margin:5, width:50}} onPress={this._onPress}>
          <View>
            <Text style={{ color: '#fff' ,fontFamily: 'Montserrat-SemiBold',fontSize:13}}>
              {this.props.title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

export default class SeatPlan extends Component {

    constructor(props){
        super(props)
        let countP = ((this.props.navigation.state.params.pickup.adult *1) + (this.props.navigation.state.params.pickup.child*1) + (this.props.navigation.state.params.pickup.special*1))
        this.state = {
            data : this.props.navigation.state.params.pickup,
            settings : this.props.navigation.state.params.settings,
            seatdataInfo : this.props.navigation.state.params.pickup.seatdataInfo,
            colorChangeItem : false,
            selected: new Map(),
            seatNum : [],
            facilitis: this.props.navigation.state.params.pickup.selected,
            resp : '',
            bookid : '',
            Fnum : [],

            seatsize: 0,
            index: 0,
            size: 70,
            color: "#324191",
            total : (this.props.navigation.state.params.pickup.seatdataInfo.offers == null) ?

                    (((countP < 3) ?
                     ((this.props.navigation.state.params.pickup.adult* this.props.navigation.state.params.pickup.data.price) 
                            + (this.props.navigation.state.params.pickup.child* this.props.navigation.state.params.pickup.data.children_price)
                            + (this.props.navigation.state.params.pickup.special* this.props.navigation.state.params.pickup.data.special_price)) 
                    : (countP * this.props.navigation.state.params.pickup.seatdataInfo.prices.group_price_per_person))) :

            (((this.props.navigation.state.params.pickup.seatdataInfo.offers.offer_number <= countP) ?
             ((countP < 3) ?
                        ((this.props.navigation.state.params.pickup.adult* this.props.navigation.state.params.pickup.data.price) 
                        + (this.props.navigation.state.params.pickup.child* this.props.navigation.state.params.pickup.data.children_price)
                        + (this.props.navigation.state.params.pickup.special* this.props.navigation.state.params.pickup.data.special_price)
                        -(this.props.navigation.state.params.pickup.seatdataInfo.offers.offer_discount*1)
                        ) 
                        : (countP * this.props.navigation.state.params.pickup.seatdataInfo.prices.group_price_per_person)
                        -(this.props.navigation.state.params.pickup.seatdataInfo.offers.offer_discount*1)
                        ) 
                        : ((countP < 3) ?
                        ((this.props.navigation.state.params.pickup.adult* this.props.navigation.state.params.pickup.data.price) 
                        + (this.props.navigation.state.params.pickup.child* this.props.navigation.state.params.pickup.data.children_price)
                        + (this.props.navigation.state.params.pickup.special* this.props.navigation.state.params.pickup.data.special_price)) 
            : (countP * this.props.navigation.state.params.pickup.seatdataInfo.prices.group_price_per_person))))

        }
    }

    componentDidMount = () =>{

        const itemlf = this.state.facilitis

        const newArrf = []

        for (let item of itemlf) {
            newArrf.push(item)

        }

        this.setState({...this.state, Fnum : JSON.stringify(newArrf)})


        let countP = ((this.props.navigation.state.params.pickup.adult *1) + (this.props.navigation.state.params.pickup.child*1) + (this.props.navigation.state.params.pickup.special*1))
        this.setState({seatsize :countP})

        console.log(this.state)
    }

    _keyExtractor = (item, index) => item.name;

    _onPressItem = (id) => {
        this.setState((state) => {
        const selected = new Map(state.selected);
        selected.set(id, !selected.get(id));
        return {selected};
        });
    };

    _getLeftSeatData = () => {
        if(this.state.seatdataInfo == ''){
            return <View></View>
        }else{
            return <FlatList
            data={this.state.seatdataInfo.leftsite}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => this.getsetDesignView(item)}
            numColumns={this.state.seatdataInfo.ll}
        />
        }
    }

    _getRightSeatData = () => {
        if(this.state.seatdataInfo == ''){
            return <View></View>
        }else{
            return <FlatList
            data={this.state.seatdataInfo.right}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => this.getsetDesignView(item)}
            numColumns={this.state.seatdataInfo.rl}
        />
        }
    }

    getsetDesignView = (item) =>{
        if(item.status == 'Free'){
                return <MyListItem
                id={item.name}
                onPressItem={this._onPressItem}
                selected={!!this.state.selected.get(item.name)}
                title={item.name}
              />
        }else{
            return  <View style={{paddingVertical:15, paddingHorizontal:12, backgroundColor:'#E65100', margin:5, width:50}}>
                        <Text style={{ color: '#fff',fontFamily: 'Montserrat-SemiBold', fontSize:13 }}>
                            {item.name}
                        </Text>
                    </View>
        }
    }

    _getDataPrice = () => {

        if(this.state.seatdataInfo == ''){
            return <View style={{ alignItems:'center', paddingVertical:160}}>
            <Spinner 
            style={styles.spinner}
            size={this.state.size} 
            type={'ChasingDots'} 
            color={this.state.color} />
        </View>
        }else{

            let countP = ((this.props.navigation.state.params.pickup.adult *1) + (this.props.navigation.state.params.pickup.child*1) + (this.props.navigation.state.params.pickup.special*1))

            return <View style={[styles.AllDataVal,{marginBottom:20}]}>
                <View style={{flexDirection:'row',padding:10, backgroundColor:'#003B93',}}>
                        <Text style={{flex:2,fontFamily: 'Montserrat-SemiBold',fontSize:15,alignItems:'flex-start', justifyContent:'flex-start', color:'#fff'}}>{this.state.settings.adult_price.toUpperCase()}</Text>
                        <Text style={{flex:1, fontFamily: 'Montserrat-Regular',fontSize:15,alignItems:'flex-end', justifyContent:'flex-end',color:'#fff'}}>{':  ' + this.state.seatdataInfo.prices.price  + ((countP <3) ? (this.state.data.adult == '') ? ' ' : ' * ' + this.state.data.adult : ' ')}  </Text>
                    </View>
                    <View style={{flexDirection:'row',padding:10, backgroundColor:'#003B93',}}>
                        <Text style={{flex:2,fontFamily: 'Montserrat-SemiBold',fontSize:15,alignItems:'flex-start', justifyContent:'flex-start', color:'#fff'}}>{this.state.settings.child_price.toUpperCase()}</Text>
                        <Text style={{flex:1, fontFamily: 'Montserrat-Regular',fontSize:15,alignItems:'flex-end', justifyContent:'flex-end',color:'#fff'}}>{':  ' + this.state.seatdataInfo.prices.children_price  +  ((countP <3) ? (this.state.data.child == '') ? ' ' : ' * ' + this.state.data.child : ' ') }  </Text>
                    </View>
                    <View style={{flexDirection:'row',padding:10, backgroundColor:'#003B93',}}>
                        <Text style={{flex:2,fontFamily: 'Montserrat-SemiBold',fontSize:15,alignItems:'flex-start', justifyContent:'flex-start', color:'#fff'}}>{this.state.settings.special_price.toUpperCase()}</Text>
                        <Text style={{flex:1, fontFamily: 'Montserrat-Regular',fontSize:15,alignItems:'flex-end', justifyContent:'flex-end',color:'#fff'}}>{':  ' + this.state.seatdataInfo.prices.special_price  +  ((countP <3) ? (this.state.data.special == '') ? ' ' : ' * ' + this.state.data.special : ' ') }  </Text>
                    </View>
                    <View style={{flexDirection:'row',padding:10, backgroundColor:'#003B93',}}>
                        <Text style={{flex:2,fontFamily: 'Montserrat-SemiBold',fontSize:15,alignItems:'flex-start', justifyContent:'flex-start', color:'#fff'}}>{this.state.settings.group_price.toUpperCase()}</Text>
                        <Text style={{flex:1, fontFamily: 'Montserrat-Regular',fontSize:15,alignItems:'flex-end', justifyContent:'flex-end',color:'#fff'}}>{':  ' + this.state.seatdataInfo.prices.group_price_per_person  +  ((countP >= 3) ? ' * ' + countP : ' ') }  </Text>
                    </View>
                    <View style={{flexDirection:'row',padding:10, backgroundColor:'#003B93',}}>
                        <Text style={{flex:2,fontFamily: 'Montserrat-SemiBold',fontSize:15,alignItems:'flex-start', justifyContent:'flex-start', color:'#fff'}}>{this.state.settings.total.toUpperCase()}</Text>
                        <Text style={{flex:1, fontFamily: 'Montserrat-Regular',fontSize:15,alignItems:'flex-end', justifyContent:'flex-end',color:'#fff'}}>{':  ' + this.state.total }  </Text>
                    </View>
            </View>
        }
    }

    _passDetPage = () => {
        const iteml = this.state.selected

        const newArr = []

        for (let item of iteml) {
            newArr.push(item)
        }

        this.setState({...this.state, seatNum : JSON.stringify(newArr)})

        setTimeout(() => {
            axios.get(`${this.state.settings.base_url}Api/booking_history?trip_id_no=${this.state.data.data.trip_id_no}&passenger_id=${this.state.data.userDat.data.userDa.id_no}&trip_route_id=${this.state.data.data.route}&pickup_location=${this.state.data.pickupData}&drop_location=${this.state.data.dropData}&facilities=${this.state.Fnum}&price=${this.state.total}&adult=${this.state.data.adult}&child_no=${this.state.data.child}&special=${this.state.data.special}&total_seat=${this.state.seatsize}&seat_number=${this.state.seatNum}&offer_code=${this.state.data.offer}&booking_date=${this.state.data.day}`)
              .then(res => {
                if(res.data.response.status === 'ok'){
                    this.setState({
                        ...this.state,
                        bookid : res.data.response.booking_id,
                        resp : res.data.response
                    })
                    if(res.data.response.total_seat == this.state.seatsize){
                        this.props.navigation.navigate('passenger', { userInfo : this.state,settings : this.state.settings})
                    }else{
                        Alert.alert(
                            this.state.settings.settings.title,
                            this.state.settings.select_your_seat_properly +" "+ this.state.seatsize +" "+ this.state.settings.seat_properly,
                            [
                              {},
                              {},
                              {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            { cancelable: false }
                          )

                        this.setState({
                            ...this.state,
                            selected: new Map(),
                            seatNum : [],
                            facilitis: '',
                            resp : '',
                            bookid : '',
                        })
                    }
                    console.log(this.state)
                }
            })
            .catch(err => console.log(err.response))
        }, 1000)
            
    }

    render() {
        return (
            <Container style={{backgroundColor: '#F9F9F9'}}>

            <Header style={styles.loginHeader}>
                <Body>
                    <View style={styles.logoD}>
                        <Image
                            style={{width: 140, height: 30,resizeMode: "contain",}}
                            source={{uri: this.state.data.infodata.data.logo}}
                        />
                    </View>
                </Body>

                <Right style={{marginRight:15}}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
                            <Icon style={{ fontSize:22 }} type="FontAwesome" name="bars" />
                        </TouchableOpacity>
                    </View>
                </Right>
            </Header>

            <ScrollView>

                <View style={[styles.searchtour,{flexDirection:'row'}]}>
                        <View style={{flex:2}}>
                            <Button transparent onPress={()=> this.props.navigation.navigate('pickUp')}>
                                <Icon style={{color:'#fff'}} name='arrow-back' />
                            </Button>
                          </View>
                          <View style={{flex:14}}>
                          <Text style={[styles.searchtourtext]}>{this.state.settings.tap_to_select_seat}</Text>
                        </View>
                </View>

                <View style={styles.AllDataVal}>
                    <View style={{flexDirection:'row',padding:10, backgroundColor:'#003B93',}}>
                        <Text style={{flex:2,fontFamily: 'Montserrat-SemiBold',fontSize:15,alignItems:'flex-start', justifyContent:'flex-start', color:'#fff'}}>{this.state.settings.seat_layout.toUpperCase()}</Text>
                        <Text style={{flex:1, fontFamily: 'Montserrat-Regular',fontSize:15,alignItems:'flex-end', justifyContent:'flex-end',color:'#fff'}}>{this.state.data.data.fleet_seats + '  '+ this.state.settings.seats.toUpperCase() }  </Text>
                    </View>
                </View>

                <View style={{flexDirection:'row', marginBottom:8}}>
                    <View style={{flex:6}}></View>
                    <View style={{flex:1}}>
                        <Image
                            style={{width:27, height:27, resizeMode:'contain', marginTop:8, marginRight:8}}
                            source={require('../../assets/stearing.png')}
                        />
                    </View>
                </View>

                <View style={{flexDirection:'row' , marginBottom:20}}>
                    <View style={{flex:1,alignItems:'flex-start',paddingLeft:12}}>
                        { this._getLeftSeatData() }
                    </View>
                    <View style={{flex:1,justifyContent:'flex-end', alignItems:'flex-end',paddingRight:18}}>
                        { this._getRightSeatData() }
                    </View>
                </View>

                
                {this._getDataPrice()}
                

                
            </ScrollView>
            <TouchableOpacity 
                style={[styles.searchtour,{justifyContent:'center',}]}
                onPress={() => {
                    this._passDetPage()
                    // console.log(this.state)
                }}>
                <View><Text style={styles.searchtourtext}>{this.state.settings.continue}</Text></View>
            </TouchableOpacity>
      </Container>
        )
    }
}

const styles = StyleSheet.create({
    loginHeader:{
        backgroundColor: '#ffffff',
        borderBottomColor: '#333',
        borderBottomWidth: 2,
    },
    logoD:{
        width:'100%',
        justifyContent:'center', 
        alignItems:'center',
    },
    logoImage:{
        resizeMode: "contain",
        width: 140, 
        justifyContent:'center', 
        alignItems:'center',
    },
    searchtourtext:{
        color: '#ffffff',
        fontSize:16,
        fontFamily: 'Montserrat-SemiBold',
    },
    searchtour:{
        backgroundColor:'#003B93',      
        // justifyContent:'center',
        alignItems:'center',
        height:50
    },
    AllDataVal : {
        width:'96%', 
        marginLeft:'2%', 
        marginVertical:15,
        borderWidth:4, 
        borderColor:'#e3e3e3'
    },
})
