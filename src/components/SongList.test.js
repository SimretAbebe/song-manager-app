import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import songsReducer from '../store/slices/songsSlice';
import SongList from './SongList'; 

describe('SongList component', () => {
  // Helper function to create a mock Redux store for each test
  const createMockStore = (initialState) => {
    return configureStore({
      reducer: {
        songs: songsReducer,
      },
      preloadedState: { 
        songs: initialState,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });
  };

 
  it('should render loading state when isLoading is true', () => {
    const store = createMockStore({ 
      songs: [],
      isLoading: true,
      error: null,
    });

    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

   
    expect(screen.getByText('Loading Ethiopian Music...')).toBeInTheDocument();
    expect(screen.getByText('Please wait while we fetch the songs.')).toBeInTheDocument();
  });

  
  it('should render error state when there is an error', () => {
    const mockError = 'Failed to fetch songs';
    const store = createMockStore({ 
      songs: [],
      isLoading: false,
      error: mockError,
    });

    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

    
    expect(screen.getByText('Error Loading Music')).toBeInTheDocument();
    expect(screen.getByText(`Error: ${mockError}. Please try again later.`)).toBeInTheDocument();
  });

  
  it('should render empty state when no songs are available', () => {
    const store = createMockStore({
      songs: [],
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

   
    expect(screen.getByText('No songs available. Add some Ethiopian music!')).toBeInTheDocument();
  });

  
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

    const store = createMockStore({ 
      songs: mockSongsData,
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <SongList />
      </Provider>
    );

   
    expect(screen.getByText('Ethiopian Music Collection')).toBeInTheDocument();


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
