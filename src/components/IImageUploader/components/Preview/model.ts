import { useEffect, useMemo, useRef, useState } from "react";
import type { UseModelReturnType, Position, Rotate, SavedData } from "./types";
import { params, initialRotate } from "./data";

const useModel = (rotateable: boolean, mirrorable: boolean): UseModelReturnType => {

    const [position, setPosition] = useState<Position>({ x: 0, y: 0, });
    const [dragging, setDragging] = useState<boolean>(false);
    const start = useRef({ x: 0, y: 0, });
    const [zoom, setZoom] = useState<number>(params.initialZoom);

    //mirror
    const [mirrored, setMirrored] = useState<boolean>(false);
    const handleMirror = (): void => {
        setMirrored((prev) => !prev);
        resetPosition();
    };
    
    const resetMirror = (): void => setMirrored(false);
    //end-mirror

    // rotate
    const [rotate, setRotate] = useState<Rotate>(0);
    const rotateLeftIsDisabled = useMemo<boolean>(() => { return rotate === 0 }, [rotate]);
    const rotateRightIsDisabled = useMemo<boolean>(() => { return rotate === 360 }, [rotate]);

    const handleRotate = (next?: boolean): void => {
        if (next && !rotateRightIsDisabled) { setRotate((prev) => prev + 90); resetPosition(); }
        else if (!next && !rotateLeftIsDisabled) { setRotate((prev) => prev - 90); resetPosition(); }
    }

    const resetRotate = (): void => setRotate(initialRotate);
    // end-rotate

    // saving
    const hasChanges = useMemo<boolean>(() => {
        return rotate !== initialRotate || mirrored ? true : false
    }, [rotate, mirrored])

    const saveable = useMemo<boolean>(() => {
        return rotateable || mirrorable ? true : false
    }, [rotateable, mirrorable]);

    const getSavedData = (): SavedData => {
        return {
            rotate: rotate !== initialRotate ? rotate : null,
            mirrored: mirrored
        }
    }
    //end-saving

    // resetting
    const resetZoom = (): void => setZoom(params.initialZoom);

    const resetPosition = (): void => {
        setPosition({ x: 0, y: 0, });
        start.current = { x: 0, y: 0, }
    }

    const resetOnClose = (): void => {
        resetZoom();
        resetPosition();
        resetRotate();
        resetMirror();
    }
    // end-resetting

    // dragging
    const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
        if (zoom <= params.minZoomLimit) return;

        setDragging(true);

        start.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    useEffect(() => {

        if (!dragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({
                x: e.clientX - start.current.x,
                y: e.clientY - start.current.y,
            });
        };

        const handleMouseUp = () => {
            setDragging(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging]);
    // end-dragging

    // zoom
    const handleWheel = (e: React.WheelEvent<HTMLImageElement>) => {

        setZoom((prev) => {
            const next =
                e.deltaY < 0
                    ? prev + params.zoomNumber
                    : prev - params.zoomNumber;

            return Math.min(params.maxZoomLimit, Math.max(params.minZoomLimit, next));
        });
    };
    // end-zoom

    return {
        zoom,
        setZoom,
        handleWheel,
        handleMouseDown,
        position,
        dragging,
        resetOnClose,
        rotate,
        rotateLeftIsDisabled,
        rotateRightIsDisabled,
        handleRotate,
        hasChanges,
        saveable,
        getSavedData,
        mirrored,
        handleMirror
    }
}

export default useModel;