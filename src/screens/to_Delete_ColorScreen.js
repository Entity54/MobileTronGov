import React, {useState } from 'react';
import { Text, StyleSheet, View, Button, FlatList } from 'react-native';


const randomRgb = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;

}


const ColorScreen = () => {
    const [colors, setColors] = useState([]);

    return (
        <View>
            <Text>Color Screen</Text>
            <Button titel="Add a Color" onPress={() => {
                     setColors([...colors, randomRgb()])
                }
            } />
            {/* <View style={{ height:100, width:100, backgroundColor: 'rgb(0, 255, 0)' }} /> */}
            <View style={{ height:100, width:100, backgroundColor: randomRgb() }} />

            <FlatList 
                keyExtractor={(item) => item}
                data={colors} 
                renderItem={({item, index}) => {
                    return   <View style={{ height:100, width:100, backgroundColor: item }} />
                }}
             /> 

        </View>
    )
}

const styles = StyleSheet.create({

});

export default ColorScreen
