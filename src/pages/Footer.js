import {Image} from "antd";
import {Text} from "../utils/cssStyles";

export default function Footer () {
  return (
    <div style={{background: '#183186', display: 'flex', justifyContent: 'space-around', color: 'white', padding: '16px', height: '266px'}}>
      <div style={{width: '20%'}}>
        <Image src={'/assets/logo.png'} style={{textAlign: 'center'}}/>
        <Text>
          Vinamilk tự hào là Thương hiệu Quốc gia,
          thuộc “Top 10 thương hiệu sữa giá trị nhất toàn cầu”
          và “Top 36 công ty sữa lớn nhất thế giới về doanh thu”.
        </Text>
      </div>
      <div style={{width: '20%'}}>
        <h3 src={'/assets/logo.png'}>
          Địa chỉ
        </h3>
        <Text>
          Số 10, đường Tân Trào, Phường Tân Phú, Quận 7, Thành phố Hồ Chí Minh, Việt Nam.
        </Text>
      </div>
      <div style={{width: '20%'}}>
        <h3 src={'/assets/logo.png'}>
          Liên kết nhanh
        </h3>
        <div>
          <a>
            Sản phẩm
          </a>
        </div>
        <div>
          <a>
            Cửa hàng
          </a>
        </div>
        <div>
          <a>
            Phát triển
          </a>
        </div>
        <div>
          <a>
            Vùng nguyên liệu
          </a>
        </div>
      </div>
      <div style={{width: '20%'}}>
        <h3 src={'/assets/logo.png'}>
          Sản phẩm
        </h3>
        Sữa tươi và sữa dinh dưỡng<br/>
        Sữa chua ăn<br/>
        Sữa chua uống và sữa trái cây<br/>
        Sữa đặc<br/>
        Nước giải khát<br/>
        Kem<br/>
        Phô mai<br/>
      </div>
    </div>
  )
}