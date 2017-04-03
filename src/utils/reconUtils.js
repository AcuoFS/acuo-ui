export const isEmptyCounterparty = (counterpartyData) => {
  return (counterpartyData.isEmpty() || !counterpartyData.first().get('data') ||
  (counterpartyData.first().get('data').isEmpty()))
}