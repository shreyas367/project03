"use client";
import React, { useState } from "react";

export default function VideoUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      alert("Please select a video file.");
      return;
    }

    try {
      setIsUploading(true);

      // 1️⃣ Get ImageKit auth token
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();
      if (!auth.token) throw new Error("Failed to get upload auth");

      // 2️⃣ Prepare FormData for ImageKit
      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("fileName", videoFile.name);
      formData.append("signature", auth.signature);
      formData.append("token", auth.token);
      formData.append("expire", auth.expire.toString());
      formData.append("publicKey", auth.publicKey);

      // 3️⃣ Upload to ImageKit
      const uploadRes = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error("Upload failed");

      // 4️⃣ Save video info in MongoDB
      const saveRes = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          url: uploadData.url, // ImageKit file URL
        }),
      });

      if (!saveRes.ok) throw new Error("Failed to save video");

      alert("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setVideoFile(null);
    } catch (err) {
      console.error("Video upload error:", err);
      alert("Error uploading video");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded-lg space-y-4">
      <h2 className="text-2xl font-bold">Upload a Video</h2>
      <input type="text" placeholder="Video Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border p-2 rounded" required />
      <textarea placeholder="Video Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded" rows={4} required />
      <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="w-full" required />
      <button type="submit" disabled={isUploading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        {isUploading ? "Uploading..." : "Upload Video"}
      </button>
    </form>
  );
}
