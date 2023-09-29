import { useState, useEffect } from "react";

export default function Explore() {
    const [randomDog, setRandomDog] = useState('/src/assets/loading.png'); // Random dog image
    const [breed, setBreed] = useState(''); // Breed of current random dog
    const [error, setError] = useState(null); // Error handling

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getRandomDog = async () => {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            if (!response.ok) {
                throw new Error(`Failed to fetch a random dog. Status: ${response.status}`);
            }
            const randomData = await response.json();
            console.log(randomData);
            setRandomDog(randomData.message);
    
            const parts = randomData.message.split('/');
            const breedIndex = parts.indexOf("breeds"); // Find the index of "breeds"
    
            if (breedIndex !== -1) {
                const currentBread = parts[breedIndex + 1]; // Get the part after "breeds"
                const breedParts = currentBread.split('-');
                if (breedParts.length > 1) {
                    setBreed(capitalize(breedParts[1]) + ' ' + capitalize(breedParts[0]));
                } else {
                    setBreed(capitalize(currentBread));
                }
            } else {
                setBreed("Unknown");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        getRandomDog();
    }, []);

    return (
        error ? (
            <h1 className='error'>Unexpected Error</h1>
        ) :(
            <div className='explore-container'>
                <h1>Explore new dog breeds!</h1>
                <div className='random-image-container'><img src={randomDog} className='dog-image' /></div>
                <h4>This is a {breed}</h4>
                <button onClick={getRandomDog}>Generate a New Dog</button>
            </div>
        )
    )
}