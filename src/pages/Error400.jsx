import ErrorPage from "../components/ErrorPage";

export default function Error400() {
  return (
    <ErrorPage
      code="400"
      title="Permintaan Tidak Dimengerti"
      description="Sepertinya ada kesalahan teknis saat memproses permintaan Anda. Mari coba segarkan halaman atau kembali ke katalog utama."
      image="https://cdn-icons-png.flaticon.com/512/3251/3251520.png"
    />
  );
}