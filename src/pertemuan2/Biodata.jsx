//Biodata.jsx
import "./Biodata.css";

export default function Biodata() {
    return (
        <div className="container stark-ui">
            <Header/>
            <UserCard 
                nama="Dzikri Maulana" 
                nim="2457301037" 
            />
            <About />
            <Experience />
            <Skill />
            <Contact />
            <Footer />
        </div>
    );
}

function Header() {
    return (
        <header className="header-stark">
            <div className="arc-reactor-logo"></div>
            <h1>BIODATA DIGITAL</h1>
            <p>Sistem Informasi | Dzikri Maulana</p>
        </header>
    );
}

function UserCard({ nama, nim }) {
    return (
        <div className="card hologram-card">
            <h3>IDENTITTAS</h3>
            <p><b>NAME:</b> {nama}</p>
            <p><b>ID_NUM:</b> {nim}</p>
        </div>
    );
}

function About() {
    return (
        <div className="card hologram-card">
            <h3>TENTANG</h3>
            <p>
                Lulusan D4 Sistem Informasi Politeknik Caltex Riau. 
                Spesialisasi dalam pengembangan modul React JS interaktif 
                dengan efisiensi tingkat tinggi.
            </p>
        </div>
    );
}

function Experience() {
    const pengalaman = [
        "Himpunan Mahasiswa - RISTEK",
        "HI-Bisik 2024 - Logistic",
        "JTI Expo III 2024 - Logistic",
        "Wisuda 2024 - Equipment",
        "Wisnight 2025 - Coordinator"
    ];

    return (
        <div className="card tech-border">
            <div className="scanner-line"></div>
            <h3>PENGALAMAN ORGANISASI & KEPANITIAN</h3>
            <div className="grid">
                {pengalaman.map((item, index) => (
                    <div key={index} className="box-tech">
                        <span className="bullet"></span> {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

function Skill() {
    const skills = ["HTML & CSS", "Laravel", "React JS", "Java"];
    return (
        <div className="card tech-border">
            <div className="scanner-line"></div>
            <h3>SKILL</h3>
            <div className="grid">
                {skills.map((item, index) => (
                    <div key={index} className="box-skill">
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

function Contact() {
    return (
        <div className="card tech-border contact-section">
            <h3>KONTAK</h3>
            <div className="grid">
                <a href="https://www.linkedin.com/in/dzikri-maulana-952134381/" target="_blank" className="btn-stark">LINKEDIN</a>
                <a href="https://www.instagram.com/dziikrri._08/" target="_blank" className="btn-stark">INSTAGRAM</a>
            </div>
        </div>
    );
}

function Footer() {
    return (
        <footer className="footer-stark">
            <p>SYSTEM STATUS: <span className="online-pulse">ONLINE</span></p>
            <p>© 2026 STARK INDUSTRIES - SYSTEM BY DZIKRI</p>
        </footer>
    );
}