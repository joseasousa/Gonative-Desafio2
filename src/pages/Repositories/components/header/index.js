import React, { Component } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import styles from './styles';

export default class Header extends Component {
  static propTypes = {
    saveRepository: PropTypes.func.isRequired,
  }

  state = {
    repository: '',
  }

  render() {
    const { saveRepository } = this.props;
    return (
      <View style={styles.container} >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          underlineColorAndroid="rgba(0, 0, 0, 0)"
          value={this.state.repository}
          placeholder="Adicionar repositório"
          onChangeText={repository => this.setState({ repository })}
        />
        <TouchableOpacity onPress={() => saveRepository(this.state.repository)}>
          <Icon name="plus" size={16} color="#333333" />
        </TouchableOpacity>
      </View>
    );
  }
}
