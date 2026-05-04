import ErrorPage from "../components/ErrorPage";

export default function Error401() {
  return (
    <ErrorPage
      code="401"
      title="Unauthorized Access"
      description="Kamu tidak memiliki otorisasi untuk membuka halaman ini. Silahkan login terlebih dahulu."
      image="https://cdn-icons-png.flaticon.com/512/6195/6195699.png"
    />
  );
}