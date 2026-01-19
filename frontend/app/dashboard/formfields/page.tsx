"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

interface FormField {
    id: number;
    name: string;
    label: string;
    type: string;
    placeholder: string;
    required: boolean;
    order: number;
    enabled: boolean;
    options: string[] | null;
}

const FIELD_TYPES = ["text", "email", "tel", "select", "textarea", "number"];

function FormFieldsContent() {
    const searchParams = useSearchParams();
    const formKey = searchParams.get("form") || "lead-form";

    const [fields, setFields] = useState<FormField[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingField, setEditingField] = useState<FormField | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);

    const fetchFields = async () => {
        try {
            const res = await fetch(`/api/formfields?form=${formKey}`);
            if (res.ok) {
                const data = await res.json();
                setFields(data.sort((a: FormField, b: FormField) => a.order - b.order));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFields();
    }, [formKey]);

    const toggleField = async (field: FormField) => {
        try {
            await fetch(`/api/formfields/${field.id}?form=${formKey}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...field, enabled: !field.enabled, formKey }),
            });
            fetchFields();
        } catch (err) {
            console.error(err);
        }
    };

    const saveField = async (field: FormField) => {
        try {
            const fieldWithKey = { ...field, formKey };

            if (field.id) {
                await fetch(`/api/formfields/${field.id}?form=${formKey}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(fieldWithKey),
                });
            } else {
                await fetch(`/api/formfields?form=${formKey}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...fieldWithKey, order: fields.length + 1 }),
                });
            }
            setEditingField(null);
            setShowAddModal(false);
            fetchFields();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteField = async (id: number) => {
        if (!confirm("Are you sure you want to delete this field?")) return;
        try {
            await fetch(`/api/formfields/${id}?form=${formKey}`, { method: "DELETE" });
            fetchFields();
        } catch (err) {
            console.error(err);
        }
    };

    const formatFormName = (key: string) => {
        return key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) + " Fields";
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {formatFormName(formKey)}
                    </h1>
                    <p className="text-gray-400">Customize this form's input fields.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingField({ id: 0, name: "", label: "", type: "text", placeholder: "", required: false, order: fields.length + 1, enabled: true, options: null });
                        setShowAddModal(true);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Field
                </button>
            </div>

            {/* Field List */}
            <div className="bg-[#25282e] border border-gray-800 rounded-xl overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center text-gray-500">Loading fields...</div>
                ) : fields.length === 0 ? (
                    <div className="p-12 text-center">
                        <h3 className="text-xl font-bold text-white mb-2">No fields configured</h3>
                        <p className="text-gray-400">Add form fields to customize your lead capture form.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-800">
                        {fields.map((field) => (
                            <div key={field.id} className={`p-4 flex items-center justify-between gap-4 ${!field.enabled ? "opacity-50" : ""}`}>
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 bg-blue-600/20 text-blue-400 rounded flex items-center justify-center text-sm font-bold">
                                        {field.order}
                                    </div>
                                    <div>
                                        <div className="font-medium text-white flex items-center gap-2">
                                            {field.label}
                                            {field.required && <span className="text-red-400 text-xs">*required</span>}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            <span className="font-mono bg-gray-800 px-2 py-0.5 rounded">{field.name}</span>
                                            <span className="mx-2">•</span>
                                            <span>{field.type}</span>
                                            {field.placeholder && (
                                                <>
                                                    <span className="mx-2">•</span>
                                                    <span>"{field.placeholder}"</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => toggleField(field)}
                                        className={`p-2 rounded-lg transition-colors ${field.enabled ? "bg-green-500/20 text-green-400" : "bg-gray-700 text-gray-400"}`}
                                        title={field.enabled ? "Enabled - Click to disable" : "Disabled - Click to enable"}
                                    >
                                        {field.enabled ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setEditingField(field)}
                                        className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                                        title="Edit"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => deleteField(field.id)}
                                        className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                                        title="Delete"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit/Add Modal */}
            {(editingField || showAddModal) && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#25282e] border border-gray-700 rounded-xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-white mb-4">
                            {editingField?.id ? "Edit Field" : "Add New Field"}
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Field Name (key)</label>
                                <input
                                    type="text"
                                    value={editingField?.name || ""}
                                    onChange={(e) => setEditingField({ ...editingField!, name: e.target.value.toLowerCase().replace(/\s/g, "_") })}
                                    className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg text-white"
                                    placeholder="e.g. company_name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Label</label>
                                <input
                                    type="text"
                                    value={editingField?.label || ""}
                                    onChange={(e) => setEditingField({ ...editingField!, label: e.target.value })}
                                    className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg text-white"
                                    placeholder="e.g. Company Name"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Type</label>
                                    <select
                                        value={editingField?.type || "text"}
                                        onChange={(e) => setEditingField({ ...editingField!, type: e.target.value })}
                                        className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg text-white"
                                    >
                                        {FIELD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Order</label>
                                    <input
                                        type="number"
                                        value={editingField?.order || 1}
                                        onChange={(e) => setEditingField({ ...editingField!, order: parseInt(e.target.value) || 1 })}
                                        className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg text-white"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Placeholder</label>
                                <input
                                    type="text"
                                    value={editingField?.placeholder || ""}
                                    onChange={(e) => setEditingField({ ...editingField!, placeholder: e.target.value })}
                                    className="w-full px-4 py-2 bg-[#1a1d21] border border-gray-700 rounded-lg text-white"
                                    placeholder="e.g. Enter your company name"
                                />
                            </div>
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editingField?.required || false}
                                        onChange={(e) => setEditingField({ ...editingField!, required: e.target.checked })}
                                        className="w-4 h-4 rounded bg-gray-700 border-gray-600"
                                    />
                                    <span className="text-gray-300">Required</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editingField?.enabled || false}
                                        onChange={(e) => setEditingField({ ...editingField!, enabled: e.target.checked })}
                                        className="w-4 h-4 rounded bg-gray-700 border-gray-600"
                                    />
                                    <span className="text-gray-300">Enabled</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => { setEditingField(null); setShowAddModal(false); }}
                                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => saveField(editingField!)}
                                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                            >
                                Save Field
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Preview Section */}
            <div className="mt-8 p-6 bg-[#1a1d21] border border-gray-800 rounded-xl">
                <h3 className="text-lg font-bold text-white mb-4">Form Preview</h3>
                <div className="bg-white rounded-xl p-6 max-w-md">
                    <div className="space-y-4">
                        {fields.filter(f => f.enabled).map(field => (
                            <div key={field.id}>
                                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                </label>
                                {field.type === "select" ? (
                                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900" disabled>
                                        <option>{field.placeholder || "Select..."}</option>
                                    </select>
                                ) : field.type === "textarea" ? (
                                    <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900" placeholder={field.placeholder} disabled />
                                ) : (
                                    <input type={field.type} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900" placeholder={field.placeholder} disabled />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FormFieldsManager() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading form editor...</div>}>
            <FormFieldsContent />
        </Suspense>
    );
}

