import { FormEvent, useState } from "react";
import { router, Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Produk", href: "/produks" },
  { title: "Tambah Produk", href: "#" },
];

export default function Create() {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState(0);
  const [stok, setStok] = useState(0);
  const [gambar, setGambar] = useState<File | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("deskripsi", deskripsi);
    formData.append("harga", harga.toString());
    formData.append("stok", stok.toString());
    if (gambar) {
      formData.append("gambar", gambar);
    }

    router.post("/produks", formData);
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tambah Produk" />
      <h1 className="text-2xl font-semibold mb-4">Tambah Produk</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Nama Produk</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Deskripsi</label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Harga</label>
          <input
            type="number"
            value={harga}
            onChange={(e) => setHarga(Number(e.target.value))}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Stok</label>
          <input
            type="number"
            value={stok}
            onChange={(e) => setStok(Number(e.target.value))}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label>Gambar Produk</label>
          <input
            type="file"
            onChange={(e) => setGambar(e.target.files?.[0] ?? null)}
            className="border p-2 w-full"
            accept="image/*"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </AppLayout>
  );
}
