import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  listItem: {
    flexDirection: 'row',  // Ensure avatar and text align
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    backgroundColor: '#FFF',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  listText: {
    fontSize: 16,
    color: '#333',
  },
  secondaryText: {
    fontSize: 12,
    color: '#888',
  },
  loader: {
    marginTop: 20,
  },
});
