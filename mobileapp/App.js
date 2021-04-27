/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import MainPage from './components/MainPage';
import messaging from '@react-native-firebase/messaging';

export default class App extends Component {

	componentDidMount(){
		messaging().requestPermission()
		.then(authStatus => {
			if (authStatus === messaging.AuthorizationStatus.AUTHORIZED || messaging.AuthorizationStatus.PROVISIONAL){
				messaging().subscribeToTopic('general')
				.then(() => console.log('topicName = general'));

				messaging().onMessage(remoteMessage => {
					Alert.alert(
						remoteMessage.notification.title,
						remoteMessage.notification.body
					);
					console.log('New Notification arived');
				});

				messaging().onNotificationOpenedApp(remoteMessage => {
					Alert.alert(
						remoteMessage.notification.title,
						remoteMessage.notification.body
					);
				});

				messaging().getInitialNotification()
				.then(remoteMessage => {
					if (remoteMessage){
						Alert.alert(
							remoteMessage.notification.title,
							remoteMessage.notification.body
						);
					}
				})
				.catch(err => {
					console.log(`Error ocured while opening from quit state ${err}`);
				});
			}
		})
		.catch(err => {
			console.log(`messaging.requestPermission Error: ${err}`);
		});
	}
  render() {
    return (
		<View style={styles.container}>
			<MainPage/>
		</View>
	);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34',
  },
});
