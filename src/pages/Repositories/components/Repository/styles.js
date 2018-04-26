import { StyleSheet, Dimensions } from 'react-native';
import { colors } from 'styles';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginTop: 10,
    padding: 20,
    left: 20,
    width: width - 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  infoContent: {
    flex: 1,
    paddingLeft: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  infoSubtitle: {
    fontSize: 12,
    color: colors.info,
  },
});

export default styles;
