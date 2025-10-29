"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/ui/button/Button";
import PhotoUploader from "@/components/ui/PhotoUploader";
import CurrencyInput from "@/components/ui/input_fields/CurrencyInput";
import TransitionModal from "@/components/ui/TransitionModal";
import Input from "@/components/ui/input_fields/Input";
import NumberInput from "@/components/ui/input_fields/NumberInput";
import Textarea from "@/components/ui/input_fields/Textarea";
import Icon from "@/components/ui/Icon";

// small presentational helper declared outside the component to avoid creating the
// component during render (react-hooks/static-components)
const DropdownIcon = () => (
  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
    <Icon name="chevron-right" className="w-3.5 h-3.5 text-gray-400" />
  </div>
);

type Props = {
  open: boolean;
  onClose: () => void;
  currentUser?: string;
};

export default function LogPasokanModal({ open, onClose, currentUser }: Props) {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let enterTimer: ReturnType<typeof setTimeout> | null = null;
    let showTimer: ReturnType<typeof setTimeout> | null = null;
    let exitTimer: ReturnType<typeof setTimeout> | null = null;

    if (open) {
      enterTimer = setTimeout(() => {
        setVisible(true);
        showTimer = setTimeout(() => setShow(true), 10);
      }, 0);
    } else {
      // defer hide to avoid synchronous setState inside effect
      showTimer = setTimeout(() => setShow(false), 0);
      exitTimer = setTimeout(() => setVisible(false), 200);
    }

    return () => {
      if (enterTimer) clearTimeout(enterTimer);
      if (showTimer) clearTimeout(showTimer);
      if (exitTimer) clearTimeout(exitTimer);
    };
  }, [open]);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, onClose]);

  // Form state
  const [komoditas, setKomoditas] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [satuan, setSatuan] = useState("");
  const [supplier, setSupplier] = useState("");
  const [contact, setContact] = useState("");
  const [isAddingSupplier, setIsAddingSupplier] = useState(false);
  const [newSupplierName, setNewSupplierName] = useState("");
  const [newSupplierContact, setNewSupplierContact] = useState("");
  const [supplierWarning, setSupplierWarning] = useState("");
  const [harga, setHarga] = useState<number | null>(null);
  const [catatan, setCatatan] = useState("");
  const [waktu, setWaktu] = useState<string>(
    new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
  );

  // update waktu continuously while modal is visible
  useEffect(() => {
    if (!visible) return;
    const tick = () => setWaktu(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
    // set immediately and then every second
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [visible]);

  // Photos state (max 3)
  const [photos, setPhotos] = useState<string[]>([]);

  const handleSave = () => {
    onClose();
  };

  if (!visible) return null;
  // Icon dropdown (moved to top-level to avoid creation during render)

  return (
    <TransitionModal
      show={show}
      onClose={onClose}
      panelClassName={"mx-4 w-full max-w-3xl flex flex-col max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-8rem)]"}
    >
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h4 className="text-lg font-semibold">Log Pasokan Baru</h4>
        <button aria-label="Tutup" onClick={onClose} className="p-2 rounded-full text-slate-600 hover:bg-slate-100">
          <Icon name="close" className="h-5 w-5" />
        </button>
      </header>

      <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* KOMODITAS */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Pilih Komoditas*</label>
            <div className="relative">
              <select
                value={komoditas}
                onChange={(e) => setKomoditas(e.target.value)}
                className={`w-full rounded-full border border-gray-200 px-4 py-3 bg-white appearance-none pr-10 ${
                  !komoditas ? "text-gray-400" : "text-gray-900"
                }`}
              >
                <option value="" disabled hidden>
                  Komoditas
                </option>
                <option value="bayam" className="text-gray-900">
                  Bayam
                </option>
                <option value="wortel" className="text-gray-900">
                  Wortel
                </option>
              </select>
              <DropdownIcon />
            </div>
          </div>

          {/* JUMLAH & SATUAN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Jumlah*</label>
              <NumberInput
                value={jumlah}
                onChange={(v) => setJumlah(v)}
                className="w-full"
                placeholder="Masukan Jumlah"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Satuan</label>
              <div className="relative">
                <select
                  value={satuan}
                  onChange={(e) => setSatuan(e.target.value)}
                  className={`w-full rounded-full border border-gray-200 px-4 py-3 bg-white appearance-none pr-10 ${
                    !satuan ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  <option value="" disabled hidden>
                    Pilih Satuan
                  </option>
                  <option value="kg" className="text-gray-900">
                    kg
                  </option>
                  <option value="pcs" className="text-gray-900">
                    pcs
                  </option>
                </select>
                <DropdownIcon />
              </div>
            </div>
          </div>

          {/* SUPPLIER */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Supplier*</label>
            <div className="flex items-center gap-2">
              {!isAddingSupplier ? (
                <>
                  <div className="relative flex-1">
                    <select
                      value={supplier}
                      onChange={(e) => {
                        setSupplier(e.target.value);
                        if (e.target.value === "pak-budi") setContact("081234567890");
                        else if (e.target.value === "ibu-siti") setContact("082345678901");
                        else setContact("");
                      }}
                      className={`w-full rounded-full border border-gray-200 px-4 py-3 bg-white appearance-none pr-10 ${!supplier ? "text-gray-400" : "text-gray-900"}`}
                    >
                      <option value="" disabled hidden>
                        Pilih Supplier
                      </option>
                      <option value="pak-budi" className="text-gray-900">Pak Budi</option>
                      <option value="ibu-siti" className="text-gray-900">Ibu Siti</option>
                    </select>
                    <DropdownIcon />
                  </div>

                  <button
                    type="button"
                    aria-label="Tambah Supplier"
                    onClick={() => setIsAddingSupplier(true)}
                    className="inline-flex items-center gap-2 px-3 py-3 text-sm rounded-full border border-green-300 text-green-600 hover:bg-green-50"
                  >
                    <span className="inline-flex items-center justify-center border border-green-600 text-green-600 rounded-full w-6 h-6">
                      +
                    </span>
                    <span className="sm:hidden text-sm">Tambah</span>
                    <span className="hidden sm:inline text-sm">Tambah Supplier</span>
                  </button>
                </>
              ) : (
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      value={newSupplierName}
                      onChange={(e) => setNewSupplierName(e.target.value)}
                      placeholder="Nama Supplier"
                      className="w-full sm:flex-1"
                    />
                    <Input
                      value={newSupplierContact}
                      onChange={(e) => setNewSupplierContact(e.target.value)}
                      placeholder="Nomor Telepon Supplier"
                      className="w-full sm:flex-1"
                    />
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <Button
                      variant="outline"
                      className="flex-1 sm:w-20 sm:flex-none px-3 py-2 border-red-200 text-red-600 hover:bg-red-50 rounded-full"
                      onClick={() => {
                        // cancel adding supplier
                        setIsAddingSupplier(false);
                        setNewSupplierName("");
                        setNewSupplierContact("");
                      }}
                    >
                      Batal
                    </Button>
                    <Button
                      variant="success"
                      className="flex-1 sm:w-20 sm:flex-none px-3 py-2 rounded-full"
                      onClick={() => {
                        // allow click but warn if fields empty
                        if (!newSupplierName || !newSupplierContact) {
                          setSupplierWarning("Nama dan nomor telepon harus diisi.");
                          // clear after a short delay
                          setTimeout(() => setSupplierWarning(""), 3000);
                          // focus first empty field for convenience
                          const el = !newSupplierName
                            ? document.querySelector('input[placeholder="Nama Supplier"]') as HTMLInputElement | null
                            : document.querySelector('input[placeholder="Nomor Telepon Supplier"]') as HTMLInputElement | null;
                          if (el) el.focus();
                          return;
                        }
                        // save new supplier into supplier/contact and close the add UI
                        setSupplier(newSupplierName);
                        setContact(newSupplierContact);
                        setIsAddingSupplier(false);
                        setNewSupplierName("");
                        setNewSupplierContact("");
                        setSupplierWarning("");
                      }}
                    >
                      Simpan
                    </Button>
                  </div>
                  {supplierWarning && (
                    <div className="text-sm text-red-600 mt-2">{supplierWarning}</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Contact*</label>
            <div className="flex">
              <span className="inline-flex items-center justify-center bg-green-600 px-4 py-3 text-white rounded-l-full">
                <Icon name="phone" className="h-5 w-5" />
              </span>
              <Input
                value={contact}
                readOnly
                className="flex-1 rounded-l-none rounded-r-full bg-gray-200 text-gray-700"
                placeholder="Nomor Supplier"
              />
            </div>
          </div>

          {/* HARGA & TOTAL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Harga Grosir*</label>
              <div className="flex">
                <span className="inline-flex items-center justify-center bg-green-600 px-4 py-3 text-white rounded-l-full">
                  Rp
                </span>
                  <CurrencyInput
                    value={harga}
                    onChange={(n) => setHarga(n)}
                    className="flex-1 border border-gray-200 rounded-r-full px-4 py-3 focus:outline-none"
                    placeholder="Harga / Satuan"
                  />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Total</label>
              <div className="flex">
                <span className="inline-flex items-center justify-center bg-green-600 text-white px-4 py-3 rounded-l-full">
                  Rp
                </span>
                  <Input
                    readOnly
                    value={
                      jumlah && harga
                        ? new Intl.NumberFormat("id-ID").format(
                            parseInt(jumlah.replace(/\D/g, ""), 10) * (harga ?? 0)
                          )
                        : ""
                    }
                    className="flex-1 rounded-l-none rounded-r-full bg-gray-200 text-gray-700"
                    placeholder="Harga Total"
                  />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Foto (Opsional)</label>
            <PhotoUploader
              previews={photos}
              onChange={(next) => setPhotos(next)}
              maxFiles={3}
              accept="image/png, image/jpeg, image/jpg"
              maxSizeMB={1}
              note="Upload dengan format png / jpg dengan posisi landscape (Max 1MB)"
            />
          </div>

          {/* Catatan */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">Catatan</label>
            <Textarea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="resize-none"
              placeholder="Catatan tambahan"
            />
          </div>

          {/* Waktu & Dicatat Oleh (readonly) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
  <label className="block text-sm text-gray-600 mb-2">Waktu</label>
  <div className="flex">
    {/* Kotak waktu */}
    <div className="flex-1 border border-gray-200 rounded-l-full px-4 py-3 bg-gray-200 text-gray-600">
      {waktu}
    </div>
    {/* Label WIB di kanan */}
    <span className="inline-flex items-center justify-center border border-green-600 rounded-r-full px-4 py-3 bg-green-600 text-white font-medium">
      WIB
    </span>
  </div>
</div>


            <div>
              <label className="block text-sm text-gray-600 mb-2">Dicatat Oleh</label>
              <div className="w-full rounded-full bg-gray-200 px-4 py-3 text-gray-700">{currentUser ?? "Admin Joko"}</div>
            </div>
          </div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-4 py-3 border-t border-gray-200 shrink-0 bg-white">
        <Button variant="outline" className="w-full px-4 py-2 rounded-full border-red-200 text-red-600 hover:bg-red-50" onClick={onClose}>
          Batal
        </Button>
        <Button variant="success" className="w-full px-4 py-2 rounded-full" onClick={handleSave}>
          Simpan
        </Button>
      </div>
    </TransitionModal>
  );
}
