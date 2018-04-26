import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from 'styles';
import styles from './styles';

const Repository = ({ repository, navigate }) => (
  <TouchableOpacity onPress={() => navigate('Issues', { repository: repository.full_name })}>
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: repository.url }}
      />
      <View style={styles.infoContent} >
        <Text style={styles.infoTitle}>{repository.name}</Text>
        <Text style={styles.infoSubtitle}>{repository.full_name}</Text>
      </View>
      <Icon name="angle-right" size={20} color={colors.background} />
    </View>
  </TouchableOpacity>
);

Repository.propTypes = {
  repository: PropTypes.shape({
    name: PropTypes.string,
    full_name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  navigate: PropTypes.func.isRequired,
};

export default Repository;

