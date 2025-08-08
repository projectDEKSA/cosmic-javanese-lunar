/**
 * Javanese Calendar Converter - TypeScript Version
 * 
 * A comprehensive TypeScript library for converting Gregorian dates to the traditional 
 * Javanese calendar system, including support for Wuku cycles.
 * 
 * Perfect for React applications and modern web development.
 * 
 * @author Generated for Modern Web Applications
 * @version 2.0.0
 * @license MIT
 */

export interface GregorianInfo {
  date: string;
  dayName: string;
  datetime: Date;
}

export interface JavaneseInfo {
  date: number;
  month: string;
  yearType: string;
  year: number;
  windu: string;
}

export interface CycleInfo {
  pasaran: string;
  wuku: string;
  wukuDay: string;
}

export interface JavaneseCalendarResult {
  gregorian: GregorianInfo;
  javanese: JavaneseInfo;
  cycles: CycleInfo;
  formatted: string;
}

interface ReferencePoint {
  date: number;
  monthIndex: number;
  dayName: string;
  pasaranIndex: number;
  yearIndex: number;
  wukuIndex: number;
  wukuDayIndex: number;
}

interface WukuCalculation {
  wuku: string;
  wukuDay: string;
  wukuIndex: number;
  wukuDayIndex: number;
}

interface JavaneseDateInfo {
  date: number;
  month: string;
  yearType: string;
  yearIndex: number;
  monthIndex: number;
  yearNumber: number;
}

export class JavaneseCalendarConverter {
  // Calendar constants - made public for getConstants method
  public static readonly YEAR_TYPES = [
    "Alip", "Ehe", "Jimawal", "Je", "Dal", "Be", "Wawu", "Jimakir"
  ] as const;

  private static readonly LEAP_YEAR_TYPES = new Set(["Ehe", "Dal", "Jimakir"]);

  public static readonly PASARAN_DAYS = [
    "Wage", "Kliwon", "Legi", "Pahing", "Pon"
  ] as const;

  public static readonly WINDU_TYPES = [
    "Adi", "Kuntara", "Sengara", "Sancaya"
  ] as const;

  public static readonly MONTHS = [
    "Sura", "Sapar", "Mulud", "Bakda Mulud", "Jumadil Awal", "Jumadil Akir",
    "Rejeb", "Ruwah", "Pasa", "Sawal", "Dulkangidah", "Besar"
  ] as const;

  private static readonly MONTH_DAYS: Record<string, number> = {
    "Sura": 30, "Sapar": 29, "Mulud": 30, "Bakda Mulud": 29,
    "Jumadil Awal": 30, "Jumadil Akir": 29, "Rejeb": 30, "Ruwah": 29,
    "Pasa": 30, "Sawal": 29, "Dulkangidah": 30, "Besar": 29
  };

  public static readonly DAY_NAMES = [
    "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"
  ] as const;

  public static readonly WUKU_NAMES = [
    "Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", 
    "Warigalit", "Warigagung", "Julungwangi", "Sungsang", "Galungan", 
    "Kuningan", "Langkir", "Mandasia", "Pujut", "Pahang", "Kuruwelut", 
    "Mrakeh", "Tambir", "Madangkungan", "Maktal", "Wuye", "Manahil", 
    "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dhukut", "Watugunung"
  ] as const;

  public static readonly WUKU_DAYS = [
    "Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
  ] as const;

  // Reference point: August 10, 2021
  private static readonly REFERENCE_DATE = new Date(2021, 7, 10); // Month is 0-based
  private static readonly REFERENCE_JAVANESE: ReferencePoint = {
    date: 1,
    monthIndex: 0,  // Sura
    dayName: 'Selasa',
    pasaranIndex: 4,  // Pon
    yearIndex: 0,  // Alip
    wukuIndex: 27,  // Kulawu (index 27 in 0-based array)
    wukuDayIndex: 2  // Selasa (index 2 in wuku days)
  };

  /**
   * Check if a Javanese year type is a leap year
   */
  private isLeapYear(yearType: string): boolean {
    return JavaneseCalendarConverter.LEAP_YEAR_TYPES.has(yearType as any);
  }

  /**
   * Get the number of days in a Javanese year
   */
  private getYearDays(yearType: string): number {
    return this.isLeapYear(yearType) ? 355 : 354;
  }

