// @mui
import {
  Stack,
  Container,
  Typography,
} from '@mui/material';
// components
import { DeleteTwoTone, EditTwoTone, PlusOutlined} from "@ant-design/icons";
import {Button, Divider, Input, Modal, Table} from "antd";
import {useState} from "react";
import {toast} from "react-toastify";

// ----------------------------------------------------------------------

const initData = [
  { id: '1', name: 'Sữa tươi tiệt trùng', code: 'STTTT', type: 'Sữa tươi tiệt trùng', quanity: '10'}
];

const initProduct = {
  name: null,
  code: null,
  type: null,
  quantity: null,
  description: null,
}

// ----------------------------------------------------------------------

export default function ProductPage() {
  const {Search} = Input;
  const [product, setProduct] = useState(initProduct)
  const [data, setData] = useState(initData)
  const [selectedRow, setSelectedRow] = useState(-1)
  const [modalOpening, setModalOpening] = useState(null);

  const handleToggleModal = (type, data) => {
    if (modalOpening) {
      setModalOpening(null)
      setProduct(initProduct)
    } else {
      if (data) {
        setProduct(data)
      }
      setModalOpening(type)
    }
  }

  const handleSubmitData = (type) => {
    if (type === 'new') {
      setData([...data,{...product, id: data.length + 1}])
    } else if (selectedRow !== -1){
      const temp = data
      temp[selectedRow] = product
      setData([...temp])
    } else {
      toast.error('Có lỗi xảy ra!')
    }
    handleToggleModal()
  }

  const handleDelete = (id) => {
    setData(data.filter((dt) => dt.id !== id))
  }

  const column = [
    { dataIndex: 'id', title: 'ID' },
    { dataIndex: 'name', title: 'Tên sản phẩm' },
    { dataIndex: 'code', title: 'Mã sản phẩm' },
    { dataIndex: 'type', title: 'Loại sản phẩm' },
    { dataIndex: 'quantity', title: 'Số lượng' },
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
            <Button icon={<PlusOutlined/>} type={'primary'} onClick={() => handleToggleModal('new')}>Thêm</Button>
          </Stack>
          <Table
            columns={column}
            dataSource={data}
          />
        </div>

        <Modal
          open={modalOpening}
          onCancel={handleToggleModal}
          onOk={() => handleSubmitData(modalOpening)}
        >
          <>
            <Divider />
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <h4 style={{width: '40%'}}>Tên sản phầm <span style={{color: 'red'}}>*</span></h4>
              <Input value={product.name} onChange={e => {setProduct({...product, name: e.target.value})}}/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <h4 style={{width: '40%'}}>Mã sản phẩm  <span style={{color: 'red'}}>*</span></h4>
              <Input value={product.code} onChange={e => {setProduct({...product, code: e.target.value})}}/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <h4 style={{width: '40%'}}>Loại sản phẩm  <span style={{color: 'red'}}>*</span></h4>
              <Input value={product.type} onChange={e => {setProduct({...product, type: e.target.value})}}/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <h4 style={{width: '40%'}}>Số lượng</h4>
              <Input value={product.quantity} onChange={e => {setProduct({...product, quantity: e.target.value})}}/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <h4 style={{width: '40%'}}>Mô tả</h4>
              <Input value={product.description} onChange={e => {setProduct({...product, description: e.target.value})}}/>
            </Stack>
          </>
        </Modal>
      </Container>
    </>
  );
}
