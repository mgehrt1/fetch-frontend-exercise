import NavOption from "./NavOption";

export default function Nav() {
    return (
        <nav>
            <div className='logo'>
                Fetch Logo
            </div>
            <div className='nav-options'>
                <NavOption title='Home' path='/' />
                <NavOption title='Gallery' path='gallery' />
                <NavOption title='Explore' path='explore' />
            </div>
        </nav>
    )
}