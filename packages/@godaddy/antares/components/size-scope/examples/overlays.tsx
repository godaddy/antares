import {
  Button,
  ButtonGroup,
  Content,
  Flex,
  Heading,
  Label,
  Modal,
  ModalTrigger,
  Select,
  SelectItem,
  SelectOptions,
  SizeScope,
  Text
} from '@godaddy/antares';

/**
 * Overlays open at the size of the scope around their trigger, even though they render in a
 * portal. An explicit `size` on the owner sizes its overlay too.
 * @order 3
 */
export function OverlaysExample() {
  return (
    <SizeScope size="sm">
      <Flex gap="md" alignItems="end" wrap="wrap">
        <Select placeholder="Pick a plan">
          <Label>Plan</Label>
          <Button slot="trigger" />
          <SelectOptions>
            <SelectItem id="basic">Basic</SelectItem>
            <SelectItem id="pro">Pro</SelectItem>
          </SelectOptions>
        </Select>

        <Select size="lg" placeholder="Pick a region">
          <Label>Region</Label>
          <Button slot="trigger" />
          <SelectOptions>
            <SelectItem id="us">United States</SelectItem>
            <SelectItem id="eu">Europe</SelectItem>
          </SelectOptions>
        </Select>

        <ModalTrigger>
          <Button>Edit plan</Button>
          <Modal>
            <Heading slot="title">Edit plan</Heading>
            <Content>
              <Text>Changes apply at the next billing cycle.</Text>
            </Content>
            <ButtonGroup>
              <Button slot="close">Cancel</Button>
              <Button slot="close" variant="primary">
                Save
              </Button>
            </ButtonGroup>
          </Modal>
        </ModalTrigger>
      </Flex>
    </SizeScope>
  );
}
