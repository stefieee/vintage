<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreProdukRequest;
use App\Http\Requests\UpdateProdukRequest;
use Inertia\Inertia;



class ProdukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produks = Produk::all();
        return Inertia::render('Produks/Index', [
            'produks' => $produks,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //  
          return Inertia::render('Produks/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
          $validated = $request->validate([
        'nama' => 'required|string|max:255',
        'deskripsi' => 'required|string',
        'harga' => 'required|numeric',
        'stok' => 'required|numeric',
        'gambar' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
    ]);

    if ($request->hasFile('gambar')) {
        $path = $request->file('gambar')->store('public/gambar');
        $validated['gambar'] = basename($path);
    }

    Produk::create($validated);

    return redirect('/produks')->with('success', 'Produk berhasil ditambahkan!');
    }

    
 public function show(Produk $produk)
{
    return Inertia::render('Produks/Show', [
        'produk' => $produk
    ]);
}


    
    public function edit($id)
{
    $produk = Produk::findOrFail($id);
    return Inertia::render('Produks/Edit', [
        'produk' => $produk,
    ]);
}

   
    public function update(Request $request, $id)
{
    $request->validate([
        'nama' => 'require  d|string|max:255',
        'deskripsi' => 'required|string',
        'harga' => 'required|numeric',
        'stok' => 'required|integer',
    ]);

    $produk = Produk::findOrFail($id);
    $produk->update($request->only(['nama', 'deskripsi', 'harga', 'stok']));

    return redirect('/produks')->with('success', 'Produk berhasil diperbarui!');
}

   
    public function destroy($id)
{
    $produk = Produk::findOrFail($id);

 
    if ($produk->gambar) {
        Storage::delete('public/' . $produk->gambar);
    }

    $produk->delete();

    return redirect('/produks')->with('success', 'Produk berhasil dihapus!');
}

}
