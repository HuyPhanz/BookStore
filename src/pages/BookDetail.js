import { Helmet } from 'react-helmet-async';
import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
// @mui
import {Button, Container, Stack, Typography} from '@mui/material';
import {Input, Modal, Pagination} from "antd";
import axios from "axios";
import {toast} from "react-toastify";
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import Iconify from "../components/iconify";
// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const {id} = useParams();
  const [pagination, setPagination] = useState({
    total: 1,
    currentPage: 1,
  })
  const [modalOpening, setModalOpening] = useState(false)
  const [bookInfo, setBookInfo] = useState({
    title:'',
    publishYear:'',
    numberOfPages:'',
    language:'',
    authorId:'',
    publisherId:'',
    categoryId:'',
    file:'',
  })

  const [bookData, setBookData] = useState([]);
  const [param, setParam] = useState({
    property: 'title',
    pageSize: 10,
    pageNumber: 1
  })

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  console.log(id)

  const handleLoadBook = () => {
    axios.get('http://localhost:8080/api/book', { params: param })
      .then(response => {
        setBookData(response.data.data.data)
        setPagination({...pagination, total: response.data.data.totalPage * 10})
      })
  }

  const handleToggleModal = () => {
    setModalOpening(modalOpening !== true)
  }

  const handleSubmitData = () => {
    const formData = new FormData();
    Object.keys(bookInfo).forEach(key => {
      formData.append(key,bookInfo[key])
    })
    console.log(formData)
    axios.post('http://localhost:8080/api/book', formData, {headers: {
        'Content-Type': 'multipart/form-data'
      }})
      .then((response) => {
        // eslint-disable-next-line no-unused-expressions
        response.data.success ? toast.success('Thêm sách thành công') : toast.error('Thêm sách thất bại')
      })
  }

  useEffect(() => {
    handleLoadBook()
  },[param])
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Chi tiết sách
          </Typography>

          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleToggleModal}>
            Thêm sách
          </Button>
        </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
