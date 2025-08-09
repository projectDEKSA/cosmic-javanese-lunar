import { WukuName } from '@/lib/javanese-calendar';

export interface WukuDetail {
  dewa: string; // Dewa yang menaungi
  watak: string; // Watak (sifat umum)
  simbol: string; // Simbol
  kayu: string; // Kayu
  burung: string; // Burung
  gedhong: string; // Gedhong
  umbulUmbul: string; // Umbul-umbul
  sedekahSelametan: string; // Sedekah selametan
  doa: string; // Doa
  obatSakitParah: string; // Obat ketika sakit parah
  syaratRejekiLancar: string; // Syarat untuk mencari rejeki yang lancar
  pantangan: string; // Yang harus dihindari
}

// TODO: Populate using the shared Google Doc content for all 30 Wuku names
// If the Google Doc is made public, I can import all details here in one pass.
export const WUKU_DETAILS: Partial<Record<WukuName, WukuDetail>> = {
  // Example entries (replace with authoritative content from the doc)
  Sinta: {
    dewa: '—',
    watak: '—',
    simbol: '—',
    kayu: '—',
    burung: '—',
    gedhong: '—',
    umbulUmbul: '—',
    sedekahSelametan: '—',
    doa: '—',
    obatSakitParah: '—',
    syaratRejekiLancar: '—',
    pantangan: '—',
  },
  Landep: {
    dewa: '—',
    watak: '—',
    simbol: '—',
    kayu: '—',
    burung: '—',
    gedhong: '—',
    umbulUmbul: '—',
    sedekahSelametan: '—',
    doa: '—',
    obatSakitParah: '—',
    syaratRejekiLancar: '—',
    pantangan: '—',
  },
};

export const hasWukuDetail = (name: WukuName): boolean => Boolean(WUKU_DETAILS[name]);
