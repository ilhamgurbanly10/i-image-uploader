import { default as IImageUploader } from "./ui";
import useData from "./dataHook";
export { useData as useIImageUploaderData };
export type { 
    Options as IImageUploaderOptions, 
    Translates as IImageUploaderTranslates, 
    Rules as IImageUploaderRules, 
    DataReturnedData as IImageUploaderDataReturnedData, 
    Images as IImageUploaderImages, 
    Errors as IImageUploaderErrors
} from "./types"
export default IImageUploader;