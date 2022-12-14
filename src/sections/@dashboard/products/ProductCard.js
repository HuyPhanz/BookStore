import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import {Button, Tooltip} from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
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
  const {id, author, categories, images, language, numberOfPages, publishYear, publisher, title } = product;
  const navigate = useNavigate()
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={'image'} src={images[0]?.imgUrl ?? '/assets/images/products/error.jpg'} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link onClick={() => {navigate('/dashboard/books/1')}} color="inherit" underline="hover">
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
            T??c gi???
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
            Nh?? xu???t b???n
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
            N??m xu???t b???n
          </Typography>
          <Typography>
            { publishYear ?? 'N/a'}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Tooltip title={'X??a s??ch kh???i th?? vi???n'}>
            <Button size={'large'} type={'primary'} danger icon={<DeleteOutlined />} />
          </Tooltip>
          <Tooltip title={'Th??m v??o gi??? h??ng'}>
            <Button size={'large'} type={'primary'} icon={<ShoppingCartOutlined />}>Th??m v??o gi??? h??ng</Button>
          </Tooltip>
        </Stack>

      </Stack>
    </Card>
  );
}
