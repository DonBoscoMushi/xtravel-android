import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Alert} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import {Thumbnail, Icon} from 'native-base'
import IconS from 'react-native-vector-icons/FontAwesome5'
export default class SideDrawerPage extends Component {
  _isMounted = false;
    constructor(props){
      super(props)

      this.state = {
        img : require('../../assets/no-profile.png'),
        UriImg : '',
        userDa :'',
        logo : '',
        settings : ''
      }
    }

    componentDidMount = () =>{
      this._isMounted = true;

      setInterval(()=>{
            
        AsyncStorage.getItem('state_data', (error, res) => {
            let d = JSON.parse(res)

            AsyncStorage.getItem('user_data', (error, resData) => {
            let p = JSON.parse(resData)
            this.setState({
                userDa : p,
                logo : d.logo,
                settings : d.settings,
                UriImg : p.image
            })
          })
        })

    },3000)
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    logOutUser = () =>{
        Alert.alert(
            'LOGOUT',
            `${this.state.settings.are_you_sure}`,
            [
              {},
              {text: `${this.state.settings.no}`, onPress: () => console.log('OK Pressed')},
              {text: `${this.state.settings.confirm}`, onPress: () => {
                  AsyncStorage.removeItem('intro_tokenr')
                  this.props.navigation.navigate('login')
              }},
            ],
            { cancelable: false }
          )
    }

  render() {
    return (
        <View style={{flex:1, flexDirection:'column'}}>
        <View style={[styles.logoBack]}>
            <View style={{ flexDirection:'column' }}>
              <View style={{alignItems:'center', paddingVertical:10}}>
                {
                  (this.state.UriImg == '' || this.state.UriImg == null || this.state.UriImg == 'null') ?
                  <Thumbnail large source={this.state.img} />
                  :
                  <Thumbnail large source={{uri: (this.state.settings.base_url + this.state.UriImg) }} />
                }
              </View>

              <View style={{ alignItems:'center',  paddingVertical:5}}>
                {(this.state.userDa == '') 
                ?
                <Text style={styles.username}>{`Name : Dummy Text`}</Text>
                :
                <Text style={styles.username}>{`${this.state.settings.name.toUpperCase()} : ${this.state.userDa.firstname.toUpperCase()} ${this.state.userDa.lastname.toUpperCase()}`}</Text>
              }
              </View>

              <View style={{ alignItems:'center',  paddingVertical:5}}>
                {(this.state.userDa == '') 
                ?
                <Text style={styles.username}>{`Email : example@gmail.com`}</Text>
                :
                <Text style={styles.username}>{`${this.state.settings.email.toUpperCase()} : ${this.state.userDa.email}`}</Text>
              }
              </View>


            </View>
        </View>
        <View style={{backgroundColor:'#fff',opacity:.9 , paddingTop:10,flex:9}}>
            <View style={{flex:1, flexDirection:'column'}}>
                  <View>
                  <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={{opacity:1}}>

                      <TouchableOpacity onPress={()=> {
                        this.props.navigation.navigate('profile')
                        this.props.navigation.closeDrawer()}} style={styles.borderRenderItem}>
                        <View style={styles.renderItem}>
                          <View style={styles.iconsty}>
                            <Icon style={{ fontSize:22 }} type="FontAwesome" name="home" />
                          </View>
                          <View style={styles.textsty}>
                            <Text style={[styles.textcomp, styles.monsemibold]}>HOME</Text>
                          </View>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=> {
                        this.props.navigation.navigate('edit')
                        this.props.navigation.closeDrawer()
                    }} style={styles.borderRenderItem}>
                        <View style={styles.renderItem}>
                          <View style={styles.iconsty}>
                            <Icon style={{ fontSize:22 }} type="FontAwesome" name="edit" />
                          </View>
                          <View style={styles.textsty}>
                            <Text style={[styles.textcomp, styles.monsemibold]}>EDIT PROFILE</Text>
                          </View>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=> {
                        this.props.navigation.navigate('BookingList')
                        this.props.navigation.closeDrawer()
                    }} style={styles.borderRenderItem}>
                        <View style={styles.renderItem}>
                          <View style={styles.iconsty}>
                            <IconS style={{ fontSize:22 }} type="FontAwesome" name="ticket-alt" />
                          </View>
                          <View style={styles.textsty}>
                            <Text style={[styles.textcomp, styles.monsemibold]}>BOOKING LIST</Text>
                          </View>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=> {
                        this.logOutUser()
                        this.props.navigation.closeDrawer()
                    }} style={styles.borderRenderItem}>
                        <View style={styles.renderItem}>
                          <View style={styles.iconsty}>
                            <Icon style={{ fontSize:22 }} type="FontAwesome" name="sign-out" />
                          </View>
                          <View style={styles.textsty}>
                            <Text style={[styles.textcomp, styles.monsemibold]}>LOGOUT</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      </ScrollView>
                  </View>
            </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    logoBack:{
        height: 240,
        backgroundColor: '#003B93',
        justifyContent:'center', 
      },
      renderItem:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical: 8,
      },
      textcomp:{
        color:'#333',
        alignItems: 'center',
      },
      iconsty:{
        marginHorizontal: 20,
        marginTop:3
      },
      textsty:{
      },
      borderRenderItem:{
        borderBottomColor:'#e3e3e3',
        borderBottomWidth:2 ,
      },
      monReg:{
        fontSize:16,
        fontFamily: 'Montserrat-Regular',
      },
      monBold:{
        fontSize:17,
        fontFamily: 'Montserrat-Bold',
      },
      monsemibold:{
        fontSize:15,
        fontFamily: 'Montserrat-SemiBold',
      },
      username:{
        fontSize:15,
        fontFamily: 'Montserrat-SemiBold',
        color:'#fff'
      }
})
