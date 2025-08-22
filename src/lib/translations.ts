export const translations = {
  en: {
    // Navigation
    converter: "Converter",
    calendar: "Calendar",
    
    // Hero Section
    heroTitle: "Javanese Calendar",
    heroSubtitle: "Discover the mystical wisdom of traditional Javanese timekeeping. Convert modern dates to ancient cycles of cosmic harmony.",
    
    // Date Converter
    dateConverter: "Date Converter",
    selectDate: "Select Date",
    today: "Today",
    
    // Result Card
    javaneseDate: "Javanese Date",
    cycles: "Cycles",
    wuku: "Wuku",
    pasaran: "Pasaran",
    
    // Monthly Calendar
    monthlyCalendar: "Monthly Calendar",
    selectMonth: "Select Month",
    selectYear: "Select Year",
    winduCycle: "Windu Cycle",
    javaneseYear: "Javanese Year",
    yearType: "Year Type",
    javaneseMonths: "Javanese Months",
    
    // Info Cards
    understandingCycles: "Understanding the Cycles",
    wukuInfo: "Wuku Information",
    
    // Months
    months: {
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      october: "October",
      november: "November",
      december: "December"
    }
  },
  id: {
    // Navigation
    converter: "Konverter",
    calendar: "Kalender",
    
    // Hero Section
    heroTitle: "Kalender Jawa",
    heroSubtitle: "Temukan kebijaksanaan mistis dari sistem perhitungan waktu tradisional Jawa. Konversi tanggal modern ke siklus kosmis kuno yang harmonis.",
    
    // Date Converter
    dateConverter: "Konverter Tanggal",
    selectDate: "Pilih Tanggal",
    today: "Hari Ini",
    
    // Result Card
    javaneseDate: "Tanggal Jawa",
    cycles: "Siklus",
    wuku: "Wuku",
    pasaran: "Pasaran",
    
    // Monthly Calendar
    monthlyCalendar: "Kalender Bulanan",
    selectMonth: "Pilih Bulan",
    selectYear: "Pilih Tahun",
    winduCycle: "Siklus Windu",
    javaneseYear: "Tahun Jawa",
    yearType: "Jenis Tahun",
    javaneseMonths: "Bulan Jawa",
    
    // Info Cards
    understandingCycles: "Memahami Siklus",
    wukuInfo: "Informasi Wuku",
    
    // Months
    months: {
      january: "Januari",
      february: "Februari",
      march: "Maret",
      april: "April",
      may: "Mei",
      june: "Juni",
      july: "Juli",
      august: "Agustus",
      september: "September",
      october: "Oktober",
      november: "November",
      december: "Desember"
    }
  }
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;