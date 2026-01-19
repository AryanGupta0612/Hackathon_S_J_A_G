export function getRecommendedCare(symptomText) {
  const text = symptomText.toLowerCase();

  if (
    text.includes("accident") ||
    text.includes("bleeding") ||
    text.includes("fracture") ||
    text.includes("heart") ||
    text.includes("chest pain") ||
    text.includes("stroke")
  ) {
    return "hospital";
  }

  if (
    text.includes("fever") ||
    text.includes("cold") ||
    text.includes("cough") ||
    text.includes("headache") ||
    text.includes("vomit") ||
    text.includes("diarrhea")
  ) {
    return "clinic";
  }

  return "any";
}
