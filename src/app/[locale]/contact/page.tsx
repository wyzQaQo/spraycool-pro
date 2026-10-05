export const dynamicParams = false;
"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Phone, Envelope, MapPin, Clock, WhatsappLogo, PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlurText from "@/components/effects/BlurText";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations();
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Navbar />
      <section className="relative pt-28 pb-20 bg-deep-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <BlurText text={t("contact.title")} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-4" duration={0.5} />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t("contact.subtitle")}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="space-y-4">
              {[{ icon: Phone, label: t("contact.phone"), value: "+1 (888) 555-MIST", sub: "Mon-Fri, 8AM-6PM GMT+8" },{ icon: Envelope, label: t("contact.email"), value: "sales@mistguard-pro.com", sub: "Response within 24 hours" },{ icon: WhatsappLogo, label: t("contact.whatsapp"), value: "+86 138 0000 0000", sub: "For urgent inquiries" },{ icon: MapPin, label: t("contact.headquarters"), value: "Shenzhen, Guangdong, China", sub: "" },{ icon: Clock, label: t("contact.hours"), value: "Mon-Fri: 8:00 - 18:00 (GMT+8)", sub: "" }].map((c,i) => (
                <motion.div key={i} initial={{opacity:0,x:-10}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.05}} className="glass-card rounded-xl p-4 flex items-start gap-3">
                  <c.icon size={20} weight="duotone" className="text-spray-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">{c.label}</p>
                    <p className="text-white text-sm font-medium">{c.value}</p>
                    {c.sub && <p className="text-gray-600 text-xs mt-0.5">{c.sub}</p>}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-2">
              {submitted ? (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} className="glass-card-strong rounded-2xl p-10 text-center">
                  <CheckCircle size={56} weight="fill" className="text-spray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">{t("contact.messageSent")}</h3>
                  <p className="text-gray-400">{t("contact.messageSentDesc")}</p>
                </motion.div>
              ) : (
                <motion.form onSubmit={(e)=>{e.preventDefault();setSubmitted(true)}} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="glass-card-strong rounded-2xl p-6 md:p-8">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {[{label: t("contact.fullName"),type:"text",placeholder:"John Smith"},{label: t("contact.company"),type:"text",placeholder:"Your Company Ltd."},{label: t("contact.emailField"),type:"email",placeholder:"you@company.com"},{label: t("contact.phoneField"),type:"tel",placeholder:"+1 (555) 000-0000"}].map((f,i)=>(
                      <div key={i}>
                        <label className="block text-sm font-medium text-gray-300 mb-1.5">{f.label}</label>
                        <input type={f.type} required={f.label.includes("*")} placeholder={f.placeholder} className="w-full px-4 py-2.5 rounded-xl bg-deep-900 border border-spray-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-spray-500/50 text-sm" />
                      </div>
                    ))}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">{t("contact.projectDetails")}</label>
                    <textarea required rows={4} placeholder="Describe your space (size, type), goals (cooling, mosquito control), and timeline..." className="w-full px-4 py-2.5 rounded-xl bg-deep-900 border border-spray-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-spray-500/50 text-sm resize-none" />
                  </div>
                  <button type="submit" className="w-full px-8 py-3.5 rounded-xl bg-spray-500 text-black font-semibold hover:bg-spray-400 transition-all flex items-center justify-center gap-2"><PaperPlaneTilt size={20} weight="fill" />{t("contact.sendInquiry")}</button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
