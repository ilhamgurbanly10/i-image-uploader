"use client";
import { type Props } from "./types";
import { memo } from "react";
import styles from "./styles.module.css";
import useModel from "./model";
import { params } from "./data";

const UI = ({
    img,
    onClose = () => { },
    show,
    rotateable,
    mirrorable,
    saveText,
    onSave = () => { }
}: Props) => {

    const {
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
    } = useModel(!!rotateable, !!mirrorable, onClose);

    return (
        <div role="dialog" aria-modal="true" onWheel={handleWheel} className={`${styles.container} ${show ? styles.show : ''}`}>

            <div className={`${styles.header}`}>

                {mirrorable &&
                    <button className={`${styles.headerBtn}`} type="button" onClick={handleMirror}>
                        {mirrored ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" /><path d="M10 6C7.5 7 6 8.5 6 12C6 15.5 7.5 17 10 18V6Z" fill="currentColor" /><path d="M14 6C16.5 7 18 8.5 18 12C18 15.5 16.5 17 14 18V6Z" stroke="currentColor" strokeWidth="1.5" /></svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 4V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" /><path d="M10 6C7.5 7 6 8.5 6 12C6 15.5 7.5 17 10 18V6Z" stroke="currentColor" strokeWidth="1.5" /><path d="M14 6C16.5 7 18 8.5 18 12C18 15.5 16.5 17 14 18V6Z" stroke="currentColor" strokeWidth="1.5" /></svg>
                        )}
                    </button>
                }

                {rotateable &&
                    <>
                        <button className={`${styles.headerBtn} ${rotateLeftIsDisabled ? styles.disabled : ''}`} type="button" onClick={() => { handleRotate(); }}>
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="rotate-left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z"></path><path d="M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z"></path></svg>
                        </button>

                        <button className={`${styles.headerBtn} ${rotateRightIsDisabled ? styles.disabled : ''}`} type="button" onClick={() => { handleRotate(true); }}>
                            <svg viewBox="64 64 896 896" focusable="false" data-icon="rotate-right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M480.5 251.2c13-1.6 25.9-2.4 38.8-2.5v63.9c0 6.5 7.5 10.1 12.6 6.1L660 217.6c4-3.2 4-9.2 0-12.3l-128-101c-5.1-4-12.6-.4-12.6 6.1l-.2 64c-118.6.5-235.8 53.4-314.6 154.2A399.75 399.75 0 00123.5 631h74.9c-.9-5.3-1.7-10.7-2.4-16.1-5.1-42.1-2.1-84.1 8.9-124.8 11.4-42.2 31-81.1 58.1-115.8 27.2-34.7 60.3-63.2 98.4-84.3 37-20.6 76.9-33.6 119.1-38.8z"></path><path d="M880 418H352c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H396V494h440v326z"></path></svg>
                        </button>
                    </>
                }

                {saveable &&
                    <button onClick={async () => {
                        if (!hasChanges) return;
                        await onSave(getSavedData());
                        onClose();
                        resetOnClose();
                    }}
                        className={`${styles.headerBackgorundedBtn} ${!hasChanges ? styles.disabled : ''}`
                        }>
                        {saveText}
                    </button>}

                <button type="button" className={`${styles.headerBtn} ${zoom <= params.minZoomLimit ? styles.disabled : ''}`} onClick={() => { setZoom((z) => Math.max(z - params.zoomNumber, params.minZoomLimit)); }}>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="zoom-out" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M637 443H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h312c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path></svg>
                </button>

                <button type="button" className={`${styles.headerBtn} ${zoom >= params.maxZoomLimit ? styles.disabled : ''}`} onClick={() => { setZoom((z) => Math.min(z + params.zoomNumber, params.maxZoomLimit)); }}>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="zoom-in" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M637 443H519V309c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v134H325c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h118v134c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V519h118c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8zm284 424L775 721c122.1-148.9 113.6-369.5-26-509-148-148.1-388.4-148.1-537 0-148.1 148.6-148.1 389 0 537 139.5 139.6 360.1 148.1 509 26l146 146c3.2 2.8 8.3 2.8 11 0l43-43c2.8-2.7 2.8-7.8 0-11zM696 696c-118.8 118.7-311.2 118.7-430 0-118.7-118.8-118.7-311.2 0-430 118.8-118.7 311.2-118.7 430 0 118.7 118.8 118.7 311.2 0 430z"></path></svg>
                </button>

                <button className={`${styles.headerBtn}`} onClick={() => { onClose(); resetOnClose(); }}>
                    <svg fillRule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path></svg>
                </button>

            </div>

            {!!img &&
                <img
                    draggable={false}
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px)  scaleX(${mirrored ? -zoom : zoom}) scaleY(${zoom}) rotate(${rotate}deg)`,
                        cursor: zoom > params.minZoomLimit ? (dragging ? "grabbing" : "grab") : "default",
                        transition: dragging ? 'none' : 'transform .2s ease'
                    }}
                    src={img}
                    className={`${styles.img} ${rotate === 90 || rotate === 270 ? styles.verticalRotated : ''}`}
                    onMouseDown={handleMouseDown}
                />}

        </div>
    )

}

export default memo(UI);

