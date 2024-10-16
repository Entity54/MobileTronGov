// import Text from "@components/Text";
// import { useTheme } from "@config";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import styles from "./styles";


const  colors = {
  primary: "#5DADE2",
  primaryDark: "#1281ac",
  primaryLight: "#68c9ef",
  accent: "#FF8A65",
  background: "#010101",
  card: "#121212",
  text: "#e5e5e7",
  border: "#272729",
}



export default function Tag(props) {
  // const { colors } = useTheme();
  const {
    style,
    textStyle,
    icon,
    primary,
    primaryIcon,
    outline,
    outlineIcon,
    outlineSecondary,
    outlineSecondaryIcon,
    small,
    light,
    gray,
    chip,
    status,
    rate,
    rateSmall,
    sale,
    children,
    iconRight,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      {...rest}
      style={StyleSheet.flatten([
        styles.default,
        primary && [styles.primary, { backgroundColor: colors.primary }],
        primaryIcon && styles.primary,
        outline && [
          styles.outline,
          {
            borderColor: colors.primary,
            backgroundColor: colors.card,
          },
        ],
        outlineIcon && styles.outline,
        outlineSecondary && styles.outlineSecondary,
        outlineSecondaryIcon && [
          styles.outlineSecondary,
          { borderColor: colors.accent },
        ],
        small && [styles.small, { backgroundColor: colors.primary }],
        light && [styles.light, { backgroundColor: colors.primaryLight }],
        gray && styles.gray,
        chip && [
          styles.chip,
          {
            backgroundColor: colors.card,
            borderColor: colors.accent,
          },
        ],
        status && [styles.status, { backgroundColor: colors.primary }],
        rate && [styles.rate, { backgroundColor: colors.primaryLight }],
        rateSmall && [
          styles.rateSmall,
          { backgroundColor: colors.primaryLight },
        ],
        sale && [styles.sale, { backgroundColor: colors.primaryLight }],
        iconRight && [styles.iconRight, { borderColor: colors.border }],
        style,
      ])}
      activeOpacity={0.9}
    >
      {icon ? icon : null}
      <Text
        style={StyleSheet.flatten([
          primary && styles.textPrimary,
          primaryIcon && styles.textPrimary,
          outline && [styles.textOutline, { color: colors.primary }],
          outlineIcon && [styles.textOutline, { color: colors.primary }],
          outlineSecondary && [
            styles.textOutlineSecondary,
            { color: colors.accent },
          ],
          outlineSecondaryIcon && [
            styles.textOutlineSecondary,
            { color: colors.accent },
          ],
          small && styles.textSmall,
          light && [styles.textLight, { color: colors.primaryLight }],
          gray && styles.textGray,
          chip && [styles.textChip, { color: colors.accent }],
          status && styles.textStatus,
          rate && styles.textRate,
          rateSmall && styles.textRateSmall,
          sale && styles.textSale,
          iconRight && styles.textIconRight,
          textStyle,
        ])}
        numberOfLines={1}
      >
        {children || "Tag"}
      </Text>
    </TouchableOpacity>
  );
}

Tag.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.node,
  primary: PropTypes.bool,
  primaryIcon: PropTypes.bool,
  outline: PropTypes.bool,
  outlineIcon: PropTypes.bool,
  outlineSecondary: PropTypes.bool,
  outlineSecondaryIcon: PropTypes.bool,
  small: PropTypes.bool,
  light: PropTypes.bool,
  gray: PropTypes.bool,
  chip: PropTypes.bool,
  rate: PropTypes.bool,
  rateSmall: PropTypes.bool,
  status: PropTypes.bool,
  sale: PropTypes.bool,
};

Tag.defaultProps = {
  style: {},
  textStyle: {},
  icon: null,
  primary: false,
  primaryIcon: false,
  outline: false,
  outlineIcon: false,
  outlineSecondary: false,
  outlineSecondaryIcon: false,
  small: false,
  light: false,
  gray: false,
  chip: false,
  status: false,
  rate: false,
  rateSmall: false,
  sale: false,
};
