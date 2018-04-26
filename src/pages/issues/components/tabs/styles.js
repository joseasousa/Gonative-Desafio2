import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.darker,
    padding: 10,
    margin: 20,
    marginBottom: 5,
    borderRadius: metrics.radius,
  },
  item: {
    color: colors.inactive,
  },
  active: {
    fontWeight: 'bold',
  },
});

export default styles;
