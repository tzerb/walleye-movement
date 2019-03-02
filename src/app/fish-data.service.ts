import { Injectable } from "@angular/core";
import { fishData, locationsData, pathsData } from "./fish-data";
import { FishFilterService, FishFilterData } from './fish-filter.service';
import { BehaviorSubject } from 'rxjs';

export interface IFishTree {
  [Name: string]: { [Name: string]: IFishModel[] };
}

export interface IFishModel {
  Region: string;
  Code: string;
  Location: string;
  TaggingDate: string;
  Length: number;
  // Mature: boolean;
  Sex: string;
  Contacts: Array<IContact>;
}

export interface IFishModelWithMisstingContacts {
  Region: string;
  Code: string;
  Location: string;
  TaggingDate: string;
  Length: number;
  // Mature: boolean;
  Sex: string;
  Contacts: Array<IContact>;
  FakedContacts: number;
}

export interface ILocation {
  Id: string;
  Name: string;
  Lat: number;
  Lng: number;
}
export interface IContact {
  LocationId: string;
  Start: string;
}

export interface ITransition {
  Date: number;
  FromLocationIndex: number;
  ToLocationIndex: number;
}

@Injectable({
  providedIn: "root"
})
export class FishDataService {


  private contactsByDayOfYear: BehaviorSubject<number[]>;
  private contactsByHourOfDay: BehaviorSubject<number[]>;

  constructor(private filterService: FishFilterService) {

    this.contactsByDayOfYear = new BehaviorSubject<number[]>([]);
    this.contactsByHourOfDay = new BehaviorSubject<number[]>([]);
    this.filterService.getFilter().subscribe(filter => {
      var fish = this.getFishWithMissingContactsAdded();
      var dayArray = Array.from(Array(366), () => 0);
      fish.forEach(f => {
        if (this.shouldIncludeFish(f, filter)) {
          f.Contacts.forEach(c => {
            if (this.shouldIncludeContact(c, filter)) {
              dayArray[this.getIntegerDayOfYearFromTime(c.Start)]++;
            }
          });
        }
      });
      this.contactsByDayOfYear.next(dayArray);

      var hourArray = Array.from(Array(24), () => 0);
      fish.forEach(f => {
        if (this.shouldIncludeFish(f, filter)) {
          f.Contacts.forEach(c => {
            if (this.shouldIncludeContact(c, filter)) {
              hourArray[this.getIntegerHourFromTime(c.Start)]++;
            }
          });
        }
      });
      this.contactsByHourOfDay.next(hourArray);;

    });

  }

  private shouldIncludeContact(contact: IContact, filter: FishFilterData) {
    var year = new Date(contact.Start).getFullYear();
    return (year == 2011 && filter.year2011) || (year == 2012 && filter.year2012) || (year == 2013 && filter.year2013);
  }

  private shouldIncludeFish(fish: IFishModel, filter: FishFilterData) {
    var sex = (fish.Sex == 'Male' && filter.males) || (fish.Sex == 'Female' && filter.females);
    var tagLocation = (fish.Region == 'Wolf' && filter.wolf) || (fish.Region == 'Fox' && filter.fox) || (fish.Region == 'Winnebago' && filter.winnebago)
    return sex && tagLocation;
  }

  private fakeMissedContacts(path, lastContact, thisContact): Array<IContact> {
    var c: IContact = { LocationId: "", Start: "" };
    var list = [];
    var lastDate = new Date(lastContact.Start);
    var thisDate = new Date(thisContact.Start);

    var lastIndex = path.indexOf(lastContact.LocationId);
    var thisIndex = path.indexOf(thisContact.LocationId);

    var diff = (thisDate.getTime() - lastDate.getTime()) / (thisIndex - lastIndex);
    var numberToAdd = Math.abs(thisIndex - lastIndex);
    var sign = Math.sign(thisIndex - lastIndex);

    console.log(`a${lastContact.LocationId} : ${new Date(lastContact.Start)} `);
    for (var i = 1; i < numberToAdd; i++) {
      list.push({
        LocationId: path[lastIndex + i * sign],
        Start: new Date(lastDate.getTime() + diff * i),
        Contacts: 0
      });
    }

    return list;
  }

  private findPathDifference(path: Array<string>, lastLocId: string, thisLocId: string): number {
    var lastIndex = path.indexOf(lastLocId);
    var thisIndex = path.indexOf(thisLocId);
    if (lastIndex >= 0 && thisIndex >= 0) return lastIndex - thisIndex;
    return -1000; // Big difference to simplify algorithm
  }

