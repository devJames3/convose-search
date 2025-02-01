import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F0F4F8', // Softer background color
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#222',
    textAlign: 'center',
    letterSpacing: 1,
  },
  searchContainer: {
    marginBottom: 250,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Shadow effect for Android
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    width: '100%',
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFF',
    borderRadius: 8, // Rounded corners for a softer look
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 8, // Space between items
  },
  avatar: {
    width: 40, // Slightly larger avatar
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  placeholderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#FFF',
    fontSize: 16, // Increased size for better visibility
    fontWeight: 'bold',
  },
  listText: {
    fontSize: 17,
    color: '#333',
    fontWeight: '500',
  },
  secondaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  secondaryText: {
    fontSize: 13,
    color: '#555',
    backgroundColor: '#E8E8E8',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginTop: 3,
  },
  skeletonContainer: {
    padding: 16,
  },
  skeletonItem: {
    height: 50,
    width: '90%',
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'center',
  }
});
