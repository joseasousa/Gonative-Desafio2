import { StyleSheet } from 'react-native';
import { colors } from 'styles';

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 12,
    height: 30,
    paddingHorizontal: 10,
    paddingVertical: 0,
    backgroundColor: colors.background,
    borderRadius: 5,
    marginRight: 10,
  },
  button: {
    color: colors.background,
    fontWeight: 'bold',
  },
});

export default styles;
