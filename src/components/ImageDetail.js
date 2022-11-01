import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';



const ImageDetail = ({title, imageSource, score}) => {
    return (
        <View>
            <Image style={styles.img} source={imageSource} />
            <Text>{title}</Text>
            <Text>Image Score - {score}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    img:{
        height: 200,
        width: 200
    }

});

export default ImageDetail 
