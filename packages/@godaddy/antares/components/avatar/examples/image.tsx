import { Avatar, Image, Text } from '@godaddy/antares';

const image =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 128 128%22%3E%3Crect width=%22128%22 height=%22128%22 fill=%22%23145fa9%22/%3E%3Ctext x=%2264%22 y=%2274%22 fill=%22white%22 font-family=%22Arial%22 font-size=%2252%22 text-anchor=%22middle%22%3EUT%3C/text%3E%3C/svg%3E';

export function ImageExample() {
  return (
    <Avatar>
      <Image src={image} alt="Uma Thurman" />
      <Text>UT</Text>
    </Avatar>
  );
}
