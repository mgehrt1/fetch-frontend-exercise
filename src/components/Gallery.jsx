import { useState, useEffect } from "react";
import FilterOption from "./FilterOption";

export default function Gallery() {
    const [breeds, setBreeds] = useState([]); // All dog breeds
    const [filteredBreeds, setFilteredBreeds] = useState([]); // All selected dog breeds
    const [images, setImages] = useState([]); // All images of selected dog breeds
    const [randomDog, setRandomDog] = useState('/src/assets/loading.png'); // Random dog image for when no filters are selected
    const [filterVisible, setFilterVisible] = useState(false);
    const [error, setError] = useState(null); // Error handling

    // Get all the breeds of dogs
    useEffect(() => {
        const getDogs = async () => {
            try {
                const response = await fetch('https://dog.ceo/api/breeds/list/all');
                if (!response.ok) {
                    throw new Error(`Failed to fetch breeds. Status: ${response.status}`);
                }
                const breedData = await response.json();
                setBreeds(Object.keys(breedData.message));
            } catch (error) {
                setError(error.message);
            }
        }

        getDogs();
    }, []);

    // Get all the dog breeds that the user has selected
    useEffect(() => {
        const getFilters = async () => {
            try {
                const breedImagesPromises = filteredBreeds.map(async (breed) => {
                    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/20`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch images for breed ${breed}. Status: ${response.status}`);
                    }
                    const breedImages = await response.json();
                    return breedImages.message;
                })
                
                const breedImages = await Promise.all(breedImagesPromises);
                const allImages = breedImages.reduce((acc, images) => [...acc, ...images], []);
                shuffleArray(allImages); // Shuffle images so they are in random order
                setImages(allImages);
            } catch (error) {
                setError(error.message);
            }
        }

        if (breeds.length > 0) {
            getFilters();
        }
    }, [breeds, filteredBreeds]);

    // Get the image of a random dog if no filters are selected
    useEffect(() => {
        const getRandomDog = async () => {
            try {
                const response = await fetch('https://dog.ceo/api/breeds/image/random');
                if (!response.ok) {
                    throw new Error(`Failed to fetch a random dog. Status: ${response.status}`);
                }
                const randomData = await response.json();
                setRandomDog(randomData.message);
            } catch (error) {
                setError(error.message);
            }
        }

        if (filteredBreeds.length <= 0) {
            getRandomDog();
        }
    }, [filteredBreeds]);

    // Handle setting or unsetting the filtered breeds when checkboxes are selected or deselected
    const handleFilterOptions = (event) => {
        const { name, checked } = event.target;
        if (checked) {
            setFilteredBreeds(prevFilters => [...prevFilters, name]);
            setRandomDog('/src/assets/loading.png');
          } else {
            setFilteredBreeds(prevFilters => prevFilters.filter(breed => breed !== name));
          }
    }

    // This function shuffles an array in place using Fisher-Yates algorithm
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

    return (
        error ? (
            <h1 className='error'>Unexpected Error</h1>
        ) : (
            <div className='gallery-container'>
                <button onClick={() => setFilterVisible(prev => !prev)} className='filters-button'>Filters</button>
                <div className={`filters ${filterVisible ? 'filters-visible' : ''}`}>
                    <h3>Filters</h3>
                    {breeds.map((breed, index) => <FilterOption key={index} breed={breed} checked={filteredBreeds[breed] || false} onChange={handleFilterOptions} />)}
                </div>
                <div className='gallery-images'>
                    <h1>Dog Gallery</h1>
                    {images.length > 0 ? (
                        <div className='gallery-grid'>
                            {images.map((src, index) => <div key={index} className='image-container'><img src={src} className='dog-image' /></div>)}
                        </div>
                    ) : (
                        <div className='filter-message'>
                            <h3>Add some dog breeds to your gallery so you can see awesome dogs like this one!</h3>
                            <div className='random-image-container'><img src={randomDog} className='dog-image' /></div>
                        </div>
                    )}

                </div>
            </div>
        )
    )
}