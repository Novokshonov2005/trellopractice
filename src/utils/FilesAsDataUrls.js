export function FilesAsDataUrls(fileList) {
  const files = Array.from(fileList ?? []);
  return Promise.all(
    files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURl(file);
        }),
    ),
  );
}
