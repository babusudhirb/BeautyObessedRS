import Button from '../ui/Button.jsx';
import Picture from '../ui/Picture.jsx';
import { planSteps, plans } from '../../data/content.js';
import './BeautyPlan.css';

function PlanCard({ plan }) {
  return (
    <li className="plan-card card">
      <h3 className="plan-card__name">{plan.name}</h3>
      <p className="plan-card__copy">{plan.copy}</p>

      {/* No pricing has been supplied yet: show a neutral dash, not a number. */}
      <p className="plan-card__price">
        {plan.price ?? (
          <>
            <span aria-hidden="true">₹ —</span>
            <span className="sr-only">Price to be announced</span>
          </>
        )}
      </p>

      <Button to={`/beauty-plan?plan=${plan.id}`} variant={plan.variant} arrow={false} block>
        {plan.cta}
      </Button>
    </li>
  );
}

export default function BeautyPlan() {
  return (
    <section className="section plan" id="beauty-plan" aria-labelledby="plan-title">
      <div className="plan__panel container-wide">
        <div className="plan__inner">
          <div className="plan__intro">
            <h2 className="heading plan__title" id="plan-title">
              We decide <br />
              everything for you.
            </h2>
            <p className="plan__lead">
              A personalised beauty plan for your skin, hair, nails and lifestyle — created by Rachna and her
              team.
            </p>

            <ol className="plan__steps">
              {planSteps.map((step, index) => (
                <li key={step.title} className="plan__step">
                  <span className="plan__step-number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="plan__step-title">{step.title}</h3>
                    <p className="plan__step-copy">{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="plan__phone">
            {/* The source image is a phone on a pink backdrop; the frame below crops to the handset. */}
            <div className="phone">
              <Picture
                name="beauty-plan-phone"
                alt="My Beauty Plan on a phone: today's checklist with morning skincare, hair care, nail care and a night routine"
                sizes="(min-width: 1100px) 900px, 600px"
              />
            </div>
          </div>

          <ul className="plan__cards">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
