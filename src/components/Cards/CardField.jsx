import { useRef, useState } from "react";
import { IoClose, IoImageOutline } from "react-icons/io5";
import { FilesAsDataUrls } from "../../utils/FilesAsDataUrls";

export function CardFormField({
  initialTitle = "",
  initialDescription = "",
  initialImages = [],
  submitLabel = "Сохранить",
  autoFocusTitle = false,
  onSubmit,
  onCancel,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [images, setImages] = useState(() => [...initialImages]);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);

  async function handlePickFiles(e) {
    const { files } = e.target;
    if (!files?.length) return;
    setBusy(true);
    try {
      const urls = await FilesAsDataUrls(files);
      setImages((prev) => [...prev, ...urls]);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  function removeImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    onSubmit({
      title: t,
      description: description.trim(),
      images: [...images],
    });
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div>
        <label className="mb-1 block text-xs font-medium text-white/70">
          Заголовок
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus={autoFocusTitle}
          className="w-full rounded-md border border-white/15 bg-[#1a1d21] px-2 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#579dff]/50"
          placeholder="Обязательно"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-white/70">
          Описание
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full resize-y rounded-md border border-white/15 bg-[#1a1d21] px-2 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#579dff]/50"
          placeholder="Необязательно"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-white/70">
          Картинки (можно выбрать несколько раз)
        </label>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handlePickFiles}
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-white/25 bg-white/5 px-3 py-2 text-sm text-white/90 transition hover:bg-white/10 disabled:opacity-50"
        >
          <IoImageOutline size={18} aria-hidden />
          {busy ? "Загрузка…" : "Добавить изображения"}
        </button>
        {images.length > 0 ? (
          <ul className="mt-2 grid max-h-48 grid-cols-3 gap-2 overflow-y-auto sm:grid-cols-4">
            {images.map((src, i) => (
              <li
                key={`${i}-${src.slice(0, 32)}`}
                className="group/img relative aspect-square overflow-hidden rounded-md ring-1 ring-white/10"
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  className="absolute right-0.5 top-0.5 flex h-6 w-6 items-center justify-center rounded bg-black/60 text-white opacity-0 transition group-hover/img:opacity-100 hover:bg-black/80"
                  aria-label="Удалить изображение"
                  onClick={() => removeImage(i)}
                >
                  <IoClose size={14} />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
        <button
          type="submit"
          className="rounded-md bg-[#579dff] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6cabff]"
        >
          {submitLabel}
        </button>
        <button
          type="button"
          className="rounded-md px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          onClick={onCancel}
        >
          Отмена
        </button>
      </div>
    </form>
  );
}
