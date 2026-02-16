export const hero = {
  greeting: "Привет, я",
  name: "Денис",
  role: "Full-Stack Developer",
  tagline: "Создаю современные веб-приложения — от пиксельного дизайна до серверной архитектуры",
};

export const about = {
  label: "Обо мне",
  title: "Разработчик, который",
  titleHighlight: "решает задачи",
  description:
    "Я Full-Stack разработчик с опытом создания веб-приложений полного цикла. Работаю как с фронтендом — React, современный JavaScript, адаптивные интерфейсы — так и с бэкендом: Node.js, базы данных, API. Люблю чистый код, продуманную архитектуру и интерфейсы, которыми приятно пользоваться.",
  stats: [
    { value: 20, suffix: "+", label: "Проектов" },
    { value: 3, suffix: "+", label: "Года опыта" },
    { value: 99, suffix: "%", label: "Чистый код" },
  ],
};

export const skills = {
  label: "Навыки",
  title: "Технологический стек",
  categories: [
    {
      name: "Frontend",
      items: ["React", "JavaScript / TypeScript", "HTML5 / CSS3", "Tailwind CSS", "Framer Motion", "Three.js"],
    },
    {
      name: "Backend",
      items: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "REST API"],
    },
    {
      name: "Инструменты",
      items: ["Git / GitHub", "Docker", "Vite / Webpack", "Figma", "Linux", "CI/CD"],
    },
  ],
};

export const projects = {
  label: "Проекты",
  title: "Избранные работы",
  items: [
    {
      title: "GotIt",
      description: "Веб-приложение с современным интерфейсом и продуманной архитектурой.",
      tags: ["React", "Node.js", "MongoDB"],
      link: "https://github.com/Bzden4ik/GotIt",
    },
    {
      title: "WebCard",
      description: "Персональный сайт-визитка в стиле Cyber-Premium с 3D-графикой и анимациями.",
      tags: ["React", "Three.js", "GSAP"],
      link: "https://github.com/Bzden4ik/WebCard",
    },
    {
      title: "E-Commerce Platform",
      description: "Полноценная платформа интернет-магазина с корзиной, оплатой и панелью администратора.",
      tags: ["React", "Express", "PostgreSQL"],
      link: "#",
    },
  ],
};

export const contact = {
  label: "Контакты",
  title: "Давайте работать вместе",
  description: "Открыт к предложениям и интересным проектам. Напишите мне!",
  links: [
    { name: "GitHub", url: "https://github.com/Bzden4ik", icon: "github" },
    { name: "Telegram", url: "https://t.me/Bzden4ikkk", icon: "telegram" },
    { name: "Email", url: "mailto:deniskazah33@gmail.com", icon: "email" },
  ],
};

export const nav = {
  logo: "D.",
  items: [
    { label: "Главная", href: "#hero" },
    { label: "Обо мне", href: "#about" },
    { label: "Навыки", href: "#skills" },
    { label: "Проекты", href: "#projects" },
    { label: "Контакты", href: "#contact" },
  ],
};
