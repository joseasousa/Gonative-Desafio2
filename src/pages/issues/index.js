import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  AsyncStorage,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import api from 'services/api';
import Issue from './components/issue';
import Tabs from './components/tabs';
import styles from './styles';

export default class Issues extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.repository}`,
  });

  static propTypes ={
    navigation: PropTypes.PropTypes.shape({
      state: PropTypes.PropTypes.shape({
        params: PropTypes.PropTypes.shape({
          repository: PropTypes.string,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    status: '',
    issues: [],
    loading: false,
    refreshing: false,
  }

  componentWillMount() {
    this.setState({ loading: true });
    this.loadSelectedItem().then(() => {
      this.loadIssues().then(() => {
        this.setState({ loading: false });
      });
    });
  }

  loadSelectedItem = async () => {
    const status = await AsyncStorage.getItem('@git:status') || 'all';
    this.saveSelectedItem(status);
  }

  saveSelectedItem = (status) => {
    this.setState({ status });
  }

  loadIssues = async () => {
    this.setState({ refreshing: true });
    const { status } = this.state;
    const { repository } = this.props.navigation.state.params;

    const response = await api.get(`repos/${repository}/issues?state=${status}`);

    if (!response.ok) return;

    this.setState({ issues: response.data, refreshing: false, status });
  }

  renderIssues = () => (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.loadIssues}
        />
      }
      data={this.state.issues}
      keyExtractor={issue => issue.id}
      renderItem={({ item }) => (
        <Issue issue={item} repository={this.props.navigation.state.params.repository} />
      )}
    />
  )

  renderList = () => (
    this.state.issues.length > 0
      ? this.renderIssues()
      : <Text style={styles.empty}>Sem issues para o filtro informado {this.state.status}</Text>
  );

  render() {
    const { status } = this.state;
    return (
      <View style={styles.container}>
        <Tabs
          status={status}
          loadIssues={this.loadIssues}
          saveSelectedItem={this.saveSelectedItem}
        />
        {
          this.state.loading
            ? <ActivityIndicator size="large" color="#999" styte={styles.loading} />
            : this.renderList()
        }
      </View>
    );
  }
}
