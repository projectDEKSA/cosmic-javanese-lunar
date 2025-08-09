import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WUKU_DETAILS } from '@/data/wuku-details';
import { WukuName } from '@/lib/javanese-calendar';

interface Props {
  wuku: WukuName;
}

export const WukuDetailCards: React.FC<Props> = ({ wuku }) => {
  const detail = WUKU_DETAILS[wuku];

  return (
    <section aria-labelledby="wuku-details" className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 id="wuku-details" className="text-lg font-semibold text-foreground">Wuku Details</h3>
        <Badge variant="outline" className="uppercase tracking-wide">{wuku}</Badge>
      </div>

      {detail ? (
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border bg-background">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Esensi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <InfoRow label="Dewa yang menaungi" value={detail.dewa} />
              <InfoRow label="Watak" value={detail.watak} />
              <InfoRow label="Simbol" value={detail.simbol} />
            </CardContent>
          </Card>

          <Card className="border bg-background">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Atribut</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <InfoRow label="Kayu" value={detail.kayu} />
              <InfoRow label="Burung" value={detail.burung} />
              <InfoRow label="Gedhong" value={detail.gedhong} />
              <InfoRow label="Umbul-umbul" value={detail.umbulUmbul} />
            </CardContent>
          </Card>

          <Card className="border bg-background">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Amalan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <InfoRow label="Sedekah selametan" value={detail.sedekahSelametan} />
              <InfoRow label="Doa" value={detail.doa} />
              <InfoRow label="Obat ketika sakit parah" value={detail.obatSakitParah} />
            </CardContent>
          </Card>

          <Card className="border bg-background">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Petunjuk & Larangan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <InfoRow label="Syarat rejeki lancar" value={detail.syaratRejekiLancar} />
              <InfoRow label="Yang harus dihindari" value={detail.pantangan} />
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border bg-background">
          <CardContent className="py-6 text-sm text-muted-foreground">
            Konten Wuku {wuku} belum tersedia. Mohon berikan akses publik ke Google Docs atau kirimkan isi untuk saya masukkan.
          </CardContent>
        </Card>
      )}
    </section>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex gap-2">
    <span className="w-48 shrink-0 text-muted-foreground">{label}</span>
    <span className="text-foreground">{value}</span>
  </div>
);

export default WukuDetailCards;
