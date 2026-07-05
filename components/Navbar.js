'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Menu, X, GraduationCap, Home, BookOpen, Users, Phone, LayoutDashboard, LogOut, Briefcase } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen to changes in auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const navLinks = [
    { href: '/', label: 'หน้าแรก', icon: Home },
    { href: '/news', label: 'ข่าวสาร', icon: BookOpen },
    { href: '/about', label: 'เกี่ยวกับวิทยาลัย', icon: GraduationCap },
    { href: '/staff', label: 'บุคลากร', icon: Users },
    { href: '/departments', label: 'แผนกวิชา', icon: Briefcase },
    { href: '/contact', label: 'ติดต่อเรา', icon: Phone },
  ];

  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-blue-950 text-white sticky top-0 z-50 shadow-lg border-b-4 border-yellow-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / College Name */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-950 font-bold text-lg shadow-md border-2 border-yellow-400 group-hover:scale-105 transition duration-300">
              พ.ธ.
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl block leading-tight tracking-wide text-yellow-400 group-hover:text-yellow-300 transition duration-300">
                วิทยาลัยพณิชยการธนบุรี
              </span>
              <span className="text-xs text-blue-200 block font-light">
                Thonburi Commercial College
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition duration-300 ${
                    active
                      ? 'bg-yellow-500 text-blue-950 shadow-md'
                      : 'hover:bg-blue-900/60 hover:text-yellow-400 text-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Admin Controls */}
            {user ? (
              <div className="flex items-center space-x-1 pl-4 border-l border-blue-900">
                <Link
                  href="/admin"
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider border border-yellow-500 hover:bg-yellow-500 hover:text-blue-950 transition duration-300 ${
                    pathname.startsWith('/admin') ? 'bg-yellow-500 text-blue-950' : 'text-yellow-400'
                  }`}
                >
                  <LayoutDashboard className="w-4.5 h-4.5" />
                  <span>ระบบหลังบ้าน</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition duration-300 cursor-pointer"
                  title="ออกจากระบบ"
                >
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              </div>
            ) : (
              <Link
                href="/admin/login"
                className="ml-4 flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-semibold bg-blue-900 border border-blue-800 hover:border-yellow-400 hover:bg-yellow-500 hover:text-blue-950 transition duration-300"
              >
                <span>เข้าสู่ระบบ</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-200 hover:text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400 transition"
              aria-expanded={isOpen}
            >
              <span className="sr-only">เปิดเมนูหลัก</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-blue-950 border-t border-blue-900">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-3 rounded-lg text-base font-semibold transition ${
                    active
                      ? 'bg-yellow-500 text-blue-950'
                      : 'text-slate-100 hover:bg-blue-900/60 hover:text-yellow-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Admin Controls Mobile */}
            {user ? (
              <div className="pt-4 pb-2 border-t border-blue-900 mt-2 space-y-1">
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-3 py-3 rounded-lg text-base font-semibold text-yellow-400 hover:bg-blue-900"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>ระบบหลังบ้าน (Admin)</span>
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex w-full items-center space-x-2 px-3 py-3 rounded-lg text-base font-semibold text-red-400 hover:bg-red-950/20 text-left"
                >
                  <LogOut className="w-5 h-5" />
                  <span>ออกจากระบบ</span>
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-blue-900 mt-2">
                <Link
                  href="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 px-3 py-3 rounded-lg text-base font-semibold bg-blue-900 hover:bg-yellow-500 hover:text-blue-950 transition"
                >
                  <span>เข้าสู่ระบบเจ้าหน้าที่</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
