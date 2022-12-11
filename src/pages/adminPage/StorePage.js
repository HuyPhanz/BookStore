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
  { id: '1', name: 'Vinamilk Nguyễn Trãi', code: 'CH001', address: {
    addressDetail: 'Số 22 An Dương, P. Yên Phụ, Q. Tây Hồ, TP. Hà Nội'
    }}
];

const initStore = {
  name: null,
  code: null,
  address: {
    zone: null,
    province: null,
    district: null,
    ward: null,
    addressDetail: null
  },
}

// ----------------------------------------------------------------------

export default function StorePage() {
  const {Search} = Input;
  const [store, setStore] = useState(initStore)
  const [data, setData] = useState(initData)
  const [selectedRow, setSelectedRow] = useState(-1)
  const [modalOpening, setModalOpening] = useState(null);

  const handleToggleModal = (type, data) => {
    if (modalOpening) {
      setModalOpening(null)
      setStore(initStore)
    } else {
      if (data) {
        setStore(data)
      }
      setModalOpening(type)
    }
  }

  const handleSubmitData = (type) => {
    if (type === 'new') {
      setData([...data,{...store, id: data.length + 1}])
    } else if (selectedRow !== -1){
      const temp = data
      temp[selectedRow] = store
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
    { dataIndex: 'name', title: 'Tên cửa hàng' },
    { dataIndex: 'code', title: 'Mã cửa hàng' },
    { dataIndex: ['address', 'addressDetail'], title: 'Địa chỉ' },
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
            Quản lí cửa hàng
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
              <h4 style={{width: '40%'}}>Tên cửa hàng <span style={{color: 'red'}}>*</span></h4>
              <Input value={store.name} onChange={e => {setStore({...store, name: e.target.value})}}/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <h4 style={{width: '40%'}}>Mã cửa hàng  <span style={{color: 'red'}}>*</span></h4>
              <Input value={store.code} onChange={e => {setStore({...store, code: e.target.value})}}/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <h4 style={{width: '40%'}}>Khu vực  <span style={{color: 'red'}}>*</span></h4>
              <Input value={store.address.zone} onChange={e => {setStore({...store, address: {...store.address, zone: e.target.value}})}}/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <h4 style={{width: '40%'}}>Tỉnh/Thành phố  <span style={{color: 'red'}}>*</span></h4>
              <Input value={store.address.province} onChange={e => {setStore({...store, address: {...store.address, province: e.target.value}})}}/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <h4 style={{width: '40%'}}>Quận/Huyện  <span style={{color: 'red'}}>*</span></h4>
              <Input value={store.address.district} onChange={e => {setStore({...store, address: {...store.address, district: e.target.value}})}}/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <h4 style={{width: '40%'}}>Xã/Phường  <span style={{color: 'red'}}>*</span></h4>
              <Input value={store.address.ward} onChange={e => {setStore({...store, address: {...store.address, ward: e.target.value}})}}/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <h4 style={{width: '40%'}}>Địa chỉ cụ thể  <span style={{color: 'red'}}>*</span></h4>
              <Input value={store.address.addressDetail} onChange={e => {setStore({...store, address: {...store.address, addressDetail: e.target.value}})}}/>
            </Stack>
          </>
        </Modal>
      </Container>
    </>
  );
}
