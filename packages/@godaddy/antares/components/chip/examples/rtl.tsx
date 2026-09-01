import { Chip, ChipGroup, ChipList, Icon, Label, Text } from '@godaddy/antares';
import { RTLProvider } from '../../../utils/rtl-locale-provider.tsx';

/**
 * Toggle Chips follow the current layout direction and locale for RTL content.
 * @title RTL Direction
 * @order 10
 */
export function RtlExample() {
  return (
    <RTLProvider>
      <ChipGroup selectionMode="multiple" defaultSelectedKeys={['a']}>
        <Label>مرشحات</Label>
        <ChipList>
          <Chip id="a" textValue="أوستن">
            {({ isSelected }) => (
              <>
                <Icon icon="map-pin" />
                <Text>أوستن</Text>
                {isSelected ? <Icon icon="checkmark" /> : null}
              </>
            )}
          </Chip>
          <Chip id="b" textValue="نشط">
            {({ isSelected }) => (
              <>
                <Icon icon="star" />
                <Text>نشط</Text>
                {isSelected ? <Icon icon="checkmark" /> : null}
              </>
            )}
          </Chip>
          <Chip id="c" textValue="متاح">
            {({ isSelected }) => (
              <>
                <Text>متاح</Text>
                {isSelected ? <Icon icon="checkmark" /> : null}
              </>
            )}
          </Chip>
        </ChipList>
      </ChipGroup>
    </RTLProvider>
  );
}
