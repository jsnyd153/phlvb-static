export interface Product {
  id: number;
  title: string;
  start: string;
  end: string;
  place: Place;
  sportID: number;
  data: Data;
}

interface Place {
    title: string;
  }

  interface Data {
    level: Level;
    genderID: number;
  }
  
  interface Level {
    title: string;
    value: number;
  }
  