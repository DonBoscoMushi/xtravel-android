import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, ScrollView,Linking} from 'react-native'
import { Container, Header,Body , Right, Icon, Button } from 'native-base'
export default class PayPaypal extends Component {

    constructor(props){
        super(props)

        this.state = {
            settings : this.props.navigation.state.params.settings,
            allDataInfo : this.props.navigation.state.params.allData,
            fullName : this.props.navigation.state.params.allData.allDataInfo.allinfoData.data.infodata.data.userDa.firstname,
            lastname : this.props.navigation.state.params.allData.allDataInfo.allinfoData.data.infodata.data.userDa.lastname
        }

        console.log(this.state)
    }

    

    componentDidMount = () => {
        console.log(this.state.allDataInfo.allDataInfo.bookid)
    }
    
    _confirmBooking = () =>{


        Linking.canOpenURL(`${this.state.settings.base_url}Api/buy?booking_id_no=${this.state.allDataInfo.allDataInfo.bookid}`).then(supported => {
            if (supported) {
              Linking.openURL(`${this.state.settings.base_url}Api/buy?booking_id_no=${this.state.allDataInfo.allDataInfo.bookid}`);
            } else {
              console.log("Don't know how to open URI: " + `${this.state.settings.base_url}Api/buy?booking_id_no=${this.state.allDataInfo.allDataInfo.bookid}`);
            }
        });
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
                                    style={{width: 140, height: 50,resizeMode: "contain",}}
                                    source={{uri: this.state.allDataInfo.allDataInfo.allinfoData.data.infodata.data.logo}}
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
                             <Button transparent onPress={()=> this.props.navigation.navigate('pay')}>
                                <Icon style={{color:'#fff'}} name='arrow-back' />
                            </Button>
                          </View>
                          <View style={{flex:14}}>
                          <Text style={[styles.searchtourtext]}>{this.state.settings.paypal_payment}</Text>
                        </View>
                        
                    </View>

                    <ScrollView>

                    <View style={{width:'94%', marginVertical:25, marginHorizontal:'3%'}}>
                        <View style={{borderWidth:2, borderColor:'#e3e3e3',paddingHorizontal:10, paddingVertical:15}}>
                            <View style={{flexDirection:'row', paddingBottom:5}}>
                                <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:2}]}>{this.state.settings.full_name}</Text>
                                <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:3}]}>:  {this.state.fullName + ' ' +this.state.lastname}</Text>
                            </View>

                            <View style={{flexDirection:'row', paddingBottom:5}}> 
                                <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:2}]}>{this.state.settings.total_price}</Text>
                                <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:3}]}>: {this.state.allDataInfo.allDataInfo .allinfoData.total} </Text>
                            </View>

                            <View style={{flexDirection:'row', paddingBottom:5}}>
                                <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:2}]}>{this.state.settings.seat_n}</Text>
                                <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:3}]}>: {this.state.allDataInfo.allDataInfo.resp.seat_numbers} </Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                                <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-SemiBold',flex:2}]}>{this.state.settings.booking_id}</Text>
                                <Text style={[styles.detailsjpData,{fontFamily: 'Montserrat-Regular',flex:3}]}>: {this.state.allDataInfo.allDataInfo.bookid} </Text>
                            </View>
                        </View>
                    </View>

                    </ScrollView>

                    </Container>
                </View>
                <View style={{flex:1,justifyContent:'flex-end',backgroundColor:'#F9F9F9'}}>
                    <TouchableOpacity
                        style={styles.searchtour}
                        onPress={()=> this._confirmBooking()}
                        >
                        <Text style={styles.confirmBook}>{this.state.settings.confirm_booking}</Text>
                    </TouchableOpacity>
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
    confirmBook:{
        color: '#ffffff',
        fontSize:16,
        fontFamily: 'Montserrat-SemiBold',
        marginHorizontal: 15,
    },
    searchtourtext:{
        color: '#ffffff',
        fontSize:16,
        fontFamily: 'Montserrat-SemiBold',
    },
    searchtour:{
        backgroundColor:'#003B93',      
        justifyContent:'center',
        alignItems:'center',
        height:50
    },
    AllDataVal : {
        width:'92%', 
        marginLeft:'4%', 
        marginVertical:15,
    },
    locationDet:{
        fontSize:16,
        fontFamily: 'Montserrat-SemiBold',
        marginLeft:7,
        color: '#333'
    },
    payimg:{
        resizeMode: "contain",
        // width: (Dimensions.get('window').height <= '600' ? 120 : 200), 
        height:60,
        width:90,
        justifyContent:'center', 
        alignItems:'center',
        // marginBottom: (Dimensions.get('window').height <= '600' ? 0 : 30),
        backgroundColor : '#EFF5FF'
    },
    detailsjpData:{
      color: '#333',
      fontSize:14,
      
  },
})
