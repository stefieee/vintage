import AppLayout from "@/layouts/app-layout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { BreadcrumbItem } from "@/types";

interface Produk {
    id: number;
    nama: string;
    deskripsi: string;
    harga: number;
    stok: number;
    gambar: string;
}

interface Props {
    produk: Produk;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Produk", href: "/produks" },
    { title: "Edit", href: "#" },
];

export default function Edit({ produk }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        nama: produk.nama,
        deskripsi: produk.deskripsi,
        harga: produk.harga,
        stok: produk.stok,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/produks/${produk.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Produk" />
            <h1 className="text-2xl font-semibold mb-4">Edit Produk</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
                <div>
                    <label className="block mb-1 font-medium">Nama Produk</label>
                    <input
                        type="text"
                        value={data.nama}
                        onChange={(e) => setData("nama", e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                    {errors.nama && <div className="text-red-500 text-sm">{errors.nama}</div>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Deskripsi</label>
                    <textarea
                        value={data.deskripsi}
                        onChange={(e) => setData("deskripsi", e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                    {errors.deskripsi && <div className="text-red-500 text-sm">{errors.deskripsi}</div>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Harga</label>
                    <input
                        type="number"
                        value={data.harga}
                        onChange={(e) => setData("harga", Number(e.target.value))}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                    {errors.harga && <div className="text-red-500 text-sm">{errors.harga}</div>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Stok</label>
                    <input
                        type="number"
                        value={data.stok}
                        onChange={(e) => setData("stok", Number(e.target.value))}
                        className="w-full border border-gray-300 rounded p-2"
                    />
                    {errors.stok && <div className="text-red-500 text-sm">{errors.stok}</div>}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Simpan Perubahan
                </button>
            </form>
        </AppLayout>
    );
}
