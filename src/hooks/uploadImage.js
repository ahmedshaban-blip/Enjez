import { supabase } from '../config/supabase'

async function uploadImage(file) {
  const fileName = `${Date.now()}_${file.name}`
  const { data, error } = await supabase.storage

  // Upload file
    .from('images') // bucket name (images)         
    .upload(fileName, file)

  if (error) {
    console.error('Upload error:', error)
    return null
  }

  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from('images')
    .getPublicUrl(fileName)

  return publicUrlData.publicUrl
}
