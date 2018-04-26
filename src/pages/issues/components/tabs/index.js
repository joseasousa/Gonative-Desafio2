import React from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const options = [
  { id: 'all', label: 'Todas' },
  { id: 'open', label: 'Abertas' },
  { id: 'closed', label: 'Fechadas' },
];

const save = async (status, loadIssues, saveSelectedItem) => {
  await AsyncStorage.setItem('@git:status', status)
    .then(() => saveSelectedItem(status));
  loadIssues();
};

const Tabs = ({ status, loadIssues, saveSelectedItem }) => (
  <View style={styles.container}>
    {options.map(item => (
      <TouchableOpacity key={item.id} onPress={() => save(item.id, loadIssues, saveSelectedItem)}>
        <Text style={[styles.item, status === item.id ? styles.active : null]}>{item.label}</Text>
      </TouchableOpacity>
      ))
    }
  </View>
);

Tabs.propTypes = {
  status: PropTypes.string.isRequired,
  loadIssues: PropTypes.func.isRequired,
  saveSelectedItem: PropTypes.func.isRequired,
};

export default Tabs;
