export default function Footer(){
    return (<footer className="bg-black text-white flex justify-center gap-8 text-sm">
        <span>&copy; {new Date().getFullYear()} M.R Homemade Brownies. All Rights reserved</span>
        <span></span>
        <span>Contact us<a href='tel:+916385292762'>+91 6385292762</a></span>
    </footer>)
}