'use client';

import { motion } from 'framer-motion';
import type { IService } from '@/types';
import {
  Globe, Server, Database, Zap, Palette, Bot
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  globe: <Globe className="w-6 h-6" />,
  server: <Server className="w-6 h-6" />,
  database: <Database className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
  palette: <Palette className="w-6 h-6" />,
  bot: <Bot className="w-6 h-6" />,
};

const defaultIcons = [
  <Globe key="g" className="w-6 h-6" />,
  <Server key="s" className="w-6 h-6" />,
  <Database key="d" className="w-6 h-6" />,
  <Zap key="z" className="w-6 h-6" />,
  <Bot key="b" className="w-6 h-6" />,
  <Palette key="p" className="w-6 h-6" />,
];

interface ServicesSectionProps { services: IService[] }

export function ServicesSection({ services }: ServicesSectionProps) {
  if (!services.length) return null;
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-primary font-medium text-sm uppercase tracking-widest mb-3">Services</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">What I Do</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          From concept to deployment — I can help you build it.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group glass rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              {service.icon ? (iconMap[service.icon] ?? defaultIcons[i % defaultIcons.length]) : defaultIcons[i % defaultIcons.length]}
            </div>
            <h3 className="font-bold text-lg mb-2">{service.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
            {service.features && service.features.length > 0 && (
              <ul className="space-y-1.5">
                {service.features.map((f, j) => (
                  <li key={j} className="text-muted-foreground text-xs flex items-start gap-2">
                    <span className="text-primary mt-0.5 flex-shrink-0">✓</span>{f}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
