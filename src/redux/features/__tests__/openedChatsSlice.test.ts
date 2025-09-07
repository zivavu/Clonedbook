import reducer, {
  closeAllChats,
  closeChat,
  openChat,
  setActiveLink,
  setMaxChats,
} from '@/redux/features/openedChatsSlice';

describe('openedChatsSlice', () => {
  const initialState = { chatIds: [], maxChats: 3, activeLink: null };

  test('openChat adds chat id, respecting maxChats and uniqueness', () => {
    let state = reducer(initialState, openChat('a'));
    state = reducer(state, openChat('b'));
    state = reducer(state, openChat('c'));
    expect(state.chatIds).toEqual(['a', 'b', 'c']);
    // adding duplicate does nothing
    const dup = reducer(state, openChat('b'));
    expect(dup.chatIds).toEqual(['a', 'b', 'c']);
    // pushing beyond max shifts the first
    const overflow = reducer(state, openChat('d'));
    expect(overflow.chatIds).toEqual(['b', 'c', 'd']);
  });

  test('closeChat removes by id', () => {
    const state = reducer({ ...initialState, chatIds: ['a', 'b', 'c'] }, closeChat('b'));
    expect(state.chatIds).toEqual(['a', 'c']);
  });

  test('closeAllChats empties chatIds', () => {
    const state = reducer({ ...initialState, chatIds: ['a'] }, closeAllChats());
    expect(state.chatIds).toEqual([]);
  });

  test('setMaxChats limits existing chatIds', () => {
    const state = reducer({ ...initialState, chatIds: ['a', 'b', 'c'] }, setMaxChats(2));
    expect(state.maxChats).toBe(2);
    expect(state.chatIds).toEqual(['a', 'b']);
  });

  test('setActiveLink updates activeLink', () => {
    const withLink = reducer(initialState, setActiveLink('x'));
    expect(withLink.activeLink).toBe('x');
    const cleared = reducer(withLink, setActiveLink(null));
    expect(cleared.activeLink).toBeNull();
  });
});
