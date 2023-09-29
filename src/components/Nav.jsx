import NavOption from "./NavOption";

export default function Nav() {
    return (
        <nav>
            <div className='logo'>
                Fetch Logo
            </div>
            <div className='nav-options'>
                <NavOption />
                <NavOption />
                <NavOption />
            </div>
        </nav>
    )
}