import { StyleSheet } from "react-native";
// import { BaseColor } from "@config";
import { BaseColor } from "../../config/theme";


export default StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 0,
    },
    specifications: {
        marginVertical: 0,   //10
        flexDirection: "row",
        alignItems: "center",
    },
    wrapContent: {
        flexWrap: "wrap",
        flexDirection: "row",
        borderColor: BaseColor.dividerColor,
        marginBottom: 20,
    },
    backgroundStyle: {
        // marginTop: 10,
        // backgroundColor: '#93D9FF',
        height: 30, //50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        // marginBottom: 10,
        justifyContent: 'center',
        // fontSize:7 

    },
    inputStyle: {
        borderColor: '#087CBA',
        borderWidth: 2,
        flex: 1,    
        fontSize: 15,  //default is 14
        backgroundColor: '#D3E5DD',
        width: 55,
        alignSelf: 'center',    //center the element
        justifyContent: 'center' ,

    },
    descriptionStyle: {
        // marginTop: 10,
        // backgroundColor: '#93D9FF',
        // height: 250,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'center',
    },
    descriptionInputStyle: {
        borderColor: '#087CBA',
        borderWidth: 2,
        flex: 1,    
        fontSize: 15,  //default is 14
        backgroundColor: '#D3E5DD',
        width: 55,
        // alignSelf: 'center',    //center the element
        // justifyContent: 'center' ,
        
        // marginTop: 10,
        // backgroundColor: '#93D9FF',
        // height: 250,
        borderRadius: 5,
        // marginHorizontal: 15,
        flexDirection: 'row',
        // marginBottom: 10,
        justifyContent: 'center',
        textAlignVertical: "top",
        

    },
});
