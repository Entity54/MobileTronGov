

Install boiler plate on PC
Install on Mobile phone Expo Mobile App
$npm start on PC and see the results on PC and Mobile Phone


SECTIONS 1, 2 ,3

src>screens
HomeScreen.js is the 1st screen

The  Text StyleSheet View Image Button are react-native primitives
Text is for showing text 
View is for grouping and positioning multiple elements

In StyleSheeet you can have as many objects as you want
e.g.
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


Lists
In classic React we use mapping to create a list of html elements using mapping function of JS. In RN there is a better way using the React Native primitive FlatList

FlatList expects 2 props data to pass the array of data and renderItem to pass arrow function to show jsx element.
Remember that we need keys

For keys there are 2 solutions
Add to each object element in the data array a key: “someString” or better
add keyExtractor={friend => friend.name}


For styling  marginVertical: 50 adds 50 pixels and our list takes the whole screen

More props on FlatList
horizontal     or horizontal={true}    is the same allow to scroll horizontally
showsHorizontalScrollIndicator={false}    hides the horizontal scroll bar

SECTIONS 4
Buttons
There are 2 primitives 
Button   A plain button
TouchableOpacity  A button with the ability for a lot of customisation. We will almost always prefer this

We will create 2 buttons on Home screen that will take us to the other screens

Button
For Button we DO NOT do <Button>Submit</Button
Instead we DO  <Button title=“Submit” />
title is a prop and usually we almost always do title={something}
But when you want to assign a string value then you can use title=“some value”

The prop onPress={ () => myFunction }  will react when I press the button
Any console.log will show on our terminal and not on the Browser

There is only styling we can do with Button
Soon we will see the flexibility of TouchableOpacity Button

TouchableOpacity
TouchableOpacity is another Primitive we import from react-native
Contrary to Button this is not self closing and anything in between will have the same behaviour 
You can have multiple elements inside like Text and Image
By default there is not styling and anything inside the 2 tags if pressed will fade momentarily

Navigation
The StackNavigator component on the App.js has some properties props that passes automatically to its  children components 
If we go to HomScreen then props is the variable that is imported and this has a lot of objects

const HomeScreen = (props) => {
  // console.log(props);
  // console.log(props.navigate);

We are interested in the function that by passing a string equal to the name of th epage it allows navigations
        <Button 
          title="Go to Component Demo" 
          // onPress={() => console.log("Button pressed") }
          onPress={() => props.navigation.navigate("Components")}
        />   


Now clicking the button sends us to the next page

Use destructuring for props

SECTIONS 5
For Images use the primitive Image
Place any images or static elements into the assets folder
Example
            <Image source={require('../../assets/beach.jpg')} />

Note: If I did not input the style for image it does not show up
<Image style={styles.img} source={imageSource} />

const styles = StyleSheet.create({
    img:{
        height: 200,
        width: 200
    }

});






SECTIONS 6
Note that View can be self closing and can be used basically as a Div
            <View style={{ height:100, width:100, backgroundColor: 'rgb(0, 255, 0)' }} />
Will create a green block
ColorScreen is a very good example of how to create a stack of blocks in a List using the View component

Reducer   Lectures 57,58,59
Reducer is a function that takes 2 arguments
An object that all our states in it but we never change this directly
Argument 2 is an object that describes the update we want to make to 1st object
We must always return a value to used as Argument 1

We either use useState or Reducer to manage a specific state, not both for the same state

The SquareScreen shows how we can use Reducer
Instead of having 3 separate states for red, green, blue the reducer has an object for all 3


Reminder that if you have 
someObj = {red: 0, green:1, blue: 2}
then {…someObj, blue:1}
will override blue so we have {red:0, green:1, blue:1}


useReducer is important to know as an alternative o have multiple states that are related like in this case with the colours


TextInput is another primitive like View and Text that allows us to input text
When using the TextInput by default it has no styling so although it works it does not show border
Also by default and depending on the OS there is capitalisation of first word and autocorrect
We will fix all these
autoCapitalize has many options
            <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} />

We have seen this many times
const TextScreen = () => {
    const [name, setName] = useState("");

    return (
        <View>
            <Text>Enter Name:</Text>
            <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} value={name} onChangeText={(newValue) => setName(newValue)} />
            <Text>My name is {name}</Text>
        </View>
    )
}

Note: In Ternary operations you can use null instead of “” 









SECTION 7
This section focus entirely on styling and how to manage styling of elements and their parents
It is crystal clear and should be used as reference from now on
Note: View can be either with 2 tags or self closing tag. Behaves like Div a lot and need to put height, width to show otherwise be default has 0 dimensions

BoxObjectModel
Flex and Alignments, Direction, Jusitfy Content, Values
Children AlignSelf
Position  Top,Bottom, Left,Right
Absolute Fill Objects


SECTION 8  RESTAURANT APP
To create a new React Native Project
$npx expo-cli init food --npm




















