import React, { Component } from 'react';
import { Text, View, TextInput,  TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions, Image } from 'react-native';
import AppGuideline from '../../../app/AppGuideline';
import asset from '../../../app/AppAsset';
import BackButton from '../../common/button/BackButton';
import Title from '../../common/title/Title';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		backgroundColor: AppGuideline.colors.deepBlue,
		flex: 1
	},
	top: {
		flex: 1,
		backgroundColor: AppGuideline.colors.deepBlue,
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		height: 50,
		width: 50,
		marginTop: 100
	},
	cardImage: {
		width: 271,
		height: 171
	}
});

export default class CardSuccessView extends Component {
	renderCardDesign() {
		const { design } = this.props;

		switch (design) {
			case 1:
				return <Image source={asset.carte1} style={styles.cardImage}/>
				break;
			case 2:
				return <Image source={asset.carte2} style={styles.cardImage}/>
				break;
			case 3:
				return <Image source={asset.carte3} style={styles.cardImage}/>
				break;
			case 4:
				return <Image source={asset.carte4} style={styles.cardImage}/>
				break;
			default:
				return <Image source={asset.carte1} style={styles.cardImage}/>

		}
	}
	render() {
		return (
			<View style={styles.container}>
				<Title>{this.props.title || 'Cartes'}</Title>
				<View style={styles.top}>
					<View style={{ alignItems: 'center' }}>
						{this.renderCardDesign()}
					</View>
						<Image source={asset.success} style={styles.image}/>
						<Text style={{
							color: '#fff',
							fontSize: 20,
							marginTop: 15
						}}>
							{this.props.subTitle || 'Carte Crée !' }
						</Text>
				</View>
			</View>
		);
	}
}

CardSuccessView.propTypes = {
	title: React.PropTypes.string,
	subTitle: React.PropTypes.string
};
