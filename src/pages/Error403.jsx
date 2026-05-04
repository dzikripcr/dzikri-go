import ErrorPage from "../components/ErrorPage";

export default function Error403() {
  return (
    <ErrorPage
      code="403"
      title="Forbidden"
      description="Akses ditolak. Kamu tidak diperbolehkan membuka halaman ini."
      image="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
    />
  );
}
