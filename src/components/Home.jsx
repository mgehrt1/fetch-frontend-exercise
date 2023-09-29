export default function Home() {
    return (
        <div className='home-container'>
            <h1>Welcome to Pawsome Pics!</h1>
            <div className='options-container'>
                <div className='option'>
                    <h3>See pictures of your favorite dog breeds in the Gallery</h3>
                    <a href='gallery'>Gallery</a>
                </div>
                <div className='option'>
                    <h3>Check out cool new dog breeds in the Explore page</h3>
                    <a href='explore'>Explore</a>
                </div>
            </div>
        </div>
    )
}