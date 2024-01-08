export const nameTrimmer = (name: string) => {
  const nameWoCompanyPrefix = name.replace(
    /\b(?:ПАО|ао|МКПАО|АНК|ЦГРМ|акц\.пр\.|обыкн\.|ап)\b/g,
    '',
  );

  return nameWoCompanyPrefix.replace(/[\\"]/g, '').trim();
};
