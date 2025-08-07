import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';


interface Produk {
    id: number;
    nama: string;
    deskripsi: string;
    harga: number;
    stok: number;
    gambar: string;
}

interface Props {
    produks: Produk[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Produk", href: "/produks" },
];

export default function Index({ produks }: Props) {
    const handleDelete = (id: number) => {
        Swal.fire({
            title: "Yakin ingin menghapus produk ini?",
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/produks/${id}`, {
                    onSuccess: () => {
                        Swal.fire("Berhasil!", "Produk telah dihapus.", "success");
                    },
                    onError: () => {
                        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus produk.", "error");
                    },
                });
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk" />
            <h1 className="text-2xl font-semibold mb-4">Daftar Produk</h1>

      <div className="flex justify-end mb-4">
  <Link
    href="/produks/create"
    className="bg-gray-900 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow transition duration-300"
  >
    + Tambah Produk
  </Link>
</div>


            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2 bg-gray-900 text-white">ID</th>
                        <th className="border p-2 bg-gray-900 text-white">Nama</th>
                        <th className="border p-2 bg-gray-900 text-white">Deskripsi</th>
                        <th className="border p-2 bg-gray-900 text-white">Harga</th>
                        <th className="border p-2 bg-gray-900 text-white">Stok</th>
                        <th className="border p-2 bg-gray-900 text-white">Gambar</th>
                        <th className="border p-2 bg-gray-900 text-white">Aksi</th>
                    </tr>
                </thead>
               <tbody>
  {produks.map((produk, index) => (
    <tr key={produk.id}>
      <td className="border p-2">{index + 1}</td> {}
      <td className="border p-2">{produk.nama}</td>
      <td className="border p-2">{produk.deskripsi}</td>
      <td className="border p-2">
        {produk.harga.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })}
      </td>
      <td className="border p-2">{produk.stok}</td>
      <td className="border p-2">
        <img
          src={`/storage/${produk.gambar}`}
          alt={produk.nama}
          className="w-16 h-16 object-cover rounded"
        />
      </td>
     <td className="border p-2 text-center">
  <div className="flex gap-2 justify-center">
    <a
      href={`/produks/${produk.id}/edit`}
      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
    >
      Edit
    </a>
    <button
      onClick={() => handleDelete(produk.id)}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
    >
      Hapus
    </button>
            <a
            href={`/produks/${produk.id}`}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            Detail
          </a>
  </div>
</td>

    </tr>
  ))}
</tbody>

            </table>
        </AppLayout>
    );
}
