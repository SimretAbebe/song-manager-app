import songsReducer, { fetchSongs, fetchSongsRequested, fetchSongsSuccess, fetchSongsFailed } from './songsSlice';

describe('songsSlice reducer', () => {
  const initialState = {
    songs: [],
    isLoading: false,
    error: null,
  };

 
  it('should return the initial state', () => {
    expect(songsReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle fetchSongs.pending (or fetchSongsRequested) correctly', () => {
    const expectedState = {
      ...initialState,
      isLoading: true,
      error: null, 
    };
    expect(songsReducer(initialState, fetchSongs.pending())).toEqual(expectedState);
  });
  it('should handle fetchSongs.fulfilled (or fetchSongsSuccess) correctly', () => {
    const mockSongsData = [
      { id: '1', title: 'Abeba' },
      { id: '2', title: 'Gonder' }
    ];
    const stateAfterPending = { ...initialState, isLoading: true };

    const expectedState = {
      ...stateAfterPending,
      isLoading: false,
      songs: mockSongsData,
    };
    expect(songsReducer(stateAfterPending, fetchSongs.fulfilled(mockSongsData, ''))).toEqual(expectedState);
  });
  it('should handle fetchSongs.rejected (or fetchSongsFailed) correctly', () => {
    const mockError = 'Failed to fetch songs';
    const stateAfterPending = { ...initialState, isLoading: true };

    const expectedState = {
      ...stateAfterPending,
      isLoading: false,
      error: mockError,
      songs: [],
    };
    expect(songsReducer(stateAfterPending, fetchSongs.rejected(null, '', undefined, mockError))).toEqual(expectedState);
  });
});
