import { Container } from "../components/ui/Container";
import { Card, CardContent } from "../components/ui/Card";

export const About = () => {
  return (
    <main className="pt-20 pb-12">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            About FinanceCalc
          </h1>

          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Your Trusted Financial Calculator
              </h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                FinanceCalc is a comprehensive financial planning tool designed
                to help individuals make informed decisions about their
                investments and financial goals. We provide accurate,
                easy-to-use calculators for various financial scenarios.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">
                Our Mission
              </h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                To democratize financial planning by providing free, accessible,
                and accurate financial calculation tools that help users
                understand their financial options and make better investment
                decisions.
              </p>

              <h3 className="text-xl font-semibold text-white mb-3">
                What We Offer
              </h3>
              <ul className="text-slate-300 space-y-2 mb-6">
                <li>
                  • SIP Calculator - Plan your systematic investment strategy
                </li>
                <li>
                  • Step-up SIP Calculator - Calculate progressive investment
                  plans
                </li>
                <li>• Income Tax Calculator - Estimate your tax liability</li>
                <li>
                  • Inflation Calculator - Understand the impact of inflation
                </li>
              </ul>

              <p className="text-slate-300 leading-relaxed">
                All calculations are for educational and planning purposes.
                Please consult with qualified financial advisors for
                personalized investment advice.
              </p>
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  );
};

export default About;
