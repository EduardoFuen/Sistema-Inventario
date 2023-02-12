export const SupplierExport = (data: any) =>
  data?.map((item: any) => ({
    ID: Number(item?.ID) || 0,
    EmailContact: item?.EmailContact?.toString() || '',
    Nit: item?.Nit?.toString() || '',
    BusinessName: item?.BusinessName || '',
    PhoneContact: item?.PhoneContact?.toString() || '',
    Status: Boolean(item?.Status),
    PaymenTerm: item?.PaymenTerm?.toString() || '',
    LeadTimeBaq: Number(item?.LeadTimeBaq) || 0,
    LeadTimeBog: Number(item?.LeadTimeBog) || 0,
    Discount: Number(item?.Discount) || 0,
    DaysPayment: item?.DaysPayment ? item?.DaysPayment : '',
    NameContact: item?.NameContact ? item?.NameContact : ''
  }));
