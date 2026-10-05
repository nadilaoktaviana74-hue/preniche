"use client";

import React, { useState } from "react";
import { ProductItem } from "@/types";
import { MOCK_SAFE_POINTS } from "@/data/mockData";
import { X, ShieldCheck, MapPin, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { formatRupiah } from "@/lib/utils";

interface SafeCODModalProps {
  product: ProductItem;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const SafeCODModal: React.FC<SafeCODModalProps> = ({
  product,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<string>(
    product.preferredMeetingPoint || ""
  );
  const [customPoint, setCustomPoint] = useState<string>("");
  const [date, setDate] = useState<string>("2026-10-08");
  const [time, setTime] = useState<string>("15:30");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  // Filter campus preset safe meeting spots
  const campusSafePoints = MOCK_SAFE_POINTS.filter((p) =>
    product.campusName.toLowerCase().includes(p.campusName.split(" ")[0].toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (onSuccess) {
      setTimeout(() => {
        onSuccess();
      }, 1800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-50 text-brand-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Ajukan Janji Temu COD Aman</h3>
              <p className="text-xs text-slate-500">Preset lokasi aman di area kampus terverifikasi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">Janji COD Berhasil Diajukan!</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Notifikasi telah dikirimkan ke <strong>{product.seller.name}</strong>. Status barang otomatis dikunci menjadi <strong>Reserved</strong> begitu penjual mengonfirmasi.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-1.5 text-slate-600">
                <p><strong>Titik Temu:</strong> {selectedPoint || customPoint}</p>
                <p><strong>Jadwal:</strong> {date} pukul {time} WIB</p>
                <p><strong>Total Bayar (COD):</strong> {formatRupiah(product.price)}</p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition"
              >
                Kembali ke Halaman Produk
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product summary card */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-slate-200 overflow-hidden relative shrink-0">
                  {product.images[0] && (
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="font-semibold text-xs text-slate-900 truncate">
                    {product.title}
                  </h5>
                  <p className="text-xs text-brand-700 font-bold mt-0.5">
                    {formatRupiah(product.price)}
                  </p>
                  <p className="text-[11px] text-slate-500">Penjual: {product.seller.name}</p>
                </div>
              </div>

              {/* Safe Meeting Points Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  1. Pilih Titik Temu Aman Kampus (Rekomendasi Satpam/CCTV)
                </label>
                <div className="space-y-2">
                  {campusSafePoints.length > 0 ? (
                    campusSafePoints.map((point) => (
                      <label
                        key={point.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          selectedPoint === point.name
                            ? "border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="meetingPoint"
                          value={point.name}
                          checked={selectedPoint === point.name}
                          onChange={(e) => {
                            setSelectedPoint(e.target.value);
                            setCustomPoint("");
                          }}
                          className="mt-0.5 text-brand-600 focus:ring-brand-500"
                        />
                        <div className="flex-1">
                          <span className="font-semibold text-slate-900 block">
                            {point.name}
                          </span>
                          <span className="text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-brand-600" />
                            {point.landmark}
                          </span>
                          {point.notes && (
                            <span className="text-[11px] text-brand-700 mt-1 block font-medium">
                              🛡️ {point.notes}
                            </span>
                          )}
                        </div>
                      </label>
                    ))
                  ) : (
                    <label
                      className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer ${
                        selectedPoint === "Perpustakaan Pusat Kampus"
                          ? "border-brand-600 bg-brand-50/60"
                          : "border-slate-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="meetingPoint"
                        value="Perpustakaan Pusat Kampus"
                        checked={selectedPoint === "Perpustakaan Pusat Kampus"}
                        onChange={(e) => setSelectedPoint(e.target.value)}
                        className="mt-0.5"
                      />
                      <div>
                        <span className="font-semibold text-slate-900">Perpustakaan Pusat Kampus</span>
                        <span className="text-slate-500 block">Lobi Utama dekat pintu masuk ber-CCTV</span>
                      </div>
                    </label>
                  )}

                  {/* Custom option */}
                  <label
                    className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer ${
                      selectedPoint === "custom"
                        ? "border-brand-600 bg-brand-50/60"
                        : "border-slate-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="meetingPoint"
                      value="custom"
                      checked={selectedPoint === "custom"}
                      onChange={() => setSelectedPoint("custom")}
                      className="mt-0.5 text-brand-600"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-slate-900">Lokasi Kampus / Kost Lainnya</span>
                      {selectedPoint === "custom" && (
                        <input
                          type="text"
                          required
                          value={customPoint}
                          onChange={(e) => setCustomPoint(e.target.value)}
                          placeholder="Misal: Kantin Gedung Kuliah Bersama / Gerbang Utama"
                          className="mt-2 w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* Schedule Date & Time */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  2. Tanggal & Jam Janji Temu
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                      <Calendar className="w-3.5 h-3.5" /> Tanggal
                    </span>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                      <Clock className="w-3.5 h-3.5" /> Jam (WIB)
                    </span>
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  3. Catatan Pertemuan (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Misal: Saya pakai jaket almamater biru di meja dekat tangga..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                />
              </div>

              {/* Safety notice */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
                💡 <strong>Tips Aman Preniche:</strong> Jangan pernah transfer uang muka (DP). Periksa kondisi fisik barang secara teliti di lokasi titik temu, lalu bayar tunai / QRIS langsung di tempat.
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Kirim Ajakan Janji COD & Kunci Status
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
