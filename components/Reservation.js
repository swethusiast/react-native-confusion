import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Switch, Button, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker';

export default class Reservation extends Component {
    state = {
        guests: 1,
        smoking: false,
        date: '',
        mode: 'date',
        showModal: false,
        showDate: false,
    };

    showDatepicker = () => {
        this.setState({ mode: 'date', showDate: true });
    };
    showTimepicker = () => {
        this.setState({ mode: 'time', showDate: true });
    };
    toggleModal = () => {
        this.setState((state, props) => ({ showModal: !state.showModal }));
    };
    onChange = (event, selectedDate) => {
        this.setState({ date: selectedDate, showDate: false });
    };
    handleReservation = () => {
        this.toggleModal();
    };

    resetForm = () => {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false,
        });
    };
    render() {
        const date = new Date();
        return (
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}
                    >
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                        <Picker.Item label="6" value="6" />
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch
                        style={styles.formItem}
                        value={this.state.smoking}
                        trackColor="#512DA8"
                        onValueChange={(value) => this.setState({ smoking: value })}
                    />
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Date and Time</Text>
                    <View>
                        <Button onPress={this.showDatepicker} title="Date" />
                    </View>
                    <View>
                        <Button onPress={this.showTimepicker} title="Time" />
                    </View>
                    {this.state.showDate && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={date}
                            mode={this.state.mode}
                            is24Hour={true}
                            display="default"
                            onChange={this.onChange}
                        />
                    )}
                </View>
                <View style={styles.formRow}>
                    <Button
                        onPress={() => this.handleReservation()}
                        title="Reserve"
                        color="#512DA8"
                        accessibilityLabel="Learn more about this purple button"
                    />
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style={styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style={styles.modalText}>Date and Time: {JSON.stringify(this.state.date)}</Text>

                        <Button
                            onPress={() => {
                                this.toggleModal();
                                this.resetForm();
                            }}
                            color="#512DA8"
                            title="Close"
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20,
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1,
    },
    modal: {
        justifyContent: 'center',
        margin: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20,
    },
    modalText: {
        fontSize: 18,
        margin: 10,
    },
});
