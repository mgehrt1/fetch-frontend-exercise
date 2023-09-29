import { useState } from "react";

export default function FilterOption({breed, checked, onChange}) {
    const [isMainChecked, setIsMainChecked] = useState(checked); // Checkbox status

    // Function to capitalize the first letter of a word
    const capitalize = (string) => {
        if (typeof string !== "string" || string.length === 0) {
            return "";
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Handles checking the checkbox, and calling the callback function that was passed
    const handleCheckboxChange = (event) => {
        const { checked } = event.target;
        setIsMainChecked(checked);
        onChange(event);
    }

    return (
        <div>
            <div>
                <input type="checkbox" name={breed} checked={isMainChecked} onChange={handleCheckboxChange} />
                <label>{capitalize(breed)}</label>
            </div>
        </div>
    )
}