'use client'

import { useEffect, useState } from 'react'
import { ShieldCheck, Scale, HeartHandshake } from 'lucide-react'

const slides = [
  {
    icon: Scale,
    eyebrow: 'Được cấp phép',
    title: 'Nghị định 06/2017/NĐ-CP',
    subtitle: 'Cá Cược Bóng Đá Hợp Pháp',
  },
  {
    icon: ShieldCheck,
    eyebrow: 'Bảo mật',
    title: 'Xác minh danh tính KYC',
    subtitle: 'Giao dịch minh bạch, an toàn tuyệt đối',
  },
  {
    icon: HeartHandshake,
    eyebrow: 'Chơi có trách nhiệm',
    title: 'Chỉ dành cho người từ 21 tuổi',
    subtitle: 'Tự đặt hạn mức cược mỗi ngày',
  },
]

export function ComplianceCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4500)
    return () => clearInterval(id)
  }, [])

  return (
    <section aria-roledescription="carousel" aria-label="Thông tin pháp lý" className="px-3">
      <div className="rounded-xl bg-gradient-to-r from-brand-red via-brand-orange to-brand-red p-px shadow-[0_0_20px_-6px_rgb(249_115_22/0.6)]">
        <div className="relative overflow-hidden rounded-[11px] bg-[#0c111c]">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide, i) => {
              const Icon = slide.icon
              return (
                <div
                  key={slide.title}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${slides.length}`}
                  aria-hidden={i !== index}
                  className="relative flex w-full shrink-0 items-center gap-3 px-3.5 py-3"
                >
                  <div
                    className="pointer-events-none absolute -right-6 -top-10 size-32 rounded-full bg-brand-red/25 blur-2xl"
                    aria-hidden="true"
                  />
                  <span className="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-red to-brand-orange">
                    <Icon className="size-6 text-white" aria-hidden="true" />
                  </span>
                  <div className="relative min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-brand-orange">
                      {slide.eyebrow}
                    </p>
                    <p className="truncate text-[14px] font-extrabold text-white">{slide.title}</p>
                    <p className="truncate text-[11px] text-white/65">{slide.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="absolute bottom-1.5 right-3 flex gap-1">
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Xem slide ${i + 1}`}
                aria-current={i === index}
                className={`h-1 rounded-full transition-all ${
                  i === index ? 'w-4 bg-brand-orange' : 'w-1.5 bg-white/25'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
