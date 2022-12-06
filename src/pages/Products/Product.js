import {Card, Image, Input} from "antd";
import {PageContainer, Text} from "../../utils/cssStyles";

const { Search } = Input
const {Meta} = Card

export default function Product () {
  const data = [
    {
      name: 'Sữa tươi dinh dưỡng',
      image: '/assets/image5.png',
      price: 10000,
      code: 123456
    },
    {
      name: 'Sữa tươi dinh dưỡng',
      image: '/assets/image5.png',
      price: 10000,
      code: 123456
    },
    {
      name: 'Sữa tươi dinh dưỡng',
      image: '/assets/image5.png',
      price: 10000,
      code: 123456
    },
    {
      name: 'Sữa tươi dinh dưỡng',
      image: '/assets/image5.png',
      price: 10000,
      code: 123456
    },
    {
      name: 'Sữa tươi dinh dưỡng',
      image: '/assets/image5.png',
      price: 10000,
      code: 123456
    },
    {
      name: 'Sữa tươi dinh dưỡng',
      image: '/assets/image5.png',
      price: 10000,
      code: 123456
    },
    {
      name: 'Sữa tươi dinh dưỡng',
      image: '/assets/image5.png',
      price: 10000,
      code: 123456
    },
    {
      name: 'Sữa tươi dinh dưỡng',
      image: '/assets/image5.png',
      price: 10000,
      code: 123456
    },
    {
      name: 'Sữa tươi dinh dưỡng',
      image: '/assets/image5.png',
      price: 10000,
      code: 123456
    },
    {
      name: 'Sữa tươi dinh dưỡng',
      image: '/assets/image5.png',
      price: 10000,
      code: 123456
    },
  ]
  return (
    <PageContainer>
      <Image src={'/assets/image9.png'}/>
      <Text style={{textAlign: 'center'}}>
        Vinamilk luôn mang đến cho bạn những giải pháp dinh dưỡng chất lượng quốc tế, đáp ứng nhu cầu cho mọi đối tượng
        tiêu dùng với các sản phẩm thơm ngon, bổ dưỡng, tốt cho sức khỏe gắn liền với các nhãn hiệu dẫn đầu thị trường hay
        được ưa chuộng như: Sữa nước Vinamilk, Sữa chua Vinamilk, Sữa đặc Ông Thọ và Ngôi Sao Phương Nam, Sữa bột
        Dielac, Nước ép trái cây Vfresh...
      </Text>
      <Search placeholder={'Tìm kiếm'} style={{width: '286px'}}/>
      <div style={{display: 'flex', gap: '72px', flexWrap: 'wrap'}}>
        {data.map(({name, image, price, code}) => {
          return (
            <Card
              hoverable
              style={{ width: '20%', marginTop: '72px' }}
              cover={<img alt="product" src={image} />}
            >
              <Meta title={name}/>
              <Meta title={`${price}đ`}/>
              <Meta description={`#${code}`}/>
            </Card>
          )
        })}
      </div>
      <div style={{marginTop: '72px'}}/>
    </PageContainer>
  )
}