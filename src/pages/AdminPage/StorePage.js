// @mui
import {
  Stack,
  Container,
  Typography, TextField, FormControl, InputLabel, Select, MenuItem, Autocomplete,
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
  { id: '1', nameStore: 'Vinamilk Nguyễn Trãi', code: 'CH001', address: {
    addressDetail: 'Số 22 An Dương, P. Yên Phụ, Q. Tây Hồ, TP. Hà Nội'
    }}
];

const initStore = {
  nameStore: null,
  code: null,
  lat: null,
  lng: null,
  provinceId: null,
  districtId: null,
  wardId: null,
  address: null,
}

// ----------------------------------------------------------------------

export default function StorePage() {
  const {Search} = Input;
  const [store, setStore] = useState(initStore)
  const [data, setData] = useState(initData)
  const [selectedRow, setSelectedRow] = useState(-1)
  const [modalOpening, setModalOpening] = useState(null);
  const [param,setParam] = useState({perPage: 10})
  const [page, setPage] = useState(1)
  const [countryData, setCountryData] = useState({cities:[],districts:[],wards:[]})

  const auth = useAuth();
  const accessKey = 'x-access-token'
  const headers = {
    [accessKey]: auth.user?.accessToken
  }

  const handleLoadData = () => {
    axios.get(ADMIN_PATH.STORE, {params: param, headers})
      .then(response => {
        setData(response.data.stores)
        setPage(response.data.page)
      })
      .catch(e => {
        if (e.response) {
          toast.error(e.response)
        }
      })
  }

  const handleGetCountryNameById = (type, id) => {
    let data = {id: null, name: null}
    if (type === 'province') {
      axios.get(`${ADMIN_PATH.CITY}/${id}`,{headers})
        .then(res => {
          if (res) {
            data = {id: res.data?.id, name: res.data?.name}
          }
          return data.name
        })
    } else if (type === 'district') {
      axios.get(`${ADMIN_PATH.DISTRICT}/${id}`,{headers})
        .then(res => {
          if (res) {
            data = {id: res.data?.id, name: res.data?.name}
          }
        })
    } else {
      axios.get(`${ADMIN_PATH.WARD}/${id}`,{headers})
        .then(res => {
          if (res) {
            data = {id: res.data?.id, name: res.data?.name}
          }
        })
    }
  }

  const handleLoadCountryData = (type, code) => {
    if (type === 'cities') {
      axios.get(ADMIN_PATH.CITY,{params: {perPage: 100}, headers})
        .then(res => {
          if (res) {
            setCountryData({cities: res.data?.citys.map(city => ({label: city.name, id: city.id})), districts: [], wards: []})
          }
        })
    } else if (type === 'districts') {
      axios.get(ADMIN_PATH.DISTRICT,{params: {perPage: 100, cityId: code}, headers})
        .then(res => {
          if (res) {
            setCountryData({...countryData, districts: res.data?.districts.map(dis => ({label: dis.name, id: dis.id})), wards: []})
          }
        })
    } else {
      axios.get(ADMIN_PATH.WARD,{params: {perPage: 100, districtId: code}, headers})
        .then(res => {
          if (res) {
            setCountryData({...countryData, wards: res.data?.wards.map(war => ({label: war.name, id: war.id}))})
          }
        })
    }
  }

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
      axios.post(ADMIN_PATH.STORE,store,{headers})
        .then(() => {
          handleLoadData()
        })
        .catch(e => {
          if (e.response) {
            toast.error(e.response.data?.msg)
          }
        })
    } else if (selectedRow !== -1){
      axios.put(`${ADMIN_PATH.USER}/${store?.id}`,store,{headers})
        .then(response => {
          if (response) {
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
    setData(data.filter((dt) => dt.id !== id))
  }

  const column = [
    { dataIndex: 'id', title: 'ID' },
    { dataIndex: 'nameStore', title: 'Tên cửa hàng' },
    { dataIndex: 'code', title: 'Mã cửa hàng' },
    { dataIndex: 'provinceId', title: 'Tỉnh/Thành phố', },
    { dataIndex: 'districtId', title: 'Quận/Huyện', },
    { dataIndex: 'wardId', title: 'Xã/Phường',  },
    { dataIndex: 'address', title: 'Địa chỉ' },
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
    handleLoadCountryData('cities')
  },[])

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
          title={modalOpening === 'new' ? 'Tạo cừa hàng' : 'Sửa thông cửa hàng'}
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
                value={store.nameStore}
                name='name'
                label={'Tên cửa hàng'}
                onChange={e => {setStore({...store, nameStore: e.target.value})}}
              />

              <TextField
                value={store.code}
                name='code'
                label={'Mã cửa hàng'}
                onChange={e => {setStore({...store, code: e.target.value})}}
              />

              <Autocomplete
                disablePortal
                value={countryData.cities.find(city => city.id === store.provinceId) ? {label: countryData.cities.find(city => city.id === store.provinceId).label, id: store.id} : ''}
                onChange={(_,{id}) => {
                  setStore({...store, provinceId: id, districtId: null, wardId: null})
                  handleLoadCountryData('districts', id)
                }}
                id="province"
                options={countryData.cities}
                renderInput={(params) => <TextField {...params} label="Tỉnh/Thành phố" />}
              />

              <Autocomplete
                disablePortal
                disabled={store.provinceId === null}
                value={countryData.districts?.find(dis => dis.id === store.districtId) ? {label: countryData.districts.find(dis => dis.id === store.districtId).label, id: store.id} : ''}
                onChange={(_,{id}) => {
                  setStore({...store, districtId: id, wardId: null})
                  handleLoadCountryData('wards', id)
                }}
                id="district"
                options={countryData.districts}
                renderInput={(params) => <TextField {...params} label="Quận/Huyện" />}
              />

              <Autocomplete
                disablePortal
                disabled={store.districtId === null}
                value={countryData.wards?.find(war => war.id === store.wardId) ? {label: countryData.wards.find(war => war.id === store.wardId).label, id: store.id} : ''}
                onChange={(_,{id}) => setStore({...store, wardId: id})}
                id="ward"
                options={countryData.wards}
                renderInput={(params) => <TextField {...params} label="Xã/Phường" />}
              />

              <TextField
                value={store.address}
                name='address'
                label={'Địa chỉ'}
                onChange={e => {setStore({...store, address: e.target.value})}}
              />

              <TextField
                value={store.lat}
                name='lat'
                label={'Vĩ độ'}
                onChange={e => {setStore({...store, lat: e.target.value})}}
              />

              <TextField
                value={store.lng}
                name='lng'
                label={'Kinh độ'}
                onChange={e => {setStore({...store, lng: e.target.value})}}
              />
            </Stack>
          </>
        </Modal>
      </Container>
    </>
  );
}
