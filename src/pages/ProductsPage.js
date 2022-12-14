import { Helmet } from 'react-helmet-async';
import {useEffect, useState} from 'react';
// @mui
import {Button, Container, Stack, Typography} from '@mui/material';
import {DatePicker, Input, Modal, Pagination, Select} from "antd";
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
  const [modalOpening, setModalOpening] = useState({type:null, action: 'new'})
  const [authorInfo, setAuthorInfo] = useState({
    name:'',
    dateOfBirth: '',
    nickName:'',
  })
  const [publisherInfo, setPublisherInfo] = useState({
    name:'',
  })
  const [categoryInfo, setCategoryInfo] = useState({
    type:'',
  })
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
  const [authorData, setAuthorData] = useState([])
  const [publisherData, setPublisherData] = useState([])
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

  const handleLoadAuthor = () => {
    axios.get('http://localhost:8080/api/author', { params: {property: 'name', pageSize: 10, pageNumber: 1} })
      .then(response => {
        setAuthorData(response.data.data.data)
      })
  }

  const handleLoadPublisher = () => {
    axios.get('http://localhost:8080/api/publisher', { params: {property: 'name', pageSize: 10, pageNumber: 1} })
      .then(response => {
        setPublisherData(response.data.data.data)
      })
  }

  const handleLoadBook = () => {
    axios.get('http://localhost:8080/api/book', { params: param })
        .then(response => {
          setBookData(response.data.data.data)
          setPagination({...pagination, total: response.data.data.totalPage * 10})
        })
  }

  const handleToggleModal = (type, action) => {
    if (modalOpening.type) {
      setModalOpening({...modalOpening, type: null})
    } else {
      switch (type) {
        case 'book':
          handleLoadAuthor()
          handleLoadPublisher()
          setModalOpening({type: 'book', action})
          break;
        case 'author':
          setModalOpening({type: 'author', action})
          break;
        case 'publisher':
          setModalOpening({type: 'publisher', action})
          break;
        case 'category':
          setModalOpening({type: 'category', action})
          break;
        default:
          break
      }
    }
  }

  const handleSubmitData = (type) => {
    let api = null;
    let data=[];
    switch (type) {
      case 'book':
        api = 'http://localhost:8080/api/book'
        data = bookInfo
        break
      case 'author':
        api = 'http://localhost:8080/api/author'
        data = authorInfo
        break
      case 'publisher':
        api = 'http://localhost:8080/api/publisher'
        data = publisherInfo
        break
      case 'category':
        api = 'http://localhost:8080/api/category'
        data = categoryInfo
        break
      default:
        break
    }
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key,data[key])
    })
    axios.post(api, formData, {headers: {
      'Content-Type': 'multipart/form-data'
    }})
      .then((response) => {
        // eslint-disable-next-line no-unused-expressions
        response.data.success ? toast.success('Th??m th??nh c??ng') : toast.error('Th??m th???t b???i')
      })
  }

  useEffect(() => {
    handleLoadBook()
  },[param])
  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>

      <Container>
        <Modal
          open={modalOpening.type}
          onCancel={handleToggleModal}
          onOk={() => handleSubmitData(modalOpening.type)}
        >
          {modalOpening.type === 'book' && (
            <>
              <h4>T??n s??ch</h4>
              <Input onChange={e => {setBookInfo({...bookInfo, title: e.target.value})}}/>
              <h4>N??m xu???t b???n</h4>
              <Input type={'number'} onChange={e => {setBookInfo({...bookInfo, publishYear: e.target.value})}}/>
              <h4>S??? trang</h4>
              <Input onChange={e => {setBookInfo({...bookInfo, numberOfPages: e.target.value})}}/>
              <h4>Ng??n ng???</h4>
              <Input onChange={e => {setBookInfo({...bookInfo, language: e.target.value})}}/>
              <h4>T??c gi???</h4>
              <Select
                style={{width: '100%'}}
                onChange={val => {setBookInfo({...bookInfo, authorId: val})}}
                options={authorData.map(author => ({label: author.nickName, value: author.id}))}
              />
              <h4>Nh?? xu???t b???n</h4>
              <Select
                style={{width: '100%'}}
                onChange={val => {setBookInfo({...bookInfo, publisherId: val})}}
                options={publisherData.map(publisher => ({label: publisher.name, value: publisher.id}))}
              />
              <h4>H??nh ???nh</h4>
              <Input type={'file'} onChange={e => {setBookInfo({...bookInfo, file: e.target.files[0]})}}/>
            </>
          )}

          {modalOpening.type === 'author' && (
            <>
              <h4>T??n t??c gi???</h4>
              <Input onChange={e => {setAuthorInfo({...authorInfo, name: e.target.value})}}/>
              <h4>Ng??y sinh</h4>
              <DatePicker style={{width: '100%'}} onChange={(_,dateString) => {setAuthorInfo({...authorInfo, dateOfBirth: dateString })}}/>
              <h4>B??t danh</h4>
              <Input onChange={e => {setAuthorInfo({...authorInfo, nickName: e.target.value})}}/>
            </>
          )}

          {modalOpening.type === 'publisher' && (
            <>
              <h4>T??n nh?? xu???t b???n</h4>
              <Input onChange={e => {setPublisherInfo({...publisherInfo, name: e.target.value})}}/>
            </>
          )}

          {modalOpening.type === 'category' && (
            <>
              <h4>Th??? lo???i</h4>
              <Input onChange={e => {setCategoryInfo({...categoryInfo, name: e.target.value})}}/>
            </>
          )}
        </Modal>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Th?? vi???n
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleToggleModal('book', 'new')}>
            Th??m s??ch
          </Button>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleToggleModal('author', 'new')}>
            Th??m t??c gi???
          </Button>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleToggleModal('publisher', 'new')}>
            Th??m NXB
          </Button>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => handleToggleModal('category', 'new')}>
            Th??m category
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

        <Pagination style={{marginTop: '16px', textAlign: 'center'}} showSizeChanger={false} defaultCurrent={1} total={pagination.total} pageSize={10} onChange={(page) => setParam({...param, pageNumber: page})} />
      </Container>
    </>
  );
}
