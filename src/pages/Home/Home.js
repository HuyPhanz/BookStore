import {Button, Image} from "antd";
import {CheckOutlined} from "@ant-design/icons";
import {PageContainer, Text} from "../../utils/cssStyles";
import Card from "./Card";

export default function Home () {
  return (
    <PageContainer>
      <h2>
        Thông tin chung
      </h2>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div>
          <h1>
            Công ty cổ phần sửa Việt Nam
          </h1>
          <div>
            <span style={{fontWeight: 'bold'}}>Mã cổ phiếu: </span> VNM
          </div>
          <div>
            <span style={{fontWeight: 'bold'}}>Tên tiếng Anh: </span> Vietnam Dairy Products Joint Stock Company
          </div>
          <div>
            <span style={{fontWeight: 'bold'}}>Tên viêt tắt: </span> Vinamilk
          </div>
          <div>
            <span style={{fontWeight: 'bold'}}>Vốn điều tệ: </span> 20.899.554.450.000 đồng
          </div>
          <div>
            <span style={{fontWeight: 'bold'}}>Trụ sở chính: </span> 10 Tân Trào, Phường Tân Phú, Quận 7, TP.HCM
          </div>
          <div>
            <span style={{fontWeight: 'bold'}}>Điện thoại: </span> (84-28) 54 155 555
          </div>
          <div>
            <span style={{fontWeight: 'bold'}}>Fax: </span> (84-28) 54 161 226
          </div>
          <div>
            <span style={{fontWeight: 'bold'}}>Email: </span> vinamilk@vinamilk.com.vn
          </div>
          <div>
            <span style={{fontWeight: 'bold'}}>Website: </span> www.vinamilk.com.vn
          </div>
          <Button>Xem thêm</Button>
        </div>
        <Image src={'/assets/vina1.png'}/>
      </div>

      <h1 style={{textAlign:'center'}}>Ba trụ cột phát triển bền vững của Vinamilk</h1>

      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <Card icon={<Image src={'/assets/icons/icon1.png'} width={'94px'}/>} title={'Thiên nhiên'} des={'Vinamilk xem thiên nhiên là bạn đồng hành cùng Phát triển bền vững và hướng đến giảm thiểu dấu chân carbon trên lộ trình tăng trưởng xanh; ứng dụng kỹ thuật hiện đại thân thiện môi trường'}/>
        <Card icon={<Image src={'/assets/icons/icon2.png'} width={'94px'}/>} title={'Thiên Con người'} des={'Vinamilk luôn nỗ lực vượt qua mọi thách thức, bứt phá giới hạn, kiến tạo thành công và sẻ chia giá trị cùng phát triển với các bên liên quan nhằm hướng đến “Vươn cao Việt Nam, vươn tầm thế giới”.'}/>
        <Card icon={<Image src={'/assets/icons/icon3.png'} width={'94px'}/>} title={'Sản phẩm'} des={'Vinamilk cam kết mang lại những sản phẩm an toàn, giá trị, lợi ích tốt nhất về cho sức khỏe con người và hướng đến tạo ra nhiều sản phẩm, dịch vụ thân thiện với môi trường.'}/>
      </div>

      <div>
        <h1 style={{textAlign:'center'}}>
          Tầm nhìn và sứ mệnh</h1>
        <Text style={{padding: '0px 36px'}}>
          “Trở thành biểu tượng niềm tin hàng đầu Việt Nam về sản phẩm dinh dưỡng và sức khỏe phục vụ cuộc sống con người“.
          “Vinamilk cam kết mang đến cho cộng đồng nguồn dinh dưỡng và chất lượng cao cấp hàng đầu bằng chính sự trân trọng, tình yêu và trách nhiệm cao của mình với cuộc sống con người và xã hội”.
        </Text>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '100px'}}>
        <Image src={'/assets/image5.png'}/>
        <div style={{width: '50%'}}>
          <div>
            <h2 style={{textAlign: 'center'}}>Triết lý kinh doanh</h2>
            <Text>
              Vinamilk mong muốn trở thành sản phẩm được yêu thích ở mọi khu vực, lãnh thổ. Vì thế chúng tôi tâm niệm rằng chất lượng và sáng tạo là người bạn đồng hành của Vinamilk.
              Vinamilk xem khách hàng là trung tâm và cam kết đáp ứng mọi nhu cầu của khách hàng
             </Text>
            <h3>Chính sách chất lượng</h3>
            <Text>
              Luôn thỏa mãn và có trách nhiệm với khách hàng bằng cách không ngừng cải tiến, đa dạng hóa sản phẩm và dịch vụ, đảm bảo chất lượng,
              an toàn vệ sinh thực phẩm với giá cả cạnh tranh, tôn trọng đạo đức kinh doanh và tuân theo luật định.
            </Text>
          </div>
        </div>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '32px'}}>
        <div style={{width: '50%'}}>
          <h2 style={{textAlign: 'center'}}>
            Hệ thống quản trị
          </h2>
          <div style={{marginTop: '16px'}}>
            <h4>
              SƠ ĐỒ TỔ CHỨC
            </h4>
            <Text>
              Sơ đồ tổ chức của Vinamilk được thể hiện một cách chuyên nghiệp và phân bổ phòng ban một cách khoa học và hợp lý, phân cấp cụ thể trách nhiệm của mỗi thành viên và phòng ban trong công ty.
              Sơ đồ tổ chức giúp cho chúng tôi hoạt động một cách hiệu quả nhất, giúp các phòng ban phối hợp nhau chặt chẽ để cùng tạo nên một Vinamilk vững mạnh.
            </Text>
          </div>
          <div style={{marginTop: '16px'}}>
            <h4>
              QUY CHẾ NỘI BỘ VỀ QUẢN TRỊ CÔNG TY
            </h4>
            <Text>
              Quy chế quản trị của Vinamilk là hệ thống các nguyên tắc và quy tắc để đảm bảo cho công ty được định hướng,
              điều hành và được kiểm soát một cách có hiệu quả vì quyền lợi của cổ đông và những bên có quyền lợi liên quan đến công ty.
            </Text>
          </div>
          <div style={{marginTop: '16px'}}>
            <h4>
              QUY TẮC ỨNG XỬ
            </h4>
            <Text>
              Bộ quy tắc ứng xử của Vinamilk là cam kết đề cao Chính trực, thúc đẩy Tôn trọng, đảm bảo Công bằng, duy trì Tuân thủ và coi trọng Đạo đức,
              là kim chỉ nam cho tất cả hoạt động hàng ngày tại Vinamilk, nhằm vươn đến sự phát triển vững mạnh trong tương lai.
            </Text>
          </div>
        </div>
        <Image src={'/assets/image8.png'}/>
      </div>

      <div style={{marginTop: '32px', marginBottom: '64px'}}>
        <h2 style={{textAlign: 'center'}}>
          Thông tin dinh dưỡng
        </h2>
        <h2 style={{textAlign: 'center'}}>
          Quy trình chiết xuất Fucoidan chuẩn quốc tế của Kenko Haru
        </h2>
        <div style={{display: 'flex', justifyContent: "space-around"}}>
          <div>
            <Text>
              Phòng chống bệnh tim mạch và đột quị với sữa không tách béo <CheckOutlined style={{color: '#854DCE'}} />
            </Text>
            <Text>
              Bốn cách đơn giản phòng ngừa các bệnh truyền nhiễm theo mùa <CheckOutlined style={{color: '#854DCE'}} />
            </Text>
            <Text>
              Dinh dưỡng vàng cho phát triển tối ưu não bộ <CheckOutlined style={{color: '#854DCE'}} />
            </Text>
            <Text>
              Đôi điều về hạt đậu tương và sữa đậu nành <CheckOutlined style={{color: '#854DCE'}} />
            </Text>
          </div>
          <div>
            <Image src={'/assets/image6.png'}/>
            <br/>
            <Image src={'/assets/image7.png'}/>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}