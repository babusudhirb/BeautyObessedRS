import Picture from '../ui/Picture.jsx';

// Upper-right panel: Rachna at her reception desk.
export default function HeroPortrait() {
  return (
    <Picture
      name="home-hero-portrait"
      className="hero-portrait__img"
      alt="Rachna seated at her reception desk, in front of a wall mural that reads “Rachna Sinha, Beauty Obsessed”"
      sizes="(min-width: 966px) 49vw, 60vw"
      priority
    />
  );
}
