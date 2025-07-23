
import React, { useRef } from 'react';

interface ImageUploaderProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

const ImageIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
    </svg>
);

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const MAX_FILE_SIZE_MB = 1;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const ImageUploader: React.FC<ImageUploaderProps> = ({ images, onImagesChange, maxImages = 4 }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        
        if (images.length + files.length > maxImages) {
            alert(`You can only upload a maximum of ${maxImages} images.`);
            return;
        }

        files.forEach(file => {
            if (file.size > MAX_FILE_SIZE_BYTES) {
                alert(`File "${file.name}" is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const base64String = e.target?.result as string;
                onImagesChange([...images, base64String]);
            };
            reader.readAsDataURL(file);
        });

        // Reset file input to allow selecting the same file again
        if(fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        onImagesChange(newImages);
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Images
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative group aspect-w-1 aspect-h-1">
                        <img src={image} alt={`upload-preview-${index}`} className="w-full h-full object-cover rounded-lg shadow-md" />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-600/80 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove image"
                        >
                           <XIcon className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                {images.length < maxImages && (
                    <button
                        type="button"
                        onClick={triggerFileInput}
                        className="w-full aspect-w-1 aspect-h-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition"
                    >
                        <ImageIcon className="w-8 h-8 mb-1" />
                        <span className="text-sm">Add Image</span>
                        <span className="text-xs">({images.length}/{maxImages})</span>
                    </button>
                )}
            </div>
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
                className="hidden"
            />
             <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Maximum {maxImages} images. Max file size {MAX_FILE_SIZE_MB}MB each.
            </p>
        </div>
    );
};

export default ImageUploader;
