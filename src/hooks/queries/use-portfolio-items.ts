import { useQuery } from "@tanstack/react-query";

import { getPortfolioItems } from "@/actions/portfolio-items/get-portfolio-items";

export const getUsePortfolioItemQueryKey = () => ["portfolioItem"] as const;

export const usePortfolioItems = () => {
  return useQuery({
    queryKey: getUsePortfolioItemQueryKey(),
    queryFn: () => getPortfolioItems(),
  });
};
