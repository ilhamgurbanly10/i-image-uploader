import type { Dispatch, SetStateAction, RefObject } from "react";
import type { SavedData } from "./components/Preview/types";

export interface Options {
    formats?: Formats;
    preview?: boolean;
    uploaderHeight?: number;
    uploaderWidth?: number;
    multiple?: boolean;
    removeable?: boolean;
    rotateable?: boolean;
    showLabel?: boolean;
    mirrorable?: boolean;
}

export type Formats = "all" | string[];

export interface Errors {
    min: boolean;
    max: boolean;
    required: boolean;
    hasError: boolean;
}

export interface Rules {
    requirement?: Requirement;
    min?: Limit;
    max?: Limit;
}

export interface Requirement {
    isRequired: boolean,
    mes: string;
}

export interface Limit {
    limit: number | null;
    mes: string;
}

export interface Props {
    data: DataReturnedData;
    options?: Options;
    translates?: Translates;
    rules?: Rules;
    className?: string;
}

export interface ModelProps {
    options?: Options;
    translates?: Translates;
    data: DataReturnedData;
    rules?: Rules;
}

export interface ModelReturnedData {
    openImgInput: () => void;
    imgInputRef: RefObject<HTMLInputElement | null>;
    allOptions: Required<Options>;
    accept: string;
    allTranslates: Required<Translates>;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemove: (id: string) => void;
    previewImg: PreviewImg;
    openPreviewImg: (data: Image) => void;
    closePreviewImg: () => void;
    allRules: Required<Rules>;
    isRequired: boolean;
    imgIsLoaded: (id: string) => void;
    handlePreviewSave: (data: SavedData) => void;
    id: string;
}

export interface DataReturnedData {
    images: Images;
    setImages: Dispatch<SetStateAction<Images>>;
    errors: Errors;
    setErrors: Dispatch<SetStateAction<Errors>>;
}

export interface Image {
    id: string;
    file: File;
    url: string;
    loading: boolean;
}

export type Images = Image[];

export interface Translates {
    upload?: string;
    label?: string;
    loading?: string;
    save?: string;
}

export type PreviewImg = null | Image;