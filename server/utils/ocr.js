export async function extractTextWithOCR(pdfBuffer) {
  try {
    const convert = fromBuffer(pdfBuffer, {
      density: 150,
      format: "png",
      width: 1000,
      height: 1400,
      savePath: "./tmp",
      saveFilename: "page",
    });

    const page = await convert(1);
    const result = await Tesseract.recognize(page.path, "eng");

    return {
      text: result.data.text || "",
      failed: false,
    };
  } catch (err) {
    console.error("PDF ERROR:", err.message);
    return {
      text: "",
      failed: true,
    };
  }
}
