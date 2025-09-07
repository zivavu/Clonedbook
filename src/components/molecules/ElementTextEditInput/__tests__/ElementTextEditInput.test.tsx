import ElementTextEditInput from '@/components/molecules/ElementTextEditInput';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

jest.mock('@/redux/services/loggedUserAPI', () => ({
  useGetLoggedUserQuery: () => ({ data: { id: 'logged', name: 'Logged' } }),
}));

jest.mock('@/services/elements/editUsersElement', () => ({
  editUserElement: jest.fn(() => Promise.resolve()),
}));

function setup(overrides?: Partial<React.ComponentProps<typeof ElementTextEditInput>>) {
  const handleCloseEditMode = overrides?.handleCloseEditMode ?? jest.fn();
  const refetchElement = (overrides?.refetchElement as any) ?? jest.fn();
  const element = { id: 'p1', text: 'hello', elementType: 'post' } as any;

  render(
    <ElementTextEditInput
      element={element}
      elementType={'post'}
      handleCloseEditMode={handleCloseEditMode}
      refetchElement={refetchElement}
      {...overrides}
    />,
  );

  return { handleCloseEditMode, refetchElement };
}

describe('ElementTextEditInput', () => {
  test('shows submit button when there is text and calls handlers on click', async () => {
    const { handleCloseEditMode, refetchElement } = setup({
      refetchElement: jest.fn(async () => {}),
    });
    const input = screen.getByTestId('edit-element-text-content');
    await userEvent.type(input, 'updated');

    const submit = await screen.findByTestId('edit-element-submit');
    fireEvent.click(submit);

    const { editUserElement } = require('@/services/elements/editUsersElement');
    expect(editUserElement).toHaveBeenCalled();
    await waitFor(() => expect(refetchElement).toHaveBeenCalled());
    await waitFor(() => expect(handleCloseEditMode).toHaveBeenCalled());
  });

  test('Escape key cancels edit', async () => {
    const { handleCloseEditMode } = setup();
    const input = screen.getByTestId('edit-element-text-content');
    await userEvent.type(input, '{Escape}');
    expect(handleCloseEditMode).toHaveBeenCalled();
  });
});
