import { Helmet } from 'react-helmet-async';
import {useEffect, useState} from 'react';
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
console.log(pagination)
  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Modal
          open={modalOpening}
          onCancel={handleToggleModal}
          onOk={handleSubmitData}
        >
          <h4>Tên sách</h4>
          <Input onChange={e => {setBookInfo({...bookInfo, title: e.target.value})}}/>
          <h4>Năm xuất bản</h4>
          <Input type={'number'} onChange={e => {setBookInfo({...bookInfo, publishYear: e.target.value})}}/>
          <h4>Số trang</h4>
          <Input onChange={e => {setBookInfo({...bookInfo, numberOfPages: e.target.value})}}/>
          <h4>Ngôn ngữ</h4>
          <Input onChange={e => {setBookInfo({...bookInfo, language: e.target.value})}}/>
          <h4>Tác giả</h4>
          <Input onChange={e => {setBookInfo({...bookInfo, authorId: e.target.value})}}/>
          <h4>Nhà xuất bản</h4>
          <Input onChange={e => {setBookInfo({...bookInfo, publisherId: e.target.value})}}/>
          <h4>Hình ảnh</h4>
          <Input type={'file'} onChange={e => {setBookInfo({...bookInfo, file: e.target.files[0]})}}/>
        </Modal>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Thư viện
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

        <ProductList products={bookData} />
        <ProductCartWidget />

        <Pagination showSizeChanger={false} defaultCurrent={1} total={pagination.total} pageSize={10} onChange={(page) => setParam({...param, pageNumber: page})} />
      </Container>
    </>
  );
}
