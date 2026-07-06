import React, { useState, useRef, useEffect } from "react";
import { FiX, FiArrowUpRight } from "react-icons/fi";
import { BsChatDotsFill } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";

// Ganti dengan nomor WhatsApp CS Boutique yang sebenarnya
// Format internasional TANPA tanda "+" (contoh: 62812xxxxxxx)
const CS_WHATSAPP_NUMBER = "6281234567890";

const topics = {
  produk: {
    label: "Info Produk & Ukuran",
    answer:
      "Kami punya banyak pilihan look, dari Casual, Formal, Party, sampai Gym dengan ukuran S - XXL. Detail ukuran & bahan bisa dilihat di setiap halaman produk ya, Kak! 😊",
    followUps: [
      {
        id: "produk-1",
        label: "Bagaimana cara memilih ukuran yang pas?",
        answer:
          "Kakak bisa cek size chart di setiap halaman produk, lalu ukur lingkar dada/pinggang sendiri dan bandingkan dengan tabel ukuran kami biar pas di badan ya!",
      },
      {
        id: "produk-2",
        label: "Kapan produk yang habis akan restock?",
        answer:
          "Restock biasanya dilakukan setiap minggu. Kakak bisa subscribe newsletter di halaman utama supaya dapat notifikasi duluan saat produk favorit restock!",
      },
      {
        id: "produk-3",
        label: "Bahan produk Boutique seperti apa?",
        answer:
          "Kami menggunakan bahan premium yang nyaman, breathable, dan tetap stylish, cocok dipakai untuk berbagai aktivitas sehari-hari.",
      },
    ],
  },
  pesanan: {
    label: "Pemesanan & Pembayaran",
    answer:
      "Pemesanan bisa langsung lewat website kami. Pembayaran tersedia via transfer bank, e-wallet, hingga kartu kredit/debit. Setelah pembayaran sukses, pesanan akan diproses dalam 1-2 hari kerja.",
    followUps: [
      {
        id: "pesanan-1",
        label: "Metode pembayaran apa saja yang tersedia?",
        answer:
          "Kami menerima transfer bank (BCA, Mandiri, BNI), e-wallet (GoPay, OVO, Dana), serta kartu kredit/debit melalui payment gateway yang aman.",
      },
      {
        id: "pesanan-2",
        label: "Bagaimana jika pembayaran saya gagal?",
        answer:
          "Jika pembayaran gagal, dana akan otomatis kembali dalam 1-3 hari kerja sesuai kebijakan bank/e-wallet Kakak. Kalau masih bermasalah, silakan hubungi CS kami langsung ya.",
      },
      {
        id: "pesanan-3",
        label: "Bisakah saya membatalkan atau mengubah pesanan?",
        answer:
          "Pesanan masih bisa diubah/dibatalkan selama belum memasuki status 'Diproses'. Setelah itu, silakan hubungi CS kami untuk bantuan lebih lanjut.",
      },
    ],
  },
  pengiriman: {
    label: "Pengiriman & Pengembalian",
    answer:
      "Pesanan dikirim menggunakan kurir pilihan Kakak (JNE, J&T, SiCepat) dengan estimasi 2-5 hari kerja tergantung lokasi.",
    followUps: [
      {
        id: "pengiriman-1",
        label: "Berapa estimasi waktu pengiriman?",
        answer:
          "Estimasi pengiriman sekitar 2-3 hari untuk area Jawa, dan 4-7 hari untuk luar Jawa, tergantung kurir yang dipilih ya Kak.",
      },
      {
        id: "pengiriman-2",
        label: "Bagaimana cara retur atau tukar ukuran?",
        answer:
          "Retur/tukar ukuran bisa diajukan maksimal 3 hari setelah barang diterima, dengan kondisi produk belum dipakai & label masih lengkap. Kakak bisa ajukan langsung lewat menu 'Manage Deliveries' di akun.",
      },
      {
        id: "pengiriman-3",
        label: "Apakah ada gratis ongkir?",
        answer:
          "Ada! Gratis ongkir berlaku untuk minimum pembelian tertentu. Info promo ongkir terbaru bisa Kakak lihat di banner promo halaman utama kami.",
      },
    ],
  },
};

// Menu utama (4 pilihan) - pilihan ke-4 langsung menuju WhatsApp
const mainMenu = [
  { id: "produk", label: "Info Produk & Ukuran" },
  { id: "pesanan", label: "Pemesanan & Pembayaran" },
  { id: "pengiriman", label: "Pengiriman & Pengembalian" },
  { id: "whatsapp", label: "Komunikasi langsung dengan CS Boutique" },
];

