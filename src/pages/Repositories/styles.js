import { StyleSheet } from 'react-native';
import { colors } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  error: {
    backgroundColor: colors.error,
    borderRadius: 2,
    padding: 20,
    margin: 5,
  },
  errorText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  info: {
    backgroundColor: colors.info,
    borderRadius: 2,
    padding: 20,
    margin: 5,
  },
  infoText: {
    color: colors.black,
    fontWeight: 'bold',
  },
});

export default styles;
