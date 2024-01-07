export const nameTrimmer = (name: string) => {
  const nameWoCompanyPrefix = name.replace(
    /\b(?:ПАО|ао|МКПАО|АНК|ЦГРМ|акц\.пр\.|обыкн\.|ап)\b/g,
    '',
  );

  const trimmedName = nameWoCompanyPrefix.replace(/[\\"]/g, '').trim();

  return trimmedName;
};
