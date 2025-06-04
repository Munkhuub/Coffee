import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { CameraIcon, XIcon } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const UPLOAD_PRESET = "buy-me-coffee";
const CLOUD_NAME = "dpbmpprw5";

type UpdateImageProps = {
  defaultValue?: string;
  onChange: (imageUrl: string) => void;
};
type CloudinaryUploadResponse = {
  secure_url: string;
};

export const UpdateCover = ({ defaultValue, onChange }: UpdateImageProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultValue || null
  );
  const [hasChanges, setHasChanges] = useState(false);
  const [originalUrl, setOriginalUrl] = useState<string | null>(
    defaultValue || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update previewUrl when defaultValue changes
  useEffect(() => {
    setPreviewUrl(defaultValue || null);
    setOriginalUrl(defaultValue || null);
    setHasChanges(false);
  }, [defaultValue]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setHasChanges(true);

    setIsUploading(true);
    try {
      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) {
        // Clean up the local URL
        URL.revokeObjectURL(localUrl);
        // Set the uploaded URL as preview
        setPreviewUrl(uploadedUrl);
      }
    } catch (error) {
      console.error("Image upload failed", error);
      // Revert to previous state
      URL.revokeObjectURL(localUrl);
      setPreviewUrl(originalUrl);
      setHasChanges(false);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await axios.post<CloudinaryUploadResponse>(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.secure_url;
  };

  const handleSave = () => {
    if (previewUrl) {
      onChange(previewUrl);
      setOriginalUrl(previewUrl);
    }
    setHasChanges(false);
  };

  const handleCancel = () => {
    setPreviewUrl(originalUrl);
    setHasChanges(false);
  };

  const handleClear = () => {
    setPreviewUrl(null);
    setHasChanges(true);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative w-full h-[319px] bg-[#F4F4F5]">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
        disabled={isUploading}
      />

      {previewUrl ? (
        <>
          <img
            src={previewUrl}
            className="w-full h-full object-cover"
            alt="Profile preview"
            onError={(e) => {
              console.error("Image failed to load:", previewUrl);
              setPreviewUrl(null);
            }}
          />
          {/* Change Cover Button */}
          <Button
            onClick={openFileDialog}
            size="sm"
            variant="secondary"
            className="absolute top-4 left-4 bg-white/80 hover:bg-white text-gray-700 backdrop-blur-sm"
            disabled={isUploading}
          >
            <CameraIcon className="w-4 h-4 mr-2" />
            Change Cover
          </Button>
        </>
      ) : (
        <div className="w-full h-full bg-[#F4F4F5] flex items-center justify-center">
          <Button onClick={openFileDialog} className="flex gap-2">
            <CameraIcon />
            <p>Add a cover image</p>
          </Button>
        </div>
      )}

      {/* Save/Cancel Buttons - only show when there are changes */}
      {hasChanges && !isUploading && (
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            onClick={handleCancel}
            size="sm"
            variant="outline"
            className="bg-white/80 hover:bg-white text-gray-700 backdrop-blur-sm"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Changes
          </Button>
        </div>
      )}

      {/* Clear Button - only show when there's an image and no changes pending */}
      {previewUrl && !hasChanges && !isUploading && (
        <Button
          type="button"
          onClick={handleClear}
          size="icon"
          variant="ghost"
          className="absolute top-4 right-4 rounded-full bg-white/80 hover:bg-white text-gray-500 size-8 p-0 backdrop-blur-sm"
        >
          <XIcon className="w-4 h-4" />
        </Button>
      )}

      {isUploading && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-xs text-white">
          Uploading...
        </div>
      )}
    </div>
  );
};
