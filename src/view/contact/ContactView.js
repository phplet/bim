'use strict';

import React, { Component } from 'react';
import { Text, View, ScrollView, ListView, PanResponder, Image, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import AppGuideline from '../../app/AppGuideline';
import asset from '../../app/AppAsset';
import Contacts from 'react-native-contacts';

import Title from '../../component/Title';
import ContactItem from './item/ContactItem';
import LetterItem from './item/LetterItem';

import {connect} from 'react-redux';
import {loadContacts} from './ContactAction';


const {width, height} = Dimensions.get('window');

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class ContactView extends Component {

	constructor(props) {
		super(props);

		this.items = [];
		this.letters = [];

		this.spacerWidth = width / 2 - 35/2;

		this.scrollPos = null;

		for(var i in letters){
			this.letters[i] = this.letters[letters[i-1]] ;
		}
	}


	componentDidMount(){
		this.headerScroll = this.refs.header.getScrollResponder();
		this.listViewScroll = this.refs.listView.getScrollResponder();


		let defaultContacts = [{
			givenName: 'Faouzane',
			familyName: 'BATIGA',
			phoneNumbers: [{number: "0667505353"}],
			type:'bim'
		}];

		if(this.props.contact.list.length == 0){
			Contacts.checkPermission( (err, permission) => {
			  // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
			  if(permission === Contacts.PERMISSION_UNDEFINED){

			  	Contacts.getAll((err, contacts) => {
			  		if (err && err.type === 'permissionDenied') {
			  			this.props.dispatch(loadContacts(defaultContacts));
			  		} else {
			  			contacts = defaultContacts.concat(contacts);
			  			this.props.dispatch(loadContacts(contacts));
			  		}
			  	});
				    // yay!
				}else{
					this.props.dispatch(loadContacts(defaultContacts));
				}
			});

		}else{
			this.props.dispatch(loadContacts(defaultContacts.concat(this.props.contact.list)));
		}
	}


	save(item){
		if(this.items[item.props.rowData.name[0]] == undefined || this.items[item.props.rowData.name[0]].layout.y > item.layout.y){
			this.items[item.props.rowData.name[0]] = item;
		}
	}

	saveLetter(item){
		this.letters[item.props.children] = item;

	}

	onScroll(event){

		this.scrollPos = event.nativeEvent.contentOffset.x;

	}

	onLetterPress(index){

		let letter = letters[index];

		let pos =  this.letters[letter].layout.x - this.spacerWidth ;
		this.headerScroll.scrollTo({
			y: 0,
			x: pos,
			animated : true
		});


		this.scrollToLetter(index);
	}


	scrollToLetter(index){

		if(letters[index] != undefined){
			let letter = letters[index];

			if(this.items[letter] != undefined){
				this.listViewScroll.scrollTo({
					y: this.items[letter].layout.y,
					x: 0,
					animated : true
				});
			}else{
				this.scrollToLetter(index-1);
			}

		}
	}


	openContact(contact) {
		Actions.contactdetails(contact)
	}


	render() {
		return (
			<View style={style.container}>
			<Title style={{color: AppGuideline.colors.deepblue, height: 80}} >CONTACTS</Title>

			<View style={{ height: 80, paddingTop:20, backgroundColor: AppGuideline.colors.lightviolet }}>
			<View style={{ position: 'absolute',  backgroundColor: '#998BB8', left: width / 2 - 35/2, top: 22.5, width:35, height: 35 , borderRadius: 20}}></View>
			<ScrollView horizontal={true}
			scrollEventThrottle={200}

			onScroll={this.onScroll.bind(this)}
			ref='header'
			>
			<View style={{ width: width / 2 - 35/2, backgroundColor: 'transparent'}} />
			{letters.map((letter, index)=> {
				return ( <LetterItem key={index} onPress={()=>{ this.onLetterPress(index) }} save={this.saveLetter.bind(this)}>{letter}</LetterItem>)
			})}
			<View style={{ width : width / 2 - 35/2, backgroundColor: 'transparent'}} />
			</ScrollView>

			</View>
			<View  style={{flex:1}}>
			<ScrollView
			horizontal={false}
			scrollEventThrottle={200}
			ref='listView'

			>
			{this.props.contact.list.length > 0 && this.props.contact.list.map((contact, index) =>{

				let name = [];

				if(contact.givenName != undefined){
					name.push(contact.givenName);
				}

				if(contact.familyName != undefined){
					name.push(contact.familyName);
				}

				contact.name = name.join(' ');

				return (
					<ContactItem
					onPress={this.openContact.bind(this)}
					rowData={contact}
					key={index}
					save={this.save.bind(this)}
					rowData={contact}
					/>
					);

			})}

			{this.props.contact.list.length == 0 && this.props.loading == true && <Text>Chargement...</Text>}

			{this.props.contact.list.length == 0 && this.props.loading == false && <Text>Aucun Contact</Text>}
			</ScrollView>
			</View>



			</View>
			);
	}

}



const style = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
	}
});


function mapStateToProps(state) {
	return {
		contact: state.contact
	};
}

export default connect(mapStateToProps)(ContactView);
