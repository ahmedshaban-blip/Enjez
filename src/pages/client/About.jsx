import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function AboutUsPage() {
  const values = [
    { icon: 'groups', title: 'Customer First', desc: "We believe in building lasting relationships by putting our clients' needs at the heart of everything we do." },
    { icon: 'verified', title: 'Quality & Craftsmanship', desc: 'Our commitment to excellence ensures we deliver superior quality and meticulous attention to detail in every project.' },
    { icon: 'lightbulb', title: 'Innovation', desc: 'We constantly seek out new and better ways to solve problems, driving progress and delivering cutting-edge solutions.', special: 'animate-pulse' }
  ];

  const team = [
    { name: 'John Carter', role: 'Founder & CEO', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC36CSjEu2473p80RYFigsRchaJTTDYTNw6ddmk1LObDNzvgMwEgH1qEHaffxIvPBzic5Ey2oJ4nxYxBUxtjnzizexc_jDqIOqlu9jnJkY9NX8uQbnaQlOZDXCmZuLiILWYqyiHPq0ZRafheJz6KtAxj7GPW2rJamm54Mv6G1A2OEwetatNx1obIrgZyGGGZLK0dH62MY4Atk_p2gcH6CDhZ9HVyn8MYfVtjAXOtB9wLmhzWqPUEqG9ghxVqOQ9RKJWzSCEBZlVN6Zg', quote: "Our goal is to build solutions that not only work, but inspire. That's the passion that drives us every single day." },
    { name: 'Sophie Moore', role: 'Lead Service Provider', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_B1pzFoXeLATALbFdY2Yt8bNEDdaliZSwazBVPPXoxGGmlqL1Nyi8M61EeUKMg6t4aWovO7i-nzJ2-88qv5WmkY_Ap7Ll5V6YTbMa0g5AwMf0MV5WRzHTArj454CTjqkkDHXFCF9wDe0DHkRrreZLqfjyyjtyNknqaxXaOD7Xoqdp5_i7EVZ6QL9eqcgSu3G6Kpd9uDXQnyI9vGG_GnB2Bv7B_RXSXwCDY2rxuVzjnTwAFdCG6fcd12BM54SruiKQo_mrtsSRvCvo', quote: "I love connecting with our clients and understanding their unique challenges to deliver truly personalized service." },
    { name: 'David Chen', role: 'Head of Innovation', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBD79S7LQ1aFU3Y86GgSGBbOVY82jaf2OuUZEIab8aoDRGQM6My0vyscRGe9_FCt8wT7fo7KLnl4ilrVhbnf2dH0H6ygB7nawLdNYq4W5GPJoKPkfEBK4bCdq7JxEd9e7y3WVICs-OukDF61iWePYMX9xfH_Ek1qK2L8gup3_vwLbWCaBdPCA9LSHHuVQqLuZh2bUYi2WSOpQh36A8afIenaJFUfIpG63IeQPfYAttX_agguNYe1MrMniQNyCRbFQYUHiERJ8WpsAq', quote: "Pushing boundaries and exploring new technologies is how we stay ahead and deliver exceptional value." }
  ];

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-gray-200 flex flex-col min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <Navbar />
          <main className="flex-1">
            {/* Hero */}
            <section className="flex flex-1 justify-center py-5">
              <div className="layout-content-container flex flex-col w-full max-w-6xl px-4">
                <div className="@[480px]:p-4">
                  <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-xl items-center justify-center p-4" style={{ backgroundImage: 'linear-gradient(rgba(10, 37, 64, 0.4) 0%, rgba(10, 37, 64, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAUZgGpO9s4fv7v7kWHKbv_VsXgV_qkaOUjOAfNxdY3Yzqh8bAh3exi31s41FGJiBxAu9svIJjaUWoHTAyzL8flQY75EcCjjvxjdQytiLMqBYoKIGLFb717IIG5jcgBeHYpE248T8JHXrbvQMRFU0Lntvg_DvOA808ez-mBVdTqth_BTBeb07_6e97Y__LFXIDJgkS_ZIuWtzWEEMrAtCZQNJqu0XvzdfkzLhkWGvcol8hMKKnJ47MjbMXNhFxtxfsa4LOk6gry-XZu")' }}>
                    <div className="flex flex-col gap-2 text-center max-w-3xl">
                      <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">Our Mission: Empowering Your Success</h1>
                      <h2 className="text-gray-200 text-base font-normal leading-normal @[480px]:text-lg">We are dedicated to providing exceptional service and innovative solutions to help you achieve your goals with confidence and clarity.</h2>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Our Story */}
            <section className="flex justify-center py-10 sm:py-16">
              <div className="flex flex-col max-w-3xl flex-1 px-4 text-center items-center">
                <h2 className="text-[#111318] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Our Story</h2>
                <p className="text-gray-800 dark:text-gray-300 text-base sm:text-lg font-normal leading-relaxed pb-3 pt-1 px-4">Founded with a passion for excellence, our journey began with a simple idea: to create a service that not only meets but exceeds expectations. We saw a need for a partner who is reliable, innovative, and truly invested in the success of its clients. From our humble beginnings, we have grown into a trusted leader in the industry, driven by our commitment to solving complex problems and delivering tangible results.</p>
              </div>
            </section>

            {/* Core Values */}
            <section className="flex justify-center py-10 sm:py-16">
              <div className="layout-content-container flex flex-col max-w-6xl flex-1 px-4 gap-10">
                <div className="flex flex-col gap-4 text-center">
                  <h1 className="text-[#111318] dark:text-white tracking-tight text-[32px] font-bold leading-tight @[480px]:text-4xl max-w-3xl mx-auto">Our Core Values</h1>
                  <p className="text-gray-800 dark:text-gray-300 text-base sm:text-lg font-normal leading-relaxed max-w-3xl mx-auto">Our values are the foundation of our company. They guide our actions and define our commitment to our clients, our team, and our community.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-0">
                  {values.map((v, i) => (
                    <div key={i} className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark p-6 flex-col text-center items-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-primary dark:hover:border-primary group cursor-pointer">
                      <div className={`flex items-center justify-center size-12 rounded-full bg-primary/20 text-primary dark:text-accent transform transition-all duration-500 group-hover:bg-primary group-hover:text-white ${v.special ? v.special : 'group-hover:rotate-12'}`}>
                        <span className="material-symbols-outlined text-2xl transition-transform group-hover:scale-110">{v.icon}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-[#111318] dark:text-white text-lg font-bold leading-tight group-hover:text-primary dark:group-hover:text-primary transition-colors">{v.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-sm font-normal leading-normal group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Team */}
            <section className="flex justify-center py-10 sm:py-20 bg-white dark:bg-background-dark">
              <div className="flex flex-col max-w-6xl flex-1 px-4 gap-10">
                <div className="flex flex-col gap-4 text-center">
                  <h2 className="text-[#111318] dark:text-white text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Meet the Team</h2>
                  <p className="text-gray-800 dark:text-gray-300 text-base sm:text-lg font-normal leading-relaxed max-w-3xl mx-auto">We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {team.map((t, i) => (
                    <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl group hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                      <div className="mb-4"><img className="rounded-full size-32 object-cover border-4 border-white dark:border-gray-700 shadow-lg transform transition-all duration-300 group-hover:border-blue-950 group-hover:-translate-y-2" alt={`Headshot of ${t.name}`} src={t.img} /></div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-950 dark:group-hover:text-blue-400 transition-colors">{t.name}</h3>
                      <p className="text-sm text-blue-950 dark:text-accent font-semibold transition-all duration-300 group-hover:scale-110">{t.role}</p>
                      <div className="h-px w-12 bg-blue-950/30 my-3 transition-all duration-300 group-hover:w-24 group-hover:bg-blue-950"></div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors group-hover:text-gray-800 dark:group-hover:text-gray-200 max-w-xs">"{t.quote}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="flex flex-1 justify-center py-16 sm:py-24 mb-4">
              <div className="flex flex-col max-w-6xl flex-1 items-center gap-6 px-4 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Ready to get started?</h2>
                <p className="max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">Let's work together to achieve your goals. Explore our services or book a free consultation to discuss your needs.</p>
                <div className="flex-wrap gap-4 flex justify-center">
                  <Link to="/services" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-blue-950 text-white text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"><span className="truncate">Explore Services</span></Link>
                  <Link to="/contact" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-gray-200 dark:bg-gray-800 text-[#111318] dark:text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"><span className="truncate">Book a Consultation</span></Link>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}