  private findPathDifferences(lastLocId: string, thisLocId: string): Array<number> {
    var retArray: Array<number> = [];
    var paths = this.getPaths();
    for (var i = 0; i < paths.length; i++) {
      if (lastLocId === thisLocId) {
        retArray.push(0);
      } else {
        retArray.push(this.findPathDifference(paths[i], lastLocId, thisLocId));
      }
    }
    return retArray;
  }

  private minPathDifference(pathDifferences) {
    var min = { value: 1000, index: -1 };
    for (var i = 0; i < pathDifferences.length; i++) {
      min.value = Math.min(Math.abs(pathDifferences[i]), min.value);
      if (min.value == Math.abs(pathDifferences[i])) {
        min.index = i;
      }
    }
    return min;
  }

  getLocations(): Array<ILocation> {
    return locationsData;
  }

  private sortContacts(contacts: Array<IContact>): Array<IContact> {
    return contacts.sort((a, b) => {
      var aa = new Date(a.Start);
      var bb = new Date(b.Start);
      if (aa == bb) return 0;
      else return aa > bb ? 1 : -1;
    });
  }

  private getFakedContactsForOneFish(onefish: IFishModel): Array<IContact> {
    var paths = this.getPaths();

    var fakedContacts: Array<IContact> = [];

    // Make sure the contacts are sorted
    onefish.Contacts = this.sortContacts(onefish.Contacts);
    var lastContact = onefish.Contacts[0];
    for (var i = 1; i < onefish.Contacts.length; i++) {
      var lastDate = new Date(lastContact.Start);
      var thisDate = new Date(onefish.Contacts[i].Start);
      if (thisDate < lastDate) {
        console.log(`ERROR ${lastContact.Start} ${onefish.Contacts[i].Start}`);
      }

      var pd = this.findPathDifferences(lastContact.LocationId, onefish.Contacts[i].LocationId);

      var mpd = this.minPathDifference(pd);

      if (mpd.value > 1) {
        console.log(`tdiff = ${lastDate.getTime() - thisDate.getTime()}`);
        console.log(`min = ${mpd.value}, path = ${mpd.index}`);
        var l = this.fakeMissedContacts(paths[mpd.index], lastContact, onefish.Contacts[i]);
        fakedContacts = fakedContacts.concat(l); // TODO TZ
      }

      lastContact = onefish.Contacts[i];
    }
    return fakedContacts;
  }

  private getOneFishWithMissingContactsAdded(onefish: IFishModel): IFishModelWithMisstingContacts {
    var returnedFish: IFishModelWithMisstingContacts = {
      Code: onefish.Code,
      Sex: onefish.Sex,
      TaggingDate: onefish.TaggingDate,
      Location: onefish.Location,
      Length: onefish.Length,
      Region: onefish.Region,
      FakedContacts: 0,
      Contacts: []
    };
    var fakedContacts = this.getFakedContactsForOneFish(onefish);
    returnedFish.Contacts = this.sortContacts(onefish.Contacts.concat(fakedContacts));
    returnedFish.FakedContacts = fakedContacts.length;
    return returnedFish;
  }

  private getFishWithMissingContactsAdded(): Array<IFishModel> {
    var ret = [];
    var fish = this.filteredFishData();
    for (var j = 0; j < fish.length; j++) {
      ret[j] = this.getOneFishWithMissingContactsAdded(fish[j]);
    }
    return ret;
  }

  private getLocationIndexFromRegionOrLocationId(region: string): number {
    var locationIndex = null;
    var i = 0;
    locationsData.forEach(l => {
      if (l.Id == region.toUpperCase()) {
        locationIndex = i;
      }
      i++;
    });

    if (locationIndex == null) throw `Couldn't find region ${region}`;

    return locationIndex;
  }

  getTransitions(fish: any): Array<ITransition> {
    var transitions = [];
    var lastLoc = this.getLocationIndexFromRegionOrLocationId(fish.Region);
    fish.Contacts.forEach(c => {
      transitions.push({
        Date: new Date(c.Start).getTime(),
        FromLocationIndex: lastLoc,
        ToLocationIndex: this.getLocationIndexFromRegionOrLocationId(c.LocationId)
      });
      lastLoc = this.getLocationIndexFromRegionOrLocationId(c.LocationId);
    });
    return transitions;
  }

  getIntegerHourFromTime(time: any): number {
    var t = new Date(time);
    return t.getHours();
  }

  getIntegerDayOfYearFromTime(time: any): number {
    var now = new Date(time);
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now.getTime() - start.getTime();
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
  }

