import { LuPhone } from "react-icons/lu"; 
export default function Footer(){
    return (<footer className="bg-black text-white flex justify-center gap-8 text-sm">
        <span>&copy; {new Date().getFullYear()} M.R Homemade Brownies. All Rights reserved</span>
        
        <span ><a href='tel:+918270679793' className="flex items-center align gap-1"><LuPhone /> +91 82706 79793</a></span>
    </footer>)
}