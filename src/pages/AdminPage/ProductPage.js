// @mui
import {
  Stack,
  Container,
  Typography, TextField, Autocomplete,
} from '@mui/material';
// components
import { DeleteTwoTone, EditTwoTone, PlusOutlined} from "@ant-design/icons";
import {Button, Divider, Image, Input, Modal, Table} from "antd";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import {parseInt} from "lodash/string";
import {ADMIN_PATH} from "../../const/API";
import {useAuth} from "../../hooks/useRoute";

// ----------------------------------------------------------------------

const initData = [
  { id: '1', nameProduct: 'Sữa tươi tiệt trùng', productCode: 'STTTT', productTypeId: 'Sữa tươi tiệt trùng', quanity: '10'}
];

const initProduct = {
  nameProduct: null,
  productCode: null,
  productTypeId: null,
  number: null,
  url: null,
}

// ----------------------------------------------------------------------

export default function ProductPage() {
  const {Search} = Input;
  const [product, setProduct] = useState(initProduct)
  const [productType, setProductType] = useState([])
  const [data, setData] = useState(initData)
  const [selectedRow, setSelectedRow] = useState(-1)
  const [modalOpening, setModalOpening] = useState(null);
  const [param,setParam] = useState({perPage: 10})
  const [page, setPage] = useState(1)

  const auth = useAuth();
  const accessKey = 'x-access-token'
  const headers = {
    [accessKey]: auth.user?.accessToken
  }

  const handleLoadProductType = () => {
    axios.get(ADMIN_PATH.PRODUCT_TYPE, {params: {perPage: 1000}, headers})
      .then(response => {
        setProductType(response.data.productTypes?.map(({id, typeString}) => ({id, label: typeString})))
      })
      .catch(e => {
        if (e.response) {
          toast.error(e.response)
        }
      })
  }

  const handleLoadData = () => {
    axios.get(ADMIN_PATH.PRODUCT, {params: param, headers})
      .then(response => {
        setData(response.data.products)
        setPage(response.data.page)
      })
      .catch(e => {
        if (e.response) {
          toast.error(e.response)
        }
      })
  }

  const handleToggleModal = (productTypeId, data) => {
    if (modalOpening) {
      setModalOpening(null)
      setProduct(initProduct)
    } else {
      if (data) {
        setProduct(data)
      }
      setModalOpening(productTypeId)
    }
  }

  const handleSubmitData = (type) => {
    if (type === 'new') {
      axios.post(ADMIN_PATH.PRODUCT,product,{headers})
        .then((res) => {
          if (res) {
            toast.success('Thành công!')
            handleLoadData()
            handleToggleModal();
          }
        })
        .catch(e => {
          if (e.response) {
            toast.error(e.response.data?.msg)
          }
        })
    } else if (selectedRow !== -1){
      axios.put(`${ADMIN_PATH.PRODUCT}/${product?.id}`,product,{headers})
        .then(response => {
          if (response) {
            toast.success('Thành công!')
            handleLoadData()
            handleToggleModal()
          }
        })
        .catch(e => {
          if (e.response) {
            toast.error(e.response.data?.msg)
          }
        })
    } else {
      toast.error('Có lỗi xảy ra!')
    }
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Xác nhận',
      content: 'Bạn có chắc chắn?',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk:()=>{
        axios.delete(`${ADMIN_PATH.PRODUCT}/${id}`,{headers})
          .then(res => {
            if (res) {
              toast.success('Thành công!')
              handleLoadData()
            }
          })
          .catch(e => {
            if (e.response) {
              toast.error(e.response.data?.msg)
            }
          })
      }
    });
  }

  const column = [
    { dataIndex: 'id', title: 'ID' },
    { dataIndex: 'nameProduct', title: 'Tên sản phẩm' },
    { dataIndex: 'productCode', title: 'Mã sản phẩm' },
    { dataIndex: 'productTypeId', title: 'Loại sản phẩm', render: (val) => productType.find(({id}) => id === val)?.label ?? '-'},
    { dataIndex: 'number', title: 'Số lượng' },
    { title: 'Hành động',
      align: 'center',
      render: (_, record, index) => (
        <>
          <EditTwoTone twoToneColor={'blue'} onClick={() => {
            setSelectedRow(index)
            handleToggleModal('edit', record)
          }}/> <DeleteTwoTone twoToneColor={'red'} onClick={() => handleDelete(record.id)}/>
        </>
      )},
  ];

  useEffect(() => {
    handleLoadData()
    handleLoadProductType()
  },[])

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Quản lí sản phẩm
          </Typography>
        </Stack>

        <div style={{padding: '50px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)', borderRadius: '5px'}}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Search placeholder={'Tìm kiếm'} style={{width: '286px', marginBottom: '16px'}}/>
            <Button icon={<PlusOutlined/>} productTypeId={'primary'} onClick={() => handleToggleModal('new')}>Thêm</Button>
          </Stack>
          <Table
            columns={column}
            dataSource={data}
            pagination={false}
          />
        </div>

        <Modal
          title={modalOpening === 'new' ? 'Thêm sản phẩm' : 'Sửa thông tin sản phẩm'}
          open={modalOpening}
          onCancel={handleToggleModal}
          onOk={() => handleSubmitData(modalOpening)}
          okText={'Xác nhận'}
          cancelText={'Hủy'}
        >
          <>
            <Divider />
            <Stack spacing={5}>
              {product.url && (<Image width={200} src={`/assets/images/products/${product.url}`} />)}
              <TextField
                value={product.nameProduct ?? ''}
                name='nameProduct'
                label={'Tên sản phầm'}
                onChange={e => {setProduct({...product, nameProduct: e.target.value})}}
              />

              <TextField
                value={product.productCode ?? ''}
                name='productCode'
                label={'Mã sản phẩm'}
                onChange={e => {setProduct({...product, productCode: e.target.value})}}
              />

              <Autocomplete
                disablePortal
                value={product.productTypeId === null ? '' : {id: product.productTypeId, label: productType.find(({id}) => id === product.productTypeId)?.label}}
                onChange={(_,{id}) => setProduct({...product, productTypeId: id})}
                id="productTypeId"
                options={productType ?? []}
                renderInput={(params) => <TextField {...params} label="Loại" />}
              />

              <TextField
                value={product.number ?? ''}
                productTypeId={'number'}
                type={'number'}
                name='number'
                label={'Số lượng'}
                onChange={e => {setProduct({...product, number: e.target.value})}}
              />

              <TextField
                value={product.url ?? ''}
                name='url'
                label={'Tên ảnh'}
                onChange={e => {setProduct({...product, url: e.target.value})}}
              />
            </Stack>
          </>
        </Modal>
      </Container>
    </>
  );
}
