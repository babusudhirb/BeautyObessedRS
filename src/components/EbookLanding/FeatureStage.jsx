import SalonGuideBanner from './SalonGuideBanner.jsx';
import YoutubeVideos from './YoutubeVideos.jsx';

// One feature stage: Rachna's videos beside the Salon Expert Guide. The two
// panels share the width equally on laptops and desktops (together about one
// screen tall) and stack, videos first, on narrower screens.
export default function FeatureStage() {
  return (
    <div className="ebk-section">
      <div className="ebk-container stage">
        <YoutubeVideos />
        <SalonGuideBanner />
      </div>
    </div>
  );
}
