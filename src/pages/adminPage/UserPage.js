// @mui
import {
  Stack,
  Container,
  Typography,
} from '@mui/material';
// components
import { DeleteTwoTone, EditTwoTone, PlusOutlined} from "@ant-design/icons";
import {Breadcrumb, Button, Divider, Input, Modal, Table} from "antd";
import {useState} from "react";
import {toast} from "react-toastify";

// ----------------------------------------------------------------------

const initData = [
  { id: '1', userName: 'huyphan', fullName: 'Phan Quang Huy', phone: '0899832239', email: 'huy@gmail.com',},
  { id: '2', userName: 'haiyen', fullName: 'Hán Hải Yến', phone: '0982314221', email: 'yen@gmail.com',},
];

const initUser = {
  userName: null,
  fulName: null,
  email: null,
  phone: null
}

// ----------------------------------------------------------------------

export default function UserPage() {
  const {Search} = Input;
  const [user, setUser] = useState(initUser)
  const [data, setData] = useState(initData)
  const [selectedRow, setSelectedRow] = useState(-1)
  const [modalOpening, setModalOpening] = useState(null);

  const handleToggleModal = (type, data) => {
    if (modalOpening) {
      setModalOpening(null)
      setUser(initUser)
    } else {
      if (data) {
        setUser(data)
      }
      setModalOpening(type)
    }
  }

  const handleSubmitData = (type) => {
    if (type === 'new') {
      setData([...data,{...user, id: data.length + 1}])
    } else if (selectedRow !== -1){
      const temp = data
      temp[selectedRow] = user
      console.log(temp)
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
    { dataIndex: 'userName', title: 'Tên người dùng' },
    { dataIndex: 'fullName', title: 'Tên hiển thị' },
    { dataIndex: 'phone', title: 'Số điện thoại' },
    { dataIndex: 'email', title: 'Email' },
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
            Quản lí tài khoản
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
          title={modalOpening === 'new' ? 'Thêm tài khoản' : 'Sửa tài khoản'}
          open={modalOpening}
          onCancel={handleToggleModal}
          onOk={() => handleSubmitData(modalOpening)}
          width={600}
        >
          <>
            <Divider />
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <h4 style={{width: '40%'}}>Tên người dùng <span style={{color: 'red'}}>*</span></h4>
              <Input value={user.userName} onChange={e => {setUser({...user, userName: e.target.value})}}/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <h4 style={{width: '40%'}}>Tên hiển thị  <span style={{color: 'red'}}>*</span></h4>
              <Input value={user.fullName} onChange={e => {setUser({...user, fullName: e.target.value})}}/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <h4 style={{width: '40%'}}>Email  <span style={{color: 'red'}}>*</span></h4>
              <Input value={user.email} onChange={e => {setUser({...user, email: e.target.value})}}/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <h4 style={{width: '40%'}}>Số điện thoại</h4>
              <Input value={user.phone} onChange={e => {setUser({...user, phone: e.target.value})}}/>
            </Stack>
          </>
        </Modal>
      </Container>
    </>
  );
}
