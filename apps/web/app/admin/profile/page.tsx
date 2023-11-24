import toast, { Toaster } from 'react-hot-toast';
import Welcome from '../../../assets/undraw_welcome.svg'
import Image from 'next/image'
import DialogDemo from "@/app/components/ProfileDialog";

const Page = () => {
  return (
    <div>
            <Toaster />

      <div className='h-[50vh]'>
      <Image
        src={Welcome}
        alt="welcome"
        style={{
          width:'100%',
          height:'100%',
          objectFit:'contain'

        }}
        
      />
      </div>
      <div className='flex  justify-center gap-4'>

      <img
  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAUqSl2WR2tgn2eMTHnK9i0w4ezNS0MmGeYw&usqp=CAU'
  width={200}
  height={200}
  alt='Profile'
  className="rounded-full border-2 border-black"
/>
<div className='mt-[4rem]'>
<DialogDemo/>
</div>

      </div>
    </div>
  )
}

export default Page