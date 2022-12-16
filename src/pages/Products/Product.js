import {Card, Image, Input} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {Stack} from "@mui/material";
import {PageContainer, Text} from "../../utils/cssStyles";
import {useAuth} from "../../hooks/useRoute";
import {ADMIN_PATH, USER_PATH} from "../../const/API";

const { Search } = Input
const {Meta} = Card

export default function Product () {
  const [data, setData] = useState([])
  const [productType, setProductType] = useState([])
  const [page, setPage] = useState(1)

  const auth = useAuth();
  const accessKey = 'x-access-token'
  const headers = {
    [accessKey]: auth.user?.accessToken
  }

  const handleLoadData = () => {
    axios.get(USER_PATH.PRODUCT, {params: {perPage: 1000}, headers})
      .then(response => {
        setData(response.data.products)
        setPage(response.data.page)
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
        setData(data.filter(dt => dt?.nameProduct?.toLowerCase().includes(val?.toLowerCase())))
      }
    }
  }

  useEffect(() => {
    handleLoadData()
  },[])

  return (
    <PageContainer>
      <Image src={'/assets/image9.png'}/>
      <Text style={{textAlign: 'center'}}>
        Vinamilk luôn mang đến cho bạn những giải pháp dinh dưỡng chất lượng quốc tế, đáp ứng nhu cầu cho mọi đối tượng
        tiêu dùng với các sản phẩm thơm ngon, bổ dưỡng, tốt cho sức khỏe gắn liền với các nhãn hiệu dẫn đầu thị trường hay
        được ưa chuộng như: Sữa nước Vinamilk, Sữa chua Vinamilk, Sữa đặc Ông Thọ và Ngôi Sao Phương Nam, Sữa bột
        Dielac, Nước ép trái cây Vfresh...
      </Text>
      <Search placeholder={'Tìm kiếm'} onSearch={handleSearch} style={{width: '286px'}}/>
      <div style={{display: 'flex', gap: '72px', flexWrap: 'wrap'}}>
        {data.map(({nameProduct, productCode, productType, image}) => (
            <Card
              hoverable
              style={{ width: '20%', marginTop: '72px' }}
              cover={<img alt="product" src={image ?? '/assets/images/products/milk1.png'} />}
            >
              <Meta style={{marginBottom:"4px"}} title={nameProduct ?? 'N/A'}/>
              <Meta style={{marginBottom:"4px"}} title={
                <Stack>
                  <> Loại: </>
                  <>{productType?.typeString ?? 'N/A'}</>
                </Stack>
                }
              />
              <Meta style={{marginBottom:"4px"}} description={`#${productCode ?? 'N/A'}`}/>
            </Card>
          ))}
      </div>
      <div style={{marginTop: '72px'}}/>
    </PageContainer>
  )
}