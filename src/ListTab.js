import React, { Component } from 'react'
import { Text, View, FlatList, AppRegistry, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tile = props => (
  <View style={styles.footer}>
    <Icon name={props.icon} size={14} style={styles.pill} />
    <Text style={styles.pad}>{props.value}</Text>
  </View>
);

export default class ListTab extends Component {
  _renderTiles = ({ item: repo, index }) => {
    const extraStyle = index === this.props.repos.length - 1 ? {marginBottom: 20} : null;
    const shape = `alpha-${repo.language.toLowerCase().slice(0, 1)}-box`;
    return (
      <View style={[styles.tile, extraStyle]}>
        <Text style={styles.header}>{repo.name}</Text>
        <Text style={styles.description}>{repo.description}</Text>
        <View style={styles.footer}>
          <Tile icon={shape} value={repo.language} />
          <Tile icon="source-fork" value={repo.forks} />
          <Tile icon="star-circle" value={repo.stargazers} />
          <Tile icon="clock-outline" value={repo.pushedAt} />
        </View>
      </View>
    )
  }

  render() {
    return (
      <FlatList
        keyboardDismissMode="interactive"
        renderItem={this._renderTiles}
        data={this.props.repos}
        keyExtractor={item => item.id.toString()}
        style={{paddingBottom: 10,}}
      />
    )
  }
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: '#fff',
    margin: 20,
    marginBottom: 0,
    padding: 10,
    borderRadius: 5
  },
  header: {
    fontWeight: '900',
    color: '#bc8a00',
    fontSize: 16
  },
  description: {
    color: 'grey',
    marginVertical: 10,
    lineHeight: 24
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pill: {
    marginRight: 5,
    color: '#bc8a00'
  },
  pad: {
    fontSize: 10
  }
})

AppRegistry.registerComponent('ListTab', () => ListTab);