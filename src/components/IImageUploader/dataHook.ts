import { useState } from "react";
import type { DataReturnedData, Images, Errors } from "./types";
import { initialErrors } from "./data";

const useData = (): DataReturnedData => {

    const [images, setImages] = useState<Images>([]);
    const [errors, setErrors] = useState<Errors>(initialErrors);

    return {
        images, 
        setImages, 
        errors, 
        setErrors
    }

}

export default useData;