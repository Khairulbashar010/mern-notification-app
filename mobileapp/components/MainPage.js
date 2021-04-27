/* eslint-disable prettier/prettier */
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { Button, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import axios from 'axios';

export default class MainPage extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            fromLink: false,
        };
    }

    componentDidMount() {
		// Listen to link background/minimized state
        const handleDynamicLink = (link) => {
			this.setState({name: link.url.split('=')[1].split('-')[1]});
            this.setState({fromLink: true});
        };

        // Listen to link quit state
		dynamicLinks().getInitialLink()
		.then(link => {
			this.setState({name: link.url.split('=')[1].split('-')[1]});
            this.setState({fromLink: true});
		})
		.catch(err => {
			console.log(err);
		});
		dynamicLinks().onLink(handleDynamicLink);

    }

	sendNotification(event) {
		axios.post('https://assesment-web-part.herokuapp.com/send/notify', {
		name: this.state.name,
	})
	.then(res => {
		console.log(res);
	})
	.catch(err => {
		console.log(err);
	});
	console.log(this.state.name);
	}

	render(){
		return (
			< View style={styles.container}>
			{ this.state.fromLink ?
			<View>
			<Text style={styles.text}>This Message{'\n'}Is For{'\n'}{this.state.name}</Text>
			<Button
			style={styles.button}
			title="Send Notification"
			mode="contained"
			onPress= {() => this.sendNotification()}
			/>
			</View>
			:
			<Text style={styles.text}>Hi.</Text>
			}

		</View>
		);}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34',
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
	marginBottom: 20,
  },
  button: {
    width: 100,
  },
});
