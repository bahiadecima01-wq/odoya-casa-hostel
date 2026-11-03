export const WHATSAPP_NUMBER = "5573991054885";

export const WA_MESSAGES = {
  hero: "Olá! Conheci o Odoyá Casa Hostel pelo site e gostaria de saber mais sobre hospedagem.",
  shared: "Olá! Gostaria de consultar a disponibilidade e os valores dos quartos compartilhados.",
  suite: "Olá! Gostaria de saber mais sobre a disponibilidade e os valores da suíte privativa.",
  general: "Olá! Gostaria de conhecer melhor o Odoyá Casa Hostel.",
  booking:
    "Olá! Tenho interesse em me hospedar no Odoyá Casa Hostel. Poderiam me passar mais informações?",
} as const;

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
