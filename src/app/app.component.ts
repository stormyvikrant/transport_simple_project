import { Component } from '@angular/core';
interface Trip {
  start: string;
  end: string;
  level: number;
  continued?: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  trips: Trip[] = [];

  newTrip = {
    start: '',
    end: '',
  };

  addTrip() {
    if (this.newTrip.start.trim() && this.newTrip.end.trim()) {
      const start = this.newTrip.start.trim();
      const end = this.newTrip.end.trim();

      // Default Level
      let level = 1;
      let continued = false;

      if (this.trips.length > 0) {
        const lastTrip = this.trips[this.trips.length - 1];

        // If previous and upcoming trip are same, set level to 2
        if (
          lastTrip.start.toLowerCase() === start.toLowerCase() &&
          lastTrip.end.toLowerCase() === end.toLowerCase()
        ) {
          level = 2; // Same trip, apply level 2
        }

        // Check if this trip continues from the previous one
        if (lastTrip.end.toLowerCase() === start.toLowerCase()) {
          continued = true;
          level = 1;
        }
      }

      // Add new trip to trips array
      this.trips.push({
        start,
        end,
        level,
        continued,
      });

      // Reset the form
      this.newTrip = { start: '', end: '' };
    }
  }

  getFirstThreeChars(text: string): string {
    return text.substring(0, 3).toUpperCase();
  }
}
