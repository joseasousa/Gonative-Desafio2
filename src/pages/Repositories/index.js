import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  AsyncStorage,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import api from 'services/api';
import Header from './components/header';
import Repository from './components/repository';
import styles from './styles';

export default class Repositories extends Component {
  static navigationOptions = {
    header: ({ scene }) => (
      <Header
        saveRepository={repository =>
          scene.route.params.saveRepository(repository)}
      />
    ),
  }

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    loading: false,
    refreshing: false,
    repositories: [],
    error: null,
  }

  componentWillMount() {
      this.setState({ loading: true });
      this.loadRepositories().then(() => {
      this.setState({ loading: false });
    });
  }

  componentDidMount() {
    this.props.navigation.setParams({
      saveRepository: this.saveRepository,
    });
  }

  showError = (error) => {
    this.setState({ error, loading: false });
    setTimeout(() => {
      this.setState({ error: '' });
    }, 4000);
  }

  exists = repository => this.state.repositories.find(repo => repo.id === repository.data.id);

  saveRepository = async (repository) => {
    if (!repository) {
      this.showError('Type a valid repository');
      return;
    }

    this.setState({ error: '', loading: true });
    const response = await this.validateRepository(repository);
    if (!response.ok) {
      this.showError(`Repository ${repository} not found`);
      return;
    }

    if (this.exists(response)) {
      this.showError(`Repository ${repository} already exists`);
      return;
    }

    const newRepository = {
      id: response.data.id,
      name: response.data.name,
      full_name: response.data.full_name,
      url: response.data.owner.avatar_url,
    };

    await AsyncStorage.setItem('@git:repositories', JSON.stringify([newRepository, ...this.state.repositories]));
    await this.loadRepositories();

    this.setState({ loading: false });
  };

  validateRepository = async repository => api.get(`repos/${repository}`);

  loadRepositories = async () => {
    this.setState({ refreshing: true });

    const response = await AsyncStorage.getItem('@git:repositories');
    if (!response) return;

    const repositories = JSON.parse(response);

    this.setState({ repositories, refreshing: false });
  }

  renderRepositories = () => (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.loadRepositories}
        />
      }
      data={this.state.repositories}
      keyExtractor={repository => repository.id}
      renderItem={({ item }) =>
        <Repository repository={item} navigate={this.props.navigation.navigate} />
      }
    />
  )

  renderList = () => (
    this.state.repositories.length > 0
      ? this.renderRepositories()
      :
      <View style={styles.info}>
        <Text style={styles.infoText}>No repositories detected</Text>
      </View>
  )

  renderError = error => (
    <View style={styles.error}>
      <Text style={styles.errorText}>{error}</Text>
    </View>
  )

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.error
            ? this.renderError(this.state.error)
            : null
        }
        {
          this.state.loading
            ? <ActivityIndicator size="large" color="#999" style={styles.loading} />
            : this.renderList()
        }
      </View>
    );
  }
}
