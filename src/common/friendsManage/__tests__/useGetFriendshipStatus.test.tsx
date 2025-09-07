import useGetFriendshipStatus from '@/common/friendsManage/useGetFriendshipStatus';
import { renderHook } from '@testing-library/react';

// Mock the RTK Query hook
jest.mock('@/redux/services/loggedUserAPI', () => ({
  useGetLoggedUserQuery: jest.fn(),
}));

describe('useGetFriendshipStatus', () => {
  const { useGetLoggedUserQuery } = jest.requireMock('@/redux/services/loggedUserAPI');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns null when no logged user', () => {
    useGetLoggedUserQuery.mockReturnValue({ data: undefined });
    const { result } = renderHook(() => useGetFriendshipStatus('user-2'));
    expect(result.current).toBeNull();
  });

  it('returns friend status when present', () => {
    useGetLoggedUserQuery.mockReturnValue({
      data: {
        id: 'user-1',
        friends: {
          'user-2': { status: 'accepted' },
        },
      },
    });
    const { result } = renderHook(() => useGetFriendshipStatus('user-2'));
    expect(result.current).toBe('accepted');
  });

  it('returns null when friend not found', () => {
    useGetLoggedUserQuery.mockReturnValue({
      data: {
        id: 'user-1',
        friends: {},
      },
    });
    const { result } = renderHook(() => useGetFriendshipStatus('unknown'));
    expect(result.current).toBeNull();
  });
});
