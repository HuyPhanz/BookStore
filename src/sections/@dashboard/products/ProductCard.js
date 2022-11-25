import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { author, categories, images, language, numberOfPages, publishYear, publisher, title } = product;
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={'image'} src={images[0]?.imgUrl ?? '/assets/images/products/error.jpg'} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle1" style={{fontSize: '16pt'}}>
           {title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={['red']} />
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {/* {priceSale && fCurrency(priceSale)} */}
              { fCurrency(200000) }

            </Typography>
            &nbsp;
            {fCurrency(10000)}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography
              component="span"
              sx={{
                color: 'text.disabled',
              }}
          >
            Tác giả
          </Typography>
          <Typography>
            { author?.nickName ?? 'N/a' }
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography
              component="span"
              sx={{
                color: 'text.disabled',
              }}
          >
            Nhà xuất bản
          </Typography>
          <Typography>
            { publisher?.name ?? 'N/a' }
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography
              component="span"
              sx={{
                color: 'text.disabled',
              }}
          >
            Năm xuất bản
          </Typography>
          <Typography>
            { publishYear ?? 'N/a'}
          </Typography>
        </Stack>

      </Stack>
    </Card>
  );
}
