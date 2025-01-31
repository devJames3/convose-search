import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-end', // Ensures the content is at the bottom
  },
  searchContainer: {
    marginBottom: 20, // Adds space from the bottom
    marginHorizontal: 16, // Adds left/right padding to make sure it doesn't go edge-to-edge
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    width: '100%', // Make the search bar the full width of its container
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    backgroundColor: '#FFF',
   
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  placeholderAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  listText: {
    fontSize: 16,
    color: '#333',
  },
  secondaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Ensures that secondary terms wrap to the next line if necessary
  },
  secondaryText: {
    fontSize: 12,
    color: '#888',
    backgroundColor: '#DDD',  // Add background to make it distinct
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    marginRight: 6,
  },
  loader: {
    marginBottom: 250,
  },
});
