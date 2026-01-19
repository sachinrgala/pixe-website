"use client";

import { useEffect, useState } from "react";

interface MediaFile {
    id: number;
    name: string;
    path: string;
    url: string;
    size: string;
    uploadDate: string;
}

export default function MediaManager() {
    const [files, setFiles] = useState<MediaFile[]>([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const res = await fetch("/api/media");
            if (res.ok) setFiles(await res.json());
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);

        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        try {
            const res = await fetch("/api/media/upload", {
                method: "POST",
                body: formData
            });
            if (res.ok) fetchFiles();
        } catch (err) {
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this file?")) return;
        await fetch(`/api/media/${id}`, { method: "DELETE" });
        fetchFiles();
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        alert("URL copied!");
    };

    return (
        <div className="w-full max-w-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Media Library</h1>
                    <p className="text-gray-400">Manage upload images and assets.</p>
                </div>
                <div className="relative">
                    <input
                        type="file"
                        onChange={handleUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg flex items-center gap-2">
                        {uploading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-upload"></i>}
                        Upload File
                    </button>
                </div>
            </div>

            {files.length === 0 ? (
                <div className="bg-[#25282e] border border-gray-800 rounded-xl p-12 text-center">
                    <i className="fas fa-images text-gray-700 text-4xl mb-4"></i>
                    <p className="text-gray-500">No media files uploaded yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {files.map(file => (
                        <div key={file.id} className="bg-[#25282e] border border-gray-800 rounded-xl overflow-hidden group">
                            <div className="h-40 bg-[#1a1d21] flex items-center justify-center relative">
                                <i className="fas fa-file-image text-gray-700 text-4xl"></i>
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button onClick={() => copyToClipboard(file.url)} className="p-2 bg-blue-600 rounded text-white" title="Copy URL"><i className="fas fa-link"></i></button>
                                    <button onClick={() => handleDelete(file.id)} className="p-2 bg-red-600 rounded text-white" title="Delete"><i className="fas fa-trash"></i></button>
                                </div>
                            </div>
                            <div className="p-3">
                                <div className="text-white text-sm font-medium truncate" title={file.name}>{file.name}</div>
                                <div className="text-xs text-gray-500 flex justify-between mt-1">
                                    <span>{Math.round(parseInt(file.size) / 1024)} KB</span>
                                    <span>{file.uploadDate}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
