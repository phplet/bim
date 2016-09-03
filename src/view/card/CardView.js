'use strict';
import React, { Component } from 'react';
import { View, Image, TouchableOpacity, TouchableWithoutFeedback , PanResponder, Text, StyleSheet, Animated, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import asset from '../../asset';
import Title from '../../component/Title';
import { init } from './CardAction'
import baseStyles from '../../styles/vars.js';

class CardView extends Component {

	constructor(props){
		super(props);
		this.state = {
			cards : [
			{
				src: asset.carte1,
				style : {
					position: 'absolute',
					top: new Animated.Value(0),
					left: new Animated.Value(14),
					transform : [{
						scale : new Animated.Value(0.7)
					}]
				}
			},
			{
				src: asset.carte2,
				style : {

					position: 'absolute',
					top: new Animated.Value(30),
					left: new Animated.Value(12),
					transform : [{
						scale : new Animated.Value(0.8)
					}]
				}
			},
			{
				src: asset.carte3,
				style : {
					position: 'absolute',
					top: new Animated.Value(60),
					left: new Animated.Value(10),
					transform : [{
						scale : new Animated.Value(0.9)
					}]
				}
			},
			{
				src: asset.carte4,
				style : {
					position: 'absolute',
					top: new Animated.Value(90),
					left: new Animated.Value(8),
					transform : [{
						scale : new Animated.Value(1)
					}]
				}
			}]
		};

		this.newCards = [];
		this.onMove = false;

		this.elements = this.state.cards.map((card, index)=>{

			return (<Animated.View key={index} style={card.style} >
				<TouchableWithoutFeedback onPress={Actions.cardDetails}>
				<Image source={card.src} style= {CardStyle.cardImage} />
				</TouchableWithoutFeedback>
				</Animated.View>);

		})

	}


	moveCardTo(card, index){

		let friction = 8;
		let tension = 100;
		let duration = 300;
		let pos = this.state.cards.length - 1 - index ;


		let topTo = 90 - pos * 30;

		let top = Animated.timing(card.top,{
			toValue: topTo,
			duration,
			friction,
			tension
		});


		let leftTo = 7 + ( pos * 2);

		let  left = Animated.timing(
			card.left,
			{
				toValue: leftTo,
				duration,
				friction,
				tension
			});

		let scaleTo = 1 - ( pos * 0.1 );

		let scale = Animated.timing(
			card.transform[0].scale,
			{
				toValue: scaleTo,
				duration,
				friction,
				tension
			});


		return [top,left,scale];

	}


	removeCard(card){

		let friction = 8;
		let tension = 100;
		let duration = 300;

		let left = Animated.timing(
			card.left,
			{
				toValue: 500,
				duration,
				friction,
				tension
			});


		return [left];
	}


	addCard(card){

		let friction = 8;
		let tension = 100;
		let duration = 300;

		let scale = Animated.timing(card.transform[0].scale,{ toValue: 0.7, duration: 0 });
		let top = Animated.timing(card.top,{ toValue: 0 , duration: 0 });

		let left = Animated.timing(
			card.left,
			{
				toValue: 14,
				duration,
				friction,
				tension
			});


		return [Animated.parallel([scale,top]), left ];
	}

	move(){

		if(this.onMove == false ){

			this.onMove = true;

			let cardToMove = this.state.cards.pop();

			let parallels = [];

			let newCards = this.state.cards.slice(0);

			newCards.map((card, index)=>{
				let animation = this.moveCardTo(card.style, index);
				parallels = parallels.concat(animation);
			});

			parallels = parallels.concat(this.removeCard(cardToMove.style));

			Animated.parallel(parallels).start(()=>{ this.onCardRemoved(newCards,cardToMove); });

		}

	}

	componentWillMount() {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderMove: this.move.bind(this)
		});
	}


	handlePanResponderRelease(evt, gestureState) {
		this.move();
	}

	onCardRemoved(newCards, cardToMove){

		newCards = [cardToMove].concat(newCards);

		let card = this.elements.pop();

		this.elements = [card].concat(this.elements.slice(0));

		let sequence = this.addCard(cardToMove.style);

		Animated.sequence(sequence).start(()=>{ this.onMove = false; });

		this.setState({
			cards : newCards
		});
	}

	render(){

		return (
			<View style={CardStyle.container}>
			<Title title='Cartes' />
			<View style={CardStyle.top}>
				<ScrollView scrollEnabled={false} contentContainerStyle={{top : 120 , alignItems: 'center'}} {...this._panResponder.panHandlers}>
					<View  style={{ width: 300, height: 300 }}  >{this.elements}</View>
				</ScrollView>
			</View>
			<TouchableOpacity style={CardStyle.bottomRighticon} onPress={() => { Actions.addCard(); }}>
			<Image source={asset.add}  style={{
				width: 70,
				height: 70
			}} />
			</TouchableOpacity>
			</View>
			);
	}
}


const CardStyle = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection : 'column',
		alignItems: 'stretch',
		backgroundColor: baseStyles.colors.deepBlue
	},
	bottomRighticon: {
		position: 'absolute',
		bottom: 20,
		right: 0,
		marginRight: -10
	},
	top: {
		flex: 1
	},
	cardImage: {
		width: 271,
		height: 171
	}
});

export default connect()(CardView);
