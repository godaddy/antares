import { Avatar, AvatarFallback, AvatarImage } from '@godaddy/antares';

const image = 'https://placehold.co/128x128/145fa9/ffffff.png?text=UT';

export function ImageExample() {
  return (
    <Avatar>
      <AvatarImage src={image} alt="Uma Thurman" />
      <AvatarFallback>UT</AvatarFallback>
    </Avatar>
  );
}
