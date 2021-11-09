
// Import

	import React, { useState, useEffect } from 'react';
	import { StatusBar } from 'expo-status-bar';
	import { StyleSheet, Text, View, Button, Alert, TextInput, FlatList} from'react-native';

	import { NavigationContainer } from '@react-navigation/native';
	import { createStackNavigator } from '@react-navigation/stack';


// Tyyli

	const styles = StyleSheet.create({
		container: {
			flex: 1,
			padding:15,
			backgroundColor: '#fff',
			alignItems: 'center',
			justifyContent: 'flex-start',
		},
		input:{
		color:'red',
		padding:5,
		margin:5,
		width:200, 
		borderColor:'gray', 
		borderWidth:1
		},
	});

// Screens

	function Calculator({navigation}) {

		const[tulos, setTulos] = useState('');
		const[luku01, setLuku01] = useState('');
		const[luku02, setLuku02] = useState('');
		const[data, setData] = useState([]);
			
		const laske = operator => {

			if(luku01 != '' && luku02 != '' ) {

				const [num01, num02] = [Number(luku01), Number(luku02)];
			
				// Tulosta ei voi asettaa suoraan tilasta, päivittyy jälkijunassa?
				switch(operator) {
				case '+':   setTulos('Result: ' + (num01 + num02));
							setData([...data, {
								key: String(data.length), 
								viesti: luku01 + ' + ' + luku02 + ' = ' + ( num01 + num02 )
							}]);
							break;
				case '-':   setTulos('Result: ' + (num01 - num02));
							setData([...data, {
								key: String(data.length), 
								viesti: luku01 + ' - ' + luku02 + ' = ' + ( num01 - num02 )
							}]);
							break;
				}
	
				setLuku01('');
				setLuku02('');
			}
		}
			
		return (
			<View style={styles.container}>
			
				<Text > { tulos } </Text>
			
				<TextInput 
				style={styles.input}
				keyboardType="numeric"
				onChangeText = { luku01 => setLuku01(luku01)} 
				value = { luku01 }
				/>
			
				<TextInput 
				style={styles.input}
				keyboardType="numeric"
				onChangeText = { luku02 => setLuku02(luku02)} 
				value = { luku02 }
				/>
			
				{/*Buttonilla ei style-propsia */}
				<View style={{ flexDirection:'row'}}>
						<Button onPress = { () => laske('+') } title="+"/>
						<Button onPress = { () => laske('-') } title="-"/>
						<Button
						title="History"
						onPress={() =>navigation.navigate('History', { data })}
						/>
				</View>
			
				<StatusBar style="auto" />
			</View>
		);
	}


	function History({route, navigation}) {

		const{data} = route.params;

		return (

			<View style={styles.container}>
				
				<FlatList 
				data ={data} 
				ListHeaderComponent = { () => <Text> History</Text>}
				renderItem={({item}) =>
				<Text>{item.viesti}</ Text>}
				/>
			</View>
		);

	}

	const Stack = createStackNavigator();

// Main

	export default function App() {
		return (
			<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name = "Calculator" component = {Calculator} />
				<Stack.Screen name = "History" component = {History} />
			</Stack.Navigator>
			</NavigationContainer>
		);
	}