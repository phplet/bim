import React, { Component } from 'react';
import { Text, View, TextInput,  TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions, Image } from 'react-native';
import baseStyles from '../../../styles/vars';
import asset from '../../../asset';

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: baseStyles.colors.deepBlue,
    flex: 1
  },
  top: {
    flex: 1,
    backgroundColor: baseStyles.colors.deepBlue,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
      height: 100,
      width: 100,
      resizeMode: 'stretch'
  },
});

export default class TransferSuccessView extends Component {

  constructor(props) {
    super(props);
    this.state = {transferTitle: this.props.transferTitle};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={baseStyles.titles.h1}>{this.props.title || 'B!M'}</Text>
        <View style={styles.top}>
          <Image source={asset.success} style={styles.image}/>
          <Text style={{
            color: '#fff',
            fontSize: 20,
            marginTop: 25
          }}>
            {this.props.subTitle || 'Transfert effectué !' }
          </Text>
        </View>
      </View>
    );
  }
}

TransferSuccessView.propTypes = {
  title: React.PropTypes.string
};