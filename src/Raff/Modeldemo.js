import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Lorem from '../componets/Lorem';
import SerchFilter from './SerchFilter';

export const Modeldemo = () => {
  const modalizeRef = useRef(null);

  const onOpen = () => {
    if (modalizeRef.current) {
      modalizeRef.current.open();
    }
  };





  return (
    <>
      <SerchFilter />
      <TouchableOpacity onPress={onOpen} style={styles.button}>
        <Text style={styles.buttonText}>Open the modal</Text>
      </TouchableOpacity>

      <Modalize ref={modalizeRef} adjustToContentHeight>
        <View style={styles.modalContent}>
          <Lorem />
        </View>
      </Modalize>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContent: {
    padding: 20,
  },
  test: {
    fontSize: 16,
  },
});

export default Modeldemo;