  computeDateFromDayOfYear(dayOfYear: number): string {
    var date = new Date(dayOfYear * 1000 * 24 * 60 * 60);
    return date.toLocaleDateString();
  }

  getContactsByHourOfDay() {
    return this.contactsByHourOfDay.asObservable();
  }

  getContactsByDayOfYear() {
    return this.contactsByDayOfYear.asObservable();
  }

  getMinMaxDates(fish: any): any {
    var max = 0;
    var min = new Date("1/1/2020").getTime();
    fish.forEach(f => {
      min = Math.min(min, new Date(f.TaggingDate).getTime());
      f.Contacts.forEach(c => {
        max = Math.max(max, new Date(c.Start).getTime());
      });
      // var sortedcontacts = this.sortContacts(f.Contacts);
    });
    return {
      max: max,
      maxDate: new Date(max),
      min: min,
      minDate: new Date(min),
      days: (max - min) / 1000 / 60 / 60 / 24
    };
  }

  truncDate(date: number) {
    return Math.floor(date / (1000 * 60 * 60 * 24));
  }

  getInitialPositions() {
    var positions = [];
    var locations = [];
    var fish = this.getFishWithMissingContactsAdded();

    locationsData.forEach(l => {
      locations.push(0);
    });

    var minMaxDates = this.getMinMaxDates(fish);
    for (var i = 0; i < minMaxDates.days + 1; i++) {
      positions.push(locations.slice());
    }

    fish.forEach(f => {
      var transitions = this.getTransitions(f);
      var lastDate = new Date(f.TaggingDate).getTime();
      var lastLocationIndex = this.getLocationIndexFromRegionOrLocationId(f.Region);
      transitions.forEach(t => {
        var a = this.truncDate(lastDate);
        var b = this.truncDate(t.Date);
        var nDays = b - a;
        if (nDays > 0) {
          console.log(nDays);
          for (var j = a; j <= b; j++) {
            var dateIndex = Math.floor(j - this.truncDate(minMaxDates.min));
            positions[dateIndex][lastLocationIndex]++;
          }
        }
        lastDate = t.Date;
        lastLocationIndex = t.ToLocationIndex;
      });
    });

    return {
      minDate: minMaxDates.min,
      maxDate: minMaxDates.max,
      positions: positions
    };
  }

  getSingleFish(fishId: number) {
    return this.getOneFishWithMissingContactsAdded(this.filteredFishData()[fishId]);
  }

  getPaths() {
    return pathsData;
  }

  getMissedContactsByLocation() {
    var locationArray: Array<any> = Array<any>();

    locationsData.forEach(l => {
      locationArray.push({
        location: l.Name,
        contacts: 0,
        missedContacts: 0,
        pctMissed: 0.0
      });
    });

    this.filteredFishData().forEach(f => {
      f.Contacts.forEach(c => {
        var locIndex = this.getLocationIndexFromRegionOrLocationId(c.LocationId);
        locationArray[locIndex].contacts++;
      });

      var fakedContacts = this.getFakedContactsForOneFish(f);
      if (fakedContacts) {
        fakedContacts.forEach(c => {
          var locIndex = this.getLocationIndexFromRegionOrLocationId(c.LocationId);
          locationArray[locIndex].missedContacts++;
        });
      }
    });

    locationArray.forEach(l => {
      l.pctMissed = l.missedContacts / l.contacts;
    });

    return locationArray;
  }

  getMissedContactsByFish(): any[] {
    debugger;
    var missedContacts = [];
    this.filteredFishData().forEach(f => {
      var fakedContacts = this.getFakedContactsForOneFish(f);
      if (fakedContacts) {
        missedContacts.push({
          fishCode: f.Code,
          contacts: f.Contacts.length,
          missedContacts: fakedContacts.length,
          pctMissed: (f.Contacts.length == 0) ? 0 : fakedContacts.length / f.Contacts.length
        });
      } else {
        missedContacts.push(0);
      }
    });

    return missedContacts;
  }

  filteredFishData(): IFishModel[] {
    return fishData;
  }

  getCategorizedFish(): IFishTree {
    var tree: IFishTree = {};
    fishData.forEach(f => {
      var region = tree[f.Region];
      if (!region) {
        tree[f.Region] = {}
      }
      var releaseLocation = tree[f.Region][f.Location];
      if (!releaseLocation) {
        tree[f.Region][f.Location] = [];
      }
      tree[f.Region][f.Location].push(f);
    });
    return tree;
  }
}
