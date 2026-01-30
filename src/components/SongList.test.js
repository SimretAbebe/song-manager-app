import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import songsReducer from '../store/slices/songsSlice';
import SongList from './SongList'; // The component we are testing

describe('SongList component', () => {
  // Helper function to create a mock Redux store for each test
  const createMockStore = (initialState) => {
    return configureStore({
      reducer: {
        songs: songsReducer,
      },
      preloadedState: { // Use preloadedState to set the initial state of the store
        songs: initialState,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
  };

  // Test case 1: Renders loading state correctly
  it('should render loading state when isLoading is true', () => {
    const store = createMockStore({ // Mock store with loading state
      songs: [],
      isLoading: true,
      error: null,
    });

    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    // Verify that the loading message is displayed
    expect(screen.getByText('Loading Ethiopian Music...')).toBeInTheDocument();
    expect(screen.getByText('Please wait while we fetch the songs.')).toBeInTheDocument();
  });

  // Test case 2: Renders error state correctly
  it('should render error state when there is an error', () => {
    const mockError = 'Failed to fetch songs';
    const store = createMockStore({ // Mock store with error state
      songs: [],
      isLoading: false,
      error: mockError,
    });

    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    // Verify that the error message is displayed
    expect(screen.getByText('Error Loading Music')).toBeInTheDocument();
    expect(screen.getByText(`Error: ${mockError}. Please try again later.`)).toBeInTheDocument();
  });

  // Test case 3: Renders empty state when no songs are available
  it('should render empty state when no songs are available', () => {
    const store = createMockStore({ // Mock store with empty songs array
      songs: [],
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    // Verify that the empty state message is displayed
    expect(screen.getByText('No songs available. Add some Ethiopian music!')).toBeInTheDocument();
  });

  // Test case 4: Renders songs correctly when data is available
  it('should render the list of songs when data is available', async () => {
    const mockSongsData = [
      {
        id: '1',
        title: 'Tizita',
        artist: 'Mulatu Astatke',
        album: 'Ethiopian Modern Instrumentals',
        year: 1966,
        genre: 'Ethio-Jazz',
      },
      {
        id: '2',
        title: 'Yegelle Tezeta',
        artist: 'Mahmoud Ahmed',
        album: 'Éthiopiques 7',
        year: 1975,
        genre: 'Traditional',
      },
    ];

    const store = createMockStore({ // Mock store with song data
      songs: mockSongsData,
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    // Verify that the ListTitle is present
    expect(screen.getByText('Ethiopian Music Collection')).toBeInTheDocument();

    // Verify each song's title and artist are rendered
    // Using waitFor because Redux actions might cause a tiny delay, though here it's sync
    await waitFor(() => {
      expect(screen.getByText('Tizita')).toBeInTheDocument();
      expect(screen.getByText('Mulatu Astatke • Ethiopian Modern Instrumentals • 1966')).toBeInTheDocument();
      expect(screen.getByText('Ethio-Jazz')).toBeInTheDocument();

      expect(screen.getByText('Yegelle Tezeta')).toBeInTheDocument();
      expect(screen.getByText('Mahmoud Ahmed • Éthiopiques 7 • 1975')).toBeInTheDocument();
      expect(screen.getByText('Traditional')).toBeInTheDocument();
    });
  });
});
