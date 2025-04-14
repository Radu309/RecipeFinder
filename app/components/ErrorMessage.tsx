import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return <Text style={styles.error}>{message}</Text>;
};

export default ErrorMessage;

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
  },
});
