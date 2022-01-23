/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './component/screen/Login/Login';
import Registration from './component/screen/Registration/Registration';
import Profile from './component/screen/Profile/Profile';
import JourneyDetails from './component/screen/Profile/JourneyDetails';
import SeatPlan from './component/screen/Profile/SeatPlan';
import PassengerDetails from './component/screen/Profile/PassengerDetails';
import PickUp from './component/screen/Profile/PickUp';
import Payment from './component/screen/Profile/Payment';
import ForgetPass from './component/screen/Login/ForgetPass';
import PayPaypal from './component/screen/Payment/PayPaypal';
import PayBank from './component/screen/Payment/PayBank';
import PayCash from './component/screen/Payment/PayCash';
import EditProfile from './component/screen/Profile/EditProfile';
import ViewProfile from './component/screen/Profile/ViewProfile';
import SideDrawerPage from './component/screen/Profile/SideDrawerPage';
import BookingList from './component/screen/BookingList/BookingList';
import ViewBooking from './component/screen/BookingList/ViewBooking';

import {StyleSheet, Text, View,Button} from 'react-native';  
// import { createBottomTabNavigator, createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/Ionicons';  

const AppStackNavigator = createStackNavigator(
  {
    profile: {
      screen: Profile,
    },
    JourneyDetails: {
      screen: JourneyDetails,
    },
    seatplan: {
      screen: SeatPlan,
    },
    passenger: {
      screen: PassengerDetails,
    },
    pickUp: {
      screen: PickUp, 
    },
    pay: {
      screen: Payment,
    },
    forget: {
      screen: ForgetPass,
    },
    paypaypal: {
      screen: PayPaypal,
    },
    paybank: {
      screen: PayBank,
    },
    paycash: {
      screen: PayCash,
    },
    sidedrawer: {
      screen: SideDrawerPage,
    },
    edit: {
      screen: EditProfile,
    },
    viewpro: {
      screen: ViewProfile,
    },
    BookingList: {
      screen: BookingList,
    },
    ViewBooking: {
      screen: ViewBooking,
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        header: null,
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };
    },
  },
);

const AppdrowerNavigator = createDrawerNavigator(
  {
    Dashboard: {
      screen: AppStackNavigator,
    },
  },
  {
    initialRouteName: 'Dashboard',
    drawerPosition: 'left',
    contentComponent: props => <SideDrawerPage {...props} />,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerBackgroundColor: 'transparent',
    navigationOptions: {
      drawerLockMode: 'locked-close',
      disableGestures: true,
    },
  },
);


//bottom navigator
// const TabNavigator = createMaterialBottomTabNavigator(
//   {
//     Home: {
//       screen: Profile,
//       navigationOptions: {
//         tabBarLabel: 'Home',
//         tabBarIcon: ({}) => (
//           <View>
//             <Icon style={[{color: '#ccc'}]} size={25} name={'ios-home'} />
//           </View>
//         ),
//       },
//     },
//     Ticket: {
//       screen: Ticket,
//       navigationOptions: {
//         tabBarLabel: 'Ticket',
//         tabBarIcon: ({}) => (
//           <View>
//             <Icon style={[{color: '#ccc'}]} size={25} name={'ios-person'} />
//           </View>
//         ),
//         activeColor: '#880C0C',
//         inactiveColor: '#818181',
//         barStyle: {backgroundColor: '#FFFFFF'},
//       },
//     },
//     Taarifa: {
//       screen: BookingList,
//       navigationOptions: {
//         tabBarLabel: 'Taarifa'(
//           <View>
//             <Icon style={[{color: '#ccc'}]} size={25} name={'ios-images'} />
//           </View>
//         ),
//         activeColor: '#880C0C',
//         inactiveColor: '#818181',
//         barStyle: {backgroundColor: '#FFFFFF'},
//       },
//     },
//     Registration: {
//       screen: Registration,
//       navigationOptions: {
//         tabBarLabel: 'Offer',
//         tabBarIcon: ({}) => (
//           <View>
//             <Icon style={[{color: '#ccc'}]} size={25} name={'ios-cart'} />
//           </View>
//         ),
//         activeColor: '#880C0C',
//         inactiveColor: '#818181',
//         barStyle: {backgroundColor: '#FFFFFF'},
//       },
//     },
//   },
//   {
//     initialRouteName: 'Home',
//     activeColor: '#880C0C',
//     inactiveColor: '#818181',
//     barStyle: {backgroundColor: '#FFFFFF'},
//   },
// );  

// class Ticket extends React.Component {  
//   render() {  
//       return (  
//           <View style={styles.container}>  
//               <Text>Tickets</Text>  
//           </View>  
//       );  
//   }  
// }  
// const styles = StyleSheet.create({  
//   container: {  
//       flex: 1,  
//       justifyContent: 'center',  
//       alignItems: 'center'  
//   },  
// });  




const AppSwitchNavigator = createSwitchNavigator({
  // login: {
  //   screen: Login,
  // },
  // registration: {
  //   screen: Registration,
  // },
  Dashboard: {
    screen: AppdrowerNavigator,
  },
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default class componentName extends Component {
  render() {
    return <AppContainer />;
  }
}
