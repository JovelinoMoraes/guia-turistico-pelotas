const pixKey = "44ad3513-ac05-4a96-a0eb-670fb8f2fe44";
const merchantName = "GUIA PELOTAS";
const merchantCity = "PELOTAS";

function field(id: string, value: string): string {
  return `${id}${value.length.toString().padStart(2, "0")}${value}`;
}

function crc16(payload: string): string {
  let crc = 0xffff;
  for (const character of payload) {
    crc ^= character.charCodeAt(0) << 8;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc & 0x8000) !== 0 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function getPixPayload(): string {
  const merchantAccount = field("00", "BR.GOV.BCB.PIX") + field("01", pixKey);
  const additionalData = field("05", "***");
  const payload = [
    field("00", "01"),
    field("26", merchantAccount),
    field("52", "0000"),
    field("53", "986"),
    field("58", "BR"),
    field("59", merchantName),
    field("60", merchantCity),
    field("62", additionalData),
    "6304",
  ].join("");

  return `${payload}${crc16(payload)}`;
}

export function getPixKey(): string {
  return pixKey;
}

export function getFormattedPixKey(): string {
  return pixKey;
}
