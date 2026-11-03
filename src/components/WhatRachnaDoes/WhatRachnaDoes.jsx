import ArrowLink from '../ui/ArrowLink.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';
import { LineIcon } from '../ui/icons.jsx';
import { services } from '../../data/content.js';
import './WhatRachnaDoes.css';

export default function WhatRachnaDoes() {
  return (
    <section className="section services container" aria-labelledby="services-title">
      <SectionHeader
        title="What Rachna does"
        titleId="services-title"
        action={{ label: 'More about my work', to: '/#about' }}
      />

      <ul className="services__grid">
        {services.map((service) => (
          <li key={service.id} className="services__card card">
            <LineIcon name={service.icon} size={40} />
            <h3 className="services__title">{service.title}</h3>
            <p className="services__copy">{service.copy}</p>
            <ArrowLink to={service.link.to}>{service.link.label}</ArrowLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
