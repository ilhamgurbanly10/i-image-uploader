
import type { Dispatch, SetStateAction } from "react";

export interface UseModelReturnType {
    zoom: number;
    setZoom: Dispatch<SetStateAction<number>>;
    handleWheel: (e: React.WheelEvent<HTMLImageElement>) => void;
    handleMouseDown: (e: React.MouseEvent<HTMLImageElement>) => void;
    position: Position;
    dragging: boolean;
    resetOnClose: () => void;
    rotate: Rotate;
    rotateLeftIsDisabled: boolean; 
    rotateRightIsDisabled: boolean; 
    handleRotate: (next?: boolean) => void;
    hasChanges: boolean;
    saveable: boolean;
    getSavedData: () => SavedData;
    mirrored: boolean;
    handleMirror: () => void;
}

export interface Params {
    maxZoomLimit: number;
    minZoomLimit: number;
    zoomNumber: number;
    initialZoom: number;
}

export interface Props {
    img: string;
    show: boolean;
    onClose: () => void;
    rotateable?: boolean;
    mirrorable?: boolean;
    saveText: string;
    onSave?: (data: SavedData) => void | Promise<void>;
}

export interface SavedData {
    rotate: null | number;
    mirrored: boolean;
}

export type Rotate = number;



export interface Position { x: number, y: number };

