import { Dimensions, StyleSheet } from 'react-native';
import { colors } from './color';

const { width, height } = Dimensions.get('window');

export const authStyles = StyleSheet.create({
safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingHorizontal: 20,
    paddingTop: 40,

  },
  container: {
    flex: 1,
    marginTop: 0,
    paddingTop: 0,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: colors.neutral[600],
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: '80%',
    maxWidth: 300,
    height: 160,
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: -4,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 8,
    borderRadius: 4,
    width: 18,
    height: 18,
    borderColor: colors.neutral[400],
  },

  buttonContainer: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  skipText: {
    color: colors.neutral[500],
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.neutral[300],
  },
  dividerText: {
    marginHorizontal: 16,
    color: colors.neutral[400],
  },

  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#EAC4D5', 
    borderRadius: 12,
    backgroundColor: colors.navbar.background,
    marginBottom: 10,
  },
  googleButtonText: {
    color: colors.neutral[600],
    marginLeft: 12,
  },

  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: 'auto',
  },

  onboardContainer: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  onboardSlide: {
    width,
    alignItems: 'center',
    paddingTop: height * 0.15,
  },
  onboardImage: {
    width: width * 0.8,
    height: height * 0.35,
  },
  onboardTextContainer: {
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 40,
  },
  onboardDescription: {
    textAlign: 'center',
    color: colors.neutral[600],
    paddingHorizontal: 10,
    lineHeight: 22,
  },
  onboardBottomContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    paddingHorizontal: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.navbar.pink,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: colors.neutral[300],
  },
});