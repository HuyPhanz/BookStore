// @mui
import {
  Stack,
  Container,
  Typography, TextField, InputLabel, Select, MenuItem, FormControl,
} from '@mui/material';
// components
import { DeleteTwoTone, EditTwoTone, PlusOutlined} from "@ant-design/icons";
import {Breadcrumb, Button, Divider, Input, Modal, Table} from "antd";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import {useAuth} from "../../hooks/useRoute";
import {ADMIN_PATH, AUTH_PATH} from "../../const/API";

// ----------------------------------------------------------------------

const initData = [
  { id: '1', username: 'huyphan', name: 'Phan Quang Huy', phone: '0899832239', email: 'huy@gmail.com',},
  { id: '2', username: 'haiyen', name: 'Hán Hải Yến', phone: '0982314221', email: 'yen@gmail.com',},
];

const initUser = {
  username: null,
  password: null,
  name: null,
  email: null,
  phone: null,
  description: null
}

// ----------------------------------------------------------------------

export default function UserPage() {
  const {Search} = Input;
  const [user, setUser] = useState(initUser)
  const [data, setData] = useState([])
  const [selectedRow, setSelectedRow] = useState(-1)
  const [modalOpening, setModalOpening] = useState(null);
  const [param,setParam] = useState({perPage: 1000})
  const [page, setPage] = useState(1)

  const auth = useAuth();
  const accessKey = 'x-access-token'
  const headers = {
    [accessKey]: auth.user?.accessToken
    }

  const handleLoadData = () => {
    axios.get(ADMIN_PATH.USER, {params: param, headers})
      .then(response => {
        setData(response.data.users)
        setPage(response.data.page)
      })
      .catch(e => {
        if (e.response) {
          toast.error(e.response)
        }
      })
  }

  const handleToggleModal = (type, data) => {
    if (modalOpening) {
      setUser(initUser)
      setModalOpening(null)
    } else {
      if (data) {
        setUser(data)
      }
      setModalOpening(type)
    }
  }

  const handleSubmitData = (type) => {
    if (type === 'new') {
      axios.post(ADMIN_PATH.USER,user,{headers})
        .then((res) => {
          if (res) {
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
    } else if (selectedRow !== -1){
      axios.put(`${ADMIN_PATH.USER}/${user?.id}`,user,{headers})
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

  const handleSearch = (val) => {
    if (val !== null) {
      if (val.trim() === '') {
        handleLoadData()
      } else {
        setData(data.filter(dt => dt?.username?.toLowerCase().includes(val?.toLowerCase())))
      }
    }
  }

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Xác nhận',
      content: 'Bạn có chắc chắn?',
      okText: 'Xác nhận',
      cancelText: 'Hủy',
      onOk:()=>{
        axios.delete(`${ADMIN_PATH.USER}/${id}`,{headers})
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
    { dataIndex: 'username', title: 'Tên người dùng' },
    { dataIndex: 'name', title: 'Tên hiển thị' },
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

  useEffect(() => {
    handleLoadData()
  },[])

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
            <Search placeholder={'Tìm kiếm'} style={{width: '286px', marginBottom: '16px'}} onSearch={handleSearch}/>
            <Button icon={<PlusOutlined/>} type={'primary'} onClick={() => handleToggleModal('new')}>Thêm</Button>
          </Stack>
          <Table
            columns={column}
            dataSource={data}
            pagination={false}
          />
        </div>

        <Modal
          title={modalOpening === 'new' ? 'Thêm tài khoản' : 'Sửa tài khoản'}
          open={modalOpening}
          onCancel={handleToggleModal}
          onOk={() => handleSubmitData(modalOpening)}
          width={600}
          okText={'Xác nhận'}
          cancelText={'Hủy'}
        >
          <>
            <Divider />
            <Stack spacing={5}>
              <TextField
                value={user.username ?? ''}
                name='userName'
                label={'Tên người dùng'}
                onChange={e => {setUser({...user, username: e.target.value})}}
              />

              {modalOpening === 'new' && (<TextField
                value={user.password ?? ''}
                name='password'
                label={'Mật khẩu'}
                onChange={e => {setUser({...user, password: e.target.value})}}
              />)}

              <TextField
                value={user.name ?? ''}
                name='fullName'
                label={'Tên hiển thị'}
                onChange={e => {setUser({...user, name: e.target.value})}}
              />

              <FormControl fullWidth>
                <InputLabel id="gender">Giới tính</InputLabel>
                <Select
                  labelId="gender"
                  id="gender"
                  value={user.gender ?? ''}
                  label="Giới tính"
                  onChange={e => setUser({...user, gender: e.target.value})}
                >
                  <MenuItem value={0}>Nam</MenuItem>
                  <MenuItem value={1}>Nữ</MenuItem>
                </Select>
              </FormControl>

              <TextField
                value={user.email ?? ''}
                name='email'
                label={'Email'}
                onChange={e => {setUser({...user, email: e.target.value})}}
              />

              <TextField
                value={user.phone ?? ''}
                name='phone'
                label={'Số điện thoại'}
                onChange={e => {setUser({...user, phone: e.target.value})}}
              />

              <TextField
                value={user.description ?? ''}
                name='description'
                label={'Mô tả'}
                onChange={e => {setUser({...user, description: e.target.value})}}
              />
            </Stack>
          </>
        </Modal>
      </Container>
    </>
  );
}
