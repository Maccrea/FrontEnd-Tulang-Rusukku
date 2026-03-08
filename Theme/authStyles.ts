import { StyleSheet } from 'react-native';
import { colors } from './color'; 

export const authStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 30,
  },

  header: {
    alignItems: 'center',
    marginBottom: 30,
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
    width: 250,
    height: 180,
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
    marginBottom: 30,
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
    marginBottom: 24,
  },
  googleButtonText: {
    color: colors.neutral[600],
    marginLeft: 12,
  },

  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
});