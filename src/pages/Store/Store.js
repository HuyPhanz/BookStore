import React, { useEffect, useState} from "react";
import MapGL, {GeolocateControl, MapContext} from '@goongmaps/goong-map-react';
import {Input, Table} from "antd";
import { EnvironmentTwoTone} from "@ant-design/icons";
import axios from "axios";
import {toast} from "react-toastify";
import {Tooltip} from "@mui/material";
import {PageContainer} from "../../utils/cssStyles";
import {USER_PATH} from "../../const/API";
import {useAuth} from "../../hooks/useRoute";

const GOONG_MAPTILES_KEY = 'ZuqMdvolU0bH4wIUduvcei9vJYfzPK3zPG7rI6d6';
const {Search} = Input
const initData = [];
const initViewPort = {
  latitude: 16,
  longitude: 106,
  zoom: 5.5,
}

export default function Store () {
  const [userLocation, setUserLocation] = useState({lng:0,lat:0})
  const [viewport, setViewport] = useState(initViewPort)

  const geolocateControlStyle= {
    right: 10,
    top: 10
  };

  const CustomMarker = (props) =>  {
    const context = React.useContext(MapContext);

    const {longitude, latitude, info} = props;

    const [x, y] = context.viewport.project([longitude, latitude]);

    const markerStyle = {
      fontSize: info.nearest ? '30px' : '20px',
      position: 'absolute',
      left: x,
      top: y
    };

    return (
      <Tooltip title={
        <>
          Tên cửa hàng: {info.name ?? '-'}<br/>
          Mã cửa hàng: {info.code ?? '-'}<br/>
          Địa chỉ: {info.address ?? '-'}
        </>
      }>
        <EnvironmentTwoTone twoToneColor={info.nearest ? 'blue' :'red'} style={markerStyle} />
      </Tooltip>
    );
  }

  const [data, setData] = useState(initData)
  const auth = useAuth();
  const accessKey = 'x-access-token'
  const headers = {
    [accessKey]: auth.user?.accessToken
  }

  const handleLoadData = () => {
    axios.get(`${USER_PATH.STORE}/distance`, {params: {...userLocation, perPage: 1000}, headers})
      .then(response => {
        setData(response.data.stores)
      })
      .catch(e => {
        if (e.response) {
          toast.error(e.response)
        }
      })
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

  const columns = [
    { dataIndex: 'id', title: 'STT', render: (val,record,index) => index + 1 },
    { dataIndex: 'nameStore', title: 'Tên cửa hàng', render: (val) => val ?? '-' },
    { dataIndex: 'code', width: 75, title: 'Mã', render: (val) => val ?? '-' },
    { dataIndex: ['city','name'], title: 'Tỉnh/Thành phố', render: (val) => val ?? '-' },
    { dataIndex: ['district','name'], title: 'Quận/Huyện', render: (val) => val ?? '-' },
    { dataIndex: ['ward', 'name'], title: 'Xã/Phường', render: (val) => val ?? '-' },
    { dataIndex: 'address', width: 150, title: 'Địa chỉ', render: (val) => val ?? '-' },
  ];

  useEffect(() => {
    handleLoadData()
  },[userLocation])

  return (
    <PageContainer>
      <h2 style={{textAlign:'center'}}>
        Hệ thống cửa hàng Vinamilk trong nước
      </h2>
      <div style={{display: 'flex', justifyContent:'space-around'}}>
        <div>
          <Search style={{width:'50%'}} placeholder={'Tìm kiếm'} onSearch={handleSearch}/>
          <Table
            style={{width: '750px'}}
            columns={columns}
            dataSource={data}
            pagination={false}
            size={'small'}
            onRow={(record) => {
              return {
                onDoubleClick: () => {
                  setViewport({...viewport, longitude: record?.lng, latitude: record?.lat, zoom: 12, transitionDuration: 1000})
                }
              }
            }}
          />
        </div>
        <MapGL
          {...viewport}
          width="500px"
          height="1000px"
          onViewportChange={setViewport}
          goongApiAccessToken={GOONG_MAPTILES_KEY}
        >
          <GeolocateControl
            label={'Định vị tôi'}
            style={geolocateControlStyle}
            positionOptions={{enableHighAccuracy: true}}
            trackUserLocation
            auto
            onGeolocate={(data) => {
              setUserLocation({lng: data?.coords?.longitude, lat: data?.coords?.latitude})
              setViewport(initViewPort)
            }
          }
          />
          {data.map((store, index) => <CustomMarker longitude={store?.lng ?? 0} latitude={store?.lat ?? 0} info={{name:store?.nameStore,code: store?.code, address: store?.address, nearest: index === 0}} />)}
        </MapGL>
      </div>
    </PageContainer>

  )
}