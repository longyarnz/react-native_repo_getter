import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, ActivityIndicator, AppRegistry
} from 'react-native';
import Repos from '../assets/repos.json';

export default class WelcomeScreen extends Component {
  state = {
    repos: [],
    loading: true
  }

  static navigationOptions = {
    header: null
  };

  schedule = () => {
    this.setState({ repos: Repos, loading: false });
    this.props.navigation.navigate('Repository');
  }

  timestamp = stamp => {
    const date = stamp.toString().slice(0, 10);
    const time = stamp.toString().slice(11, -1);
    return `${date} (${time})`;
  }

  async componentDidMount() {
    if(this.state.repos.length > 0){
      this.setState(
        {repos, loading: false},
        () => this.props.navigation.navigate('Repository', { repos: this.state.repos })
      );
      
      return;
    }

    const response = await fetch('https://api.github.com/users/longyarnz/repos');
    let repos = await response.json();

    repos = repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      owner: repo.owner.login,
      description: repo.description,
      forks: repo.forks_count,
      stargazers: repo.stargazers_count,
      pushedAt: this.timestamp(repo.pushed_at),
      language: repo.language
    }));

    this.setState(
      {repos, loading: false},
      () => this.props.navigation.navigate('Repository', { repos: repos })
    );
  }

  componentWillUnmount = () => {
    clearTimeout(this.schedule);
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textGroup}>
          <Text style={[styles.text, styles.bold]}>LEKAN</Text>
          <Text style={[styles.text, styles.thin]}>MEDIA</Text>
        </View>
        <View style={styles.spinnerView}>
          <ActivityIndicator animating={this.state.loading} size='large' color='black' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textGroup: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  spinnerView: {
    flex: 1
  },
  text: {
    fontSize: 36,
    color: '#000'
  },
  thin: {
    fontWeight: '100'
  },
  bold: {
    fontWeight: '900'
  },
});

AppRegistry.registerComponent('WelcomeScreen', () => WelcomeScreen);