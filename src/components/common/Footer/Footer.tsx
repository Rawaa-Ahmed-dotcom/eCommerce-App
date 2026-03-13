import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { containerVariants, itemVariants, socials, footerLinks } from "../../../utils/FooterAnimation";
import styled from "./style.module.css";

export default function Footer() {
  return (
    <footer className={styled.footer}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={styled.columns}
       >
        {/* Brand Column */}
        <motion.div variants={itemVariants}>
          <h2 className= {styled.logo}>
            FAMILY FOLD
          </h2>
          <p className={styled.bio}>
            Curated fashion for those who believe style is a form of self-expression.
            Quality pieces, timeless designs.
          </p>

          {/* Newsletter */}
          <p className= {styled.newsletter}>
            Join our newsletter
          </p>
          <div style={{ display: "flex", gap: 0 }}>
            <input
              type="email"
              placeholder="your@email.com"
              className= {styled.input}
            />
            <motion.button
              whileHover={{ backgroundColor: "#254a73" }}
              whileTap={{ scale: 0.97 }}
              className={styled.button}
            >
              Subscribe
            </motion.button>
          </div>

          {/* Socials */}
          <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href="#"
                whileHover={{ y: -3, backgroundColor: "rgba(245,245,245,0.15)" }}
                whileTap={{ scale: 0.92 }}
                title={s.label}
                className={styled.social_link}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Links Columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <motion.div key={title} variants={itemVariants}>
            <h3 className= {styled.title}>
              {title}
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {links.map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 4, color: "#F5F5F5" }}
                    className={styled.links}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className= {styled.bottom_bar}
      >
        <p style={{ margin: 0, color: "rgba(245,245,245,0.3)", fontSize: 12 }}>
          © 2025 FAMILY FOLD. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
            <a key={item} href="#" style={{
              color: "rgba(245,245,245,0.3)",
              fontSize: 12,
              textDecoration: "none",
            }}>
              {item}
            </a>
          ))}
        </div>
      </motion.div>

      {/* Bottom padding */}
      <div style={{ height: 24 }} />
    </footer>
  );
}