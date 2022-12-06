import {Text} from "../../utils/cssStyles";

export default function Card ({icon, title, des}) {
  return (
    <div style={{textAlign:'center'}}>
      {icon}
      <div style={{boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', width: '337px', height: '245px', padding: '0px 18px'}}>
        <Text style={{fontWeight: 'bold'}}>{title}</Text>
        <Text>{des}</Text>
      </div>
    </div>
  )
}