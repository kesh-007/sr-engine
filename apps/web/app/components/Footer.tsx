import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="text-gray-400 dark:text-white flex justify-between body-text w-full gap-y-10 border-t border-black-400  px-10 py-6 max-md:flex-col">
      <p>Copyright © 2023 SR Engine | All Rights Reserved ✌️</p>

      <div className="flex gap-x-9 ">
      
      <Link href="/terms-of-use">
      <p className="capitalize
                inline-block
                
                relative
                cursor-pointer
                transition-all
                duration-500
                before:content-['']
                before:absolute
                before:-bottom-2
                before:left-0
                before:w-0
                before:h-1
                before:rounded-full
                before:opacity-0
                before:transition-all
                before:duration-500
                before:bg-gradient-to-r
                before:from-gray-600
                before:via-slate-400
                before:to-zinc-500
                hover:before:w-full
                hover:before:opacity-100
        ">
          Terms & Conditions
      </p>

</Link>
      
<Link href="/privacy-policy">
      <p className="capitalize
                inline-block
                
                relative
                cursor-pointer
                transition-all
                duration-500
                before:content-['']
                before:absolute
                before:-bottom-2
                before:left-0
                before:w-0
                before:h-1
                before:rounded-full
                before:opacity-0
                before:transition-all
                before:duration-500
                before:bg-gradient-to-r
                before:from-gray-600
                before:via-slate-400
                before:to-zinc-500
                hover:before:w-full
                hover:before:opacity-100
        ">
          Privacy Policy
      </p>

</Link>


      </div>
    </footer>
  )
}

export default Footer