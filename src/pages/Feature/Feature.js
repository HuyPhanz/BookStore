import {Image} from "antd";
import {PageContainer} from "../../utils/cssStyles";

export default function Feature () {
  return (
    <PageContainer>
      <Image src={'/assets/bg1.png'}/>
      <Image preview={false} src={'/assets/image10.png'}/>
    </PageContainer>
  )
}