import React, {Component, useState} from "react";
import MapGL, {MapContext} from '@goongmaps/goong-map-react';
import {Input, Table} from "antd";
import {EnvironmentTwoTone} from "@ant-design/icons";
import {red} from "@mui/material/colors";
import {PageContainer} from "../../utils/cssStyles";

const GOONG_MAPTILES_KEY = 'ZuqMdvolU0bH4wIUduvcei9vJYfzPK3zPG7rI6d6';
const {Search} = Input
const dataSource = [
  {
    index: 1,
    code: 'CH001',
    name: 'Hà Nội',
    address: '10 Downing Street',
  },
  {
    index: 2,
    code: 'CH001',
    name: 'Hà Nội',
    address: '10 Downing Street',
  },
  {
    index: 3,
    code: 'CH001',
    name: 'Hà Nội',
    address: '10 Downing Street',
  },
  {
    index: 4,
    code: 'CH001',
    name: 'Hà Nội',
    address: '10 Downing Street',
  },
  {
    index: 5,
    code: 'CH001',
    name: 'Hà Nội',
    address: '10 Downing Street',
  },
  {
    index: 6,
    code: 'CH001',
    name: 'Hà Nội',
    address: '10 Downing Street',
  },
  {
    index: 7,
    code: 'CH001',
    name: 'Hà Nội',
    address: '10 Downing Street',
  },
];

const columns = [
  {
    title: 'STT',
    dataIndex: 'index',
    render: (val) => val??'-'
  },
  {
    title: 'Mã cửa hàng',
    dataIndex: 'code',
    render: (val) => val??'-'
  },
  {
    title: 'Tên cửa hàng',
    dataIndex: 'name',
    render: (val) => val??'-'
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    render: (val) => val??'-'
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    render: (val) => val??'-'
  },
];

export default function Store () {
  const [viewport, setViewport] = useState({
    latitude: 15.798863,
    longitude: 105.958306,
    zoom: 5.5,
    bearing: 0,
    pitch: 0
  });

  const CustomMarker = (props) =>  {
    const context = React.useContext(MapContext);

    const {longitude, latitude} = props;

    const [x, y] = context.viewport.project([longitude, latitude]);

    const markerStyle = {
      position: 'absolute',
      left: x,
      top: y
    };

    return (
      <EnvironmentTwoTone twoToneColor={'red'} c style={markerStyle} />
    );
  }

  return (
    <PageContainer>
      <h2 style={{textAlign:'center'}}>
        Hệ thống cửa hàng Vinamilk trong nước
      </h2>
      <div style={{display: 'flex', justifyContent:'space-around'}}>
        <div>
          <Search style={{width:'50%'}} placeholder={'Tìm kiếm'}/>
          <Table
            columns={columns}
            dataSource={dataSource}
          />
        </div>
        <MapGL
          {...viewport}
          width="600px"
          height="1000px"
          onViewportChange={setViewport}
          goongApiAccessToken={GOONG_MAPTILES_KEY}
        >
          <CustomMarker longitude={105.958306} latitude={15.798863} />
          <CustomMarker longitude={106.958306} latitude={16.798863} />
        </MapGL>
      </div>
    </PageContainer>

  )
}