// Membuat link WhatsApp dengan template pesan otomatis sesuai topik
const buildWaLink = (topicLabel) => {
  const message = `Halo CS Boutique, saya ingin bertanya terkait layanan ${topicLabel}.`;
  return `https://wa.me/${CS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: "greeting",
      type: "bot",
      text: "👋 Halo! Silakan pilih layanan di bawah ini:",
    },
    { id: "main-menu", type: "options", scope: "main", options: mainMenu },
  ]);

  const idCounter = useRef(0);
  const bodyRef = useRef(null);

  const generateId = () => `msg-${Date.now()}-${idCounter.current++}`;

  // Auto-scroll ke bawah setiap kali ada pesan/opsi baru
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const appendUserChoice = (label) => {
    setMessages((prev) => [
      ...prev,
      { id: generateId(), type: "user", text: label },
    ]);
  };

  const appendBot = (text) => {
    setMessages((prev) => [...prev, { id: generateId(), type: "bot", text }]);
  };

  const appendOptionsBlock = (options, scope) => {
    setMessages((prev) => [
      ...prev,
      { id: generateId(), type: "options", scope, options },
    ]);
  };

  const appendWaCta = (topicLabel) => {
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        type: "wa",
        text: "Masih ada yang ingin ditanyakan seputar ini? Chat langsung dengan tim kami yuk!",
        topicLabel,
      },
    ]);
  };

  // Simulasi efek "bot sedang mengetik" sebelum jawaban muncul
  const showTypingThenAnswer = (answerText, afterCallback) => {
    const typingId = generateId();
    setMessages((prev) => [...prev, { id: typingId, type: "typing" }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== typingId),
        { id: generateId(), type: "bot", text: answerText },
      ]);

      if (afterCallback) {
        setTimeout(afterCallback, 500);
      }
    }, 900);
  };

  // Klik salah satu dari 4 menu utama
  const handleMainMenuClick = (optionId) => {
    const option = mainMenu.find((m) => m.id === optionId);
    if (!option) return;

    // Pilihan ke-4: langsung arahkan ke WhatsApp
    if (optionId === "whatsapp") {
      window.open(buildWaLink("produk Boutique secara umum"), "_blank");
      return;
    }

    appendUserChoice(option.label);
    const topic = topics[optionId];
    showTypingThenAnswer(topic.answer, () => {
      // Setelah dijawab, tampilkan 3 pertanyaan lanjutan yang relevan
      appendOptionsBlock(
        topic.followUps.map((f) => ({ id: f.id, label: f.label })),
        { topicId: optionId }
      );
    });
  };

  // Klik salah satu pertanyaan lanjutan (follow-up)
  const handleFollowUpClick = (topicId, followUpId) => {
    const topic = topics[topicId];
    const followUp = topic.followUps.find((f) => f.id === followUpId);
    if (!followUp) return;

    appendUserChoice(followUp.label);
    showTypingThenAnswer(followUp.answer, () => {
      // Setelah follow-up dijawab, tawarkan chat WhatsApp untuk pertanyaan lebih lanjut
      appendWaCta(topic.label);
    });
  };

  const handleBackToMenu = () => {
    appendBot("Tentu! Silakan pilih layanan lain yang ingin Kakak tanyakan ya 😊");
    appendOptionsBlock(mainMenu, "main");
  };

  const handleOptionButtonClick = (msg, opt) => {
    if (msg.scope === "main") {
      handleMainMenuClick(opt.id);
    } else {
      handleFollowUpClick(msg.scope.topicId, opt.id);
    }
  };

  return (
    <>
      {/* PANEL CHAT */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[200] w-[340px] sm:w-[380px] max-w-[90vw] max-h-[70vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
          {/* HEADER */}
          <div className="bg-black px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-black text-lg flex-shrink-0">
                B
              </div>
              <div>
                <h3 className="text-white font-bold text-sm leading-tight">
                  Bantuan Boutique
                </h3>
                <p className="text-gray-300 text-xs flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300 transition cursor-pointer"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* BODY - DAFTAR PESAN / OPSI */}
          <div
            ref={bodyRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F8F8F8]"
          >
            {messages.map((msg) => {
              if (msg.type === "bot") {
                return (
                  <div
                    key={msg.id}
                    className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-800 shadow-sm max-w-[85%] leading-relaxed"
                  >
                    {msg.text}
                  </div>
                );
              }

              if (msg.type === "user") {
                return (
                  <div
                    key={msg.id}
                    className="bg-black text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm shadow-sm max-w-[85%] ml-auto leading-relaxed"
                  >
                    {msg.text}
                  </div>
                );
              }

              if (msg.type === "typing") {
                return (
                  <div
                    key={msg.id}
                    className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm w-fit flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.1s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                  </div>
                );
              }

              if (msg.type === "options") {
                return (
                  <div key={msg.id} className="space-y-2">
                    {msg.options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleOptionButtonClick(msg, opt)}
                        className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm font-medium text-gray-900 hover:bg-black hover:text-white hover:border-black transition-all duration-300 cursor-pointer group"
                      >
                        <span className="text-left">{opt.label}</span>
                        <FiArrowUpRight className="text-gray-400 group-hover:text-white transition-colors duration-300 flex-shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                );
              }

              if (msg.type === "wa") {
                return (
                  <div key={msg.id} className="space-y-2">
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-800 shadow-sm max-w-[85%] leading-relaxed">
                      {msg.text}
                    </div>
                    <a
                      href={buildWaLink(msg.topicLabel)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold rounded-full px-4 py-3 text-sm hover:opacity-90 transition cursor-pointer"
                    >
                      <FaWhatsapp className="text-lg" />
                      Chat via WhatsApp
                    </a>
                    <button
                      onClick={handleBackToMenu}
                      className="w-full text-center text-xs text-gray-400 hover:text-gray-600 transition cursor-pointer pt-1"
                    >
                      ← Kembali ke menu utama
                    </button>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      )}

      {/* FLOATING ACTION BUTTON - posisi tetap di bawah kanan, tidak ikut scroll */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {isOpen ? (
          <FiX className="text-2xl" />
        ) : (
          <BsChatDotsFill className="text-2xl" />
        )}
      </button>
    </>
  );
}