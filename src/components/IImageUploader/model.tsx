import { useRef, useMemo, useState, useCallback } from "react";
import type { ModelReturnedData, ModelProps, Options, Translates, Images, PreviewImg, Rules, Errors } from "./types";
import { initialOptions, initialRules, initialErrors } from "./data";
import { defaultTranslates } from "./translates";
import { rotateImageFile, mirrorImageFile } from "./utils";
import type { SavedData } from "./components/Preview/types";

const useModel = ({ options, translates, data, rules }: ModelProps): ModelReturnedData => {

    console.log(data, 'myData')
    const imgInputRef = useRef<HTMLInputElement>(null);

    // preview
    const [previewImg, setPreviewImg] = useState<PreviewImg>(null);

    const closePreviewImg = useCallback(() => {
        setPreviewImg(null);
    }, []);

    const openPreviewImg = useCallback((data: PreviewImg) => {
        setPreviewImg(data);
    }, []);
    // end-preview

    // errors
    const detectErrors = (images: Images): void => {
        const errors: Errors = { ...initialErrors };
        if (allRules.requirement.isRequired && !images.length) errors.required = true;
        else if (allRules?.min?.limit !== null && images.length < allRules?.min?.limit) errors.min = true;
        else if (allRules?.max?.limit !== null && images.length > allRules?.max?.limit) errors.max = true;
        if (errors.min || errors.max || errors.required) errors.hasError = true;
        data.setErrors(errors);
    }
    // end-errors

    // actions
    const openImgInput = () => { imgInputRef.current?.click(); };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files = event.target.files;

        // Burada ve silende error handler olmalidir ki errorlari mueyyen etmelidir.
        if (!files) return;

        const images: Images = Array.from(files).map(file => ({
            id: crypto.randomUUID(),
            file,
            url: URL.createObjectURL(file),
            loading: true
        }));

        data.setImages((prev) => { detectErrors([...prev, ...images]); return [...prev, ...images] })

    };

    const imgIsLoaded = (id: string) => {
        data.setImages((prev) => {
            return prev.map((item) => {
                return {
                    ...item,
                    loading: item.id === id ? false : item.loading
                }
            })
        });
    }

    const handleRemove = (id: string): void => {
        data.setImages((prev) => {
            const data = prev.filter((item) => { return item.id !== id });
            detectErrors(data);
            return data;
        })
    }

    // end-actions

    // memoized-values
    const allOptions = useMemo<Required<Options>>(() => {
        return {
            ...initialOptions,
            ...(options ?? {})
        }
    }, []);

    const allTranslates = useMemo<Required<Translates>>(() => {
        return {
            ...defaultTranslates,
            ...(translates ?? {})
        }
    }, [JSON.stringify(translates)]);

    const allRules = useMemo<Required<Rules>>(() => {
        return {
            ...initialRules,
            ...(rules ?? {})
        }
    }, [JSON.stringify(rules)]);

    const isRequired = useMemo<boolean>(() => {
        return allRules.requirement.isRequired
    }, [JSON.stringify(allRules)])

    const accept = useMemo<string>(() => {
        return allOptions.formats === "all" ? "image/*" : allOptions.formats.map(format => `.${format}`).join(",")
    }, [JSON.stringify(allOptions)]);
    // end-memoized-values

    // saving
    const handlePreviewSave = async ({ rotate, mirrored }: SavedData) => {

        try {

            if (!previewImg) return;

            let file = previewImg.file;

            file = await rotateImageFile(file, rotate);

            file = await mirrorImageFile(file, mirrored);


            const url = URL.createObjectURL(file);

            data.setImages((prev) =>
                prev.map((item) =>
                    item.id === previewImg.id
                        ? {
                            ...item,
                            file,
                            url,
                        }
                        : item
                )
            );

        } catch (error) {
            console.error(
                "Failed to edit image:",
                error
            );
        }

        closePreviewImg();
    };
    //end-saving

    return {
        openImgInput,
        imgInputRef,
        allOptions,
        accept,
        allTranslates,
        handleImageChange,
        handleRemove,
        previewImg,
        closePreviewImg,
        openPreviewImg,
        allRules,
        isRequired,
        imgIsLoaded,
        handlePreviewSave
    }

}

export default useModel;