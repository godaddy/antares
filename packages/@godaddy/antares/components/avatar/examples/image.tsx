import { Avatar, Image, Text } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 128 128%22%3E%3Crect width=%22128%22 height=%22128%22 fill=%22%2302242a%22/%3E%3Ccircle cx=%2264%22 cy=%2264%22 r=%2251%22 fill=%22%2309757a%22/%3E%3Cpath d=%22M13 72c18-18 34-26 51-26s33 8 51 26v43H13z%22 fill=%22%23145fa9%22/%3E%3Ccircle cx=%2264%22 cy=%2253%22 r=%2220%22 fill=%22%23f5f7f8%22/%3E%3Cpath d=%22M35 106c4-17 15-26 29-26s25 9 29 26%22 fill=%22%23f5f7f8%22/%3E%3Ccircle cx=%2264%22 cy=%2264%22 r=%2251%22 fill=%22none%22 stroke=%22%23ffffff%22 stroke-opacity=%22.35%22 stroke-width=%224%22/%3E%3C/svg%3E';

/**
 * Place Image before Text so the monogram is available while the image loads or if it fails.
 * @order 2
 */
export function ImageExample() {
  return (
    <Avatar>
      <Image src={image} alt="Uma Thurman" />
      <Text>UT</Text>
    </Avatar>
  );
}
