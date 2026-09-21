import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, requireFirebase } from "./firebase";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export async function uploadBlogImage(blogId: string, file: File): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type))
    throw new Error("Please upload a JPG, PNG, WEBP, or GIF image.");
  if (file.size > MAX_IMAGE_BYTES) throw new Error("Cover images must be 5 MB or smaller.");
  const imageRef = ref(requireFirebase(storage, "Storage"), `blog-images/${blogId}/cover-image`);
  await uploadBytes(imageRef, file, {
    contentType: file.type,
    cacheControl: "public,max-age=3600",
  });
  return getDownloadURL(imageRef);
}
export async function deleteBlogImage(blogId: string): Promise<void> {
  await deleteObject(ref(requireFirebase(storage, "Storage"), `blog-images/${blogId}/cover-image`));
}
