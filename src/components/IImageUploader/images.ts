import { useState } from "react";
import type { ImagesReturnedData, Images, Errors } from "./types";
import { initialErrors } from "./data";

const useImages = (): ImagesReturnedData => {

    const [images, setImages] = useState<Images>([]);
    const [errors, setErrors] = useState<Errors>(initialErrors);

    return {
        images, 
        setImages, 
        errors, 
        setErrors
    }

}

export default useImages;