import { Injectable } from "@angular/core";
import { fishData, locationsData, pathsData } from "./fish-data";

@Injectable({
  providedIn: "root"
})
export class FishDataService {
  constructor() {}

  private fakeMissedContects(path, lastContact, thisContact) {
    var c = { LocationId: "", Start: "", Contacts: 0 };
    var list = [];
    var lastDate = new Date(lastContact.Start);
    var thisDate = new Date(thisContact.Start);

    var lastIndex = path.indexOf(lastContact.LocationId);
    var thisIndex = path.indexOf(thisContact.LocationId);

    var diff =
      (thisDate.getTime() - lastDate.getTime()) / (thisIndex - lastIndex);
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

  private findPathDifference(path, lastLocId, thisLocId) {
    var lastIndex = path.indexOf(lastLocId);
    var thisIndex = path.indexOf(thisLocId);
    if (lastIndex >= 0 && thisIndex >= 0) return lastIndex - thisIndex;
    return -1000; // Big difference to simplify algorithm
  }

  private findPathDifferences(lastLocId, thisLocId) {
    var retArray = [];
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

  getLocations() {
    return locationsData;
  }

  sortContacts(contacts: [any]): [any] {
    return contacts.sort((a, b) => {
      var aa = new Date(a.Start);
      var bb = new Date(b.Start);
      if (aa == bb) return 0;
      else return aa > bb ? 1 : -1;
    });
  }

  getOneFishWithMissingContactsAdded(onefish) {
    var paths = this.getPaths();
    var returnedFish = {
      Sex: onefish.Sex,
      TaggingDate: onefish.TaggingDate,
      Mature: onefish.Mature,
      Length: onefish.Length,
      Region: onefish.Region,
      FakedContacts: 0,
      Contacts: []
    };
    var fakedContacts = [];

    // Make sure the contacts are sorted
    onefish.Contacts = this.sortContacts(onefish.Contacts);
    var lastContact = onefish.Contacts[0];
    for (var i = 1; i < onefish.Contacts.length; i++) {
      var lastDate = new Date(lastContact.Start);
      var thisDate = new Date(onefish.Contacts[i].Start);
      if (thisDate < lastDate) {
        console.log(`ERROR ${lastContact.Start} ${onefish.Contacts[i].Start}`);
      }

      var pd = this.findPathDifferences(
        lastContact.LocationId,
        onefish.Contacts[i].LocationId
      );

      var mpd = this.minPathDifference(pd);

      if (mpd.value > 1) {
        console.log(`tdiff = ${lastDate.getTime() - thisDate.getTime()}`);
        console.log(`min = ${mpd.value}, path = ${mpd.index}`);
        fakedContacts.concat(
          this.fakeMissedContects(
            paths[mpd.index],
            lastContact,
            onefish.Contacts[i]
          )
        );
      }
      lastContact = onefish.Contacts[i];
    }
    returnedFish.Contacts = this.sortContacts(
      onefish.Contacts.concat(fakedContacts)
    );
    returnedFish.FakedContacts = fakedContacts.length;
    return returnedFish;
  }

  getFishWithMissingContactsAdded() {
    var ret = [];
    var fish = this.getFish();
    for (var j = 0; j < fish.length; j++) {
      ret[j] = this.getOneFishWithMissingContactsAdded(fish[j]);
    }
    return ret;
  }

  getLocationIndexFromRegionOrLocationId(region: string) {
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

  getTransitions(fish: any) {
    var transitions = [];
    var lastLoc = this.getLocationIndexFromRegionOrLocationId(fish.Region);
    fish.Contacts.forEach(c => {
      transitions.push({
        Date: new Date(c.Start).getTime(),
        FromLocationIndex: lastLoc,
        ToLocationIndex: this.getLocationIndexFromRegionOrLocationId(
          c.LocationId
        )
      });
      lastLoc = this.getLocationIndexFromRegionOrLocationId(c.LocationId);
    });
    return transitions;
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
      var lastLocationIndex = this.getLocationIndexFromRegionOrLocationId(
        f.Region
      );
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
    return this.getOneFishWithMissingContactsAdded(fishData[fishId]);
  }

  getPaths() {
    return pathsData;
  }

  getFish() {
    return fishData;
  }
}
