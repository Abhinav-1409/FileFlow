async function compressImage(file, quality) {
    // Create ImageBitmap (built-in function)
    const imageBitmap = await createImageBitmap(file);

    // Resize to 50% dimensions
    const width = imageBitmap.width / 2;
    const height = imageBitmap.height / 2;

    // Create an OffscreenCanvas
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Draw the image on the canvas
    ctx.drawImage(imageBitmap, 0, 0, width, height);

    // Convert to Blob with 50% quality
    const blob = await canvas.convertToBlob({ type: "image/jpeg", quality: quality });

    return blob; // Returns the compressed image as a Blob
}

// Usage Example:
document.getElementById("upload").addEventListener("change", async function (event) {
    const file = event.target.files[0];
    if (file) {
        const compressedBlob = await compressImage(file, 0.5); // 50% quality

        // Convert Blob to Object URL and display the compressed image
        const compressedURL = URL.createObjectURL(compressedBlob);
        document.getElementById("output").src = compressedURL;

        console.log("Compressed Image Blob:", compressedBlob);
    }
});