import { describe, it, expect, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { userEvent } from 'vitest/browser';
import { CardExample } from '../examples/card.tsx';
import { DefaultExample } from '../examples/default.tsx';
import { Avatar, Pressable, Text } from '@godaddy/antares';

describe('@godaddy/antares', function packageTests() {
  describe('#Pressable', function pressableTests() {
    it('handles click', async function click() {
      const onPress = vi.fn();
      const { getByLabelText } = await render(<DefaultExample onPress={onPress} />);
      const btn = getByLabelText('Account');
      await expect.element(btn).toBeVisible();
      await userEvent.click(btn);
      expect(onPress).toHaveBeenCalledOnce();
    });

    it('handles a custom card', async function card() {
      const onPress = vi.fn();
      const { getByLabelText } = await render(<CardExample onPress={onPress} />);
      await userEvent.click(getByLabelText('View account summary'));
      expect(onPress).toHaveBeenCalledOnce();
    });

    it('handles keyboard activation', async function keyboard() {
      const onPress = vi.fn();
      const { getByLabelText } = await render(<CardExample onPress={onPress} />);
      const card = getByLabelText('View account summary');
      await userEvent.click(card);
      onPress.mockClear();
      await userEvent.keyboard('{Enter}');
      expect(onPress).toHaveBeenCalledOnce();
    });

    it('handles disabled', async function disabled() {
      const onPress = vi.fn();
      const { getByLabelText } = await render(
        <Pressable aria-label="Disabled account" isDisabled onPress={onPress}>
          <Avatar role="button">
            <Text>DS</Text>
          </Avatar>
        </Pressable>
      );
      const btn = getByLabelText('Disabled account');
      await expect.element(btn).toBeVisible();
      await userEvent.click(btn);
      expect(onPress).not.toHaveBeenCalled();
    });
  });
});
