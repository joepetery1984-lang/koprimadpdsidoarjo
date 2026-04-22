/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import onboarding1Img from './assets/onboarding1.jpg';
import paket1Img from './assets/paket1.png';
import paket2Img from './assets/paket2.png';
import paket3Img from './assets/paket3.png';
import paket4Img from './assets/paket4.png';
import logoImg from './assets/logo.png';
import umroh1Img from './assets/umroh1.jpeg';
import umroh2Img from './assets/umroh2.jpeg';
import umroh3Img from './assets/umroh3.jpeg';
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ShoppingBasket,
  Wallet,
  User,
  ChevronRight,
  ArrowLeft,
  ShoppingBag,
  Home,
  LogOut,
  Lock,
  UserRound,
  HelpCircle,
  Search,
  SlidersHorizontal,
  TrendingUp,
  Gift,
  Calendar,
  MapPin,
  MoreVertical,
  Eye,
  EyeOff,
  BadgeCheck,
  Truck,
  Landmark,
  ShieldCheck,
  Info,
  Store,
  FileText,
  Download,
  Users,
  Ticket
} from 'lucide-react';

// --- TYPES ---
type Screen =
  | 'onboarding1' | 'onboarding2' | 'onboarding3'
  | 'login' | 'register'
  | 'home' | 'sembako' | 'simpanan' | 'profil' | 'notifications'
  | 'checkout' | 'payment_method' | 'success_payment'
  | 'setor' | 'tarik' | 'bayar_simpanan' | 'riwayat_simpanan' | 'referral'
  | 'ubah_profil' | 'keamanan' | 'bantuan' | 'tentang_kami' | 'syarat_ketentuan' | 'kebijakan_privasi' | 'voucher_umroh';

// --- SHARED COMPONENTS ---

const TopAppBar = ({
  title,
  showBack,
  onBack,
  showActions = true,
  onNotifications
}: {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showActions?: boolean;
  onNotifications?: () => void;
}) => (
  <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 glass-nav shadow-sm">
    <div className="relative flex items-center justify-center px-6 py-3 min-h-[56px]">
      {showBack && (
        <button onClick={onBack} className="absolute left-4 p-2 rounded-full hover:bg-surface-container-low transition-all">
          <ArrowLeft className="w-5 h-5 text-primary" />
        </button>
      )}
      <h1 className="font-headline font-bold text-sm text-primary tracking-wide uppercase text-center truncate px-12">
        {title}
      </h1>
      {showActions && (
        <button onClick={onNotifications} className="absolute right-4 p-2 rounded-full hover:bg-surface-container-low transition-all relative">
          <Bell className="w-5 h-5 text-primary" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-surface"></span>
        </button>
      )}
    </div>
  </header>
);

const BottomNavBar = ({ active, onNavigate }: { active: Screen; onNavigate: (s: Screen) => void }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Beranda' },
    { id: 'sembako', icon: ShoppingBasket, label: 'Sembako' },
    { id: 'simpanan', icon: Wallet, label: 'Simpanan' },
    { id: 'profil', icon: User, label: 'Profil' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 flex justify-around items-center px-2 pt-3 pb-8 bg-surface-container-lowest rounded-t-[2rem] shadow-[0_-8px_40px_rgba(0,0,0,0.08)] border-t border-outline-variant/10">
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id as Screen)}
            className="flex flex-col items-center justify-center p-2 transition-all duration-300 relative min-w-[64px] group"
          >
            <div className={`relative px-5 py-1 rounded-full transition-all duration-300 mb-1 ${isActive ? 'btn-primary ' : 'bg-transparent text-on-surface-variant group-hover:bg-surface-container-low'}`}>
              <tab.icon className="w-6 h-6" />
            </div>
            <span className={`font-lexend text-[10px] transition-all duration-300 truncate ${isActive ? 'font-bold text-primary translate-y-0 opacity-100' : 'font-medium text-on-surface-variant translate-y-1 opacity-80'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

// --- SCREENS ---

const OnboardingScreen = ({
  image,
  title,
  description,
  step,
  onNext,
  onSkip,
  buttonText = "Lanjut"
}: {
  image: string;
  title: string;
  description: string;
  step: number;
  onNext: () => void;
  onSkip: () => void;
  buttonText?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="min-h-screen flex flex-col items-center p-8 bg-surface"
  >
    <div className="w-full flex justify-end mb-8">
      <button onClick={onSkip} className="text-primary font-bold text-sm">Lewati</button>
    </div>

    <div className="relative w-full max-w-sm mb-12">
      <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
        <img src={image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
    </div>

    <div className="text-center space-y-4 flex-1">
      <h1 className="text-2xl font-extrabold text-primary leading-tight font-headline">{title}</h1>
      <p className="text-on-surface-variant text-base px-4 leading-relaxed font-medium">{description}</p>
    </div>

    <div className="w-full space-y-8 pb-8">
      <div className="flex justify-center gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 rounded-full transition-all duration-300 ${s === step ? 'w-10 bg-primary' : 'w-2 bg-outline-variant'}`}
          />
        ))}
      </div>
      <button
        onClick={onNext}
        className="w-full py-5 btn-primary font-bold text-xl rounded-2xl  flex items-center justify-center gap-2 active:scale-95 transition-all"
      >
        {buttonText}
        <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  </motion.div>
);

