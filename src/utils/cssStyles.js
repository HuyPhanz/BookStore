// @mui
import {alpha, styled} from '@mui/material/styles';

// ----------------------------------------------------------------------

export function bgBlur(props) {
  const color = props?.color || '#000000';
  const blur = props?.blur || 6;
  const opacity = props?.opacity || 0.8;
  const imgUrl = props?.imgUrl;

  if (imgUrl) {
    return {
      position: 'relative',
      backgroundImage: `url(${imgUrl})`,
      '&:before': {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9,
        content: '""',
        width: '100%',
        height: '100%',
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: alpha(color, opacity),
      },
    };
  }

  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: alpha(color, opacity),
  };
}

// ----------------------------------------------------------------------

export const PageContainer = styled('div')`
  margin-left: 15%;
  margin-right: 15%;
  padding: 16px 16px 32px 16px;
  max-width: 1600px;
  height: calc(100% - 266px);
  overflow: hidden;
  @media screen and (max-width: 1600px) {
    margin-left: 5%;
    margin-right: 5%;
  }
`;

export const Text = styled("p")`
  font-size: 18px;
`;
