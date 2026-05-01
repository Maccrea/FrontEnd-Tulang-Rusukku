import { colors } from './color';

const fontFamily = {
  regular: 'DMSans_400Regular',
  medium: 'DMSans_500Medium',
  semibold: 'DMSans_600SemiBold',
  bold: 'DMSans_700Bold',
};

const size = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
}

export const typography = {
  fontFamily,
  size,
  variants: {
    h1:{
      fontFamily : fontFamily.semibold,
      fontSize: size.xl,
      color: colors.text.primary
    },
    h2:{
      fontFamily : fontFamily.medium,
      fontSize : size.base,
      color: colors.text.primary
    },
    h3:{
      fontFamily:fontFamily.bold,
      fontSize: size['2xl'],
      color: colors.text.primary
    },
    h3Bold:{
      fontFamily : fontFamily.bold,
      fontSize: size['2xl'],
      color: colors.text.primary
    },
    h4:{
      fontFamily: fontFamily.medium, 
      fontSize: size.xl,
      color: colors.text.primary
    },
    subTitle:{
      fontFamily : fontFamily.regular,
      fontSize :  size.xl,
      color: colors.text.primary
    },
    textField:{
      fontFamily : fontFamily.regular,
      fontSize : size.base,
      color: colors.text.primary
    },
    label:{
      fontFamily : fontFamily.semibold,
      fontSize : size.base,
      color: colors.text.primary
    },
    button:{
      fontFamily : fontFamily.medium,
      fontSize : size.base,
      color: colors.text.primary
    },
    body :{
      fontFamily : fontFamily.regular,
      fontSize : size.base,
    },
    caption: {
      fontFamily: fontFamily.regular,
      fontSize: size.sm,
      color: colors.text.primary
    },
    tabs:{
      fontFamily : fontFamily.regular,
      fontSize: size.lg,
      color: colors.text.primary
    },
    filter:{
      fontFamily:fontFamily.medium,
      fontSize: size.base,
      color: colors.text.primary
    }
  }
};