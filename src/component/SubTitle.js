'use strict';

import React, { Component} from 'react';
import { View, Text, StyleSheet, Animated} from 'react-native';
import stylesVars from '../styles/vars';

const style = StyleSheet.create({
	subtitle : {
	    fontFamily : 'Montserrat-UltraLight',
	    fontSize: 36,
		lineHeight : 36,
		marginTop: 10,
	    marginLeft: 50,
	    marginTop: 50,
	    color: stylesVars.colors.alternative
	}
});

export default class SubTitle extends Component {
	render(){
		return (
			<Animated.Text {...this.props} style={[style.subtitle, this.props.style]}>{this.props.children}</Animated.Text>
		);
	}
}
