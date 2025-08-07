import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

interface Produk {
    id: number;
    nama: string;
    deskripsi: string;
    harga: number;
    stok: number;
    gambar: string | null;
}

interface ShowProps {
    produk: Produk;
}

const Show = ({ produk }: ShowProps) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: "Produk", href: "/produks" },
        { title: produk.nama, href: `/produks/${produk.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Produk - ${produk.nama}`} />

            <div className="min-h-screen bg-black py-10">
                <div className="max-w-3xl mx-auto p-6 bg-white text-black rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-4">{produk.nama}</h1>

                    <p className="mb-2">
                        <strong>Deskripsi:</strong> {produk.deskripsi}
                    </p>
                    <p className="mb-2">
                        <strong>Harga:</strong>{" "}
                        {produk.harga.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        })}
                    </p>
                    <p className="mb-2">
                        <strong>Stok:</strong> {produk.stok}
                    </p>

                    {produk.gambar && (
                        <div className="mt-4">
                            <img
                                src={`/storage/gambar/${produk.gambar}`}
                                alt={produk.nama}
                                className="w-64 rounded shadow"
                            />
                        </div>
                    )}

                    <div className="mt-6">
                        <a
                            href="/produks"
                            className="text-blue-600 hover:underline text-sm"
                        >
                            ← Kembali ke daftar produk
                        </a>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
