import { supabase } from "../config/supabase.js";

/**
 * Upload file to supabase bucket 'images'
 * Returns: { url, path } on success, null on failure
 */
export async function uploadImage(file) {
  try {
    const fileName = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, file);

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const { data: publicUrlData, error: urlErr } = await supabase.storage
      .from("images")
      .getPublicUrl(data.path);

    if (urlErr) {
      console.warn("getPublicUrl error:", urlErr);
    }

    return {
      url: publicUrlData?.publicUrl ?? null,
      path: data.path, // store path so we can delete later
    };
  } catch (err) {
    console.error("uploadImage unexpected error:", err);
    return null;
  }
}

/**
 * Delete file from supabase storage by path (e.g. '1764_img.jpg')
 * Returns true on success, false on failure
 */
export async function deleteFile(path) {
  if (!path) return false;
  try {
    const { error } = await supabase.storage.from("images").remove([path]);
    if (error) {
      console.error("deleteFile error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("deleteFile unexpected error:", err);
    return false;
  }
}

export default uploadImage;
