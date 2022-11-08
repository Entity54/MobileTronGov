import React from 'react';
import {Text, StyleSheet, View} from 'react-native';


const ComponentsScreen = () => {
    const greeting = <Text style={styles.subHeaderStyle}>Hello to you</Text>;

    return (
        <View>
            <Text style={styles.textStyle}>This is the Components Screen</Text>
            {greeting}
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        color: "green"
    },
    subHeaderStyle: {
        fontSize: 20,
        color: "blue"
    }
})

export default ComponentsScreen;