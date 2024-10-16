import Text from "@components/Text";
import { useTheme } from "@config";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
const SIZES = [
  {
    id: "0",
    name: "0",
  },
  {
    id: "1",
    name: "1",
  },
  {
    id: "2",
    name: "2",
  },
  {
    id: "3",
    name: "3",
  },
];
const Size = ({ sizeChoosed = { id: "", name: "" }, sizes, onPress }) => {
  const { colors } = useTheme();
  // const [sizeChoosed, setSizeChoosed] = useState(sizes[0]);
  const handlePress = (size) => {
    // setSizeChoosed(size);
    onPress(size);
  };
  return (
    <View style={{ flexDirection: "row" }}>
      {sizes.map((size, index) => (
        <TouchableOpacity
          key={index}
          style={{
            borderWidth: 1,
            borderColor:
              sizeChoosed.id == size.id ? colors.primary : "transparent",
            marginRight: 16,
            backgroundColor:
              sizeChoosed.id == size.id ? colors.card : colors.border,
            justifyContent: "center",
            alignItems: "center",
            width: 32,
            height: 32,
          }}
          onPress={() => handlePress(size)}
        >
          <Text body2>{size.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

Size.propTypes = {
  sizes: PropTypes.array,
  onPress: PropTypes.func,
};

Size.defaultProps = {
  sizes: SIZES,
  onPress: () => {},
};

export default Size;
