// @mui
import {
  Stack,
  Container,
  Typography, TextField,
} from '@mui/material';
// components
import { DeleteTwoTone, EditTwoTone, PlusOutlined} from "@ant-design/icons";
import {Button, Divider, Input, Modal, Table} from "antd";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import {ADMIN_PATH} from "../../const/API";
import {useAuth} from "../../hooks/useRoute";

// ----------------------------------------------------------------------

const initData = [
  { id: '1', typeString: 'Sữa tươi tiệt trùng', typeCode: 'STTTT'}
];

const initProductType = {
  typeString: null,
  typeCode: null,
}

// ----------------------------------------------------------------------

export default function ProductTypePage() {
  const {Search} = Input;
  const [productType, setProductType] = useState(initProductType)
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

  const handleLoadData = () => {
    axios.get(ADMIN_PATH.PRODUCT_TYPE, {params: param, headers})
      .then(response => {
        setData(response.data.productTypes)
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
      axios.post(ADMIN_PATH.PRODUCT_TYPE,productType,{headers})
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
      axios.put(`${ADMIN_PATH.PRODUCT_TYPE}/${productType?.id}`,productType,{headers})
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
        axios.delete(`${ADMIN_PATH.PRODUCT_TYPE}/${id}`,{headers})
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
    { dataIndex: 'typeString', title: 'Tên loại sản phẩm' },
    { dataIndex: 'typeCode', title: 'Mã loại sản phẩm' },
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
            pagination={false}
          />
        </div>

        <Modal
          title={modalOpening === 'new' ? 'Thêm loại sản phẩm' : 'Sửa loại sản phẩm'}
          open={modalOpening}
          onCancel={handleToggleModal}
          onOk={() => handleSubmitData(modalOpening)}
          okText={'Xác nhận'}
          cancelText={'Hủy'}
        >
          <>
            <Divider />
            <Stack spacing={5}>
              <TextField
                value={productType.typeString ?? ''}
                name='typeString'
                label={'Tên loại sản phầm'}
                onChange={e => {setProductType({...productType, typeString: e.target.value})}}
              />

              <TextField
                value={productType.typeCode ?? ''}
                name='typeCode'
                label={'Mã loại sản phẩm'}
                onChange={e => {setProductType({...productType, typeCode: e.target.value})}}
              />
            </Stack>
          </>
        </Modal>
      </Container>
    </>
  );
}
