export default function getBudgetObject(income, gdp, capita) {
  const budget = {
    income, // shorthand for income: income
    gdp,    // shorthand for gdp: gdp
    capita  // shorthand for capita: capita
  };

  return budget;
}
