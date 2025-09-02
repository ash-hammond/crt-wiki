"use client";

import { useState } from "react";
import { submitCRT } from "./actions";

export default function SubmitPage() {
  const [images, setImages] = useState<{ url: string; description: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleAddImage = () => {
    setImages([...images, { url: "", description: "" }]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleImageChange = (index: number, field: "url" | "description", value: string) => {
    const updated = [...images];
    updated[index][field] = value;
    setImages(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("images", JSON.stringify(images));
    
    try {
      await submitCRT(formData);
      alert("CRT submitted successfully!");
      (e.target as HTMLFormElement).reset();
      setImages([]);
    } catch (error) {
      alert("Error submitting CRT. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Submit CRT Information</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Brand</label>
            <input
              type="text"
              name="brand"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              type="text"
              name="author"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Model</label>
            <input
              type="text"
              name="model"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Series</label>
            <input
              type="text"
              name="series"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Screen Size</label>
            <input
              type="text"
              name="screenSize"
              placeholder="e.g., 21 inches"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Aspect Ratio</label>
            <input
              type="text"
              name="aspectRatio"
              placeholder="e.g., 4:3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Year Launched</label>
            <input
              type="number"
              name="yearLaunched"
              min="1900"
              max="2100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Year Discontinued</label>
            <input
              type="number"
              name="yearDiscontinued"
              min="1900"
              max="2100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Weight</label>
            <input
              type="text"
              name="weight"
              placeholder="e.g., 25 kg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Physical Size</label>
            <input
              type="text"
              name="physicalSize"
              placeholder="e.g., 50x40x45 cm"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tube Make</label>
            <input
              type="text"
              name="tubeMake"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Chassis</label>
            <input
              type="text"
              name="chassis"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Audio</label>
            <input
              type="text"
              name="audio"
              placeholder="e.g., Stereo 2x5W"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Purpose</label>
            <input
              type="text"
              name="purpose"
              placeholder="e.g., Professional, Gaming"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Degaussing Type</label>
            <input
              type="text"
              name="degaussingType"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Assembly Country</label>
            <input
              type="text"
              name="assemblyCountry"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Inputs</label>
            <textarea
              name="inputs"
              rows={2}
              placeholder="e.g., VGA, BNC, S-Video"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Supported Resolutions</label>
            <textarea
              name="supportedResolutions"
              rows={2}
              placeholder="e.g., 640x480@60Hz, 1024x768@85Hz"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Formats</label>
            <textarea
              name="formats"
              rows={2}
              placeholder="e.g., NTSC, PAL, SECAM"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Physical Description</label>
            <textarea
              name="physicalDescription"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Operational Description</label>
            <textarea
              name="operationalDescription"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Summary</label>
            <textarea
              name="summary"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Similar Makes and Models</label>
            <textarea
              name="similarMakesAndModels"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Original Remote Make and Model</label>
            <input
              type="text"
              name="originalRemoteMakeAndModel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Service Manual Link</label>
            <input
              type="url"
              name="serviceManualLink"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Owner's Manual Link</label>
            <input
              type="url"
              name="ownersManualLink"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Images</h2>
            <button
              type="button"
              onClick={handleAddImage}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Image
            </button>
          </div>

          {images.map((image, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-md space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Image {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <input
                type="url"
                placeholder="Image URL"
                value={image.url}
                onChange={(e) => handleImageChange(index, "url", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={image.description}
                onChange={(e) => handleImageChange(index, "description", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-400"
        >
          {submitting ? "Submitting..." : "Submit CRT"}
        </button>
      </form>
    </div>
  );
}