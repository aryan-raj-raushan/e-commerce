import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string: string) {
    const hash = Array.from(string).reduce((acc, char) => {
      const charCode = char.charCodeAt(0);
      return charCode + ((acc << 5) - acc);
    }, 0);
  
    const color = `#${((hash >> 16) & 0xff).toString(16).padStart(2, '0')}${((hash >> 8) & 0xff).toString(16).padStart(2, '0')}${(hash & 0xff).toString(16).padStart(2, '0')}`;
    return color;
  }
  

function stringAvatar(name: string) {
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts[1];
    
    const initials = `${firstName[0].toUpperCase()}${lastName ? lastName[0].toUpperCase() : ''}`;
  
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: initials,
    };
  }
export const BackgroundLetterAvatars = ({userName}:any) => {
  return (
    <Stack direction="row" classes={""} spacing={2}>
      <Avatar {...stringAvatar(`${userName}`)} />
    </Stack>
  );
}