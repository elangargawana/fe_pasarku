export function formatRupiah(value: number) {
  try {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
  } catch (e) {
    // fallback
    return 'Rp ' + value.toLocaleString();
  }
}

export function formatCompactRupiah(value: number) {
  if (value >= 1000000) {
    const v = Math.round((value / 1000000) * 10) / 10;
    return `${v % 1 === 0 ? v.toFixed(0) : v} Jt`;
  }
  if (value >= 1000) {
    const v = Math.round((value / 1000) * 10) / 10;
    return `${v % 1 === 0 ? v.toFixed(0) : v} K`;
  }
  return formatRupiah(value);
}

export default formatRupiah;
