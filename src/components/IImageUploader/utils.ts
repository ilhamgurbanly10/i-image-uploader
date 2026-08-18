export const mirrorImageFile = (
    file: File,
    mirrored: boolean
): Promise<File> => {
    if (!mirrored) {
        return Promise.resolve(file);
    }

    return new Promise((resolve, reject) => {
        const image = new Image();
        const objectUrl = URL.createObjectURL(file);

        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (!ctx) {
                URL.revokeObjectURL(objectUrl);
                reject(new Error("Could not get canvas context"));
                return;
            }

            canvas.width = image.width;
            canvas.height = image.height;

            // Horizontal mirror: left ↔ right
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);

            ctx.drawImage(
                image,
                0,
                0,
                image.width,
                image.height
            );

            canvas.toBlob(
                (blob) => {
                    URL.revokeObjectURL(objectUrl);

                    if (!blob) {
                        reject(new Error("Could not create mirrored image"));
                        return;
                    }

                    const mirroredFile = new File(
                        [blob],
                        file.name,
                        {
                            type: file.type || "image/jpeg",
                            lastModified: Date.now(),
                        }
                    );

                    resolve(mirroredFile);
                },
                file.type || "image/jpeg",
                1
            );
        };

        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Could not load image"));
        };

        image.src = objectUrl;
    });
};

export const rotateImageFile = (
    file: File,
    degrees: number | null
): Promise<File> => {
    
    if (!degrees) {
        return Promise.resolve(file);
    }
    return new Promise((resolve, reject) => {
        const image = new Image();
        const objectUrl = URL.createObjectURL(file);

        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (!ctx) {
                URL.revokeObjectURL(objectUrl);
                reject(new Error("Could not get canvas context"));
                return;
            }

            const angle = ((degrees % 360) + 360) % 360;
            const radians = (angle * Math.PI) / 180;

            const sin = Math.abs(Math.sin(radians));
            const cos = Math.abs(Math.cos(radians));

            canvas.width = Math.round(
                image.width * cos + image.height * sin
            );

            canvas.height = Math.round(
                image.width * sin + image.height * cos
            );

            ctx.translate(
                canvas.width / 2,
                canvas.height / 2
            );

            ctx.rotate(radians);

            ctx.drawImage(
                image,
                -image.width / 2,
                -image.height / 2
            );

            canvas.toBlob(
                (blob: Blob | null) => {
                    URL.revokeObjectURL(objectUrl);

                    if (!blob) {
                        reject(
                            new Error("Could not create rotated image")
                        );
                        return;
                    }

                    const rotatedFile = new File(
                        [blob],
                        file.name,
                        {
                            type: file.type || "image/jpeg",
                            lastModified: Date.now(),
                        }
                    );

                    resolve(rotatedFile);
                },
                file.type || "image/jpeg",
                1
            );
        };

        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Could not load image"));
        };

        image.src = objectUrl;
    });
};