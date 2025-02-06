import Image from 'next/image';
import drawFlow from '../public/drawflow.jpg'
export default function LocalImage() {
    return (
       <Image 
            src= {drawFlow} 
            alt="DrawFlow Preview" 
            // width={1200}
            // height={200} 
            layout="responsive"
            priority 
            style={{ objectFit: "cover" }}    
        />
    );
}