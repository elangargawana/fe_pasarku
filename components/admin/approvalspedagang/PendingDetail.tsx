"use client";

import React from "react";
import Button from "../../ui/Button";
import ConfirmDialog from "../../ui/ConfirmDialog";

type Props = {
  data?: any;
  onClose?: () => void;
};

export default function PendingDetail({ data, onClose }: Props) {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [confirmAction, setConfirmAction] = React.useState<"approve" | "reject" | null>(null);
  const [confirmTarget, setConfirmTarget] = React.useState<string | null>(null);

  // If `target` is provided, the confirm dialog will reference that document
  // (e.g. 'KTP'). If omitted, it applies to the merchant (footer buttons).
  const openConfirm = (action: "approve" | "reject", target?: string) => {
    setConfirmAction(action);
    setConfirmTarget(target ?? null);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setConfirmTarget(null);
  };

  const onConfirm = () => {
    // If confirmTarget exists, this action targets a specific document.
    if (confirmTarget) {
      // TODO: call per-document API (e.g. /api/documents/:id/verify)
      console.log("Document action", confirmAction, "for document", confirmTarget, "on merchant", data);
      // Close only the confirm dialog; keep the modal open so user can continue reviewing.
      setConfirmOpen(false);
      setConfirmTarget(null);
      return;
    }

    // Otherwise it's a merchant-level approve/reject
    console.log("Confirm action", confirmAction, "for merchant", data);
    setConfirmOpen(false);
    onClose?.();
  };

  return (
    <div className="w-full">
      <div className="mt-2">
        <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-6">
          <div className="rounded-md border border-slate-100 p-4 bg-white">
          <h5 className="text-base font-semibold mb-4">Personal Information</h5>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="shrink-0">
              <img src={data?.photo ?? '/file.svg'} alt="foto pedagang" className="w-28 h-28 rounded-md object-cover" />
            </div>

            <div className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 items-start">
                <div className="text-sm text-gray-500">Full Name</div>
                <div className="text-sm font-medium">{data?.name ?? 'Nama Pedagang'}</div>

                <div className="text-sm text-gray-500">Phone</div>
                <div className="text-sm font-medium">{data?.phone ?? '081234567890'}</div>

                <div className="text-sm text-gray-500">Email</div>
                <div className="text-sm font-medium">{data?.email ?? '-'}</div>

                <div className="text-sm text-gray-500">Alamat</div>
                <div className="text-sm font-medium">{data?.address ?? '-'}</div>
              </div>
            </div>
          </div>
          </div>

          <div className="rounded-md border border-slate-100 p-4 bg-white">
          <h5 className="text-base font-semibold mb-4">Business Information</h5>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-700">
            <div className="text-sm text-gray-500">Merchant Name</div>
            <div className="font-medium">{data?.toko ?? 'Toko ABC'}</div>

            <div className="text-sm text-gray-500">Kios Number</div>
            <div className="font-medium">{data?.kios ?? 'A-12'}</div>

            <div className="text-sm text-gray-500">Kategori</div>
            <div className="font-medium">{data?.kategori ?? 'Sayuran'}</div>

            <div className="text-sm text-gray-500">Member Since</div>
            <div className="font-medium">{data?.joinedAt ?? '20 Okt 2025'}</div>
          </div>
          </div>

          <div className="rounded-md border border-slate-100 p-4 bg-white">
          <h5 className="text-base font-semibold mb-4">Document</h5>

          <div className="space-y-4">
            {[
              { label: 'KTP', img: '/file.svg' },
              { label: 'SIUP', img: '/file.svg' },
              { label: 'Surat Keterangan', img: '/file.svg' },
            ].map((d) => (
              <div key={d.label} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-36 text-sm text-gray-500">{d.label}</div>
                <div className="w-40 h-24 rounded-md overflow-hidden border relative">
                  <img src={d.img} alt={d.label} className="w-full h-full object-cover" />

                  {/* centered view icon overlay (placeholder for full-view action) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      aria-label={`Lihat ${d.label}`}
                      title="Lihat gambar"
                      className="inline-flex items-center justify-center bg-white/75 hover:bg-white/95 text-slate-700 hover:text-slate-900 rounded-full p-2 shadow-sm transition transform duration-150 hover:scale-110 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex-1" />
                <div className="flex items-center gap-2 mt-3 sm:mt-0">
                  <Button
                    variant="outline"
                    onClick={() => openConfirm('approve', d.label)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border-green-500 text-green-600 w-full sm:w-auto justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Disetujui</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => openConfirm('reject', d.label)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500 text-red-600 w-full sm:w-auto justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Ditolak</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>

        {/* Footer actions (outside the scrollable area) */}
        <div className="mt-4 flex items-center justify-center gap-6">
        <Button
          variant="success"
          onClick={() => openConfirm('approve')}
          className="px-6 py-2.5 rounded-full text-sm font-medium max-w-xs w-52"
        >
          Disetujui
        </Button>

        <Button
          variant="danger"
          onClick={() => openConfirm('reject')}
          className="px-6 py-2.5 rounded-full text-sm font-medium max-w-xs w-52"
        >
          Ditolak
        </Button>

        <Button
          variant="outline"
          onClick={() => onClose?.()}
          className="px-6 py-2.5 rounded-full text-sm font-medium max-w-xs w-52"
        >
          Close
        </Button>
        </div>

        <ConfirmDialog
          open={confirmOpen}
          title={
            confirmTarget
              ? `${confirmAction === 'approve' ? 'Konfirmasi Setujui' : 'Konfirmasi Tolak'}: ${confirmTarget}`
              : confirmAction === 'approve'
              ? 'Konfirmasi Setujui'
              : 'Konfirmasi Tolak'
          }
          description={`Anda yakin ingin ${confirmAction === 'approve' ? 'menyetujui' : 'menolak'} ${confirmTarget ? confirmTarget : 'pedagang ini'}?`}
          confirmLabel={confirmAction === 'approve' ? 'Ya, Setujui' : 'Ya, Tolak'}
          cancelLabel="Batal"
          onConfirm={onConfirm}
          onCancel={closeConfirm}
          confirmClassName={confirmAction === 'approve' ? 'px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transform transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-green-300' : undefined}
          cancelClassName={confirmAction === 'approve' ? 'px-4 py-2 rounded-md border border-red-600 text-red-600 hover:bg-red-50 transform transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-red-300' : undefined}
        />
      </div>
    </div>
  );
}
