# Interest Search App

This is a simple mobile app built with **React Native** that allows users to search for interests dynamically. It provides an efficient autocomplete functionality, loading data from an API, displaying results in a clean and visually appealing list.

## Features

- **Search Bar**: Allows users to type and search for interests.
- **Custom Skeleton Loader**: Provides a loading animation using a shimmer effect while data is being fetched.
- **Infinite Scroll**: Automatically loads more results when the user scrolls down.
- **Dynamic List**: Results are displayed with unique background colors for each item.
- **Avatars and Placeholders**: Displays avatars if available, otherwise, a placeholder is shown.

## Requirements

- **React Native**: The core framework for building the app.
- **Node.js**: Runtime environment.
- **API**: A service that returns interest data based on the search query.

## Installation

To get started, clone the repository and install dependencies.

1. Clone the repo:

   ```bash
   git clone https://github.com/your-repository/interest-search-app.git
   cd interest-search-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the app:

   ```bash
   npm start
   ```

   The app will open in your default simulator or device.

## Usage

1. **Search for Interests**: Type keywords into the search bar to look for interests.
2. **Skeleton Loader**: While waiting for the search results, a shimmering effect is shown.
3. **Scroll to Load More**: Scroll down to load more results dynamically.
4. **Dynamic Avatars**: Each interest will show an avatar (if available) or a letter placeholder.

## Code Explanation

- **Skeleton Loader**: A custom shimmer loader is implemented using `Animated.View` to provide a smooth loading effect when the data is being fetched from the API.
- **Fetching Data**: The app uses a debounced search query to fetch interests via the `fetchInterests` function. It handles caching and pagination efficiently.

- **Styling**: The styles are defined using `StyleSheet.create` from React Native, including modern UI elements like dynamic background colors for list items.

## Folder Structure

```
/src
  /components
    SearchInterests.js         # Main component for search functionality
  /services
    api.js                     # API service for fetching interest data
  /styles
    styles.js                  # App styles
```

## Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
