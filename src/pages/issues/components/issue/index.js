import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { colors } from 'styles';
import styles from './styles';

const openUrl = (repository, number) => {
  const url = `https://github.com/${repository}/issues/${number}`;
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    }
  });
};

const Issue = ({ repository, issue }) => (
  <TouchableOpacity onPress={() => openUrl(repository, issue.number)} >
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: issue.user.avatar_url }}
      />
      <View style={styles.infoContent} >
        <Text style={styles.infoTitle} numberOfLines={1}>{issue.title}</Text>
        <Text style={styles.infoSubtitle}>{issue.user.login}</Text>
      </View>
      <Icon name="angle-right" size={20} color={colors.background} />
    </View>
  </TouchableOpacity>
);

Issue.propTypes = {
  repository: PropTypes.string.isRequired,
  issue: PropTypes.shape({
    number: PropTypes.number,
    title: PropTypes.string,
    user: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default Issue;
