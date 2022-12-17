// @mui
import {
  Stack,
  Container,
  Typography, TextField, FormControl, InputLabel, Select, MenuItem, Autocomplete, Tooltip,
} from '@mui/material';
// components
import {DeleteTwoTone, EditTwoTone, EnvironmentTwoTone, PlusOutlined} from "@ant-design/icons";
import {Button, Divider, Input, Modal, Table} from "antd";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import MapGL, {GeolocateControl, MapContext} from "@goongmaps/goong-map-react";
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

const GOONG_MAPTILES_KEY = 'ZuqMdvolU0bH4wIUduvcei9vJYfzPK3zPG7rI6d6';
const initViewPort = {
  latitude: 16,
  longitude: 106,
  zoom: 5.5,
  bearing: 0,
  pitch: 0
}

// ----------------------------------------------------------------------

export default function StorePage() {
  const {Search} = Input;
  const [store, setStore] = useState(initStore)
  const [data, setData] = useState(initData)
  const [selectedRow, setSelectedRow] = useState(-1)
  const [modalOpening, setModalOpening] = useState(null);
  const [param,setParam] = useState({perPage: 1000})
  const [page, setPage] = useState(1)
  const [countryData, setCountryData] = useState({cities:[],districts:[],wards:[]})

  const [viewport, setViewport] = useState(initViewPort)
  const CustomMarker = (props) =>  {
    const context = React.useContext(MapContext);

    const {longitude, latitude} = props;

    const [x, y] = context.viewport.project([longitude, latitude]);

    const markerStyle = {
      fontSize: '20px',
      position: 'absolute',
      left: x,
      top: y
    };

    return (
      <EnvironmentTwoTone twoToneColor={'red'} c style={markerStyle} />
    );
  }

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
        handleLoadCountryData('districts',data.provinceId)
        setStore(data)
      }
      setModalOpening(type)
    }
  }

  const handleSubmitData = (type) => {
    if (type === 'new') {
      axios.post(ADMIN_PATH.STORE,store,{headers})
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
      axios.put(`${ADMIN_PATH.USER}/${store?.id}`,store,{headers})
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
        setData(data.filter(dt => dt?.nameStore?.toLowerCase().includes(val?.toLowerCase())))
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
        axios.delete(`${ADMIN_PATH.STORE}/${id}`,{headers})
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
    { dataIndex: 'id', title: 'ID', render: (val) => val ?? '-' },
    { dataIndex: 'nameStore', title: 'Tên cửa hàng', render: (val) => val ?? '-' },
    { dataIndex: 'code', title: 'Mã cửa hàng', render: (val) => val ?? '-' },
    { dataIndex: ['city','name'], title: 'Tỉnh/Thành phố', render: (val) => val ?? '-' },
    { dataIndex: ['district','name'], title: 'Quận/Huyện',  render: (val) => val ?? '-' },
    { dataIndex: ['ward','name'], title: 'Xã/Phường', render: (val) => val ?? '-' },
    { dataIndex: 'address', title: 'Địa chỉ', render: (val) => val ?? '-' },
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
          title={modalOpening === 'new' ? 'Tạo cừa hàng' : 'Sửa thông cửa hàng'}
          open={modalOpening}
          onCancel={handleToggleModal}
          onOk={() => handleSubmitData(modalOpening)}
          okText={'Xác nhận'}
          cancelText={'Hủy'}
          width={1200}
        >
          <>
            <Divider />
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <Stack spacing={5} style={{width:'40%'}}>
                <TextField
                  value={store.nameStore ?? ''}
                  name='name'
                  label={'Tên cửa hàng'}
                  onChange={e => {setStore({...store, nameStore: e.target.value})}}
                />

                <TextField
                  value={store.code ?? ''}
                  name='code'
                  label={'Mã cửa hàng'}
                  onChange={e => {setStore({...store, code: e.target.value})}}
                />

                <Autocomplete
                  disablePortal
                  value={countryData.cities.find(city => city.id === store.provinceId) ? {label: countryData.cities.find(city => city.id === store.provinceId).label, id: store.provinceId} : ''}
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
                  value={countryData.districts?.find(dis => dis.id === store.districtId) ? {label: countryData.districts.find(dis => dis.id === store.districtId).label, id: store.districtId} : ''}
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
                  value={countryData.wards?.find(war => war.id === store.wardId) ? {label: countryData.wards.find(war => war.id === store.wardId).label, id: store.wardId} : ''}
                  onChange={(_,{id}) => setStore({...store, wardId: id})}
                  id="ward"
                  options={countryData.wards}
                  renderInput={(params) => <TextField {...params} label="Xã/Phường" />}
                />

                <TextField
                  value={store.address ?? ''}
                  name='address'
                  label={'Địa chỉ'}
                  onChange={e => {setStore({...store, address: e.target.value})}}
                />

                <TextField
                  value={store.lat ?? ''}
                  type={'number'}
                  name='lat'
                  label={'Vĩ độ'}
                  onChange={e => {setStore({...store, lat: e.target.value})}}
                />

                <TextField
                  value={store.lng ?? ''}
                  type={'number'}
                  name='lng'
                  label={'Kinh độ'}
                  onChange={e => {setStore({...store, lng: e.target.value})}}
                />
              </Stack>
              <Stack>
                <MapGL
                  {...viewport}
                  width="600px"
                  height="700px"
                  onViewportChange={setViewport}
                  goongApiAccessToken={GOONG_MAPTILES_KEY}
                  onClick={(e) => setStore({...store, lng: e?.lngLat[0] ?? 0, lat: e?.lngLat[1] ?? 0})}
                >
                  {store.lng !== null && store.lat !== null && (<CustomMarker longitude={parseFloat(store?.lng) ?? 0} latitude={parseFloat(store?.lat) ?? 0} />)}
                </MapGL>
              </Stack>
            </div>
          </>
        </Modal>
      </Container>
    </>
  );
}
