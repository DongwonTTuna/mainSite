import { portfolioProfile, type PortfolioProfile } from "#domain/profile/index";

export function getProfileDomain(): PortfolioProfile {
  return portfolioProfile;
}
