import { memo } from "react";
import type { Props } from "./types";
import useModel from "./model";
import styles from "./styles/styles.module.css";
import IPreview from "./components/Preview";

const UI: React.FC<Props> = ({ data, options, translates, rules }) => {

    const {
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
    } = useModel({ options, translates, data, rules });

    return (
        <div>

            <IPreview
                show={!!previewImg}
                onClose={closePreviewImg}
                img={previewImg?.url ?? ""}
                rotateable={allOptions.rotateable}
                mirrorable={allOptions.mirrorable}
                saveText={allTranslates.save}
                onSave={handlePreviewSave}
            />

            { allOptions.showLabel && <label className={styles.label} onClick={openImgInput}>
                {isRequired && <span className={styles.requiredSign}>*</span>} { allTranslates.label }
            </label> }

            <div className={styles.container}>

                {data.images.map((item, index) => (
                    <div
                        className={styles.uploadedImg}
                        key={item.id}
                        style={{
                            width: `${allOptions.uploaderWidth}px`,
                            height: `${allOptions.uploaderHeight}px`,
                            maxWidth: `${allOptions.uploaderWidth}px`,
                            maxHeight: `${allOptions.uploaderHeight}px`
                        }}
                    >
                        <img key={`${item.id}-${index}`} onLoad={() => { setTimeout(() => { imgIsLoaded(item.id); }, 250)}} src={item.url} className={styles.uploadedImgImg} />
                        <div className={styles.imgOverlay}>
                            {allOptions.preview && <button className={`${styles.iconicBtn} ${styles.btnHoverAnimation}`} type="button" onClick={() => { openPreviewImg(item); }}><svg viewBox="64 64 896 896" focusable="false" data-icon="edit" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path></svg></button>}
                            {allOptions.removeable && <button className={`${styles.iconicBtn} ${styles.btnHoverAnimation}`} type="button" onClick={() => { handleRemove(item.id); }}><svg viewBox="64 64 896 896" focusable="false" data-icon="delete" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path></svg></button>}
                        </div>
                        {item.loading && <div className={styles.uploadedImgLoader}>
                            <span>{allTranslates.loading}...</span>
                        </div>}
                    </div>
                ))}

                <button
                    style={{
                        width: `${allOptions.uploaderWidth}px`,
                        height: `${allOptions.uploaderHeight}px`,
                        maxWidth: `${allOptions.uploaderWidth}px`,
                        maxHeight: `${allOptions.uploaderHeight}px`
                    }}
                    className={`${styles.uploadBtn} ${data.errors.hasError ? styles.uploadBtnError : ''}`}
                    type="button"
                    onClick={openImgInput}
                >
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"></path></svg>
                    <span style={{ maxWidth: `${allOptions.uploaderWidth - 20}px` }}
                        className={styles.uploadBtntext}>
                        {allTranslates.upload}
                    </span>
                </button>

                <input
                    ref={imgInputRef}
                    type="file"
                    accept={accept}
                    multiple={allOptions.multiple}
                    hidden
                    onChange={handleImageChange}
                />

                <div className={styles.errorContainer}>
                    { data.errors.required && <p className={styles.error}>{ allRules.requirement.mes }</p>}
                    { data.errors.min && <p className={styles.error}>{ allRules.min.mes }</p>}
                    { data.errors.max && <p className={styles.error}>{ allRules.max.mes }</p>}
                </div>

            </div>
        </div>

    );

}

export default memo(UI);