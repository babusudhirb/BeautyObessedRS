import EbookFaq from '../components/EbookLanding/EbookFaq.jsx';
import {
  CategoryGrid,
  Collection,
  MeetCollection,
  ShopHero,
  ShopNewsletter,
  StandardBand,
} from '../components/ShopPage/ShopSections.jsx';
import PageMeta from '../components/Seo/PageMeta.jsx';
import { faqs, hero } from '../data/shop.js';
// Layout primitives shared with the e-book page, and the podcast page's form inputs.
import '../components/EbookLanding/EbookLanding.css';
import '../components/PodcastPage/PodcastPage.css';
import '../components/ShopPage/ShopPage.css';

// The shop page. Section order follows its design reference; on wide screens
// the categories share a screen with Skincare, and Haircare with Nail Care.
export default function ShopPage() {
  return (
    <div className="ebk shop">
      <PageMeta
        title="Shop the Rachna Beauty Collection — Skincare, Haircare and Nail Care"
        description={`${hero.eyebrow}: ${hero.copy.charAt(0).toLowerCase()}${hero.copy.slice(1)}`}
        path="/shop"
        image="retail-hero"
      />
      <ShopHero />
      <div className="shop-stage">
        <CategoryGrid />
        <Collection id="skincare" />
      </div>
      <div className="shop-stage">
        <Collection id="haircare" />
        <Collection id="nailcare" />
      </div>
      <StandardBand />
      <MeetCollection />
      <EbookFaq faqs={faqs} titleId="shop-faq-title" />
      <ShopNewsletter />
    </div>
  );
}
