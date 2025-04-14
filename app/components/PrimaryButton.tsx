import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  text: string;
  onPress: () => void;
}

const PrimaryButton: React.FC<Props> = ({ text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: '#6A4C93',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
