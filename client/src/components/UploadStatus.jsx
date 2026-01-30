export default function UploadStatus({ status }) {
  if (!status) return null;

  if (status === "success") {
    return <p className="text-green-600 mt-3">Upload successful</p>;
  }

  if (status === "error") {
    return <p className="text-red-600 mt-3">Upload failed</p>;
  }
}