  /**
   * Get the number of days in a Javanese month
   */
  private getMonthDays(month: string, yearType: string): number {
    const days = JavaneseCalendarConverter.MONTH_DAYS[month];
    // In leap years, Besar has 30 days instead of 29
    if (month === "Besar" && this.isLeapYear(yearType)) {
      return 30;
    }
    return days;
  }

  /**
   * Calculate the Wuku and Wuku day for a given number of days from reference
   */
  private calculateWuku(daysFromReference: number): WukuCalculation {
    const ref = JavaneseCalendarConverter.REFERENCE_JAVANESE;
    
    // Calculate position in 210-day wuku cycle
    let totalWukuDays = daysFromReference + (ref.wukuIndex * 7) + ref.wukuDayIndex;
    
    // Handle negative values for past dates
    if (totalWukuDays < 0) {
      const cyclesToAdd = Math.floor(Math.abs(totalWukuDays) / 210) + 1;
      totalWukuDays += cyclesToAdd * 210;
    }
    
    // Get position within the 210-day cycle
    const positionInCycle = totalWukuDays % 210;
    
    // Calculate wuku (week) and day within wuku
    const wukuIndex = Math.floor(positionInCycle / 7) % 30;
    const wukuDayIndex = positionInCycle % 7;
    
    return {
      wuku: JavaneseCalendarConverter.WUKU_NAMES[wukuIndex],
      wukuDay: JavaneseCalendarConverter.WUKU_DAYS[wukuDayIndex],
      wukuIndex,
      wukuDayIndex
    };
  }

  /**
   * Calculate the Javanese date, month, and year from days difference
   */
  private calculateJavaneseDate(daysDiff: number): JavaneseDateInfo {
    const ref = JavaneseCalendarConverter.REFERENCE_JAVANESE;
    
    // Start from reference values
    let yearIndex = ref.yearIndex;
    let monthIndex = ref.monthIndex;
    let date = ref.date;
    // Absolute Javanese year number aligned with reference year 1955 (AJ)
    let yearNumber = 1955;
    
    let currentDays = daysDiff;
    
    if (currentDays < 0) {
      // Handle past dates
      currentDays = Math.abs(currentDays);
      while (currentDays > 0) {
        if (date > 1) {
          date -= 1;
          currentDays -= 1;
        } else {
          // Move to previous month
          monthIndex = (monthIndex - 1 + 12) % 12;
          if (monthIndex === 11) { // Wrapped around, go to previous year
            yearIndex = (yearIndex - 1 + 8) % 8;
            yearNumber -= 1;
          }
          const yearType = JavaneseCalendarConverter.YEAR_TYPES[yearIndex];
          const month = JavaneseCalendarConverter.MONTHS[monthIndex];
          date = this.getMonthDays(month, yearType);
          currentDays -= 1;
        }
      }
    } else {
      // Handle future dates
      while (currentDays > 0) {
        const yearType = JavaneseCalendarConverter.YEAR_TYPES[yearIndex];
        const month = JavaneseCalendarConverter.MONTHS[monthIndex];
        const monthDays = this.getMonthDays(month, yearType);
        
        if (date < monthDays) {
          date += 1;
          currentDays -= 1;
        } else {
          // Move to next month
          date = 1;
          monthIndex = (monthIndex + 1) % 12;
          currentDays -= 1;
          
          if (monthIndex === 0) { // Wrapped around, go to next year
            yearIndex = (yearIndex + 1) % 8;
            yearNumber += 1;
          }
        }
      }
    }
    
    return {
      date,
      month: JavaneseCalendarConverter.MONTHS[monthIndex],
      yearType: JavaneseCalendarConverter.YEAR_TYPES[yearIndex],
      yearIndex,
      monthIndex,
      yearNumber
    };
  }

  /**
   * Format the conversion result into a readable string
   */
  private formatResult(
    javaneseInfo: JavaneseDateInfo, 
    dayName: string, 
    pasaran: string, 
    wukuInfo: WukuCalculation, 
    windu: string
  ): string {
    return `${javaneseInfo.date} ${javaneseInfo.month}, ${dayName} ${pasaran}, ${javaneseInfo.yearType}, ${windu}, ${wukuInfo.wuku} ${wukuInfo.wukuDay}`;
  }

