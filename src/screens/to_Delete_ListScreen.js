import React from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';


const ListScreen = () => {
    const friends = [
        {name: "Elsa", age: 27},
        {name: "Alice", age: 22},
        {name: "Becky", age: 25},
        {name: "Norma Jean", age: 29},
        {name: "Tatiana", age: 37},
        {name: "Pelagia", age: 32},
        {name: "Helen", age: 35},
        {name: "Jenny", age: 34},
        {name: "Emma", age: 39},
        {name: "Yolanda", age: 28},
    ]

    return (
        <FlatList 
            // horizontal
            // showsHorizontalScrollIndicator={false}
            keyExtractor={friendElement => friendElement.name }   //Need to ensure keys are strings different to one another   see the diffference with React in which we could used index as key
            data={friends}
            renderItem={ ( {item, index} ) => {
                return <Text style={styles.textStyle}>#{index} Friend Name {item.name} - Age: {item.age}  </Text>
            }}
        
        />
    )
}

const styles = StyleSheet.create({
    textStyle:{
        marginVertical: 50
    }

})

export default ListScreen;