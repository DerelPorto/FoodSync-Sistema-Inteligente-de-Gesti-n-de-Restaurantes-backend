
'use client';

import { motion } from 'framer-motion';
import { ChefHat, Utensils, LayoutDashboard, Database, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white selection:bg-orange-500 selection:text-white overflow-hidden">
      {/* Navbar Placeholder */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="bg-orange-500 p-1.5 rounded-lg">
            <ChefHat size={24} className="text-white" />
          </div>
          <span>FoodSync</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
          <Link href="#" className="hover:text-white transition-colors">Features</Link>
          <Link href="#" className="hover:text-white transition-colors">Pricing</Link>
          <Link href="#" className="hover:text-white transition-colors">About</Link>
        </div>
        <Link href="/auth/login" className="px-5 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all text-sm font-medium">
          Login
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-orange-500/20 rounded-full blur-[120px] -z-10"
        />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent"
        >
          Manage Your Restaurant<br /> With Intelligent Sync
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
        >
          Streamline orders, inventory, and staff management in one unified platform.
          Experience the future of dining operations with FoodSync.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-full font-semibold text-white transition-all flex items-center gap-2 group">
            Get Started <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-semibold text-white transition-all backdrop-blur-sm">
            View Demo
          </button>
        </motion.div>
      </section>

      {/* Stats / Dashboard Preview */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-6 mb-24"
      >
        <div className="relative rounded-xl border border-white/10 bg-gray-800/50 backdrop-blur-xl p-4 md:p-8 shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gray-900/50 border border-white/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                  <LayoutDashboard size={24} />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Total Sales</h3>
                  <p className="text-2xl font-bold">$12,450</p>
                </div>
              </div>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "75%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-blue-500"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gray-900/50 border border-white/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                  <Utensils size={24} />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Active Orders</h3>
                  <p className="text-2xl font-bold">24</p>
                </div>
              </div>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "45%" }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  className="h-full bg-purple-500"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gray-900/50 border border-white/5">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
                  <Database size={24} />
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm">Inventory Status</h3>
                  <p className="text-2xl font-bold">98%</p>
                </div>
              </div>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "98%" }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                  className="h-full bg-green-500"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { title: "Real-time Sync", desc: "Instantly synchronize orders between kitchen and front-of-house.", icon: <Database /> },
            { title: "Smart Inventory", desc: "Automatically deduct stock based on recipes and sales data.", icon: <LayoutDashboard /> },
            { title: "Staff Management", desc: "Manage shifts, roles, and performance effortlessly.", icon: <ChefHat /> }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="p-8 rounded-2xl bg-gray-800/30 border border-white/5 hover:border-orange-500/30 hover:bg-gray-800/50 transition-all group"
            >
              <div className="mb-4 p-4 rounded-xl bg-gray-900 w-fit text-orange-500 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} FoodSync. All rights reserved.</p>
      </footer>
    </div>
  );
}
