import type { Options, Rules, Errors } from "./types";

export const initialOptions: Required<Options> = {
    formats: "all",
    preview: true,
    uploaderHeight: 90,
    uploaderWidth: 90,
    multiple: true,
    removeable: true,
    showLabel: true, 
    rotateable: true, 
    mirrorable: true
}

export const initialRules: Required<Rules> = {
    requirement: {
        isRequired: true,
        mes: 'This field is required'
    },
    min: {
        limit: null,
        mes: ''
    },
    max: {
        limit: null,
        mes: ''
    }
}

export const initialErrors: Errors = {
    min: false,
    max: false,
    required: false, 
    hasError: false
}