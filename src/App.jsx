import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import Gallery from './components/Gallery';
import Explore from './components/Explore';

export default function App() {
    let component;
    switch(window.location.pathname) {
        case '/gallery':
            component = <Gallery />;
            break;
        case '/explore':
            component = <Explore />;
            break;
        default:
            component = <Home />;
    }
    return (
        <>
            <Nav />
            <section className='main-container'>
                {component}
            </section>
        </>
    )
}


