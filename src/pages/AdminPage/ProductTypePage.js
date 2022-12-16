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
  { id: '1', name: 'Sữa tươi tiệt trùng', code: 'STTTT'}
];

const initProductType = {
  name: null,
  code: null,
}

// ----------------------------------------------------------------------

export default function ProductTypePage() {
  const {Search} = Input;
  const [productType, setProductType] = useState(initProductType)
  const [data, setData] = useState(initData)
  const [selectedRow, setSelectedRow] = useState(-1)
  const [modalOpening, setModalOpening] = useState(null);

  const handleToggleModal = (type, data) => {
    if (modalOpening) {
      setModalOpening(null)
      setProductType(initProductType)
    } else {
      if (data) {
        setProductType(data)
      }
      setModalOpening(type)
    }
  }

  const handleSubmitData = (type) => {
    if (type === 'new') {
      setData([...data,{...productType, id: data.length + 1}])
    } else if (selectedRow !== -1){
      const temp = data
      temp[selectedRow] = productType
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
    { dataIndex: 'name', title: 'Tên loại sản phẩm' },
    { dataIndex: 'code', title: 'Mã loại sản phẩm' },
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
            Quản lí loại sản phẩm
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
              <h4 style={{width: '40%'}}>Tên loại sản phầm <span style={{color: 'red'}}>*</span></h4>
              <Input value={productType.name} onChange={e => {setProductType({...productType, name: e.target.value})}}/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <h4 style={{width: '40%'}}>Mã loại sản phẩm  <span style={{color: 'red'}}>*</span></h4>
              <Input value={productType.code} onChange={e => {setProductType({...productType, code: e.target.value})}}/>
            </Stack>
          </>
        </Modal>
      </Container>
    </>
  );
}
