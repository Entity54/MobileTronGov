import { StyleSheet } from "react-native";

export default StyleSheet.create({
    contain: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    container: {
        marginBottom: 0,
        paddingHorizontal: 10
    },
    button: {
        alignItems: "center",
        width: "auto",
        marginLeft: "auto",
        borderRadius: 10,
        backgroundColor: "#ff0000",
        padding: 10,
        margin:10,
        marginBottom:0
      },
      buttonText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },

});