const AuthLogin = ({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="min-h-screen pt-24 px-8 bg-surface space-y-12"
  >
    <div className="text-center space-y-4">
      <div className="w-20 h-20 bg-primary-container/10 rounded-2xl mx-auto flex items-center justify-center overflow-hidden">
        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
          <BadgeCheck className="w-8 h-8 text-white" />
        </div>
      </div>
      <h1 className="text-xl font-extrabold text-primary font-headline">Selamat Datang Kembali</h1>
      <p className="text-sm text-on-surface-variant">Silakan masuk untuk melanjutkan aktivitas di KOPRIMA</p>
    </div>

    <div className="bg-surface-container-lowest p-8 rounded-3xl card space-y-6">
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-bold text-on-surface ml-1">Email atau Nomor WhatsApp</label>
          <div className="relative">
            <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline-variant" />
            <input
              type="text"
              placeholder="Contoh: 08123456789"
              className="w-full pl-12 pr-4 py-4 bg-surface-container-low rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center px-1">
            <label className="text-sm font-bold text-on-surface text-center">Kata Sandi</label>
            <button className="text-xs font-bold text-primary">Lupa Kata Sandi?</button>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline-variant" />
            <input
              type="password"
              placeholder="Masukkan kata sandi"
              className="w-full pl-12 pr-12 py-4 bg-surface-container-low rounded-2xl outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            <Eye className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline-variant" />
          </div>
        </div>
      </div>

      <button
        onClick={onLogin}
        className="w-full py-4 btn-primary font-bold rounded-2xl shadow-lg active:scale-95 transition-all"
      >
        Masuk Sekarang
      </button>

      <div className="relative flex items-center gap-4 py-2">
        <div className="flex-1 h-px bg-outline-variant/30"></div>
        <span className="text-xs font-bold text-outline-variant uppercase tracking-widest">Atau masuk dengan</span>
        <div className="flex-1 h-px bg-outline-variant/30"></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-3 py-4 border border-outline-variant rounded-2xl hover:bg-surface-container-low transition-all">
          <img src="https://img.icons8.com/color/48/google-logo.png" className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
          <span className="text-sm font-bold">Google</span>
        </button>
        <button className="flex items-center justify-center gap-3 py-4 border border-outline-variant rounded-2xl hover:bg-surface-container-low transition-all">
          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white">f</div>
          <span className="text-sm font-bold">Facebook</span>
        </button>
      </div>
    </div>

    <p className="text-center font-medium">
      Belum punya akun? <button onClick={onRegister} className="text-primary font-extrabold ml-1">Daftar di sini</button>
    </p>
  </motion.div>
);

const MainHome = ({ onDetail }: { onDetail: (s: Screen) => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="pt-24 pb-32 px-6 space-y-8"
  >
    <section className="flex justify-between items-end">
      <div>
        <p className="text-secondary font-bold text-[9px] uppercase tracking-widest mb-1">Wilayah DPD Sidoarjo</p>
        <h2 className="text-2xl font-extrabold text-primary font-headline">Selamat Pagi, Ibu</h2>
        <p className="text-on-surface-variant text-sm">Semoga hari ini penuh berkah.</p>
      </div>
      <div className="badge-active px-4 py-2 rounded-full flex items-center gap-2">
        <BadgeCheck className="w-4 h-4 text-primary" />
        <span className="text-primary font-bold text-xs uppercase">Aktif</span>
      </div>
    </section>

    <div className="card-balance rounded-[2.5rem] p-8  space-y-8 card relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-12">
          <div>
            <p className="text-on-primary-container text-xs font-medium mb-1">Total Saldo Simpanan</p>
            <h3 className="text-2xl font-bold tracking-tight">Rp 7.825.000</h3>
          </div>
          <Wallet className="w-8 h-8 opacity-30" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
            <p className="text-[9px] uppercase font-bold text-white/70 mb-1">Simpanan Pokok</p>
            <p className="text-base font-bold">Rp 100.000</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl">
            <p className="text-[9px] uppercase font-bold text-white/70 mb-1">Simpanan Wajib</p>
            <p className="text-base font-bold">Rp 525.000</p>
          </div>
        </div>

        <div className="mt-8 flex gap-4 relative z-10">
          <button
            onClick={() => onDetail('bayar_simpanan')}
            className="flex-1 bg-white text-primary py-4 rounded-xl font-bold text-sm active:scale-95 transition-all shadow-lg"
          >
            Bayar Simpanan
          </button>
          <button
            onClick={() => onDetail('riwayat_simpanan')}
            className="flex-1 border border-white/40 bg-white/10 backdrop-blur-sm text-white py-4 rounded-xl font-bold text-sm active:scale-95 transition-all"
          >
            Riwayat
          </button>
        </div>
      </div>
      <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card-green p-6 rounded-3xl flex items-center gap-4 card">
        <div className="bg-white/20 p-4 rounded-2xl">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div>
          <h4 className="font-bold">Pengingat Sembako</h4>
          <p className="text-xs text-on-secondary-container">Belanja sebelum tanggal 25!</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/10 card space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-xl font-bold">Butuh Sembako?</h4>
            <p className="text-sm text-on-surface-variant">Pesan paket dapur hari ini.</p>
          </div>
          <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center">
            <ShoppingBasket className="w-6 h-6 text-primary" />
          </div>
        </div>
        <button
          onClick={() => onDetail('sembako')}
          className="w-full btn-primary py-4 rounded-2xl font-bold "
        >
          Mulai Belanja Sekarang
        </button>
      </div>
    </div>

    <div onClick={() => onDetail('voucher_umroh')} className="card bg-gradient-to-tr from-[#CFA144] to-[#F1D77A] p-6 rounded-3xl flex items-center justify-between cursor-pointer active:scale-95 transition-all shadow-xl border border-white/20">
      <div className="text-[#5C4510]">
        <p className="text-[10px] uppercase font-extrabold tracking-widest mb-1 opacity-80">Eksklusif Anggota</p>
        <h4 className="text-2xl font-black font-headline mb-1">Voucher Umroh</h4>
        <p className="text-xs font-bold bg-white/40 inline-block px-3 py-1 rounded-full shadow-sm">Rp 1.500.000</p>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-lg border border-white/50">
        <Ticket className="w-8 h-8 text-[#CFA144]" />
      </div>
    </div>

    <section className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-2xl font-bold font-headline">Katalog Terbaru</h3>
        <button onClick={() => onDetail('sembako')} className="text-primary font-bold text-sm">Lihat Semua</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: 'Beras Premium 5kg', price: 'Rp 72.500', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80', badge: 'Terlaris' },
          { name: 'Minyak Goreng 2L', price: 'Rp 34.200', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80', badge: 'Hemat' },
          { name: 'Gula Pasir 1kg', price: 'Rp 16.000', img: 'https://images.unsplash.com/photo-1622484211148-52b36c4b62db?auto=format&fit=crop&w=300&q=80' },
          { name: 'Telur Ayam 1kg', price: 'Rp 28.500', img: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=300&q=80' },
        ].map((p) => (
          <div key={p.name} className="group flex flex-col space-y-2">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-surface-container-low">
              <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" referrerPolicy="no-referrer" />
              {p.badge && (
                <span className="absolute top-4 left-4 btn-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase">{p.badge}</span>
              )}
            </div>
            <div className="px-2">
              <h5 className="font-bold text-on-surface leading-tight">{p.name}</h5>
              <p className="text-primary font-extrabold">{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-surface-container-low rounded-[2rem] p-6 space-y-4">
      <h3 className="text-xl font-bold text-primary font-headline">Rapat Anggota</h3>
      <p className="text-sm text-on-surface-variant">Kami mengundang Ibu dalam pertemuan rutin bulanan Minggu depan.</p>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-xl text-primary"><Calendar className="w-6 h-6" /></div>
          <span className="font-bold">15 Oktober 2023</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-xl text-primary"><MapPin className="w-6 h-6" /></div>
          <span className="font-bold">Balai Pertemuan Sidoarjo</span>
        </div>
      </div>
      <div className="rounded-3xl overflow-hidden h-48 shadow-lg">
        <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
    </section>
  </motion.div>
);

const MainSembako = ({ onNext }: { onNext: (s: Screen) => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="pt-24 pb-32 px-6 space-y-8"
  >
    <section>
      <span className="text-primary font-bold text-[9px] uppercase tracking-widest mb-2 block">Program Wajib</span>
      <h2 className="text-2xl font-extrabold text-on-surface font-headline leading-tight">Galeri Paket Dapur</h2>
      <p className="text-sm text-on-surface-variant mt-2">Beli minimal 1 paket per bulan sebelum tanggal 25.</p>
    </section>

    <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex items-center gap-5">
      <div className="bg-red-500 text-white p-3 rounded-2xl">
        <Calendar className="w-7 h-7" />
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold text-red-500">Batas Pembelian</p>
        <p className="text-sm font-bold text-red-900">Setiap Tanggal 25</p>
      </div>
    </div>

    <div className="space-y-8">
      {[
        { id: 1, name: 'Paket Berkah 1', content: 'Beras 5kg, Minyak 2L, Gula 1kg, Teh', price: 'Rp 145.000', img: paket1Img, featured: true },
        { id: 2, name: 'Paket Hemat 2', content: 'Minyak 1L, Gula 2kg, Garam, Kecap', price: 'Rp 85.000', img: paket2Img },
        { id: 3, name: 'Paket Komplit 3', content: 'Beras 10kg, Minyak 2L, Telur 1kg, Kopi', price: 'Rp 210.000', img: paket3Img },
        { id: 4, name: 'Paket Spesial 4', content: 'Sembako Premium Lengkap', price: 'Rp 325.000', img: paket4Img },
      ].map((pkg) => (pkg.featured ? (
        <div key={pkg.id} className="group bg-surface-container-lowest rounded-[2.5rem] overflow-hidden card flex flex-col">
          <div className="aspect-[16/9] overflow-hidden">
            <img src={pkg.img} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
          </div>
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-primary/10 text-primary text-[9px] font-bold px-3 py-1 rounded-full uppercase inline-block mb-2">Terpopuler</span>
                <h3 className="text-xl font-bold">{pkg.name}</h3>
                <p className="text-on-surface-variant text-xs mt-1">{pkg.content}</p>
              </div>
              <span className="text-xl font-extrabold text-primary">{pkg.price}</span>
            </div>
            <button
              onClick={() => onNext('checkout')}
              className="w-full btn-primary py-5 rounded-2xl font-bold text-lg active:scale-95 transition-all  flex items-center justify-center gap-2"
            >
              <ShoppingBasket className="w-6 h-6" />
              BELI PAKET {pkg.id}
            </button>
          </div>
        </div>
      ) : (
        <div key={pkg.id} className="group flex bg-surface-container-lowest rounded-[2rem] overflow-hidden card">
          <div className="w-1/3 overflow-hidden">
            <img src={pkg.img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" referrerPolicy="no-referrer" />
          </div>
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold">{pkg.name}</h3>
              <p className="text-on-surface-variant text-[10px] mt-1">{pkg.content}</p>
            </div>
            <div className="flex justify-between items-end mt-4">
              <span className="text-xl font-extrabold text-primary">{pkg.price}</span>
              <button className="bg-surface-container-low hover:bg-primary hover:text-white text-primary p-2 rounded-xl transition-all">
                <ShoppingBasket className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )))}
    </div>
  </motion.div>
);

const MainSimpanan = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="pt-24 pb-32 px-6 space-y-10"
  >
    <section>
      <p className="text-on-surface-variant text-sm font-medium mb-1">Ringkasan Tabungan</p>
      <h2 className="text-2xl font-extrabold text-primary font-headline tracking-tight">Tabungan Saya</h2>
    </section>

    <div className="card-balance p-8 rounded-[2rem]  space-y-6 shadow-2xl relative overflow-hidden">
      <div className="relative z-10">
        <p className="text-on-primary-container/80 text-[10px] font-bold uppercase tracking-widest">Saldo Total Gabungan</p>
        <h3 className="text-3xl font-bold mt-2 font-mono">Rp 7.825.000</h3>
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => onNavigate('setor')}
            className="flex-1 bg-white/20 backdrop-blur-md text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <TrendingUp className="w-5 h-5" /> Setor
          </button>
          <button
            onClick={() => onNavigate('tarik')}
            className="flex-1 bg-white text-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Wallet className="w-5 h-5" /> Tarik
          </button>
        </div>
      </div>
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
    </div>

    <div className="space-y-4">
      <h3 className="text-lg font-bold text-on-surface px-1">Kategori Simpanan</h3>
      {[
        { name: 'Simpanan Pokok', desc: 'Dibayar sekali saat awal daftar.', val: 'Rp 100.000', icon: Home },
        { name: 'Simpanan Wajib', desc: 'Simpanan bulanan rutin.', val: 'Rp 525.000', icon: Calendar },
        { name: 'Simpanan Sukarela', desc: 'Bisa setor/tarik kapan saja.', val: 'Rp 7.200.000', icon: Gift },
      ].map((s) => (
        <div key={s.name} className="bg-surface-container-low p-5 rounded-3xl flex items-center justify-between hover:bg-surface-container transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-on-surface leading-tight">{s.name}</h4>
              <p className="text-[10px] text-on-surface-variant">{s.desc}</p>
            </div>
          </div>
          <p className="text-base font-bold text-primary font-mono">{s.val}</p>
        </div>
      ))}
    </div>

    <div className="bg-surface-container-lowest p-8 rounded-[2rem] card space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Transaksi Terakhir</h3>
        <button onClick={() => onNavigate('riwayat_simpanan')} className="text-primary font-bold text-sm">Lihat Semua</button>
      </div>
      <div className="space-y-2">
        {[
          { title: 'Setoran Wajib', date: 'Mei 2024 • 14:20', val: '+ Rp 100.000', status: 'BERHASIL', type: 'in' },
          { title: 'Penarikan Sukarela', date: '12 Mei • 09:15', val: '- Rp 500.000', status: 'BERHASIL', type: 'out' },
          { title: 'Bagi Hasil SHU', date: '01 Mei • 00:01', val: '+ Rp 345.000', status: 'AUTO-CREDIT', type: 'in' },
        ].map((t, i) => (
          <div key={i} className="flex justify-between items-center p-4 rounded-2xl hover:bg-surface-container-low transition-all">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${t.type === 'in' ? 'badge-active' : 'bg-red-50 text-red-500'}`}>
                {t.type === 'in' ? <TrendingUp className="w-6 h-6" /> : <Gift className="w-6 h-6 rotate-180" />}
              </div>
              <div>
                <p className="font-bold text-on-surface leading-none mb-1">{t.title}</p>
                <p className="text-[10px] text-on-surface-variant font-medium">{t.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-bold ${t.type === 'in' ? 'text-primary' : 'text-red-500'}`}>{t.val}</p>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{t.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const MainProfil = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="pt-24 pb-32 px-6 space-y-8"
  >
    <section className="bg-surface-container-lowest p-8 rounded-[2.5rem] card text-center space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
      <div className="relative inline-block">
        <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-primary to-primary-container">
          <div className="w-full h-full rounded-full border-4 border-surface-container-lowest overflow-hidden">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
        <div className="absolute bottom-1 right-1 btn-primary p-2 rounded-full border-4 border-surface-container-lowest">
          <BadgeCheck className="w-4 h-4" />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-extrabold text-on-surface tracking-tight">Ibu Siti Aminah</h2>
        <p className="text-on-surface-variant font-medium text-xs">Anggota Sejak Januari 2022</p>
      </div>
      <div className="flex gap-2 justify-center">
        <span className="px-4 py-1.5 badge-active font-bold text-[10px] rounded-full uppercase">Aktif</span>
        <span className="px-4 py-1.5 bg-surface-container-high text-on-surface-variant font-bold text-[10px] rounded-full uppercase">KOP-2022-0891</span>
      </div>
    </section>

    <div className="grid grid-cols-2 gap-4">
      <div className="card-balance p-6 rounded-3xl text-center space-y-1">
        <p className="text-[10px] text-white/70 font-bold uppercase">Tabungan</p>
        <p className="text-xl font-bold text-white">Rp 7.8M</p>
      </div>
      <div className="card-green p-6 rounded-3xl text-center space-y-1">
        <p className="text-[10px] text-on-surface-variant/70 font-bold uppercase">Poin</p>
        <p className="text-xl font-bold text-primary">850 Pts</p>
      </div>
    </div>

    <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden">
      {[
        { title: 'Ubah Profil', icon: UserRound, desc: 'Perbarui data diri & foto', id: 'ubah_profil' },
        { title: 'Referral Saya', icon: Users, desc: 'Daftar anggota yang diajak', id: 'referral' },
        { title: 'Keamanan', icon: Lock, desc: 'PIN & Kata Sandi', id: 'keamanan' },
        { title: 'Bantuan', icon: HelpCircle, desc: 'Pusat dukungan 24/7', id: 'bantuan' },
        { title: 'Tentang Kami', icon: Info, desc: 'Informasi aplikasi KOPRIMA', id: 'tentang_kami' },
      ].map((m) => (
        <button key={m.title} onClick={() => onNavigate(m.id as Screen)} className="w-full flex items-center justify-between p-6 hover:bg-surface-container-low transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
              <m.icon className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="font-bold text-on-surface leading-none mb-1">{m.title}</p>
              <p className="text-[10px] text-on-surface-variant font-medium">{m.desc}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-outline-variant group-hover:translate-x-1 transition-all" />
        </button>
      ))}
      <button className="w-full flex items-center gap-4 p-6 bg-red-50 text-red-500 hover:bg-red-100 transition-all">
        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
          <LogOut className="w-6 h-6" />
        </div>
        <div className="text-left">
          <p className="font-bold leading-none mb-1">Keluar</p>
          <p className="text-[10px] font-medium opacity-70">Keluar dari aplikasi KOPRIMA</p>
        </div>
      </button>
    </div>
  </motion.div>
);

const ScreenReferral = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="pt-24 pb-32 px-6 space-y-8"
  >
    <section className="card-balance p-6 rounded-[2.5rem]  space-y-4 shadow-2xl relative overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-2xl font-extrabold font-headline">Referral Saya</h2>
        <p className="text-sm text-white/80 mt-1">Ajak lebih banyak keluarga untuk bergabung dan dapatkan poin tambahan!</p>
        <div className="mt-6 bg-white/20 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between border border-white/30">
          <div>
            <p className="text-[10px] uppercase font-bold text-white/80 mb-1">Kode Referral Anda</p>
            <p className="font-mono font-bold text-lg tracking-widest text-white drop-shadow-md">KOP-SITI-2023</p>
          </div>
          <button className="bg-white text-primary px-5 py-3 rounded-xl font-bold text-sm shadow-lg active:scale-95 transition-all">Salin</button>
        </div>
      </div>
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
    </section>

    <section className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h3 className="font-bold text-lg text-on-surface">Anggota Terdaftar (3)</h3>
        <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">+150 Pts</span>
      </div>
      <div className="bg-surface-container-lowest rounded-[2rem] overflow-hidden card">
        {[
          { name: 'Bapak Budi Santoso', date: '12 Okt 2023', status: 'Aktif', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80' },
          { name: 'Ibu Ratna Sari', date: '05 Sep 2023', status: 'Aktif', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80' },
          { name: 'Bapak Anton Wijaya', date: '21 Agu 2023', status: 'Menunggu', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80' },
        ].map((ref, idx) => (
          <div key={idx} className={`p-5 flex items-center gap-4 hover:bg-surface-container-low transition-all ${idx !== 2 ? 'border-b border-outline-variant/10' : ''}`}>
            <img src={ref.img} className="w-12 h-12 rounded-full object-cover border-2 border-surface-container-highest" referrerPolicy="no-referrer" />
            <div className="flex-1">
              <h4 className="font-bold text-sm text-on-surface">{ref.name}</h4>
              <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">Bergabung: {ref.date}</p>
            </div>
            <span className={`text-[9px] font-bold uppercase px-3 py-1 rounded-full ${ref.status === 'Aktif' ? 'badge-active' : 'bg-surface-container-highest text-on-surface-variant'}`}>
              {ref.status}
            </span>
          </div>
        ))}
      </div>
    </section>
  </motion.div>
);

const ScreenUbahProfil = () => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="pt-24 pb-32 px-6 space-y-8">
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-primary to-primary-container">
          <div className="w-full h-full rounded-full border-4 border-surface-container-lowest overflow-hidden">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
        <button className="absolute bottom-0 right-0 btn-primary p-2 rounded-full border-2 border-surface-container-lowest">
          <FileText className="w-4 h-4" />
        </button>
      </div>
      <p className="text-sm font-bold text-primary">Ganti Foto Profil</p>
    </div>
    <div className="space-y-6">
      <div className="card bg-surface-container-lowest p-6 rounded-3xl space-y-4">
        <h3 className="font-bold text-lg text-on-surface border-b border-outline-variant/20 pb-2 mb-4">Informasi Pribadi</h3>
        <div className="space-y-1">
          <label className="text-xs font-bold text-on-surface-variant ml-1">Nama Lengkap</label>
          <input type="text" defaultValue="Ibu Siti Aminah" className="w-full p-4 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary font-bold text-on-surface" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-on-surface-variant ml-1">Nomor Induk Kependudukan (NIK)</label>
          <input type="text" defaultValue="3515000000000000" className="w-full p-4 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary font-bold text-on-surface" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-on-surface-variant ml-1">Nomor Telepon</label>
          <input type="text" defaultValue="0812-3456-7890" className="w-full p-4 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary font-bold text-on-surface" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-on-surface-variant ml-1">Alamat Email</label>
          <input type="email" defaultValue="siti.aminah@example.com" className="w-full p-4 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary font-bold text-on-surface" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-on-surface-variant ml-1">Alamat Domisili</label>
          <textarea rows={3} defaultValue="Jl. Mawar No. 12, Sidoarjo" className="w-full p-4 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary font-bold text-on-surface"></textarea>
        </div>
      </div>

      <div className="card bg-surface-container-lowest p-6 rounded-3xl space-y-4">
        <h3 className="font-bold text-lg text-on-surface border-b border-outline-variant/20 pb-2 mb-4">Informasi Rekening Bank</h3>
        <div className="space-y-1">
          <label className="text-xs font-bold text-on-surface-variant ml-1">Nama Bank</label>
          <select className="w-full p-4 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary font-bold text-on-surface appearance-none">
            <option>Bank Mandiri</option>
            <option>Bank BCA</option>
            <option>Bank BRI</option>
            <option>Bank BNI</option>
            <option>Bank Syariah Indonesia (BSI)</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-on-surface-variant ml-1">Nomor Rekening</label>
          <input type="text" defaultValue="14100xxxxxxxx" className="w-full p-4 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary font-bold text-on-surface font-mono tracking-wider" />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-on-surface-variant ml-1">Nama Pemilik Rekening</label>
          <input type="text" defaultValue="Ibu Siti Aminah" className="w-full p-4 bg-surface-container-low rounded-xl outline-none focus:ring-2 focus:ring-primary font-bold text-on-surface border border-red-200 focus:border-transparent" />
          <p className="text-[10px] text-red-500 font-medium ml-1 flex items-center gap-1 mt-1">
            <Info className="w-3 h-3" />
            Nama pemilik rekening wajib sama dengan Nama Lengkap
          </p>
        </div>
      </div>
    </div>
    <button className="w-full btn-primary py-4 rounded-xl font-bold text-lg active:scale-95 transition-all">Simpan Perubahan</button>
  </motion.div>
);

const ScreenKeamanan = () => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="pt-24 pb-32 px-6 space-y-8">
    <section className="space-y-2">
      <h2 className="text-2xl font-extrabold font-headline text-on-surface">Keamanan Akun</h2>
      <p className="text-sm text-on-surface-variant">Pastikan PIN dan Kata Sandi Anda selalu rahasia.</p>
    </section>
    <div className="card bg-surface-container-lowest p-6 rounded-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-on-surface">Ubah PIN Transaksi</h4>
          <p className="text-xs text-on-surface-variant mt-1">Untuk keamanan transaksi finansial</p>
        </div>
        <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-xs">Ubah</button>
      </div>
      <div className="h-px bg-outline-variant/20"></div>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-on-surface">Ubah Kata Sandi</h4>
          <p className="text-xs text-on-surface-variant mt-1">Untuk masuk ke aplikasi KOPRIMA</p>
        </div>
        <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg font-bold text-xs">Ubah</button>
      </div>
    </div>
  </motion.div>
);

const ScreenBantuan = () => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="pt-24 pb-32 px-6 space-y-8">
    <div className="card-balance p-6 rounded-3xl text-center space-y-4 relative overflow-hidden">
      <div className="relative z-10">
        <HelpCircle className="w-12 h-12 text-white mx-auto mb-2 opacity-90" />
        <h2 className="text-xl font-extrabold font-headline">Pusat Bantuan</h2>
        <p className="text-sm text-white/80">Kami siap membantu Ibu 24/7</p>
        <button className="mt-4 w-full bg-white text-[#0F2A1D] font-bold py-3 rounded-xl shadow-lg">Hubungi CS WhatsApp</button>
      </div>
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
    </div>
    <div className="space-y-4">
      <h3 className="font-bold text-lg px-1">Pertanyaan Umum (FAQ)</h3>
      <div className="card bg-surface-container-lowest rounded-[2rem] overflow-hidden">
        {['Cara bayar simpanan wajib?', 'Berapa bunga simpanan sukarela?', 'Cara ambil sembako bulanan?'].map((q, i) => (
          <div key={i} className={`p-5 flex justify-between items-center ${i !== 2 ? 'border-b border-outline-variant/10' : ''}`}>
            <p className="font-bold text-sm text-on-surface">{q}</p>
            <ChevronRight className="w-5 h-5 text-outline-variant" />
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const ScreenTentangKami = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="pt-24 pb-32 px-6 space-y-8 flex flex-col items-center">
    <div className="w-32 h-32 flex items-center justify-center mb-4 drop-shadow-2xl">
      <img src={logoImg} alt="Logo KOPRIMA" className="w-full h-full object-contain" />
    </div>
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-extrabold font-headline text-primary">KOPRIMA DPD SIDOARJO</h2>
      <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">Versi 1.0.4 | Resmi di Bawah Kewenangan DPD</p>
    </div>
    
    <div className="w-full text-sm text-on-surface-variant leading-relaxed space-y-6 text-justify">
      <p>
        KOPRIMA DPD Sidoarjo adalah platform koperasi digital resmi milik Dewan Pengurus Daerah (DPD) Koperasi Konsumen Mina Tani (KOPRIMA) “Amanah” Indonesia di Kabupaten Sidoarjo.
      </p>
      <p>
        Aplikasi ini sepenuhnya berada di bawah kewenangan dan pengelolaan DPD Kabupaten Sidoarjo sesuai Surat Keputusan No. 01.002/0028/SK/KOPRIMA/DPP/IV/2026 yang ditetapkan oleh Dewan Pengurus Pusat KOPRIMA “Amanah” Indonesia pada tanggal 13 April 2026.
      </p>

      <div className="card bg-surface-container-lowest p-5 rounded-2xl space-y-3">
        <h3 className="font-bold text-on-surface text-base">Susunan Pengurus DPD Sidoarjo:</h3>
        <ul className="list-none space-y-2 text-xs">
          <li><strong>Ketua DPD:</strong> Sri Widarmningsih, SE</li>
          <li><strong>Sekretaris:</strong> Ir. Hery Koesmardianto</li>
          <li><strong>Bendahara:</strong> Sulis Suryani</li>
          <li><strong>Koordinator Pengawas:</strong> Astrid Anindyajati Striratna, S.IKom</li>
        </ul>
      </div>

      <div className="card bg-surface-container-lowest p-5 rounded-2xl space-y-3">
        <h3 className="font-bold text-on-surface text-base">Sekretariat Resmi:</h3>
        <p className="text-xs leading-relaxed">
          Perum Taman Candi Loka, Blok E-3 No. 08, RT 008/RW 005, Desa Ngampelsari, Kecamatan Candi, Kabupaten Sidoarjo, Jawa Timur 61271<br/><br/>
          <strong>Telp:</strong> 0812-3333-8971 / 0877-5293-1354
        </p>
      </div>

      <div className="card bg-surface-container-lowest p-5 rounded-2xl space-y-3">
        <h3 className="font-bold text-on-surface text-base">Fitur Utama Aplikasi:</h3>
        <ul className="list-disc pl-4 space-y-1 text-xs">
          <li>Simpanan Pokok: Rp 100.000</li>
          <li>Simpanan Wajib: Rp 25.000 per bulan</li>
          <li>Simpanan Sukarela</li>
          <li>Pemenuhan kebutuhan dapur harian anggota</li>
          <li>Program pemberdayaan pertanian, perikanan, dan perdagangan</li>
          <li>Transparansi bagi hasil & laporan keuangan</li>
          <li>Akses Rapat Anggota Tahunan (RAT) secara digital</li>
        </ul>
      </div>

      <p className="text-center font-bold italic mt-6 text-primary">
        KOPRIMA DPD Sidoarjo hadir untuk mensejahterakan anggota melalui layanan koperasi digital yang aman, modern, dan sesuai mekanisme perkoperasian Indonesia.
      </p>
    </div>

    <div className="w-full card bg-surface-container-lowest rounded-3xl overflow-hidden mt-8">
      <button onClick={() => onNavigate('syarat_ketentuan')} className="w-full p-5 text-left font-bold text-sm text-on-surface border-b border-outline-variant/10 flex justify-between hover:bg-surface-container-low transition-colors">
        Syarat & Ketentuan <ChevronRight className="w-4 h-4" />
      </button>
      <button onClick={() => onNavigate('kebijakan_privasi')} className="w-full p-5 text-left font-bold text-sm text-on-surface flex justify-between hover:bg-surface-container-low transition-colors">
        Kebijakan Privasi <ChevronRight className="w-4 h-4" />
      </button>
    </div>
    <p className="text-[10px] text-outline-variant text-center mt-12">© 2026 KOPRIMA SIDOARJO. All rights reserved.</p>
  </motion.div>
);

const ScreenSyaratKetentuan = () => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="pt-24 pb-32 px-6 space-y-6 text-on-surface">
    <div className="space-y-2 text-center mb-8">
      <h2 className="text-2xl font-extrabold font-headline text-primary">SYARAT DAN KETENTUAN</h2>
      <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">KOPRIMA DPD SIDOARJO</p>
      <p className="text-xs text-on-surface-variant">Versi 1.0.4 | Berlaku sejak 22 April 2026</p>
    </div>

    <div className="card bg-surface-container-lowest p-6 rounded-3xl space-y-6 text-sm leading-relaxed text-justify">
      <section className="space-y-2">
        <h3 className="font-bold text-primary">1. PENERIMAAN SYARAT</h3>
        <p>Dengan mengunduh, mendaftar, dan menggunakan aplikasi KOPRIMA DPD Sidoarjo, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh Syarat dan Ketentuan ini serta Kebijakan Privasi.</p>
      </section>

      <section className="space-y-2">
        <h3 className="font-bold text-primary">2. DEFINISI</h3>
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Koperasi:</strong> Koperasi Konsumen Mina Tani (KOPRIMA) “Amanah” Indonesia</li>
          <li><strong>DPD Sidoarjo:</strong> Dewan Pengurus Daerah Kabupaten Sidoarjo yang ditetapkan berdasarkan SK No. 01.002/0028/SK/KOPRIMA/DPP/IV/2026</li>
          <li><strong>Anggota:</strong> Pihak yang telah membayar Simpanan Pokok dan Simpanan Wajib serta disetujui oleh DPD Sidoarjo</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="font-bold text-primary">3. KEANGGOTAAN</h3>
        <ul className="space-y-1">
          <li><strong>3.1.</strong> Simpanan Pokok: Rp 100.000 (satu kali bayar, tidak dapat ditarik selama masih menjadi anggota)</li>
          <li><strong>3.2.</strong> Simpanan Wajib: Rp 25.000 per bulan (dibayar setiap bulan)</li>
          <li><strong>3.3.</strong> Simpanan Sukarela: dapat dilakukan kapan saja sesuai kemampuan anggota</li>
          <li><strong>3.4.</strong> Keanggotaan hanya berlaku setelah pembayaran Simpanan Pokok dan Simpanan Wajib pertama diverifikasi oleh DPD Sidoarjo.</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="font-bold text-primary">4. HAK DAN KEWAJIBAN ANGGOTA</h3>
        <p><strong>4.1. Hak Anggota:</strong></p>
        <ul className="list-disc pl-4 space-y-1 mb-2">
          <li>Mendapatkan layanan simpanan dan pinjaman sesuai ketentuan</li>
          <li>Menerima bagi hasil usaha koperasi</li>
          <li>Menghadiri dan memberikan suara dalam Rapat Anggota Tahunan (RAT)</li>
          <li>Mendapatkan laporan keuangan dan perkembangan koperasi</li>
        </ul>
        <p><strong>4.2. Kewajiban Anggota:</strong></p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Membayar Simpanan Wajib tepat waktu</li>
          <li>Mematuhi Anggaran Dasar dan Anggaran Rumah Tangga KOPRIMA</li>
          <li>Menjaga kerahasiaan data dan akun aplikasi</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="font-bold text-primary">5. BAGI HASIL USAHA</h3>
        <p>Bagi hasil usaha akan dibagikan kepada anggota sesuai ketentuan Rapat Anggota Tahunan (RAT) dan mekanisme perkoperasian yang berlaku.</p>
      </section>

      <section className="space-y-2">
        <h3 className="font-bold text-primary">6. RAPAT ANGGOTA</h3>
        <p>Rapat Anggota Tahunan (RAT) dilaksanakan minimal 1 (satu) kali dalam setahun. Anggota dapat mengikuti secara langsung atau melalui fitur digital yang disediakan aplikasi.</p>
      </section>

      <section className="space-y-2">
        <h3 className="font-bold text-primary">7. PENARIKAN SIMPANAN</h3>
        <p>Simpanan Pokok tidak dapat ditarik selama masih menjadi anggota. Simpanan Wajib dan Sukarela dapat ditarik sesuai ketentuan yang berlaku setelah melalui proses verifikasi DPD Sidoarjo.</p>
      </section>

      <section className="space-y-2">
        <h3 className="font-bold text-primary">8. PENGHENTIAN KEANGGOTAAN</h3>
        <p>Keanggotaan dapat berakhir karena:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Pengunduran diri tertulis</li>
          <li>Tidak membayar Simpanan Wajib selama 3 bulan berturut-turut</li>
          <li>Melanggar Anggaran Dasar / Anggaran Rumah Tangga</li>
          <li>Diputuskan oleh Rapat Anggota</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="font-bold text-primary">9. HUKUM YANG BERLAKU</h3>
        <p>Syarat dan Ketentuan ini tunduk pada hukum Republik Indonesia, khususnya Undang-Undang Perkoperasian dan peraturan perundang-undangan terkait. Segala sengketa diselesaikan di Pengadilan Negeri Sidoarjo.</p>
      </section>

      <section className="space-y-2">
        <h3 className="font-bold text-primary">10. PERUBAHAN SYARAT</h3>
        <p>DPD Sidoarjo berhak mengubah Syarat dan Ketentuan ini dengan pemberitahuan sebelumnya melalui aplikasi.</p>
      </section>
    </div>
  </motion.div>
);

const ScreenKebijakanPrivasi = () => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="pt-24 pb-32 px-6 space-y-6 text-on-surface">
    <div className="space-y-2 text-center mb-8">
      <h2 className="text-2xl font-extrabold font-headline text-primary">KEBIJAKAN PRIVASI</h2>
      <p className="text-[10px] font-bold text-on-surface-variant tracking-widest uppercase">KOPRIMA DPD SIDOARJO</p>
      <p className="text-xs text-on-surface-variant">Versi 1.0.4 | Berlaku sejak 22 April 2026</p>
    </div>

    <div className="card bg-surface-container-lowest p-6 rounded-3xl space-y-6 text-sm leading-relaxed text-justify">
      <section className="space-y-2">
        <h3 className="font-bold text-primary">1. PENGUMPULAN DATA PRIBADI</h3>
        <p>Kami mengumpulkan data pribadi Anda untuk keperluan keanggotaan dan pelayanan koperasi, meliputi:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Nama lengkap, NIK, tempat & tanggal lahir</li>
          <li>Alamat domisili & alamat sekretariat</li>
          <li>Nomor telepon & email</li>
          <li>Data keuangan (simpanan, transaksi)</li>
          <li>Foto KTP & dokumen pendukung lainnya</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="font-bold text-primary">2. TUJUAN PENGGUNAAN DATA</h3>
        <p>Data pribadi digunakan untuk:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Verifikasi dan persetujuan keanggotaan</li>
          <li>Pencatatan simpanan dan transaksi</li>
          <li>Pengiriman notifikasi, laporan keuangan, dan informasi RAT</li>
          <li>Pemenuhan kewajiban pelaporan kepada OJK, Kementerian Koperasi, dan instansi terkait</li>
          <li>Peningkatan layanan aplikasi</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="font-bold text-primary">3. PEMBAGIAN DATA</h3>
        <p>Data pribadi tidak akan dijual atau disewakan kepada pihak ketiga. Data hanya dibagikan kepada:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Dewan Pengurus Pusat (DPP) KOPRIMA “Amanah” Indonesia</li>
          <li>Auditor dan lembaga pengawas koperasi</li>
          <li>Instansi pemerintah yang berwenang (jika diwajibkan undang-undang)</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="font-bold text-primary">4. KEAMANAN DATA</h3>
        <p>Kami menerapkan standar keamanan tinggi termasuk enkripsi, kontrol akses, dan audit berkala untuk melindungi data Anda sesuai Undang-Undang Perlindungan Data Pribadi (UU PDP).</p>
      </section>

      <section className="space-y-2">
        <h3 className="font-bold text-primary">5. HAK ANDA SEBAGAI PENGGUNA</h3>
        <p>Anda berhak:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>Mengakses data pribadi Anda</li>
          <li>Meminta koreksi data yang salah</li>
          <li>Meminta penghapusan data (dengan syarat keanggotaan telah berakhir)</li>
          <li>Menarik persetujuan pemrosesan data</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h3 className="font-bold text-primary">6. RETENSI DATA</h3>
        <p>Data akan disimpan selama Anda menjadi anggota dan selama diperlukan untuk memenuhi kewajiban hukum koperasi.</p>
      </section>

      <section className="space-y-2">
        <h3 className="font-bold text-primary">7. KONTAK PRIVASI</h3>
        <p>Jika Anda memiliki pertanyaan atau ingin menggunakan hak privasi, hubungi:</p>
        <div className="bg-surface-container-low p-4 rounded-xl mt-2">
          <p className="font-bold">DPD KOPRIMA Sidoarjo</p>
          <p><strong>Email:</strong> admin@koprimasidoarjo.com</p>
          <p><strong>Telp:</strong> 0812-3333-8971 / 0877-5293-1354</p>
          <p><strong>Alamat:</strong> Perum Taman Candi Loka Blok E-3 No. 08, Desa Ngampelsari, Kec. Candi, Sidoarjo</p>
        </div>
      </section>
    </div>
  </motion.div>
);

const ScreenVoucherUmroh = () => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="pt-24 pb-32 px-6 space-y-8 bg-surface">
    <div className="text-center space-y-2 mb-8 no-print">
      <h2 className="text-2xl font-extrabold font-headline text-primary">Voucher Umroh</h2>
      <p className="text-sm text-on-surface-variant font-medium">Spesial untuk Anggota KOPRIMA DPD Sidoarjo</p>
    </div>

    <div className="w-full max-w-md mx-auto space-y-6 no-print">
      <h3 className="font-bold text-lg text-on-surface">Galeri Umroh</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
        {[umroh1Img, umroh2Img, umroh3Img].map((img, i) => (
          <img key={i} src={img} className="w-64 h-48 object-cover rounded-3xl shadow-lg snap-center flex-shrink-0 border-4 border-surface-container-lowest" />
        ))}
      </div>
    </div>

    <div className="print-area w-full max-w-2xl mx-auto bg-gradient-to-br from-[#CFA144] to-[#F1D77A] rounded-[2.5rem] p-8 shadow-2xl text-white relative overflow-hidden card border-8 border-white">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full blur-2xl"></div>
      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg p-2 mb-2">
          <img src={logoImg} className="w-full h-full object-contain" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-90 mb-2">Voucher Umroh KOPRIMA</p>
          <h2 className="text-4xl font-black font-headline tracking-tight mb-2 drop-shadow-md">Rp 1.500.000</h2>
          <p className="text-sm font-medium opacity-90">Berlaku untuk 1 Tahun sejak bergabung</p>
        </div>
        <div className="w-full h-px bg-white/30 border-dashed border-t-2"></div>
        <div className="w-full text-left bg-white/10 p-5 rounded-2xl border border-white/20 backdrop-blur-sm">
          <p className="text-[10px] uppercase font-bold opacity-80 mb-1">Diberikan Kepada:</p>
          <p className="text-xl font-bold font-headline text-white">Ibu Siti Aminah</p>
          <p className="text-xs font-medium opacity-90 mt-2">ID Anggota: KPRM-00123</p>
        </div>
        <p className="text-[9px] opacity-70 mt-4">*Voucher ini dapat dicetak dan ditukarkan sesuai syarat & ketentuan yang berlaku.</p>
      </div>
    </div>

    <div className="no-print pt-6">
      <button onClick={() => window.print()} className="w-full py-5 bg-primary text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
        <FileText className="w-6 h-6" />
        Cetak Voucher Sekarang
      </button>
    </div>
  </motion.div>
);

const ScreenBayarSimpanan = ({ onNext }: { onNext: (s: Screen) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="pt-24 pb-12 px-6 space-y-8"
  >
    <section>
      <h2 className="text-2xl font-extrabold text-on-surface font-headline leading-tight">Bayar Tagihan Simpanan</h2>
      <p className="text-sm text-on-surface-variant mt-2">Daftar kewajiban simpanan Ibu bulan ini.</p>
    </section>

    <div className="space-y-4">
      {[
        { id: 'wajib', name: 'Simpanan Wajib', period: 'Oktober 2023', amount: '25.000', status: 'BELUM BAYAR', icon: Calendar, color: 'primary' },
        { id: 'pokok', name: 'Simpanan Pokok', period: 'Biaya Pendaftaran', amount: '100.000', status: 'LUNAS', icon: Home, color: 'secondary' },
      ].map((item) => (
        <div key={item.id} className="bg-surface-container-low p-6 rounded-[2rem] flex flex-col space-y-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className={`p-3 bg-${item.color}/10 text-${item.color} rounded-2xl`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-on-surface">{item.name}</h4>
                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">{item.period}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-[9px] font-bold ${item.status === 'LUNAS' ? 'badge-active' : 'bg-red-50 text-red-500 border border-red-100'}`}>
              {item.status}
            </span>
          </div>

          <div className="flex justify-between items-end bg-surface-container-lowest p-4 rounded-2xl">
            <div>
              <p className="text-[9px] text-on-surface-variant font-bold uppercase mb-1">Nominal</p>
              <p className="text-xl font-bold text-primary">Rp {item.amount}</p>
            </div>
            {item.status !== 'LUNAS' && (
              <button
                onClick={() => onNext('payment_method')}
                className="btn-primary px-6 py-2.5 rounded-xl font-bold text-xs shadow-md active:scale-95 transition-all"
              >
                Bayar Sekarang
              </button>
            )}
          </div>
        </div>
      ))}
    </div>

    <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 flex items-start gap-4">
      <Info className="w-6 h-6 text-primary shrink-0" />
      <p className="text-[11px] text-on-surface-variant leading-relaxed">Simpanan Wajib bersifat mengikat bagi setiap anggota Koperasi dan harus disetorkan secara rutin setiap bulan sesuai kesepakatan.</p>
    </div>
  </motion.div>
);

const ScreenRiwayatSimpanan = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="pt-24 pb-32 px-6 space-y-8"
  >
    <section className="flex justify-between items-end">
      <div>
        <h2 className="text-2xl font-extrabold text-on-surface font-headline tracking-tight">Riwayat Transaksi</h2>
        <p className="text-sm text-on-surface-variant">Laporan aktivitas finansial Ibu.</p>
      </div>
      <button className="p-3 bg-surface-container-low rounded-2xl text-primary">
        <SlidersHorizontal className="w-5 h-5" />
      </button>
    </section>

    <div className="space-y-8">
      {[
        {
          date: 'Oktober 2023', items: [
            { title: 'Setoran Wajib', time: '14 Okt • 09:12', amount: '+ Rp 25.000', type: 'in', method: 'Virtual Account' },
            { title: 'Belanja Sembako', time: '10 Okt • 16:45', amount: '- Rp 145.000', type: 'out', method: 'Simpanan Sukarela' },
            { title: 'Bagi Hasil SHU', time: '01 Okt • 00:01', amount: '+ Rp 345.000', type: 'in', method: 'System Auto' },
          ]
        },
        {
          date: 'September 2023', items: [
            { title: 'Tarik Tunai', time: '28 Sep • 10:20', amount: '- Rp 500.000', type: 'out', method: 'Transfer Bank' },
            { title: 'Setoran Wajib', time: '15 Sep • 08:30', amount: '+ Rp 25.000', type: 'in', method: 'Virtual Account' },
          ]
        }
      ].map((group) => (
        <div key={group.date} className="space-y-4">
          <h3 className="text-[10px] font-bold text-outline-variant uppercase tracking-widest px-2">{group.date}</h3>
          <div className="bg-surface-container-lowest rounded-[2rem] card overflow-hidden">
            {group.items.map((item, i) => (
              <div
                key={i}
                className={`p-6 flex justify-between items-center hover:bg-surface-container-low transition-all ${i !== group.items.length - 1 ? 'border-b border-outline-variant/10' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.type === 'in' ? 'badge-active' : 'bg-red-50 text-red-500'}`}>
                    {item.type === 'in' ? <TrendingUp className="w-6 h-6" /> : <Landmark className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm">{item.title}</h4>
                    <p className="text-[10px] text-on-surface-variant font-medium mt-0.5">{item.time} • {item.method}</p>
                  </div>
                </div>
                <p className={`font-bold text-sm ${item.type === 'in' ? 'text-primary' : 'text-red-500'}`}>{item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    <button className="w-full flex items-center justify-center gap-2 py-4 text-primary font-bold text-sm bg-primary/5 rounded-2xl border border-dashed border-primary/30">
      <Download className="w-4 h-4" />
      Unduh Laporan Mutasi (PDF)
    </button>
  </motion.div>
);

const ScreenNotifikasi = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="pt-24 pb-32 px-6 space-y-8"
  >
    <section>
      <h2 className="text-2xl font-extrabold text-primary font-headline tracking-tight">Kabar Terbaru</h2>
      <p className="text-sm text-on-surface-variant">Update terbaru untuk Ibu.</p>
    </section>

    <div className="space-y-6">
      <div className="flex justify-between items-center text-[10px] font-bold text-outline uppercase tracking-widest">
        <span>Hari Ini</span>
        <button className="text-primary">Tandai dibaca</button>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-[2rem] border-l-8 border-tertiary  space-y-4">
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-lg text-on-surface">Waktunya Belanja!</h4>
          <span className="text-[9px] font-bold bg-tertiary-fixed text-on-tertiary-fixed-variant px-2 py-0.5 rounded-full uppercase">Penting</span>
        </div>
        <p className="text-sm text-on-surface-variant leading-relaxed">Jangan lupa batas pengambilan sembako bulan ini adalah tanggal <span className="font-bold text-tertiary">25</span>.</p>
        <div className="flex items-center justify-between">
          <button className="btn-primary px-6 py-2 rounded-xl text-xs font-bold">Pesan Sekarang</button>
          <span className="text-[10px] text-outline italic">2 jam lalu</span>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-[2rem] card flex gap-4">
        <div className="w-12 h-12 badge-active rounded-full flex items-center justify-center shrink-0">
          <MoreVertical className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-on-surface">Undangan Rapat</h4>
          <p className="text-xs text-on-surface-variant">Hadir pada Koordinasi DPD jam 09:00.</p>
          <div className="flex -space-x-3 pt-2">
            {[1, 2, 3].map(i => <div key={i} className="w-7 h-7 rounded-full border-2 border-surface bg-outline-variant" />)}
            <div className="w-7 h-7 rounded-full border-2 border-surface btn-primary text-[8px] flex items-center justify-center">+12</div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const CheckoutScreen = ({ onNext }: { onNext: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="pt-24 pb-48 px-6 max-w-2xl mx-auto space-y-8"
  >
    <section>
      <h2 className="text-xl font-extrabold text-primary leading-tight font-headline">Konfirmasi Pesanan Ibu</h2>
      <p className="text-sm text-on-surface-variant mt-1.5">Silakan periksa kembali daftar belanjaan dan alamat pengiriman Anda.</p>
    </section>

    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-on-surface">Paket Sembako</h3>
        <span className="text-primary text-sm font-semibold">1 Item</span>
      </div>
      <div className="bg-surface-container-low rounded-3xl p-6 flex gap-6 items-center">
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-surface-container-highest flex-shrink-0">
          <img
            alt="Paket Berkah"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCU1BXJe5idEs_QlLXtBmizK4DgE6Iz-AO3Z9iBuaT9t9bbs8r6H0egtWR-bgA5CLrJXR4xuOBm8_9cscNq11Bj11OotG75XUHWYFrLRlpwvebu8_aFQLSLUOh7IrpXZbXqk0ZhZs42rPK0FaVdexWU-UXEsImKIzfAdr8JFO4uHAm2lkqo40jesxiwsscc_Bs0LlhK7YcaJOw9KhR3w35avEg9n3f3NyLfJPx_XatxIQv7zxFTLjH2luKqpLgQG11BDwpqXv8wTzMX"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-grow">
          <h4 className="text-lg font-bold text-on-surface">Paket Berkah 1</h4>
          <p className="text-xs text-on-surface-variant leading-relaxed">Beras 5kg, Minyak 2L, Gula 1kg</p>
          <div className="mt-2 flex justify-between items-end">
            <span className="text-primary font-bold text-base">Rp 125.000</span>
            <div className="bg-surface-container-highest px-3 py-1 rounded-full text-xs font-medium">Qty: 1</div>
          </div>
        </div>
      </div>
    </section>

    <section className="space-y-4">
      <h3 className="text-lg font-bold text-on-surface">Metode Pengambilan</h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="relative group cursor-pointer">
          <input defaultChecked className="peer hidden" id="pickup" name="delivery_method" type="radio" />
          <label className="block bg-surface-container-low peer-checked:bg-secondary-container border-2 border-transparent peer-checked:border-primary-container rounded-3xl p-6 transition-all" htmlFor="pickup">
            <div className="flex items-start gap-4">
              <Store className="w-5 h-5 text-primary" />
              <div>
                <span className="block font-bold text-base">Ambil di Kantor Koperasi</span>
                <span className="block text-xs text-on-surface-variant mt-1">Gratis biaya kirim • DPD SIDOARJO</span>
              </div>
            </div>
          </label>
          <CheckCircle2 className="absolute top-6 right-6 text-primary scale-75 opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
        <div className="relative group cursor-pointer">
          <input className="peer hidden" id="delivery" name="delivery_method" type="radio" />
          <label className="block bg-surface-container-low peer-checked:bg-secondary-container border-2 border-transparent peer-checked:border-primary-container rounded-3xl p-6 transition-all" htmlFor="delivery">
            <div className="flex items-start gap-4">
              <Truck className="w-5 h-5 text-primary" />
              <div className="flex-grow">
                <span className="block font-bold text-base">Kirim ke Alamat Rumah</span>
                <span className="block text-xs text-on-surface-variant mt-1 leading-relaxed">Jl. Pahlawan No. 123, Kel. Lemahputro, Kec. Sidoarjo, Sidoarjo</span>
              </div>
            </div>
          </label>
          <CheckCircle2 className="absolute top-6 right-6 text-primary scale-75 opacity-0 peer-checked:opacity-100 transition-opacity" />
        </div>
      </div>
    </section>

    <section className="bg-surface-container-highest/50 rounded-[2rem] p-6 space-y-4 border border-white/20 backdrop-blur-sm">
      <h3 className="text-lg font-bold text-on-surface border-b border-outline-variant/30 pb-3">Ringkasan Pembayaran</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-on-surface-variant text-sm">
          <span>Harga Paket</span>
          <span>Rp 125.000</span>
        </div>
        <div className="flex justify-between text-on-surface-variant text-sm">
          <span>Biaya Layanan</span>
          <span>Rp 2.000</span>
        </div>
        <div className="flex justify-between text-on-surface-variant text-sm">
          <span>Ongkos Kirim</span>
          <span className="text-primary font-medium">Gratis</span>
        </div>
        <div className="pt-3 mt-2 border-t border-outline-variant/30 flex justify-between items-center">
          <span className="text-base font-bold text-on-surface">Total Bayar</span>
          <span className="text-xl font-extrabold text-primary">Rp 127.000</span>
        </div>
      </div>
    </section>

    <div className="flex items-center gap-3 justify-center text-on-surface-variant/70 py-4">
      <ShieldCheck className="w-5 h-5" />
      <span className="text-[10px] uppercase tracking-widest font-bold">Transaksi Aman & Terenkripsi</span>
    </div>

    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 backdrop-blur-xl z-50 rounded-t-3xl shadow-[0_-8px_30px_rgba(0,105,92,0.08)]">
      <div className="px-6 pt-6 pb-10">
        <button
          onClick={onNext}
          className="w-full py-5 btn-primary font-bold text-lg rounded-2xl  active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <span>Lanjut ke Pembayaran</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  </motion.div>
);

const PaymentMethodScreen = ({ onNext }: { onNext: () => void }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="pt-24 pb-48 px-6 max-w-2xl mx-auto space-y-8"
  >
    <section>
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/15">
        <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-wider mb-1">Total Pembayaran</p>
        <h2 className="text-primary font-bold text-2xl tracking-tight">Rp 127.000</h2>
        <div className="mt-3 pt-3 border-t border-outline-variant/10 flex justify-between items-center">
          <span className="text-on-surface-variant text-[9px] font-medium tracking-tight">ID: KPRM-20231024-001</span>
          <span className="badge-active text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Menunggu</span>
        </div>
      </div>
    </section>

    <section className="space-y-4">
      <h3 className="text-on-surface font-bold text-lg px-1">Pilih Metode Pembayaran</h3>
      <label className="relative block cursor-pointer group">
        <input defaultChecked className="peer sr-only" name="payment" type="radio" />
        <div className="p-5 rounded-xl bg-surface-container-low border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary/10 transition-all duration-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full btn-primary flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-on-surface">Potong Saldo Simpanan Sukarela</p>
              <p className="text-xs text-on-surface-variant">Saldo tersedia: <span className="font-bold text-primary">Rp 4.500.000</span></p>
            </div>
            <div className="w-6 h-6 rounded-full border-2 border-outline-variant peer-checked:border-primary peer-checked:bg-primary transition-all relative">
              <div className="absolute inset-1 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </label>

      <div className="p-5 rounded-xl bg-surface-container-low border border-outline-variant/15">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full badge-active flex items-center justify-center">
            <Landmark className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-on-surface">Transfer Bank (Virtual Account)</p>
            <p className="text-xs text-on-surface-variant">Konfirmasi otomatis, tersedia 24 jam</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="cursor-pointer">
            <input className="peer sr-only" name="payment" type="radio" />
            <div className="p-3 rounded-lg bg-surface-container-lowest border-2 border-transparent peer-checked:border-primary flex items-center justify-center gap-2 transition-all">
              <img alt="BRI" className="h-4 grayscale peer-checked:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiUmok2u3rFle6SNS4AylXhSu5LE5vzBWj4dMCpsOurvC3cs41tfULjXMZK63uUHocwsTyxs3PEWuszM1rbfnc2lex0eAyK-W9RWLTc7zA15xlLljntx9CAz8W1rFp4F78vrYvMaqp8yDIT-5hRGSoKaZCItMuTwxJ9yWkN6Uf1zsNOF6ImUP49AhBxeUqYgJeZB2onlJ2g2XQ2f8EMHk4Pjj64qZIs2ciFasidOJXor2kt0KWQnWBvi08khbNYauwtRcNQ6Zi7jW0" referrerPolicy="no-referrer" />
              <span className="font-bold text-xs text-on-surface">BRI</span>
            </div>
          </label>
          <label className="cursor-pointer">
            <input className="peer sr-only" name="payment" type="radio" />
            <div className="p-3 rounded-lg bg-surface-container-lowest border-2 border-transparent peer-checked:border-primary flex items-center justify-center gap-2 transition-all">
              <img alt="Mandiri" className="h-4 grayscale peer-checked:grayscale-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcJEWDgPe8G-LFDU1Ka0t9lMJ0GPDRPmirGAtqLtHColYJbpGbvGqyLwm-v6CtSAxPHNBEbp3pZv-Ffi42PNAZFVbU0zFmMO8AapLdf5J39xyYXShVm0Nr3Yml5MT_Fxo_TEnd0isk0RF2eH7h9Gno-3_yz5iTos0D3-9dU8kSrhDMEgE33xkV9aoJdz-pKpsknu6oRFz9YicFCD_twQrYcUJ0MTpW2bufpYL-uYA6CprRtZSHNPdFtfsiQaPqa8ULEkhflGlh6KcD" referrerPolicy="no-referrer" />
              <span className="font-bold text-xs text-on-surface">Mandiri</span>
            </div>
          </label>
        </div>
      </div>

      <label className="relative block cursor-pointer group">
        <input className="peer sr-only" name="payment" type="radio" />
        <div className="p-5 rounded-xl bg-surface-container-low border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary/10 transition-all duration-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center">
              <Store className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-on-surface">Bayar Langsung di Kantor</p>
              <p className="text-xs text-on-surface-variant">Kunjungi kantor DPD Sidoarjo saat jam kerja</p>
            </div>
            <div className="w-6 h-6 rounded-full border-2 border-outline-variant peer-checked:border-primary transition-all" />
          </div>
        </div>
      </label>
    </section>

    <section className="mt-10">
      <h3 className="text-on-surface font-bold text-lg px-1 mb-4">Instruksi Pembayaran</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-7 rounded-full btn-primary flex items-center justify-center text-xs font-bold">1</span>
            <h4 className="font-bold text-primary">Periksa Kembali</h4>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">Pastikan nominal dan metode pembayaran sudah sesuai dengan keinginan Ibu sebelum melanjutkan.</p>
        </div>
        <div className="p-5 rounded-2xl bg-secondary/5 border border-secondary/10">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-7 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold">2</span>
            <h4 className="font-bold text-secondary">Proses Verifikasi</h4>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">Sistem akan memproses permintaan Ibu dalam 1-5 menit. Jangan menutup aplikasi saat proses berlangsung.</p>
        </div>
        <div className="md:col-span-2 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 flex items-start gap-4">
          <Info className="w-6 h-6 text-primary mt-1" />
          <div>
            <h4 className="font-bold text-primary mb-1">Butuh Bantuan?</h4>
            <p className="text-sm text-on-surface-variant">Jika mengalami kendala, silakan hubungi Pengurus KOPRIMA melalui WhatsApp resmi di nomor 0812-3456-7890.</p>
          </div>
        </div>
      </div>
    </section>

    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 backdrop-blur-xl z-50 rounded-t-3xl shadow-[0_-8px_30px_rgba(0,105,92,0.08)]">
      <div className="px-6 pt-4 pb-8">
        <div className="flex items-center justify-between mb-4 px-2">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Total Pembayaran</p>
            <p className="text-xl font-extrabold text-primary">Rp 127.000</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Metode</p>
            <p className="text-sm font-bold text-on-surface">Simpanan</p>
          </div>
        </div>
        <button
          onClick={onNext}
          className="w-full btn-primary py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>Konfirmasi Pembayaran</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  </motion.div>
);

const SuccessPaymentScreen = ({ onHome }: { onHome: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="min-h-screen pt-24 pb-12 px-8 flex flex-col items-center justify-center bg-surface"
  >
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="relative w-24 h-24 btn-primary rounded-full flex items-center justify-center shadow-2xl">
        <CheckCircle2 className="w-12 h-12" />
      </div>
    </div>

    <div className="text-center space-y-3 mb-10">
      <h1 className="text-2xl font-extrabold text-primary font-headline">Pembayaran Berhasil!</h1>
      <p className="text-on-surface-variant font-medium text-base px-2">Transaksi Ibu telah berhasil diproses oleh KOPRIMA.</p>
    </div>

    <div className="w-full bg-surface-container-lowest rounded-[2rem] p-6 card space-y-5 mb-10">
      <div className="flex justify-between items-center border-b border-outline-variant/20 pb-3">
        <h3 className="font-bold text-base text-on-surface">Detail Pesanan</h3>
        <span className="text-[9px] font-bold text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-full">Lunas</span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[9px] uppercase font-bold text-on-surface-variant">No. Transaksi</p>
            <p className="font-bold text-xs">KPRM-20231024-001</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] uppercase font-bold text-on-surface-variant">Metode</p>
            <p className="font-bold text-xs">Potong Simpanan</p>
          </div>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <p className="text-[9px] uppercase font-bold text-on-surface-variant">Paket</p>
            <p className="font-bold text-xs">Paket Berkah 1 (1x)</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] uppercase font-bold text-on-surface-variant">Waktu</p>
            <p className="font-bold text-xs">24 Okt, 15:30</p>
          </div>
        </div>

        <div className="pt-3 border-t border-outline-variant/20 flex justify-between items-center">
          <p className="font-bold text-on-surface text-sm">Total Bayar</p>
          <p className="text-xl font-extrabold text-primary">Rp 127.000</p>
        </div>
      </div>
    </div>

    <div className="w-full space-y-4">
      <button
        onClick={onHome}
        className="w-full py-5 btn-primary font-bold text-xl rounded-2xl  active:scale-95 transition-all flex items-center justify-center gap-3"
      >
        <Home className="w-6 h-6" />
        Kembali ke Beranda
      </button>

      <button className="w-full py-5 bg-surface-container-low text-primary font-bold text-lg rounded-2xl flex items-center justify-center gap-3 hover:bg-surface-container transition-all">
        <Download className="w-5 h-5" />
        Unduh Kuitansi (PDF)
      </button>
    </div>
  </motion.div>
);

const ScreenSetor = ({ onBack }: { onBack: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="pt-24 pb-12 px-8 flex flex-col space-y-8"
  >
    <section className="text-center space-y-2">
      <h2 className="text-xl font-bold text-primary">Tambah Saldo Simpanan</h2>
      <p className="text-xs text-on-surface-variant leading-relaxed px-4">Salurkan dana Ibu ke Simpanan Sukarela untuk kemudahan transaksi mendatang.</p>
    </section>

    <div className="bg-surface-container-low p-8 rounded-[2.5rem] space-y-6">
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-primary uppercase ml-1">Nominal Setoran</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-primary text-lg">Rp</span>
          <input
            type="number"
            placeholder="0"
            className="w-full pl-12 pr-4 py-5 bg-surface-container-lowest rounded-2xl outline-none focus:ring-2 focus:ring-primary text-2xl font-bold font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {['50.000', '100.000', '250.000', '500.000'].map(amount => (
          <button key={amount} className="py-3 bg-surface-container-lowest border border-outline-variant/30 rounded-xl text-xs font-bold hover:bg-primary/5 hover:border-primary transition-all">
            + {amount}
          </button>
        ))}
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="font-bold text-sm px-1">Pilih Metode Pembayaran</h3>
      <div className="space-y-3">
        {[
          { name: 'Virtual Account BRI', icon: Landmark },
          { name: 'Virtual Account Mandiri', icon: Landmark },
          { name: 'Transfer Bank BCA', icon: Landmark },
        ].map(m => (
          <button key={m.name} className="w-full flex items-center justify-between p-4 bg-surface-container-low rounded-2xl group active:scale-95 transition-all">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 text-primary rounded-lg">
                <m.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-bold text-on-surface">{m.name}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-outline-variant group-hover:translate-x-1" />
          </button>
        ))}
      </div>
    </div>

    <button className="w-full py-5 btn-primary font-bold rounded-2xl shadow-lg active:scale-95 transition-all">
      Proses Setoran
    </button>
  </motion.div>
);

const ScreenTarik = ({ onBack }: { onBack: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="pt-24 pb-12 px-8 flex flex-col space-y-8"
  >
    <section className="text-center space-y-2">
      <h2 className="text-xl font-bold text-red-600">Tarik Saldo Simpanan</h2>
      <p className="text-xs text-on-surface-variant leading-relaxed px-4">Pencairan hanya dapat dilakukan dari saldo Simpanan Sukarela Ibu.</p>
    </section>

    <div className="bg-red-50 p-8 rounded-[2.5rem] space-y-6 border border-red-100">
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-red-600 uppercase ml-1">Nominal Penarikan</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-red-600 text-lg">Rp</span>
          <input
            type="number"
            placeholder="0"
            className="w-full pl-12 pr-4 py-5 bg-white rounded-2xl outline-none focus:ring-2 focus:ring-red-500 text-2xl font-bold font-mono"
          />
        </div>
        <p className="text-[9px] text-red-400 font-medium ml-1">Maksimal tarik: Rp 7.200.000</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {['100.000', '200.000', '500.000', '1.000.000'].map(amount => (
          <button key={amount} className="py-3 bg-white border border-red-200 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-all">
            {amount}
          </button>
        ))}
      </div>
    </div>

    <div className="space-y-4">
      <h3 className="font-bold text-sm px-1">Rekening Tujuan</h3>
      <div className="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2 shadow-sm">
            <Landmark className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="font-bold text-on-surface text-sm">Bank Rakyat Indonesia (BRI)</p>
            <p className="text-xs text-on-surface-variant">0341-****-****-532 (A.N Siti Aminah)</p>
          </div>
        </div>
      </div>
      <button className="text-primary text-xs font-bold w-full text-center">+ Pakai Rekening Lain</button>
    </div>

    <button className="w-full py-5 bg-red-600 text-white font-bold rounded-2xl shadow-lg shadow-red-200 active:scale-95 transition-all">
      Konfirmasi Penarikan
    </button>
  </motion.div>
);

// --- MAIN APP ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('onboarding1');

  const onboardingData = useMemo(() => [
    {
      image: "https://i.ibb.co.com/pBcf28zv/onboarding1.jpg",
      title: "Selamat Datang di KOPRIMA DPD Sidoarjo",
      description: "Bergabunglah dengan ribuan keluarga yang sudah merasakan manfaat koperasi untuk kesejahteraan bersama",
      next: 'onboarding2' as Screen
    },
    {
      image: "https://i.ibb.co.com/pvTvg0rQ/d362a7bf-367c-48e0-8598-7770a76d93c8.png",
      title: "Kebutuhan Dapur Terjamin Setiap Bulan",
      description: "Dapatkan paket sembako berkualitas tinggi dengan harga terjangkau. Pastikan dapur keluarga selalu terisi tanpa khawatir.",
      next: 'onboarding3' as Screen
    },
    {
      image: "https://i.ibb.co.com/7xTMKh3H/grok-image-2e68f89a-c06a-41b2-b202-6aa2fda875c5.jpg",
      title: "Bangun Masa Depan yang Lebih Baik",
      description: "Kelola simpanan pokok dan simpanan wajib dengan mudah dan aman. Wujudkan impian keluarga Anda bersama KOPRIMA",
      next: 'login' as Screen,
      button: "Mulai Sekarang"
    }
  ], []);

  const renderScreen = () => {
    switch (screen) {
      case 'onboarding1':
        return <OnboardingScreen {...onboardingData[0]} step={1} onNext={() => setScreen('onboarding2')} onSkip={() => setScreen('login')} />;
      case 'onboarding2':
        return <OnboardingScreen {...onboardingData[1]} step={2} onNext={() => setScreen('onboarding3')} onSkip={() => setScreen('login')} />;
      case 'onboarding3':
        return <OnboardingScreen {...onboardingData[2]} step={3} onNext={() => setScreen('login')} onSkip={() => setScreen('login')} buttonText="Mulai Sekarang" />;

      case 'login':
        return <AuthLogin onLogin={() => setScreen('home')} onRegister={() => setScreen('register')} />;
      case 'register':
        return <AuthLogin onLogin={() => setScreen('home')} onRegister={() => setScreen('login')} />; // Mocking register screen inside Login for now

      case 'home': return <MainHome onDetail={(s) => setScreen(s)} />;
      case 'sembako': return <MainSembako onNext={(s) => setScreen(s)} />;
      case 'simpanan': return <MainSimpanan onNavigate={(s) => setScreen(s)} />;
      case 'profil': return <MainProfil onNavigate={(s) => setScreen(s)} />;
      case 'referral': return <ScreenReferral />;
      case 'ubah_profil': return <ScreenUbahProfil />;
      case 'keamanan': return <ScreenKeamanan />;
      case 'bantuan': return <ScreenBantuan />;
      case 'tentang_kami': return <ScreenTentangKami onNavigate={(s) => setScreen(s)} />;
      case 'syarat_ketentuan': return <ScreenSyaratKetentuan />;
      case 'kebijakan_privasi': return <ScreenKebijakanPrivasi />;
      case 'voucher_umroh': return <ScreenVoucherUmroh />;
      case 'notifications': return <ScreenNotifikasi />;
      case 'checkout': return <CheckoutScreen onNext={() => setScreen('payment_method')} />;
      case 'payment_method': return <PaymentMethodScreen onNext={() => setScreen('success_payment')} />;
      case 'success_payment': return <SuccessPaymentScreen onHome={() => setScreen('home')} />;
      case 'setor': return <ScreenSetor onBack={() => setScreen('simpanan')} />;
      case 'tarik': return <ScreenTarik onBack={() => setScreen('simpanan')} />;
      case 'bayar_simpanan': return <ScreenBayarSimpanan onNext={(s) => setScreen(s)} />;
      case 'riwayat_simpanan': return <ScreenRiwayatSimpanan />;
      default: return <div>Not implemented</div>;
    }
  };

  const showHeader = ['home', 'sembako', 'simpanan', 'profil', 'notifications', 'checkout', 'payment_method', 'setor', 'tarik', 'bayar_simpanan', 'riwayat_simpanan', 'referral', 'ubah_profil', 'keamanan', 'bantuan', 'tentang_kami', 'syarat_ketentuan', 'kebijakan_privasi', 'voucher_umroh'].includes(screen);
  const showNav = ['home', 'sembako', 'simpanan', 'profil', 'riwayat_simpanan'].includes(screen);

  const getTitle = () => {
    switch (screen) {
      case 'home': return 'KOPRIMA SIDOARJO';
      case 'sembako': return 'BELANJA SEMBAKO';
      case 'simpanan': return 'TABUNGAN SAYA';
      case 'profil': return 'PROFIL SAYA';
      case 'notifications': return 'NOTIFIKASI';
      case 'checkout': return 'CHECKOUT';
      case 'payment_method': return 'PEMBAYARAN';
      case 'success_payment': return 'PEMBAYARAN BERHASIL';
      case 'setor': return 'SETOR SIMPANAN';
      case 'tarik': return 'TARIK TUNAI';
      case 'bayar_simpanan': return 'TAGIHAN SIMPANAN';
      case 'riwayat_simpanan': return 'RIWAYAT TRANSAKSI';
      case 'referral': return 'REFERRAL SAYA';
      case 'ubah_profil': return 'UBAH PROFIL';
      case 'keamanan': return 'KEAMANAN AKUN';
      case 'bantuan': return 'PUSAT BANTUAN';
      case 'tentang_kami': return 'TENTANG KAMI';
      case 'syarat_ketentuan': return 'SYARAT & KETENTUAN';
      case 'kebijakan_privasi': return 'KEBIJAKAN PRIVASI';
      case 'voucher_umroh': return 'VOUCHER UMROH';
      default: return 'KOPRIMA';
    }
  };

  return (
    <div className="max-w-md mx-auto bg-surface min-h-screen relative shadow-2xl">
      <AnimatePresence mode="wait">
        {showHeader && (
          <TopAppBar
            title={getTitle()}
            showBack={screen !== 'home'}
            onBack={() => {
              if (['setor', 'tarik', 'bayar_simpanan', 'riwayat_simpanan'].includes(screen)) {
                setScreen('simpanan');
              } else if (['syarat_ketentuan', 'kebijakan_privasi'].includes(screen)) {
                setScreen('tentang_kami');
              } else if (screen === 'voucher_umroh') {
                setScreen('home');
              } else if (['referral', 'ubah_profil', 'keamanan', 'bantuan', 'tentang_kami'].includes(screen)) {
                setScreen('profil');
              } else if (screen === 'payment_method') {
                setScreen('checkout');
              } else {
                setScreen('home');
              }
            }}
            onNotifications={() => setScreen('notifications')}
          />
        )}
      </AnimatePresence>

      <main className="w-full">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showNav && <BottomNavBar active={screen} onNavigate={(s) => setScreen(s)} />}
      </AnimatePresence>
    </div>
  );
}

