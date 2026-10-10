"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  GraduationCap,
  Mail,
  Menu,
  MessageCircle,
  MoveUpRight,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { advice, navigation, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { areasOfInterest, otherSkills } from "@/data/skills";
import { services, trainingModules } from "@/data/services";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  type RequestKind,
} from "@/lib/whatsapp";
import { GlobalBackground } from "@/components/layout/GlobalBackground";

type RequestType = RequestKind;
type FormFields = Record<string, string>;

const requestTypes: RequestType[] = [
  "Contact général",
  "Demande de devis",
  "Demande de formation",
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  light = false,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading${light ? " section-heading-light" : ""}`}>
      <div className="section-kicker">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand"
          href="#accueil"
          aria-label={`${profile.name}, accueil`}
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-photo">
            <Image
              src={profile.image}
              alt=""
              fill
              sizes="42px"
              className="image-cover"
            />
          </span>
          <span className="brand-name">
            <strong>Josaphat</strong>
            <span>Économie & finance</span>
          </span>
        </Link>

        <nav
          id="mobile-navigation"
          className={`main-nav${menuOpen ? " main-nav-open" : ""}`}
          aria-label="Navigation principale"
        >
          {navigation.map((item) => (
            <a
              href={item.href}
              key={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            className="nav-mobile-cta"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Parlons de votre projet <ArrowUpRight size={15} />
          </a>
        </nav>

        <a className="header-cta" href="#contact">
          Parlons de votre projet <ArrowUpRight size={15} />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section-wrap" id="accueil">
      <div className="hero-copy">
        <Reveal>
          <div className="availability-pill">
            <span className="status-dot" />
            Portfolio personnel
          </div>
          <p className="hero-pretitle">Bienvenue dans mon univers</p>
          <h1>
            Comprendre
            <br />
            l’économie.
            <br />
            <span>Lire les marchés.</span>
          </h1>
          <p className="hero-description">
            Je suis <strong>{profile.name}</strong>, avec un parcours
            universitaire en {profile.field.toLowerCase()}. Je m’intéresse aux
            liens entre économies, finance internationale et marchés.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#apropos">
              Découvrir mon parcours <ArrowDownRight size={17} />
            </a>
            <a className="button button-text" href="#contact">
              Me contacter <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="hero-footnote">
            <span>{profile.location}</span>
            <span className="footnote-dot">·</span>
            <span>Curiosité, méthode, ouverture</span>
          </div>
        </Reveal>
      </div>

      <Reveal className="hero-visual" delay={0.12}>
        <div className="hero-image-frame">
          <Image
            src={profile.image}
            alt={`Portrait de ${profile.name}`}
            fill
            priority
            sizes="(max-width: 760px) 84vw, (max-width: 1100px) 42vw, 520px"
            className="hero-image"
          />
          <div className="hero-image-shade" />
          <div className="photo-caption">
            <span className="caption-mark" />
            <span>Une démarche guidée par la compréhension</span>
          </div>
        </div>
        <div className="hero-note hero-note-top">
          <span className="note-icon"><TrendingUp size={17} /></span>
          <span>
            <strong>Regarder plus loin</strong>
            <small>Économie & marchés</small>
          </span>
        </div>
        <div className="hero-note hero-note-bottom">
          <span className="note-index">01</span>
          <span>
            <strong>Apprendre avec méthode</strong>
            <small>Un parcours en construction</small>
          </span>
          <ArrowUpRight size={15} />
        </div>
        <div className="hero-orbit" aria-hidden="true" />
      </Reveal>
      <a className="scroll-cue" href="#apropos" aria-label="Défiler vers À propos">
        <span>Faire défiler</span><ArrowDown size={15} />
      </a>
    </section>
  );
}

function About() {
  return (
    <section className="about-section section-wrap section-pad" id="apropos">
      <Reveal>
        <SectionHeading
          index="01"
          eyebrow="À propos"
          title="Un parcours, une curiosité."
          description="Mieux comprendre les économies et les marchés, c’est d’abord apprendre à poser les bonnes questions."
        />
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-photo-wrap">
          <div className="about-photo">
            <Image
              src={profile.image}
              alt={`Josaphat GBAGUIDI, portrait`}
              fill
              sizes="(max-width: 760px) 88vw, 440px"
              className="image-cover"
            />
          </div>
          <div className="photo-index">
            <span>J.G.</span>
            <span>Parakou, Bénin</span>
          </div>
        </Reveal>
        <Reveal className="about-copy" delay={0.08}>
          <span className="small-label">Le fil conducteur</span>
          <h3>La curiosité comme point de départ.</h3>
          <p>
            Mon intérêt pour l’économie et la finance internationale se nourrit
            d’une envie : comprendre comment les décisions, les échanges et les
            marchés façonnent le quotidien.
          </p>
          <p>
            Mon parcours universitaire à la FASEG de l’Université de Parakou
            s’inscrit dans ces domaines et nourrit mon intérêt pour les
            mécanismes économiques. Les marchés financiers et le trading
            constituent également des sujets que je souhaite mieux comprendre,
            avec rigueur et conscience des risques.
          </p>
          <div className="about-note">
            <span className="about-note-icon"><Sparkles size={18} /></span>
            <p>
              Une démarche en évolution, construite autour de l’apprentissage,
              de la discipline et de l’ouverture.
            </p>
          </div>
          <a className="inline-link" href="#parcours">
            Voir mon parcours <ArrowRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="education-section section-pad" id="parcours">
      <div className="section-wrap">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Formation"
            title="Des bases pour mieux comprendre."
            description="Mon parcours universitaire constitue le socle de ma réflexion sur les économies et la finance."
          />
        </Reveal>
        <Reveal className="education-card">
          <div className="education-emblem"><GraduationCap size={25} /></div>
          <div className="education-main">
            <span className="small-label">Parcours universitaire</span>
            <h3>{profile.field}</h3>
            <p>{profile.university}</p>
            <p className="education-institution">{profile.institution}</p>
          </div>
          <div className="education-aside">
            <p>Économie · Finance · Ouverture internationale</p>
          </div>
          <div className="education-watermark">02</div>
        </Reveal>
      </div>
    </section>
  );
}

function Domains() {
  const icons = [TrendingUp, BookOpen, CircleHelp, ShieldAlert];

  return (
    <section className="domains-section section-wrap section-pad" id="domaines">
      <Reveal>
        <SectionHeading
          index="03"
          eyebrow="Centres d’intérêt"
          title="Des sujets à explorer avec méthode."
          description="Des thèmes en lien avec mon parcours et ma curiosité, abordés dans une perspective pédagogique et réflexive."
        />
      </Reveal>
      <div className="domain-grid">
        {areasOfInterest.map((area, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Reveal className="domain-card" delay={index * 0.06} key={area}>
              <span className="domain-count">0{index + 1}</span>
              <span className="domain-icon"><Icon size={19} strokeWidth={1.7} /></span>
              <h3>{area}</h3>
              <span className="domain-arrow"><ArrowUpRight size={17} /></span>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="domain-footnote">
        <p>
          Ces thèmes reflètent des domaines d’intérêt et d’apprentissage. Ils
          ne constituent ni un conseil financier ni une recommandation
          d’investissement.
        </p>
      </Reveal>
    </section>
  );
}

function Services({
  onRequest,
}: {
  onRequest: (type: RequestType, service?: string) => void;
}) {
  return (
    <section className="services-section section-pad" id="services">
      <div className="section-wrap">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Échanges & demandes"
            title="Parlons de votre besoin."
            description="Vous souhaitez échanger autour d’un sujet ou formuler une demande ? Présentez votre besoin pour en discuter."
            light
          />
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal className="service-card" delay={index * 0.06} key={service.id}>
              <div className="service-card-top">
                <span>{service.number}</span>
                <ArrowUpRight size={18} />
              </div>
              <h3>{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-meta">
                <div><span>Pour</span><strong>{service.audience}</strong></div>
                <div><span>Objectif</span><strong>{service.goal}</strong></div>
              </div>
              <button
                type="button"
                className="service-action"
                onClick={() => onRequest("Demande de devis", service.title)}
              >
                Faire une demande <ArrowRight size={16} />
              </button>
            </Reveal>
          ))}
        </div>
        <p className="service-availability">
          Toute demande fera l’objet d’un échange préalable ; le contenu, les
          modalités et la disponibilité seront confirmés avant tout engagement.
        </p>
      </div>
    </section>
  );
}

function Training({
  onRequest,
}: {
  onRequest: (type: RequestType, service?: string) => void;
}) {
  return (
    <section className="training-section section-wrap section-pad" id="formation">
      <div className="training-intro">
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="Apprentissage"
            title="Comprendre avant d’agir."
            description="Une approche d’initiation aux marchés financiers qui privilégie les notions essentielles et la compréhension des risques."
          />
          <button
            type="button"
            className="button button-primary training-cta"
            onClick={() => onRequest("Demande de formation")}
          >
            Demander des informations <ArrowUpRight size={16} />
          </button>
        </Reveal>
        <Reveal className="risk-card" delay={0.1}>
          <span className="risk-icon"><ShieldAlert size={20} /></span>
          <div>
            <strong>Une démarche pédagogique</strong>
            <p>
              Le trading comporte un risque de perte en capital. Ces contenus
              ont une visée éducative et ne sont pas des conseils
              d’investissement ni une promesse de résultats.
            </p>
          </div>
        </Reveal>
      </div>
      <Reveal className="training-list" delay={0.08}>
        <div className="training-list-header">
          <span className="small-label">Thématiques d’initiation</span>
          <span className="module-count">0{trainingModules.length} modules</span>
        </div>
        {trainingModules.map((module, index) => (
          <div className="training-module" key={module}>
            <span className="module-number">{String(index + 1).padStart(2, "0")}</span>
            <span>{module}</span>
            <ChevronDown size={15} className="module-chevron" />
          </div>
        ))}
        <p className="module-disclaimer">
          Programme indicatif. Le format et la disponibilité se confirment lors
          de la prise de contact.
        </p>
      </Reveal>
    </section>
  );
}

function OtherSkills() {
  if (otherSkills.length === 0) return null;

  return (
    <section className="other-skills-section section-wrap section-pad" id="autres-competences">
      <Reveal>
        <SectionHeading
          index="06"
          eyebrow="Autres compétences"
          title="D’autres cordes à mon arc."
          description="Des compétences complémentaires, présentées indépendamment de mon parcours en économie et en finance."
        />
      </Reveal>
      <div className="skill-chip-list">
        {otherSkills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}
      </div>
    </section>
  );
}

function Projects() {
  if (projects.length === 0) return null;

  return (
    <section className="projects-section section-wrap section-pad" id="projets">
      <Reveal>
        <SectionHeading
          index="07"
          eyebrow="Projets & réalisations"
          title="Des idées mises en perspective."
          description="Quelques travaux et initiatives documentés au fil du parcours."
        />
      </Reveal>
      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            {project.image && (
              <div className="project-image">
                <Image src={project.image} alt="" fill sizes="(max-width: 760px) 90vw, 50vw" />
              </div>
            )}
            <span className="small-label">{project.role ?? "Projet"}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.skills && (
              <ul className="project-tags">
                {project.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            )}
            {project.href && (
              <a href={project.href} className="inline-link" target="_blank" rel="noreferrer">
                Découvrir le projet <MoveUpRight size={15} />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function Advice() {
  return (
    <section className="advice-section section-pad">
      <div className="section-wrap">
        <Reveal className="advice-card">
          <div className="advice-symbol">“</div>
          <div className="advice-content">
            <div className="section-kicker section-kicker-light">
              <span>08</span><span>Une note pour avancer</span>
            </div>
            <blockquote>{advice.quote}</blockquote>
            <p>{advice.explanation}</p>
          </div>
          <span className="advice-orbit advice-orbit-one" aria-hidden="true" />
          <span className="advice-orbit advice-orbit-two" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  );
}

function FormField({
  id,
  label,
  children,
  required = false,
}: {
  id: string;
  label: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      {children}
    </div>
  );
}

function Contact({
  selectedType,
  setSelectedType,
  requestedService,
}: {
  selectedType: RequestType;
  setSelectedType: (type: RequestType) => void;
  requestedService: string;
}) {
  const [fields, setFields] = useState<FormFields>({});
  const [status, setStatus] = useState("");
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    if (requestedService) {
      setFields((current) => ({ ...current, service: requestedService }));
    }
  }, [requestedService]);

  function updateField(key: string, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    setStatus("");
    setCopyStatus("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const fieldsByType: Record<RequestType, string[]> = {
      "Contact général": ["name", "email", "subject", "message"],
      "Demande de devis": [
        "name",
        "email",
        "phone",
        "service",
        "details",
        "budget",
        "deadline",
      ],
      "Demande de formation": [
        "name",
        "email",
        "phone",
        "training",
        "level",
        "objective",
        "availability",
      ],
    };
    const relevantFields = Object.fromEntries(
      fieldsByType[selectedType]
        .map((key) => [key, fields[key] ?? ""])
        .filter(([, value]) => value !== ""),
    );
    const message = buildWhatsAppMessage(selectedType, relevantFields);
    const url = buildWhatsAppUrl(message);
    setGeneratedMessage(message);
    setWhatsappUrl(url);
    setStatus(
      "Votre message est préparé. Vérifiez-le dans WhatsApp puis appuyez vous-même sur « Envoyer ».",
    );

    const whatsappWindow = window.open(url, "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(generatedMessage);
      setCopyStatus("Message copié. Vous pouvez le coller dans WhatsApp.");
    } catch {
      setCopyStatus("La copie automatique a échoué. Sélectionnez et copiez le texte ci-dessous.");
    }
  }

  return (
    <section className="contact-section section-pad" id="contact">
      <div className="section-wrap contact-layout">
        <Reveal className="contact-aside">
          <SectionHeading
            index="09"
            eyebrow="Prendre contact"
            title="La suite commence par un échange."
            description="Une question, une idée ou un besoin précis ? Choisissez le type de demande et envoyez-moi votre message."
            light
          />
          <div className="contact-details">
            <a href={`mailto:${profile.email}`} className="contact-detail">
              <span><Mail size={17} /></span>
              <span><small>Écrivez-moi</small><strong>{profile.email}</strong></span>
              <ArrowUpRight size={16} />
            </a>
            <a
              href={`https://wa.me/${profile.whatsappNumber}`}
              className="contact-detail"
              target="_blank"
              rel="noreferrer"
            >
              <span><MessageCircle size={17} /></span>
              <span><small>WhatsApp</small><strong>+229 01 96 37 46 64</strong></span>
              <ArrowUpRight size={16} />
            </a>
          </div>
          <p className="contact-response">
            Les informations saisies servent uniquement à préparer votre
            message. Aucune donnée n’est enregistrée par ce site.
          </p>
        </Reveal>

        <Reveal className="contact-form-wrap" delay={0.1}>
          <div className="form-type-tabs" aria-label="Type de demande">
            {requestTypes.map((type) => (
              <button
                type="button"
                aria-pressed={selectedType === type}
                className={selectedType === type ? "form-tab form-tab-active" : "form-tab"}
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setStatus("");
                  setGeneratedMessage("");
                }}
              >
                {type === "Contact général" ? "Contact" : type === "Demande de devis" ? "Devis" : "Formation"}
              </button>
            ))}
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <FormField id="name" label="Nom complet" required>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Votre nom"
                  value={fields.name ?? ""}
                  onChange={(event) => updateField("name", event.target.value)}
                  required
                />
              </FormField>
              <FormField id="email" label="Adresse e-mail" required>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="vous@exemple.com"
                  value={fields.email ?? ""}
                  onChange={(event) => updateField("email", event.target.value)}
                  required
                />
              </FormField>
            </div>

            {selectedType === "Contact général" && (
              <>
                <FormField id="subject" label="Sujet" required>
                  <input
                    id="subject"
                    name="subject"
                    placeholder="L’objet de votre message"
                    value={fields.subject ?? ""}
                    onChange={(event) => updateField("subject", event.target.value)}
                    required
                  />
                </FormField>
                <FormField id="message" label="Votre message" required>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Expliquez-moi votre demande..."
                    value={fields.message ?? ""}
                    onChange={(event) => updateField("message", event.target.value)}
                    required
                  />
                </FormField>
              </>
            )}

            {selectedType === "Demande de devis" && (
              <>
                <div className="form-row">
                  <FormField id="phone" label="Téléphone (facultatif)">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+229 ..."
                      value={fields.phone ?? ""}
                      onChange={(event) => updateField("phone", event.target.value)}
                    />
                  </FormField>
                  <FormField id="service" label="Service souhaité" required>
                    <select
                      id="service"
                      name="service"
                      value={fields.service ?? requestedService}
                      onChange={(event) => updateField("service", event.target.value)}
                      required
                    >
                      <option value="">Choisir un sujet</option>
                      {services.map((service) => <option key={service.id}>{service.title}</option>)}
                      <option value="Autre demande">Autre demande</option>
                    </select>
                  </FormField>
                </div>
                <FormField id="details" label="Décrivez votre besoin" required>
                  <textarea
                    id="details"
                    name="details"
                    rows={3}
                    placeholder="Quelques précisions sur votre demande..."
                    value={fields.details ?? ""}
                    onChange={(event) => updateField("details", event.target.value)}
                    required
                  />
                </FormField>
                <div className="form-row">
                  <FormField id="budget" label="Budget indicatif (facultatif)">
                    <input
                      id="budget"
                      name="budget"
                      placeholder="À préciser si vous le souhaitez"
                      value={fields.budget ?? ""}
                      onChange={(event) => updateField("budget", event.target.value)}
                    />
                  </FormField>
                  <FormField id="deadline" label="Délai souhaité (facultatif)">
                    <input
                      id="deadline"
                      name="deadline"
                      placeholder="Ex. : dans les prochaines semaines"
                      value={fields.deadline ?? ""}
                      onChange={(event) => updateField("deadline", event.target.value)}
                    />
                  </FormField>
                </div>
              </>
            )}

            {selectedType === "Demande de formation" && (
              <>
                <div className="form-row">
                  <FormField id="phone" label="Téléphone (facultatif)">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+229 ..."
                      value={fields.phone ?? ""}
                      onChange={(event) => updateField("phone", event.target.value)}
                    />
                  </FormField>
                  <FormField id="training" label="Formation souhaitée" required>
                    <select
                      id="training"
                      name="training"
                      value={fields.training ?? ""}
                      onChange={(event) => updateField("training", event.target.value)}
                      required
                    >
                      <option value="">Choisir une thématique</option>
                      {trainingModules.map((module) => <option key={module}>{module}</option>)}
                      <option value="Parcours d’initiation complet">Parcours d’initiation complet</option>
                    </select>
                  </FormField>
                </div>
                <div className="form-row">
                  <FormField id="level" label="Votre niveau actuel" required>
                    <select
                      id="level"
                      name="level"
                      value={fields.level ?? ""}
                      onChange={(event) => updateField("level", event.target.value)}
                      required
                    >
                      <option value="">Sélectionner</option>
                      <option>Débutant</option>
                      <option>Quelques notions</option>
                      <option>Intermédiaire</option>
                    </select>
                  </FormField>
                  <FormField id="availability" label="Disponibilités (facultatif)">
                    <input
                      id="availability"
                      name="availability"
                      placeholder="Jours ou horaires préférés"
                      value={fields.availability ?? ""}
                      onChange={(event) => updateField("availability", event.target.value)}
                    />
                  </FormField>
                </div>
                <FormField id="objective" label="Votre objectif pédagogique" required>
                  <textarea
                    id="objective"
                    name="objective"
                    rows={3}
                    placeholder="Qu’aimeriez-vous comprendre ou apprendre ?"
                    value={fields.objective ?? ""}
                    onChange={(event) => updateField("objective", event.target.value)}
                    required
                  />
                </FormField>
              </>
            )}

            <button className="button button-primary form-submit" type="submit">
              Envoyer le message <ArrowUpRight size={16} />
            </button>
            {status && <p className="form-status" role="status"><Check size={15} />{status}</p>}
            {whatsappUrl && (
              <div className="whatsapp-fallback">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  Ouvrir WhatsApp <ArrowUpRight size={14} />
                </a>
                <button type="button" onClick={copyMessage}>Copier le message</button>
                {copyStatus && <span role="status">{copyStatus}</span>}
                <textarea
                  className="message-preview"
                  aria-label="Aperçu du message préparé"
                  readOnly
                  rows={4}
                  value={generatedMessage}
                />
              </div>
            )}
            <p className="form-privacy">
              Vos données restent dans votre navigateur et seront incluses dans
              le message WhatsApp uniquement après votre action.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-main">
        <div className="footer-identity">
          <Link className="brand footer-brand" href="#accueil">
            <span className="brand-photo">
              <Image src={profile.image} alt="" fill sizes="42px" className="image-cover" />
            </span>
            <span className="brand-name">
              <strong>Josaphat</strong>
              <span>Économie & finance</span>
            </span>
          </Link>
          <p>Un parcours tourné vers la compréhension des économies et des marchés.</p>
        </div>
        <div className="footer-nav">
          <span className="small-label">Explorer</span>
          {navigation.slice(0, 4).map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </div>
        <div className="footer-contact">
          <span className="small-label">Restons en contact</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={`https://wa.me/${profile.whatsappNumber}`} target="_blank" rel="noreferrer">
            Écrire sur WhatsApp <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="section-wrap footer-bottom">
        <span>© {new Date().getFullYear()} {profile.name}. Tous droits réservés.</span>
        <span className="footer-credit">
          Réalisé par{" "}
          <a href="https://sergiahos.vercel.app/" target="_blank" rel="noreferrer">
            Sergiahos <ArrowUpRight size={12} />
          </a>
        </span>
        <a className="back-to-top" href="#accueil" aria-label="Remonter en haut de page">
          <ArrowUp size={16} />
        </a>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const [selectedType, setSelectedType] = useState<RequestType>("Contact général");
  const [requestedService, setRequestedService] = useState("");

  function startRequest(type: RequestType, service = "") {
    setSelectedType(type);
    setRequestedService(service);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <GlobalBackground />
      <div className="site-shell min-h-screen">
        <Header />
        <main>
          <Hero />
          <About />
          <Education />
          <Domains />
          <Services onRequest={startRequest} />
          <Training onRequest={startRequest} />
          <OtherSkills />
          <Projects />
          <Advice />
          <Contact
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            requestedService={requestedService}
          />
        </main>
        <Footer />
      </div>
    </>
  );
}