  /**
   * Convert a Gregorian date to Javanese calendar format
   */
  public convert(dateInput: string | Date): JavaneseCalendarResult {
    // Parse input date
    let gregorianDate: Date;
    
    if (typeof dateInput === 'string') {
      // Handle various date formats
      const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
      const match = dateInput.match(dateRegex);
      
      if (!match) {
        throw new Error("Date must be in YYYY-MM-DD format");
      }
      
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1; // Month is 0-based
      const day = parseInt(match[3], 10);
      
      gregorianDate = new Date(year, month, day);
      
      // Validate the date
      if (gregorianDate.getFullYear() !== year || 
          gregorianDate.getMonth() !== month || 
          gregorianDate.getDate() !== day) {
        throw new Error("Invalid date");
      }
    } else {
      gregorianDate = new Date(dateInput);
    }
    
    // Calculate days difference from reference
    const daysDiff = Math.floor(
      (gregorianDate.getTime() - JavaneseCalendarConverter.REFERENCE_DATE.getTime()) / 
      (1000 * 60 * 60 * 24)
    );
    
    // Get basic day info
    const dayName = JavaneseCalendarConverter.DAY_NAMES[gregorianDate.getDay() === 0 ? 6 : gregorianDate.getDay() - 1];
    
    // Calculate pasaran (5-day cycle)
    const ref = JavaneseCalendarConverter.REFERENCE_JAVANESE;
    const pasaranIndex = (ref.pasaranIndex + daysDiff) % 5;
    const pasaran = JavaneseCalendarConverter.PASARAN_DAYS[pasaranIndex < 0 ? pasaranIndex + 5 : pasaranIndex];
    
    // Calculate Wuku
    const wukuInfo = this.calculateWuku(daysDiff);
    
    // Calculate Javanese date, month, and year
    const javaneseInfo = this.calculateJavaneseDate(daysDiff);
    
    // Calculate windu (based on year position in 8-year cycle)
    const winduIndex = Math.floor(javaneseInfo.yearIndex / 2);
    const windu = JavaneseCalendarConverter.WINDU_TYPES[winduIndex];
    
    return {
      gregorian: {
        date: gregorianDate.toISOString().split('T')[0],
        dayName,
        datetime: gregorianDate
      },
      javanese: {
        date: javaneseInfo.date,
        month: javaneseInfo.month,
        yearType: javaneseInfo.yearType,
        year: javaneseInfo.yearNumber,
        windu
      },
      cycles: {
        pasaran,
        wuku: wukuInfo.wuku,
        wukuDay: wukuInfo.wukuDay
      },
      formatted: this.formatResult(javaneseInfo, dayName, pasaran, wukuInfo, windu)
    };
  }

  /**
   * Get current date in Javanese calendar
   */
  public getCurrentJavaneseDate(): JavaneseCalendarResult {
    return this.convert(new Date());
  }

  /**
   * Get all calendar constants for UI components
   */
  public static getConstants() {
    return {
      YEAR_TYPES: [...JavaneseCalendarConverter.YEAR_TYPES],
      PASARAN_DAYS: [...JavaneseCalendarConverter.PASARAN_DAYS],
      WINDU_TYPES: [...JavaneseCalendarConverter.WINDU_TYPES],
      MONTHS: [...JavaneseCalendarConverter.MONTHS],
      DAY_NAMES: [...JavaneseCalendarConverter.DAY_NAMES],
      WUKU_NAMES: [...JavaneseCalendarConverter.WUKU_NAMES],
      WUKU_DAYS: [...JavaneseCalendarConverter.WUKU_DAYS]
    };
  }
}

// Export a default instance for convenience
export const javaneseCalendar = new JavaneseCalendarConverter();

// Export types for external use
export type YearType = typeof JavaneseCalendarConverter.YEAR_TYPES[number];
export type PasaranDay = typeof JavaneseCalendarConverter.PASARAN_DAYS[number];
export type WinduType = typeof JavaneseCalendarConverter.WINDU_TYPES[number];
export type JavaneseMonth = typeof JavaneseCalendarConverter.MONTHS[number];
export type IndonesianDay = typeof JavaneseCalendarConverter.DAY_NAMES[number];
export type WukuName = typeof JavaneseCalendarConverter.WUKU_NAMES[number];
export type WukuDay = typeof JavaneseCalendarConverter.WUKU_DAYS[number];