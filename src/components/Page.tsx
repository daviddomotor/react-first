import { FC, ReactNode } from "react"
import Navbar from "./Navbar"

export interface PageProps {
    contentClass?: string;
    children?: ReactNode;
}

const Page: FC<PageProps> = ({contentClass, children}) => {
    return(
        <div className="w-100">
            <Navbar />
            
            <div className={'page-content ' + contentClass}>
                {children}
            </div>
        </ div>
    )
}

export default Page;
