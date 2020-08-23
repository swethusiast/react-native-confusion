import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet, Switch, Button, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';

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
    confirmReservation(date) {
        this.presentLocalNotification(date);
        this.addReservationToCalendar(date);
        this.resetForm();
    }
    handleReservation = () => {
        const { date, guests, smoking } = this.state;
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: ' +
                guests +
                ' \nSmoking?: ' +
                smoking +
                ' \nDate and Time: ' +
                JSON.stringify(date) +
                '',
            [
                {
                    text: 'Cancel',
                    style: ' cancel',
                    onPress: () => this.resetForm(),
                },
                {
                    text: 'OK',
                    onPress: () => this.confirmReservation(date),
                },
            ],
            { cancelable: false },
        );
    };

    resetForm = () => {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false,
        });
    };
    async obtainCalendarPermission() {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync();
            const defaultCalendars = calendars.filter((each) => each.source.name === 'Default');
            return defaultCalendars[0].source;
        }
    }

    async addReservationToCalendar(date) {
        await this.obtainCalendarPermission();
        const startDate = new Date(Date.parse(date));
        const endDate = new Date(Date.parse(date) + 2 * 60 * 60 * 1000); // 2 hours
        Calendar.createEventAsync(Calendar.DEFAULT, {
            title: 'Con Fusion Table Reservation',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
            startDate,
            endDate,
            timeZone: 'Asia/Hong_Kong',
        });
        Alert.alert('Reservation has been added to your calendar');
    }
    obtainNotificationPermission = async () => {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    };

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true,
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8',
            },
        });
    }
    render() {
        const date = new Date();
        return (
            <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker
                        style={styles.formItem}
                        selectedValue={this.state.guests}
                        onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}>
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
                    <View style={styles.formRow}>
                        <Button onPress={this.showDatepicker} title="Date" />
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
                    onRequestClose={() => this.toggleModal()}>
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
            </Animatable.View>
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
