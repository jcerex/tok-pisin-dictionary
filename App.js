/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';
import Dictionary from './dictionary.js';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      language: 'ENG'
    };
  }

  translate() {
    const regex = RegExp(this.state.query);
    if (this.state.language == 'ENG') {
      const matches = Dictionary.filter(value => regex.test(value.english));
      this.setState({ results: matches })
    } else {
      const matches = Dictionary.filter(value => regex.test(value.tok_pisin));
      this.setState({ results: matches })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Dictionary</Text>
        <Button
          onPress={() => this.setState({ language: 'ENG' })}
          title="English"
          color={this.state.language == 'ENG' ? '#841584' : '#F1F1F1'}
          accessibilityLabel="Change to English"
        />
        <Button
          onPress={() => this.setState({ language: 'TOK' })}
          title="Tok Pisin"
          color={this.state.language == 'TOK' ? '#841584' : '#F1F1F1'}
          accessibilityLabel="Change to Tok Pisin"
        />
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate a word!"
          onChangeText={(query) => this.setState({query})}
        />
        <Button
          onPress={() => this.translate()}
          title="Translate"
          color="#841584"
          accessibilityLabel="Translate your word"
        />
        <Text>q: {this.state.query}</Text>
        <Text>l: {this.state.language}</Text>
        <Text>r: {this.state.results.map((r, i) => <Text key={i}>{r.tok_pisin}</Text>)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    fontSize: 30,
  },
});
