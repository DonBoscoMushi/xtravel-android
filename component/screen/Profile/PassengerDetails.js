import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView, Alert, } from 'react-native'
import { Container, Header,Body , Right, Icon,Button} from 'native-base'
import CheckBox from 'react-native-check-box'

export default class PassengerDetails extends Component {


    constructor(props){
        super(props)

        this.state = {
            settings : this.props.navigation.state.params.settings,
            allinfoData : this.props.navigation.state.params.userInfo,
            bookid : this.props.navigation.state.params.userInfo.bookid,
            seatNum : this.props.navigation.state.params.userInfo.seatNum,
            facilitis: this.props.navigation.state.params.userInfo.facilitis,
            resp: this.props.navigation.state.params.userInfo.resp,
            isChecked : true,
        }
    }

    componentDidMount = ( ) => {    
        console.log(this.state)
    }


    getBookingHistoryId =()=>{
        if(this.state.isChecked){
            this.props.navigation.navigate('pay', { pay : this.state, settings : this.state.settings})
        }else{
            Alert.alert(
                this.state.settings.settings.title,
                this.state.settings.check_term_and_condition,
                [
                  {},
                  {},
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
        }
    }

  render() {
    return (

        <View style={{flex: 1}}>
                <View style={{flex:9}}>
                
                <Container style={{backgroundColor: '#F9F9F9'}}>

                    <Header style={styles.loginHeader}>
                        <Body>
                            <View style={styles.logoD}>
                                <Image
                                    style={{width: 140, height: 30,resizeMode: "contain",}}
                                    source={{uri: this.state.allinfoData.data.infodata.data.logo}}
                                />
                            </View>
                        </Body>

                        <Right style={{marginRight:15}}>
                            <TouchableOpacity onPress={()=> this.props.navigation.openDrawer()}>
                                <Icon style={{ fontSize:22 }} type="FontAwesome" name="bars" />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    
                    <View style={[styles.searchtour,{flexDirection:'row'}]}>

                        <View style={{flex:2}}>
                        <Button transparent onPress={()=> this.props.navigation.navigate('seatplan')}>
                                <Icon style={{color:'#fff'}} name='arrow-back' />
                            </Button>
                          </View>
                          <View style={{flex:14}}>
                          <Text style={[styles.searchtourtext]}>{this.state.settings.passenger_details}</Text>
                        </View>
                        
                    </View>

                    <ScrollView>
                        <View style={styles.AllDataVal}>

                            <View style={{marginBottom:20}}>
                                <View style={{marginBottom:8}}>
                                    <Text style={styles.locationDet}>{this.state.settings.passenger_details}</Text>
                                </View>
                                
                                <View style={{borderWidth:2, borderColor:'#e3e3e3',paddingHorizontal:10, paddingVertical:15}}>
                                    <View style={{flexDirection:'row', paddingBottom:5}}>
                                        <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:3}]}>{this.state.settings.full_name}</Text>
                                        <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:4}]}>:  {this.state.allinfoData.data.userDat.data.userDa.firstname + ' ' +this.state.allinfoData.data.userDat.data.userDa.lastname}</Text>
                                    </View>

                                    <View style={{flexDirection:'row', paddingBottom:5}}>
                                        <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:3}]}>{this.state.settings.email_address}</Text>
                                        <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:4}]}>:  {this.state.allinfoData.data.userDat.data.userDa.email}</Text>
                                    </View>

                                    <View style={{flexDirection:'row'}}>
                                        <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:3}]}>{this.state.settings.address}</Text>
                                        <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:4}]}>:  {this.state.allinfoData.data.userDat.data.userDa.address}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{marginBottom:20}}>
                                <View style={{marginBottom:8}}>
                                    <Text style={styles.locationDet}>{this.state.settings.journery_details}</Text>
                                </View>

                                <View style={{borderWidth:2, borderColor:'#e3e3e3',paddingHorizontal:10, paddingVertical:15}}>
                                    <View style={{flexDirection:'row', paddingBottom:5}}>
                                        <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:3}]}>{this.state.settings.route}</Text>
                                        <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:4}]}>:  {this.state.allinfoData.data.data.trip_route_name}</Text>
                                    </View>

                                    <View style={{flexDirection:'row', paddingBottom:5}}>
                                        <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:3}]}>{this.state.settings.pickup_location}</Text>
                                        <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:4}]}>:  {this.state.allinfoData.data.pickupData}</Text>
                                    </View>

                                    <View style={{flexDirection:'row', paddingBottom:5}}>
                                        <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:3}]}>{this.state.settings.drop_location}</Text>
                                        <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:4}]}>:  {this.state.allinfoData.data.dropData}</Text>
                                    </View>

                                    <View style={{flexDirection:'row'}}>
                                        <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:3,}]}>{this.state.settings.booking_date}</Text>
                                        <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:4}]}>:  {this.state.allinfoData.data.day}</Text>
                                    </View>
                                    
                                </View>
                            </View>

                            <View style={{justifyContent:'flex-start', marginTop:7,marginBottom:15}}>
                                <CheckBox
                                    style={{flex: 1, padding: 10}}
                                    onClick={()=>{
                                    this.setState({
                                        isChecked:!this.state.isChecked
                                    })
                                    }}
                                    isChecked={this.state.isChecked}
                                    rightText={this.state.settings.terms_and_condition}
                                />
                            </View>

                            

                        </View>
                    </ScrollView>

                </Container>
                
                </View>
                <View style={{flex:1,justifyContent:'flex-end',backgroundColor:'#F9F9F9'}}>
                <View>
                    <TouchableOpacity 
                        style={[styles.searchtour,{justifyContent:'center',}]}
                        onPress={()=> 
                            this.getBookingHistoryId()
                        }
                        >
                        <Text style={styles.searchtourtext}>{this.state.settings.continue}</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>


        
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
        
        alignItems:'center',
        height:50
    },
    AllDataVal : {
        width:'92%', 
        marginLeft:'4%', 
        marginVertical:15,
        backgroundColor:'#F9F9F9'
    },
    locationDet:{
        fontSize:16,
        fontFamily: 'Montserrat-SemiBold',
        marginLeft:7
    },
    detailsjpData:{
        color: '#333',
        fontSize:14,
        
    },
})
