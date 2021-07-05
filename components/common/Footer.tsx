import Link from "next/link"
import Logo from "@components/common/Logo"
import Github from "@components/common/Github"
const Footer = () => {
    return (
        <footer className="bg-black p-3">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-b border-accent-2 py-12 text-primary bg-primary transition-colors duration-150">
                <div className="col-span-1 lg:col-span-2">
            <Link href="/">
              <a className="flex flex-initial items-center font-bold md:mr-24">
                <span className="rounded-full border border-accent-6 mr-2">
                  <Logo />
                </span>
                <span className="text-white">ACME</span>
              </a>
            </Link>
          </div>
            <div className="col-span-1 lg:col-span-2 flex items-start lg:justify-end text-primary">
                    <a href="https://github.com/VandanRogheliya/e-comm-site" target="_blank" rel="noreferrer"><div className="flex space-x-6 items-center h-10 text-white"><Github /></div> </a>
            </div>
            </div>
        </footer>
    )
}

export default Footer
